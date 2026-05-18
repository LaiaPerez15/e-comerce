import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { requireAuth } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';
import multer from 'multer';

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Público
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

// Admin
router.post('/', requireAuth, isAdmin, upload.single('image'), ProductController.create);
router.put('/:id', requireAuth, isAdmin, upload.single('image'), ProductController.update);
router.delete('/:id', requireAuth, isAdmin, ProductController.softDelete);

export default router;
