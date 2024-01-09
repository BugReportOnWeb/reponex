import { Router } from "express";
import { getAllUsers,  getSingleUser,  truncateUsers } from "../controllers/user";
import { loginUser, registerUser } from "../controllers/auth";

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getSingleUser);
router.delete('/', truncateUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);

export { router as userRoutes };
