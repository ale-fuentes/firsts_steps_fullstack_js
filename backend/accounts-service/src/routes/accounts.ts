import { Router, Request, Response } from 'express';
import accountController from '../controllers/accounts';

const router = Router();
router.get('/accounts/', accountController.getAccounts);
router.get('/accounts/:id', accountController.getAccount);
router.post('/accounts/', accountController.addAccount);

export default router;