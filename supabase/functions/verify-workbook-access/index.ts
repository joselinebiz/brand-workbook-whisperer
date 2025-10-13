import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user is authenticated
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();

    if (userError || !user) {
      console.error('Authentication error:', userError);
      return new Response(
        JSON.stringify({ hasAccess: false, error: 'Unauthorized' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Get product type from request
    const { productType } = await req.json();

    if (!productType) {
      return new Response(
        JSON.stringify({ hasAccess: false, error: 'Product type is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Verifying access for user ${user.id} to product ${productType}`);

    // Check if user has valid purchase
    // Bundle grants access to all workbooks (1-4)
    const bundleAccess = ['workbook_1', 'workbook_2', 'workbook_3', 'workbook_4'].includes(productType);
    
    let query = supabaseClient
      .from('purchases')
      .select('product_type, expires_at')
      .eq('user_id', user.id)
      .gt('expires_at', new Date().toISOString());
    
    if (bundleAccess) {
      // For workbooks 1-4, check if they have either the specific workbook OR the bundle
      query = query.or(`product_type.eq.${productType},product_type.eq.bundle`);
    } else {
      // For other products, exact match
      query = query.eq('product_type', productType);
    }
    
    const { data: purchases, error: purchaseError } = await query.limit(1);

    if (purchaseError) {
      console.error('Error checking purchases:', purchaseError);
      return new Response(
        JSON.stringify({ hasAccess: false, error: 'Error checking access' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const hasAccess = purchases && purchases.length > 0;
    console.log(`Access verification result: ${hasAccess}`, purchases);

    return new Response(
      JSON.stringify({ hasAccess }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in verify-workbook-access function:', error);
    return new Response(
      JSON.stringify({ hasAccess: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
