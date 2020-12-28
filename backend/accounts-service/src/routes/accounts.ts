import { Router } from 'express';

import accountController from '../controllers/accounts';
import { validateAccount, validateUpdateAccount, validateLogin } from './middlewares';

const router = Router();
router.get('/accounts/', accountController.getAccounts);
router.get('/accounts/:id', accountController.getAccount);
router.patch('/accounts/:id', validateUpdateAccount, accountController.setAccount);
router.post('/accounts/', validateAccount, accountController.addAccount);
router.post('/accounts/login', validateLogin, accountController.loginAccount);
router.post('/accounts/logout', accountController.logoutAccount);

export default router;