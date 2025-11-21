// Arquivo de entrada para o Vercel Serverless Functions
// Este arquivo importa e exporta o servidor Express

import app from '../backend/server.js';

// Handler para o Vercel
// O Express app pode ser usado diretamente como handler no Vercel
// Mas adicionamos verificação de variáveis de ambiente antes
const handler = async (req, res) => {
  // Verificar variáveis de ambiente críticas
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY || !process.env.JWT_SECRET) {
    console.error('❌ Variáveis de ambiente faltando!');
    console.error('   SUPABASE_URL:', !!process.env.SUPABASE_URL);
    console.error('   SUPABASE_ANON_KEY:', !!process.env.SUPABASE_ANON_KEY);
    console.error('   JWT_SECRET:', !!process.env.JWT_SECRET);
    return res.status(500).json({ 
      error: 'Erro de configuração do servidor. Verifique as variáveis de ambiente no Vercel (Settings → Environment Variables).' 
    });
  }
  
  // Passar a requisição para o Express
  return app(req, res);
};

export default handler;

