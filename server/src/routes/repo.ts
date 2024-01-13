import { Router } from "express";
import {
  deleteRepo,
  createRepo,
  updateRepo,
  createBranch,
  mergePullReq,
} from "../controllers/Repo";

const router = Router();

router.delete('/delete/:owner/:repo', deleteRepo);
router.post('/create', createRepo);
router.patch('/update/:owner/:repo', updateRepo);
router.post('/branch/create/:owner/:repo', createBranch);
router.put('/merge/:owner/:repo/:pull_number', mergePullReq);

export { router as repoRoutes };
