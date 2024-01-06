import { Request, Response } from "express"

// For debugging purpose
// GET /api/users
const getAllUsers = (_req: Request, res: Response) => {
    res.send({ message: 'Get all users' });
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
