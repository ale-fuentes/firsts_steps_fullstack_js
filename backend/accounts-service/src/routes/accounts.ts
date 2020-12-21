import { Router, Request, Response } from 'express';
import Joi from 'joi';
import accountController from '../controllers/accounts';
import { accountSchema, loginSchema } from '../models/accountSchema';

function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any) {
    const { error } = schema.validate(req.body);
    if (error == null) return next();

    const { details } = error;
    const message = details.map(item => item.message).join(', ');

    console.log(message);
    res.status(422).end();
}

function validateAccount(req: Request, res: Response, next: any) {
    return validateSchema(accountSchema, req, res, next);
}
function validateLogin(req: Request, res: Response, next: any) {
    return validateSchema(loginSchema, req, res, next);
}

const router = Router();
router.get('/accounts/', accountController.getAccounts);
router.get('/accounts/:id', accountController.getAccount);
router.patch('/accounts/:id', validateAccount, accountController.setAccount);
router.post('/accounts/', validateAccount, accountController.addAccount);
router.post('/accounts/login', validateLogin, accountController.loginAccount);
router.post('/accounts/logout', accountController.logoutAccount);

export default router;