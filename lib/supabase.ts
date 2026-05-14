import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://vsrrnfuvyhyhawzazzxv.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_ZCrh-QurGicgN7NHwL-eMw_A1N4OyRr";

export const supabase = createClient(supabaseUrl, supabaseKey);