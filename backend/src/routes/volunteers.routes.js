import { Router } from 'express'
import { requireAuth, requireSuperAdmin } from '../middlewares/auth.middleware.js'
import {
    getAllVolunteers,
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
} from '../controllers/volunteers.controller.js'

const router = Router()

router.get('/',       getAllVolunteers)
router.post('/',      requireAuth, requireSuperAdmin, createVolunteer)
router.put('/:id',    requireAuth, requireSuperAdmin, updateVolunteer)
router.delete('/:id', requireAuth, requireSuperAdmin, deleteVolunteer)

export default router
