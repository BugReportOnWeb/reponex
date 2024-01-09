import { Request, Response } from "express"
import db from "../db/pool";
import { createTable } from "../db/queries";

// For debugging purpose
// GET /api/users
const getAllUsers = async (_req: Request, res: Response) => {
    try {
        await createTable();
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
