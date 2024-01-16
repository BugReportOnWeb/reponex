import { Router } from "express";
import {
    deleteRepo,
    createRepo,
    updateRepo,
    createBranch,
    mergePullReq,
} from "../controllers/repo";
import { issueRouter } from "./issue";

const router = Router();

router.delete('/delete/:owner/:repo', deleteRepo);
router.post('/create', createRepo);
router.patch('/update/:owner/:repo', updateRepo);

// Issue related routes;
router.use('/issues', issueRouter);

// Extras TODO: Do something about it
router.post('/branch/create/:owner/:repo', createBranch);
router.put('/merge/:owner/:repo/:pull_number', mergePullReq);

export { router as repoRoutes };
