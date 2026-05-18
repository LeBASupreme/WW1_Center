import {Router} from 'express'
import {requireAuth, requireSuperAdmin} from '../middlewares/auth.middleware.js'
import {
    getAllTrips,
    createTrip,
    updateTrip,
    deleteTrip,
} from '../controllers/battlefield_trips.controller.js'

const router = Router()

router.get('/',       getAllTrips)
router.post('/',      requireAuth, requireSuperAdmin, createTrip)
router.put('/:id',    requireAuth, requireSuperAdmin, updateTrip)
router.delete('/:id', requireAuth, requireSuperAdmin, deleteTrip)

export default router

