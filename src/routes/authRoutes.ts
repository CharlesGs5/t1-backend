import { Router } from 'express';
import {getUsers, login, register} from '../controllers/authController';
import {verifyToken} from "../middleware/verifyToken";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', getUsers);

export default router;
