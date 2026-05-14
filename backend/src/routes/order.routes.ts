import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { isAdmin } from '../middleware/admin';

const router = Router();

// Admin
router.get('/', isAdmin, OrderController.getAll);
router.get('/:id', isAdmin, OrderController.getById);
router.put('/:id/status', isAdmin, OrderController.updateStatus);

export default router;
