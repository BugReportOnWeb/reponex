import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Payload } from "../types/auth";
import db from "../db/pool";


const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { authorization } = req.headers;

    if (!authorization) {
        const error = 'Auth token not provided';
        return res.status(400).send({ error });
    }

    if (!JWT_SECRET) {
        const error = "Please provide JWT secret in config (.env) files";
        return res.status(500).send({ error });
    }

    const token = authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as Payload;

        const user = await db.query(`
            SELECT * FROM users
            WHERE username = $1
        `, [payload.username])

        if (!user) {
            const error = 'User doesn\'t exist';
            return res.status(404).send({ error });
        }

        req.username = payload.username;
        next();
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ error: error.message });
        }
    }

}

export default authCheck;
