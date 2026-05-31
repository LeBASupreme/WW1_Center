import { Router } from 'express';
import { getOrders } from '../controllers/orders.controller.js';
import { requireAuth, requireSuperAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', requireAuth, requireSuperAdmin, getOrders);

export default router;