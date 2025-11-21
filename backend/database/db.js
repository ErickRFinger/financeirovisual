import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://yizdwjphaynqrisftruo.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseKey) {
  throw new Error('SUPABASE_ANON_KEY ou SUPABASE_SERVICE_KEY deve estar definido no .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
