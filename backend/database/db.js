import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://yizdwjphaynqrisftruo.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseKey) {
  console.error('❌ SUPABASE_ANON_KEY ou SUPABASE_SERVICE_KEY não está definido!');
  console.error('⚠️  Configure a variável SUPABASE_ANON_KEY no Vercel (Settings → Environment Variables)');
  // Não lançar erro aqui para não quebrar o servidor, apenas logar
}

const supabase = createClient(supabaseUrl, supabaseKey || '');

export default supabase;
