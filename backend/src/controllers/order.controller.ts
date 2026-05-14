import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {

  static async getAll(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAll();
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const order = await OrderService.getById(id);
      res.json(order);
    } catch (err: any) {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { status } = req.body;

      const order = await OrderService.updateStatus(id, status);
      res.json(order);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
