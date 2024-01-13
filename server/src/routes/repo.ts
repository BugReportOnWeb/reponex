import { Router } from "express";
import {
    deleteRepo,
    createRepo,
    updateRepo
} from "../controllers/Repo";

const router = Router();

router.delete('/delete/:owner/:repo', deleteRepo);
router.post('/create', createRepo);
router.patch('/update/:owner/:repo', updateRepo);

export { router as repoRoutes };
