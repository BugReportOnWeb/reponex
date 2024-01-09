import { Request, Response } from "express"
import { createTable } from "../db/queries";
import db from "../db/pool";

// FOR DEBUGGING PURPOSE - REMOVE LATER
// GET /api/users
const getAllUsers = async (_req: Request, res: Response) => {
    try {
        await createTable();
        const result = await db.query(`
            SELECT id, username 
            FROM users
        `);

        const users = result.rows;
        res.send(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }
}

// FOR DEBUGGING PURPOSE - REMOVE LATER
// DELETE /api/users
const truncateUsers = async (_req: Request, res: Response) => {
    try {
        await db.query('TRUNCATE TABLE users');
        res.send({ message: 'Table users truncated' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error });
        }
    }
}

export {
    getAllUsers,
    truncateUsers
};
