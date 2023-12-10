import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_DB
const supabaseKEY = import.meta.env.VITE_PUB_ANON_KEY
const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;