import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async assignDefaultRole(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const data = await AuthService.assignDefaultRole(userId);

      return res.json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
