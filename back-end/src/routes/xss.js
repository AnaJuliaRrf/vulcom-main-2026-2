import { Router } from 'express'
import controller from '../controllers/xss.js'

const router = Router()

router.get('/comments', controller.retrieveComments)
router.post('/comments', controller.createComment)

export default router
