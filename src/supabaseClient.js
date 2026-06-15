import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://uznczdxrjdjutttovtlc.supabase.co';
const supabaseKey = 'sb_publishable_hgkeApcc833ugNVJABQifQ_jqgutx4K';

export const supabase = createClient(supabaseUrl, supabaseKey)