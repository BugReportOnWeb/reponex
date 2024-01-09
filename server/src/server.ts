import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { logging } from './middlewares/logging';
import { userRoutes } from './routes/user';

const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logging);

// Routes
app.use('/api/users', userRoutes);

app.listen(+SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
})
