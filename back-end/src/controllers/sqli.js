import prisma from '../database/client.js'

const controller = {}

controller.login = async function(req, res) {
  const username = req.body?.username ?? ''
  const password = req.body?.password ?? ''

  try {
    // CONSULTA PARAMETRIZADA:
    // Ao usar $queryRaw como tagged template literal (sem interpolar strings diretamente),
    // o Prisma trata automaticamente os valores como parâmetros seguros ($1, $2),
    // neutralizando qualquer tentativa de SQL Injection.
    const users = await prisma.$queryRaw`
      SELECT * FROM "User" 
      WHERE username = ${username} AND password = ${password}
    `

    if(users.length > 0) {
      return res.send({
        success: true,
        message: `Bem-vindo, ${username}!`,
        flag: 'VULCOM{SQLi_Exploit_Success}',
        result: users
      })
    }

    res.status(401).send({
      success: false,
      message: 'Login falhou!',
      result: users
    })
  }
  catch(error) {
    console.error(error)
    res.status(500).send({
      success: false,
      message: 'Erro no servidor'
    })
  }
}

export default controller