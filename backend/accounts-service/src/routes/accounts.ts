import { Router } from 'express';

import accountController from '../controllers/accounts';
import { validateAccountSchema, validateUpdateAccountSchema, validateLoginSchema, validateAuth } from './middlewares';

//example ussing function from __commons__
import calc from 'ms-commons/calc';


const router = Router();
router.get('/accounts/', validateAuth, accountController.getAccounts);
router.get('/accounts/:id', validateAuth, accountController.getAccount);
router.patch('/accounts/:id', validateAuth, validateUpdateAccountSchema, accountController.setAccount);
router.post('/accounts/', validateAccountSchema, accountController.addAccount);
router.post('/accounts/login', validateLoginSchema, accountController.loginAccount);
router.post('/accounts/logout', accountController.logoutAccount);

//example ussing calc
router.get('/plusnum/:val1/:val2', (req, res, next) => {
    const v1 = parseInt(`${req.params.val1}`);
    const v2 = parseInt(`${req.params.val2}`);
    const result = calc(v1, v2);
    res.json({ result })
})

export default router;