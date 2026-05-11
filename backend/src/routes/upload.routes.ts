import { Router } from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary';
import { isAdmin } from '../middleware/admin';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', isAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se envió ninguna imagen' });
    }

    const result = await cloudinary.uploader.upload_stream(
      { folder: 'sneakers-store' },
      (error, uploadResult) => {
        if (error) return res.status(500).json({ error: error.message });
        return res.json({ url: uploadResult?.secure_url });
      }
    );

    // Enviar el buffer a Cloudinary
    result.end(req.file.buffer);

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
