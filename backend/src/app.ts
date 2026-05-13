import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import uploadRoutes from './routes/upload.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend(API) funcionando correctamente');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/upload', uploadRoutes);

export default app;
