import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth";
import authCheck from "../middlewares/authCheck";
import {
    getMe,
    getAllUsers,
    getSingleUser,
    truncateUsers
} from "../controllers/user";

const router = Router();

// Auth stuff
router.post('/login', loginUser);
router.post('/register', registerUser);

// Authorized user stuff
router.get('/me', authCheck, getMe);

// Extras testing stuff
router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.delete('/', truncateUsers);

export { router as userRoutes };
