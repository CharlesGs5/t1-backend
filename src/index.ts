import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import componentRoutes from "./routes/componentRoutes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/components', componentRoutes);

// Rutas
app.get('/api/health', (_, res) => {
    res.status(200).json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Conectar a MongoDB y arrancar servidor
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
});
