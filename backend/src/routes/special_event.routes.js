import { Router } from 'express'
import { requireAuth, requireSuperAdmin } from '../middlewares/auth.middleware.js'
import {
    getAllSpecialEvents,
    createSpecialEvent,
    updateSpecialEvent,
    deleteSpecialEvent,
} from '../controllers/special_event.controller.js'

const router = Router()

router.get('/',       getAllSpecialEvents)
router.post('/',      requireAuth, requireSuperAdmin, createSpecialEvent)
router.put('/:id',    requireAuth, requireSuperAdmin, updateSpecialEvent)
router.delete('/:id', requireAuth, requireSuperAdmin, deleteSpecialEvent)

export default router
