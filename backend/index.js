import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import menuRouter from './routes/menu.route.js';
import orderRouter from './routes/order.route.js';
import connectDB from './db/connect.db.js';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://foodie-express-0nqa.onrender.com/'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('./uploads'));

app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', orderRouter);

async function ensureDirectoryExistence() {
    const directories = ["uploads", "uploads/images"];
    for (const dir of directories) {
        try {
            await fs.access(dir); 
        } catch (err) {
            try {
                await fs.mkdir(dir, { recursive: true });
            } catch (mkdirErr) {
                console.error(`Error creating directory: ${dir}`, mkdirErr);
                throw mkdirErr; 
            }
        }
    }
    console.log(`Directories are ready`);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, async()=>{
    await connectDB();
    await ensureDirectoryExistence();
    console.log(`Server started at http://localhost:${PORT}`)
   }
)

