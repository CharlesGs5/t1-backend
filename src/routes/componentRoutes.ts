import { Router } from 'express';
import {exportComponentData, getStats, trackComponent} from '../controllers/componentController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.post('/track', trackComponent);             // público
router.get('/stats', getStats);                   // público
router.get('/export', verifyToken, exportComponentData); // protegido

export default router;
