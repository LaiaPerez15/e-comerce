import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { isAdmin } from '../middleware/admin';
import multer from 'multer'

const router = Router();
const upload = multer({ dest: 'uploads/' });

// Público
router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getById);

// Admin
router.post('/', isAdmin, upload.single('image'), ProductController.create);
router.put('/:id', isAdmin, upload.single('image'), ProductController.update);
router.delete('/:id', isAdmin, ProductController.softDelete);

export default router;
