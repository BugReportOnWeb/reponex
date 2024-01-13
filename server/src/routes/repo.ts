import { Router } from "express";
import {
  deleteRepo,
  createRepo,
} from "../controllers/Repo";

const router = Router();

// Delete Repo 
router.delete('/delete/:owner/:repo', deleteRepo);
// Create REpo
router.post('/create', createRepo);

export { router as repoRoutes };
