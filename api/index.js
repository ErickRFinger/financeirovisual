// Arquivo de entrada para o Vercel Serverless Functions
// Este arquivo importa e exporta o servidor Express

import app from '../backend/server.js';

// Handler para o Vercel Serverless Functions
// O Vercel espera uma função que recebe (req, res)
export default function handler(req, res) {
  return app(req, res);
}

