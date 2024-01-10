import { Router } from "express";
import { getAllUsers,  getSingleUser,  truncateUsers } from "../controllers/user";
import { loginUser, registerUser } from "../controllers/auth";
import authCheck from "../middlewares/authCheck";

const router = Router();

router.get('/', authCheck,  getAllUsers);
router.get('/:id', authCheck, getSingleUser);
router.delete('/', truncateUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);

export { router as userRoutes };
