import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

import { logging } from './middlewares/logging';
import { userRoutes } from './routes/user';
import { Server } from 'socket.io';

const SERVER_PORT = process.env.SERVER_PORT ?? 3000;
const CLIENT_PORT = process.env.CLIENT_PORT ?? 5173;
const app = express();

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://localhost:${CLIENT_PORT}`
    }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logging);

// Routes
app.use('/api/users', userRoutes);

io.on('connection', socket => {
    console.log(socket.id, 'connected');

    socket.on('message', messageData => {
        io.emit('message', messageData);
    })

    socket.on('disconnect', () => {
        console.log(socket.id, 'left');
    })
})

server.listen(+SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`);
})
