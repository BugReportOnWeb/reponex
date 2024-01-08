import { Request, Response } from "express"
import db from "../db/pool";

// For debugging purpose
// GET /api/users
const getAllUsers = async (_req: Request, res: Response) => {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) PRIMARY KEY,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`);

        const result = await db.query('SELECT id, username FROM users')
        const users = result.rows;
        res.send(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }
}

// POST /api/users/login -d { email, password }
const loginUser = (req: Request, res: Response) => {
    res.send({ message: 'Login user', ...req.body });
}

// POST /api/users/register -d { username, email, password }
const registerUser = (req: Request, res: Response) => {
    res.send({ message: 'Register user', ...req.body });
}

export { getAllUsers, loginUser, registerUser }
