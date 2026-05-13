import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

const service = new CategoryService();

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    try {
      const categories = await service.getAll();
      res.json(categories);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { name, slug } = req.body;

      await service.create(name, slug);

      res.json({ message: 'Categoría creada correctamente' });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
