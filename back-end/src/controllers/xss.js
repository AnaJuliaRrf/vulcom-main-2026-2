import prisma from '../database/client.js'

const controller = {}

controller.retrieveComments = async function(req, res) {
  try {
    const comments = await prisma.xssComment.findMany({
      orderBy: { id: 'asc' }
    })

    res.send(comments)
  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.createComment = async function(req, res) {
  try {
    // OWASP Top 10:2025 A05 - Injeção (XSS armazenado):
    // o conteúdo é persistido sem sanitização e depois interpretado como HTML em XssChallenge.jsx.
    await prisma.xssComment.create({
      data: { content: req.body?.content ?? '' }
    })

    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}

export default controller
