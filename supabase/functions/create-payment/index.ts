import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRODUCT_PRICES = {
  webinar: "price_1QlhXdDDqZaEKHOxJFtKY3x5",
};

const PRODUCT_DETAILS: Record<string, { name: string; price: number; discountedPrice: number }> = {
  workbook_0: { name: "Market Opportunity Framework (Workbook 0)", price: 2700, discountedPrice: 2700 },
  workbook_1: { name: "Brand Identity Workbook", price: 9700, discountedPrice: 6300 },
  workbook_2: { name: "Marketing Strategy Workbook", price: 9700, discountedPrice: 6300 },
  workbook_3: { name: "Customer Journey Workbook", price: 9700, discountedPrice: 6300 },
  workbook_4: { name: "Growth Systems Workbook", price: 9700, discountedPrice: 6300 },
  bundle: { name: "Complete Brand & Marketing System (All 4 Workbooks)", price: 31000, discountedPrice: 19700 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    const { productType, couponCode, discounted } = await req.json();
    
    // Try to get authenticated user, but allow guest checkout for webinar
    let user = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
      } catch (authError) {
        console.log("No valid auth token, proceeding with guest checkout");
      }
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // For authenticated users, check for existing Stripe customer
    let customerId;
    let customerEmail = null;
    
    if (user?.email) {
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      }
      customerEmail = user.email;
    }

    // Prepare session configuration
    const sessionConfig: any = {
      mode: "payment",
      allow_promotion_codes: true,
      success_url: productType === 'webinar' 
        ? `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&product=${productType}&type=webinar`
        : `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&product=${productType}`,
      cancel_url: productType === 'webinar'
        ? `${req.headers.get("origin")}/thank-you`
        : `${req.headers.get("origin")}/`,
      metadata: {
        user_id: user?.id || 'guest',
        product_type: productType,
      },
    };

    // Handle webinar with price ID, workbooks with price_data
    if (productType === 'webinar') {
      if (!PRODUCT_PRICES[productType as keyof typeof PRODUCT_PRICES]) {
        throw new Error("Invalid product type");
      }
      sessionConfig.line_items = [
        {
          price: PRODUCT_PRICES[productType as keyof typeof PRODUCT_PRICES],
          quantity: 1,
        },
      ];
    } else {
      const product = PRODUCT_DETAILS[productType as keyof typeof PRODUCT_DETAILS];
      if (!product) {
        throw new Error("Invalid product type");
      }
      // Use discounted price if specified, otherwise use regular price
      const finalPrice = discounted ? product.discountedPrice : product.price;
      
      sessionConfig.line_items = [
        {
          price_data: {
            currency: "usd",
            unit_amount: finalPrice,
            product_data: {
              name: product.name,
              description: "Digital workbook with AI implementation guide",
            },
          },
          quantity: 1,
        },
      ];
    }

    // Only add customer/email if we have valid data
    if (customerId) {
      sessionConfig.customer = customerId;
    } else if (customerEmail) {
      sessionConfig.customer_email = customerEmail;
    }
    // If neither, Stripe will prompt for email during checkout

    // Apply coupon if provided
    if (couponCode) {
      try {
        // Verify the coupon exists and is valid
        const coupon = await stripe.coupons.retrieve(couponCode);
        if (coupon.valid) {
          sessionConfig.discounts = [{
            coupon: couponCode,
          }];
          console.log(`Applied coupon: ${couponCode}`);
        }
      } catch (couponError) {
        console.error("Invalid coupon code:", couponError);
        throw new Error("Invalid coupon code");
      }
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});