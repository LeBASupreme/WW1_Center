import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import productRoutes from './src/routes/product.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import volunteersRoutes from './src/routes/volunteers.routes.js';
import specialEventRoutes from './src/routes/special_event.routes.js';
import battlefieldRoutes from './src/routes/battlefield_tips.routes.js';
import newsRoutes from './src/routes/news.routes.js';


dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteersRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/special-events', specialEventRoutes);
app.use('/api/battlefields', battlefieldRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

