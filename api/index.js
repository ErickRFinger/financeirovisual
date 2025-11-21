// Arquivo de entrada para o Vercel Serverless Functions
// Este arquivo importa e exporta o servidor Express

import app from '../backend/server.js';

// O Vercel espera que exportemos uma função handler
// O Express app já é um handler válido para o Vercel
export default app;

