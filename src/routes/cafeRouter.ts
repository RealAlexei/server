import { Router } from 'express';
import {getAll, create, getByPrice, getById, updateById, deleteById} from '../controllers/cafeController.js';

const router = Router();

router.get('/dishes', getAll);

router.get('/dishes/by-price', getByPrice);

router.get('/dishes/:id', getById);

router.post('/dishes/create', create);

router.put('/dishes/:id', updateById);

router.delete('/dishes/:id', deleteById);

export default router;