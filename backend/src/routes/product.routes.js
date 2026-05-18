import { Router } from 'express';
import { requireAuth, requireSuperAdmin } from '../middlewares/auth.middleware.js';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/',       getAllProducts);
router.post('/',      requireAuth, requireSuperAdmin, createProduct);
router.put('/:id',    requireAuth, requireSuperAdmin, updateProduct);
router.delete('/:id', requireAuth, requireSuperAdmin, deleteProduct);

export default router;
