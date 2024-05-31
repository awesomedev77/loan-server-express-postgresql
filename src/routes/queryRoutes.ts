import express from 'express';
import { addMessage, createQueryAndMessage, getQueriesByApplication } from '../controllers/queryController';

const router = express.Router();


router.get('/:id', getQueriesByApplication);
router.post('/', createQueryAndMessage);
router.post('/add', addMessage)

export default router;