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

  let token
  const authHeader = req.headers['authorization']

  console.log({ authHeader })

  // Verifica se o cabeçalho Authorization foi enviado
  if(!authHeader) {
    console.error('ERRO DE AUTORIZAÇÃO: falta de cabeçalho')
    return res.status(403).end()
  }

  // Extrai o token do formato Bearer TOKEN
  const [scheme, credentials] = authHeader.split(' ')

  if(scheme !== 'Bearer' || !credentials) {
    console.error('ERRO DE AUTORIZAÇÃO: formato inválido')
    return res.status(403).end()
  }

  token = credentials

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