import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRODUCT_PRICES = {
  webinar: "price_1QWhbzCiT5IFDGi5x9YbIiSk",
  workbook_1: "price_1SHBiWAnYzcngRwoJCYzqIEr",
  workbook_2: "price_1SHBiiAnYzcngRwozXR4UtDC",
  workbook_3: "price_1SHBitAnYzcngRwoM3KUCNLK",
  workbook_4: "price_1SHBj5AnYzcngRwoUKYMf5Mc",
  bundle: "price_1SHBjKAnYzcngRwo46M5bgXd",
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
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user?.email) throw new Error("User not authenticated");

    const { productType, couponCode } = await req.json();
    
    if (!PRODUCT_PRICES[productType as keyof typeof PRODUCT_PRICES]) {
      throw new Error("Invalid product type");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Prepare session configuration
    const sessionConfig: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price: PRODUCT_PRICES[productType as keyof typeof PRODUCT_PRICES],
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      success_url: productType === 'webinar' 
        ? `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&product=${productType}&type=webinar`
        : `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}&product=${productType}`,
      cancel_url: productType === 'webinar'
        ? `${req.headers.get("origin")}/thank-you`
        : `${req.headers.get("origin")}/`,
      metadata: {
        user_id: user.id,
        product_type: productType,
      },
    };

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