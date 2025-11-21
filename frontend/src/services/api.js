import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos
})

// Interceptor de requisição - adiciona token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Garantir que a URL está correta
    const fullUrl = config.baseURL + config.url
    console.log('📤 Requisição:', config.method?.toUpperCase(), fullUrl, config.params || '')
    console.log('   BaseURL:', config.baseURL, '| URL:', config.url, '| Full:', fullUrl)
    return config
  },
  (error) => {
    console.error('❌ Erro no interceptor de requisição:', error)
    return Promise.reject(error)
  }
)

// Interceptor de resposta - tratamento de erros e logs
api.interceptors.response.use(
  (response) => {
    console.log('📥 Resposta:', response.config.url, response.data)
    return response
  },
  (error) => {
    const url = error.config?.url || 'URL desconhecida'
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN'
    
    if (error.response) {
      // Erro do servidor
      const status = error.response.status
      const data = error.response.data
      
      console.error(`❌ Erro ${status} na requisição ${method} ${url}:`, data)
      
      if (status === 401) {
        // Token inválido - limpar e redirecionar
        localStorage.removeItem('token')
        window.location.href = '/login'
        return Promise.reject(new Error('Sessão expirada. Faça login novamente.'))
      } else if (status === 404) {
        // Rota não encontrada
        const errorMsg = data?.error || `Rota não encontrada: ${url}`
        console.error(`🔍 Rota não encontrada: ${method} ${url}`)
        return Promise.reject(new Error(errorMsg))
      } else if (status >= 500) {
        // Erro do servidor
        return Promise.reject(new Error(data?.error || 'Erro interno do servidor'))
      } else {
        // Outros erros (400, 403, etc)
        const errorMsg = data?.error || data?.errors?.[0]?.msg || `Erro ${status}: ${data?.message || 'Requisição inválida'}`
        return Promise.reject(new Error(errorMsg))
      }
    } else if (error.request) {
      // Erro de conexão
      console.error('❌ Sem resposta do servidor:', url)
      return Promise.reject(new Error('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.'))
    } else {
      // Outro erro
      console.error('❌ Erro na configuração da requisição:', error.message)
      return Promise.reject(error)
    }
  }
)

export default api

