// Arquivo de entrada para o Vercel Serverless Functions
// Este arquivo importa e exporta o servidor Express

import app from '../backend/server.js';

// Handler para o Vercel com tratamento robusto de erros
const handler = async (req, res) => {
  try {
    // Verificar variáveis de ambiente críticas
    const missingVars = [];
    if (!process.env.SUPABASE_URL) missingVars.push('SUPABASE_URL');
    if (!process.env.SUPABASE_ANON_KEY) missingVars.push('SUPABASE_ANON_KEY');
    if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');
    
    if (missingVars.length > 0) {
      console.error('❌ Variáveis de ambiente faltando:', missingVars.join(', '));
      console.error('⚠️  Configure essas variáveis no Vercel (Settings → Environment Variables)');
      return res.status(500).json({ 
        error: `Erro de configuração: Variáveis faltando: ${missingVars.join(', ')}. Configure no Vercel (Settings → Environment Variables).` 
      });
    }
    
    // Passar a requisição para o Express
    // O Express app já tem tratamento de erros global
    return app(req, res);
  } catch (error) {
    console.error('❌ Erro crítico no handler do Vercel:', error);
    console.error('   Mensagem:', error.message);
    console.error('   Stack:', error.stack);
    
    if (!res.headersSent) {
      return res.status(500).json({ 
        error: 'Erro interno do servidor. Tente novamente.' 
      });
    }
  }
};

export default handler;

