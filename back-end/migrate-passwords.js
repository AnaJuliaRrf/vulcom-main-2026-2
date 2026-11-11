
import prisma from './src/database/client.js'
import argon2 from 'argon2'

async function main() {
  const users = await prisma.user.findMany()

  let converted = 0

  for (const user of users) {
    // Não converter novamente senhas que já possuem hash Argon2
    if (user.password.startsWith('$argon2')) {
      continue
    }

    const passwordHash = await argon2.hash(user.password)

    await prisma.user.update({
      where: { id: user.id },
      data: { password: passwordHash }
    })

    converted++
  }

  console.log(`${converted} senha(s) convertida(s) para Argon2id.`)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
