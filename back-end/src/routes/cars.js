import { Router } from 'express'
import controller from '../controllers/cars.js'

const router = Router()

// OWASP Top 10:2025 A01 - Falha no Controle de Acesso:
// as rotas não verificam identidade ou permissão para consultar, alterar e excluir veículos.
router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

export default router