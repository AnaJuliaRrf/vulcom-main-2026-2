import prisma from '../database/client.js'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'

const controller = {}     // Objeto vazio

controller.create = async function(req, res) {
  try {
    const { password, ...userData } = req.body

    const passwordHash = await argon2.hash(password)

    await prisma.user.create({
      data: {
        ...userData,
        password: passwordHash
      }
    })

    // HTTP 201: Created
    res.status(201).end()
  }
  catch(error) {
    console.error(error)

    // HTTP 500: Internal Server Error
    res.status(500).end()
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.user.findMany()

    // Remove o campo password antes de enviar os dados
    const safeUsers = result.map(({ password, ...user }) => user)

    res.send(safeUsers)
  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    })

    if(result) {
      const { password, ...safeUser } = result
      res.send(safeUser)
    }
    else {
      res.status(404).end()
    }
  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}
controller.update = async function(req, res) {
  try {
    const data = { ...req.body }

    // Se houver alteração de senha, gerar um novo hash
    if(data.password) {
      data.password = await argon2.hash(data.password)
    }

    const result = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data
    })

    // HTTP 204: No Content
    if(result) res.status(204).end()
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)

    if(error?.code === 'P2025') {
      res.status(404).end()
    }
    else {
      res.status(500).end()
    }
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    })

    // Encontrou e excluiu ~> HTTP 204: No Content
    res.status(204).end()
  }
  catch(error) {
    if(error?.code === 'P2025') {
      // Não encontrou e não excluiu ~> HTTP 404: Not Found
      res.status(404).end()
    }
    else {
      // Outros tipos de erro
      console.error(error)

      // HTTP 500: Internal Server Error
      res.status(500).end()
    }
  }
}

controller.login = async function(req, res) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: req.body?.username },
          { email: req.body?.email }
        ]
      }
    })

    // Usuário não encontrado
    if(!user) return res.status(401).end()

    // Verifica a senha informada contra o hash armazenado
    const passwordIsValid = await argon2.verify(
      user.password,
      req.body?.password ?? ''
    )

    // Senha incorreta
    if(!passwordIsValid) return res.status(401).end()

    // Seleciona somente os dados necessários para o token
    const safeUser = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin
    }

    const token = jwt.sign(
      safeUser,
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    )

    // Formamos o cookie para enviar ao front-end
    res.cookie(process.env.AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    })

    // Retorna o token e os dados do usuário sem a senha
  res.send({ user: safeUser })  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.me = function(req, res) {
  // Retorna as informações do usuário autenticado
  // HTTP 200: OK (implícito)
  res.send(req?.authUser)
}

export default controller