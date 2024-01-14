import { Router } from "express";
import {
  deleteRepo,
  createRepo,
  updateRepo,
  createBranch,
  mergePullReq,
  createIssue,
  lockIssue,
  unLockIssue,
} from "../controllers/Repo";

const router = Router();

router.delete('/delete/:owner/:repo', deleteRepo);
router.post('/create', createRepo);
router.patch('/update/:owner/:repo', updateRepo);
router.post('/branch/create/:owner/:repo', createBranch);
router.put('/merge/:owner/:repo/:pull_number', mergePullReq);
router.post('/issues/create/:owner/:repo', createIssue);
router.put('/issues/lock/:owner/:repo/:issue_number', lockIssue);
router.delete('/issues/unlock/:owner/:repo/:issue_number', unLockIssue);

export { router as repoRoutes };
