import { Router } from 'express'
import controller from '../controllers/sqli.js'

const router = Router()

router.post('/login', controller.login)

export default router
