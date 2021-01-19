import { Router } from 'express'
import middlewareCommons from 'ms-commons/api/routes/middlewares';
import controller from '../controllers/contacts';

const router = Router();

router.get('/contacts/', middlewareCommons.validateAuth, controller.getContacts);

export default router;