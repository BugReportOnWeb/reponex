import { Request, Response } from "express"
import db from "../db/pool";
import { createTable } from "../db/queries";
import { SafeUser, User } from "../types/user";
import { generateUUID } from "../lib/util";

// FOR DEBUGGING PURPOSE - REMOVE LATER
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

// POST /api/users/login -d { username, password }
const loginUser = async (req: Request, res: Response) => {
    let { username, password } = req.body;

    if (username) username = username.trim();
    if (password) password = password.trim();

    if (!username || !password) {
        const error = 'Invalid data: Provide both username and password';
        return res.status(400).send({ error });
    }

    try {
        await createTable();
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length < 1) {
            const error = 'User doesn\'t exist';
            return res.status(404).send({ error });
        }

        const user: User = result.rows[0];

        if (user.password !== password) {
            const error = 'Wrong password';
            return res.status(401).send({ error });
        }

        const safeUser: SafeUser = { id: user.id, username: user.username };
        res.send(safeUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }
}

// POST /api/users/register -d { username, password, confirmPassword }
const registerUser = async (req: Request, res: Response) => {
    let { username, password, confirmPassword } = req.body

    if (username) username = username.trim();
    if (password) password = password.trim();
    if (confirmPassword) confirmPassword = confirmPassword.trim();

    if (!username || !password || !confirmPassword) {
        const error = 'Invalid data: Provide all username and password, and confirmPassword fields.';
        return res.status(400).send({ error });
    }

    if (password !== confirmPassword) {
        const error = 'Passwords do not match.';
        return res.status(400).send({ error });
    }

    try {
        await createTable();
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const error = 'User already registered';
            // Check on status here
            return res.status(409).send({ error });
        }

        const userDetails: User = { id: generateUUID(), username, password }
        await db.query('INSERT INTO users VALUES ($1, $2, $3)', [userDetails.id, userDetails.username, userDetails.password]);
        const userResult = await db.query('SELECT id, username FROM users WHERE username = $1', [userDetails.username]);
        const newUser: SafeUser = userResult.rows[0];

        res.send(newUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }

}

export {
    getAllUsers,
    loginUser,
    registerUser,
    truncateUsers
};
