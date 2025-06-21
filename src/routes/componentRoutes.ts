import { Router } from 'express';
import {exportComponentData, getStats, trackComponent} from '../controllers/componentController';
import { verifyToken } from '../middleware/verifyToken';

const router = Router();

router.post('/track', trackComponent);
router.get('/stats', getStats);
router.get('/export', verifyToken, exportComponentData);

export default router;
