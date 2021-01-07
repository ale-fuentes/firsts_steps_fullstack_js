import { Router } from 'express';

import accountController from '../controllers/accounts';
import { validateAccountSchema, validateUpdateAccountSchema, validateLoginSchema, validateAuth } from './middlewares';

const router = Router();
router.get('/accounts/', validateAuth, accountController.getAccounts);
router.get('/accounts/:id', validateAuth, accountController.getAccount);
router.patch('/accounts/:id', validateAuth, validateUpdateAccountSchema, accountController.setAccount);
router.post('/accounts/', validateAccountSchema, accountController.addAccount);
router.post('/accounts/login', validateLoginSchema, accountController.loginAccount);
router.post('/accounts/logout', accountController.logoutAccount);

export default router;