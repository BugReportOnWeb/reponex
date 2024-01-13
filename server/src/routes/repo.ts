import { Router } from "express";
import {
  deleteRepo,
  createRepo,
  updateRepo
} from "../controllers/Repo";

const router = Router();

// Delete Repo 
router.delete('/delete/:owner/:repo', deleteRepo);
// Create Repo
router.post('/create', createRepo);
// Update Repo 
router.patch('/update/:owner/:repo', updateRepo);

export { router as repoRoutes };
