import {Router} from 'express';
import createUser from '../controller/UserController.js';
import { createTransaction, readTransaction, readAllTransaction, updateTransaction , deleteTransaction, acceptTransaction, rejectTransaction, refundTransaction} from '../controller/PaymentController.js';
import authorizeMiddleware from '../middleware/authorizeMiddleware.js';
const router = Router();

router.post('/users', createUser);

router.post('/transactions', createTransaction)
router.get('/transactions', readAllTransaction)
router.get('/transactions/:transactionId',authorizeMiddleware, readTransaction)
router.put('/transactions/:transactionId', authorizeMiddleware,updateTransaction)
router.delete('/transactions/:transactionId',authorizeMiddleware, deleteTransaction)

router.put('/transactions/:transactionId/accept', authorizeMiddleware,acceptTransaction)
router.put('/transactions/:transactionId/reject', authorizeMiddleware,rejectTransaction)
router.put('/transactions/:transactionId/refund', authorizeMiddleware,refundTransaction)
export default router;