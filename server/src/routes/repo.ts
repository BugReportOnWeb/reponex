import { Router } from "express";
import { deleteRepo } from "../controllers/Repo";

const router = Router();

// Delete Repo 
router.post('/delete/:owner/:repo', deleteRepo);

export { router as repoRoutes };
