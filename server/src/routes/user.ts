import { Router } from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/user";

const router = Router();

router.get('/', getAllUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);

export { router as userRoutes };
