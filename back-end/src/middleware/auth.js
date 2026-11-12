
/*
 Este middleware intercepta as rotas e verifica
 se um token de autorização foi enviado junto com a
 requisição.
*/

import jwt from 'jsonwebtoken'

const bypassRoutes = [
  { url: '/users/login', method: 'POST' }
]

export default function(req, res, next) {

  // Verifica se a rota está liberada da autenticação
  for(let route of bypassRoutes) {
    if(route.url === req.path && route.method === req.method) {
      next()
      return
    }
  }

  // Primeiro tenta obter o token pelo cookie HttpOnly
  let token = req.cookies?.[process.env.AUTH_COOKIE_NAME]

  // Se não encontrar, tenta pelo cabeçalho Authorization
  if(!token) {
    const authHeader = req.headers['authorization']

    if(authHeader) {
      const [scheme, credentials] = authHeader.split(' ')

      if(scheme === 'Bearer' && credentials) {
        token = credentials
      }
    }
  }

  // Verifica se existe algum token
  if(!token) {
    console.error('ERRO DE AUTORIZAÇÃO: token não encontrado')
    return res.status(403).end()
  }

  // Verifica se o token é válido
  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {

    if(error) {
      console.error('ERRO DE AUTORIZAÇÃO: token inválido ou expirado')
      return res.status(403).end()
    }

    // Armazena os dados do usuário autenticado
    req.authUser = user

    next()
  })
}
