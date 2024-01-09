import { Request, Response } from "express"
import { createTable } from "../db/queries";
import db from "../db/pool";
import { SafeUser } from "../types/user";

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

const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await createTable();
        const result = await db.query(`
            SELECT id, username
            FROM users
            WHERE id = $1
        `, [id]);

        if (result.rows.length < 1) {
            const error = 'User doesn\'t exist';
            return res.status(404).send({ error });
        }

        const user: SafeUser = result.rows[0];
        res.send(user);
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
    getSingleUser,
    truncateUsers
};
