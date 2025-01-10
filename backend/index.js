import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import menuRouter from './routes/menu.route.js';
import orderRouter from './routes/order.route.js';
import connectDB from './db/connect.db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', orderRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async()=>{
    await connectDB()
    console.log(`Server started at http://localhost:${PORT}`)
   }
)

