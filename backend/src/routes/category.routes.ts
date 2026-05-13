import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { isAdmin } from '../middleware/admin';

const router = Router();

router.get('/', CategoryController.getAll);
router.post('/', isAdmin, CategoryController.create);

export default router;
