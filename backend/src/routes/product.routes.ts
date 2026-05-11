import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { isAdmin } from '../middleware/admin';

const router = Router();

// Público
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

// Admin
router.post('/', isAdmin, ProductController.create);
router.put('/:id', isAdmin, ProductController.update);
router.delete('/:id', isAdmin, ProductController.softDelete);

export default router;
