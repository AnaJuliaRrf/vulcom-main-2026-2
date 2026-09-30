import { Router } from 'express'
import controller from '../controllers/customers.js'

const router = Router()

// OWASP Top 10:2025 A01 - Falha no Controle de Acesso:
// dados pessoais e operações sobre clientes ficam acessíveis sem autenticação ou autorização.
router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router