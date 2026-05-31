import { Router } from 'express'
import { requireAuth, requireSuperAdmin } from '../middlewares/auth.middleware.js'
import {
    getAllVolunteers,
    createVolunteer,
    updateVolunteer,
    updateVolunteerStatus,
    deleteVolunteer,
} from '../controllers/volunteers.controller.js'

const router = Router()

router.get('/',       requireAuth, requireSuperAdmin, getAllVolunteers)
router.post('/',      createVolunteer)
router.put('/:id',    requireAuth, requireSuperAdmin, updateVolunteer)
router.patch('/:id',  requireAuth, requireSuperAdmin, updateVolunteerStatus)
router.delete('/:id', requireAuth, requireSuperAdmin, deleteVolunteer)

export default router
