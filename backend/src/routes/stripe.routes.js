import { Router } from 'express';
import { createCheckoutSession, createDonation, confirmOrder, handleWebhook } from '../controllers/stripe.controller.js';

const router = Router();

router.post('/checkout', createCheckoutSession);
router.post('/donate', createDonation);
router.post('/confirm', confirmOrder);
router.post('/webhook', handleWebhook);
export default router;
