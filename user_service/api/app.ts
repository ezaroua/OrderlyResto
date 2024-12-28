import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRouter from './src/routes/userRoutes';
import * as config from './config.json';

// Charger les variables d'environnement
dotenv.config();

const app = express();

// Middleware global
app.use(express.json());
app.use(cors());

// Routes
app.use(userRouter);

// Définir le port à partir des variables d'environnement ou utiliser 5001 par défaut
const port = config.HOST ;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
