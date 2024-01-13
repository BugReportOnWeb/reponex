import { Router } from "express";
import { deleteRepo } from "../controllers/Repo";

const router = Router();

// Delete Repo 
router.delete('/delete/:owner/:repo', deleteRepo);

export { router as repoRoutes };
