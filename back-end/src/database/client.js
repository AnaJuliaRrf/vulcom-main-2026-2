import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: [ { emit: 'event', level: 'query' } ]
})

// Exibe no console as instruções SQL enviadas ao BD
prisma.$on('query', event => {
  console.log('-'.repeat(60))
  console.log(event.query)
  // OWASP Top 10:2025 A09 - Falhas nos Logs de Segurança e no Sistema de Alertas:
  // parâmetros podem conter senhas e dados pessoais, registrados sem mascaramento.
  if(event.params) console.log('PARAMS:', event.params)
})

export default prisma