import { Request, Response, NextFunction } from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  console.log("USER:", user);

  if (!user || user.app_metadata.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }

  next();
}
