import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  static async getAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getAll();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const product = await ProductService.getById(id);
      res.json(product);
    } catch (err: any) {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const product = await ProductService.create(req.body, req.file);
      res.json(product);
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const product = await ProductService.update(id, req.body, req.file);
      res.json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async softDelete(req: Request, res: Response) {
    try {
      const id = req.params.id;

      console.log("ID RECIBIDO:", id);

      const product = await ProductService.softDelete(id);
      res.json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
