import {Router} from 'express';
import createUser from '../controller/UserController.js';
import createTransaction from '../controller/PaymentController.js';
const router = Router();

router.post('/users', createUser);

router.post('/transactions',createTransaction)
export default router;