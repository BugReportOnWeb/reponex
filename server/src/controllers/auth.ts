import { Request, Response } from "express";
import { SafeUser, User } from "../types/user";
import { createToken, generateUUID } from "../lib/utils";
import { createTable } from "../db/queries";
import db from "../db/pool";

// POST /api/users/login -d { username, password }
const loginUser = async (req: Request, res: Response) => {
    let { username, password } = req.body;

    if (username) username = username.trim();
    if (password) password = password.trim();

    if (!username || !password) {
        const fields = 'username, password';
        const error = `Invalid data: Provide all details (${fields})`;
        return res.status(400).send({ error });
    }

    try {
        await createTable();
        const result = await db.query(`
            SELECT * FROM users 
            WHERE username = $1
        `, [username]);

        if (result.rows.length < 1) {
            const error = 'User doesn\'t exist';
            return res.status(404).send({ error });
        }

        const user: User = result.rows[0];

        if (user.password !== password) {
            const error = 'Wrong password';
            return res.status(401).send({ error });
        }

        const token = createToken(user.username);
        const response = { username: user.username, token }

        res.send(response);
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
        const fields = 'username, password, confirmPassword';
        const error = `Invalid data: Provide all details (${fields})`;
        return res.status(400).send({ error });
    }

    if (password !== confirmPassword) {
        const error = 'Passwords do not match.';
        return res.status(400).send({ error });
    }

    try {
        await createTable();
        const result = await db.query(`
            SELECT * FROM users 
            WHERE username = $1
        `, [username]);

        if (result.rows.length > 0) {
            const error = 'User already registered';
            return res.status(409).send({ error });
        }

        const userDetails: User = { id: generateUUID(), username, password }
        await db.query(`
            INSERT INTO users 
            VALUES ($1, $2, $3)
        `, [userDetails.id, userDetails.username, userDetails.password]);

        const userResult = await db.query(`
            SELECT id, username
            FROM users 
            WHERE username = $1
        `, [userDetails.username]);
        const newUser: SafeUser = userResult.rows[0];

        const token = createToken(newUser.username);
        const response = { username: newUser.username, token }

        res.send(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }
}

export { loginUser, registerUser };
