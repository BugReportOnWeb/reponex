import { Router } from 'express';
import {
    createIssue,
    lockIssue,
    unLockIssue,
    updateIssue
} from '../controllers/repo';

const router = Router();

router.post('/create/:owner/:repo', createIssue);
router.patch('/update/:owner/:repo/:issue_number', updateIssue);
router.put('/lock/:owner/:repo/:issue_number', lockIssue);
router.delete('/unlock/:owner/:repo/:issue_number', unLockIssue);

export { router as issueRouter };
