import {Router} from 'express'
import {requireAuth, requireSuperAdmin} from '../middlewares/auth.middleware.js'
import {
    getAllNews,
    createNews,
    updateNews,
    deleteNews,
} from '../controllers/news.controller.js'

const router = Router()

router.get('/',       getAllNews)
router.post('/',      requireAuth, requireSuperAdmin, createNews)
router.put('/:id',    requireAuth, requireSuperAdmin, updateNews)
router.delete('/:id', requireAuth, requireSuperAdmin, deleteNews)

export default router


