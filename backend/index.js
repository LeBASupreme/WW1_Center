import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './src/routes/product.routes.js';
import stripeRoutes from './src/routes/stripe.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import volunteersRoutes from './src/routes/volunteers.routes.js';
import specialEventRoutes from './src/routes/special_event.routes.js';
import battlefieldRoutes from './src/routes/battlefield_tips.routes.js';
import newsRoutes from './src/routes/news.routes.js';
import uploadRoutes from './src/routes/upload.routes.js';
import ordersRoutes from './src/routes/orders.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


dotenv.config();

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], credentials: true }));
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteersRoutes);

app.use('/api/stripe', stripeRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/special-events', specialEventRoutes);
app.use('/api/battlefields', battlefieldRoutes);
app.use('/api/orders', ordersRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

