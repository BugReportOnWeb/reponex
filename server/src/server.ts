import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { logging } from './middlewares/logging';
import { userRoutes } from './routes/user';

const PORT = process.env.PORT ?? 3000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logging);

// Routes
app.use('/api/users', userRoutes);

app.listen(+PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
