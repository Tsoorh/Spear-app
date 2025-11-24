import express from 'express';
import { getById, getDives, removeDive, saveDive } from './dive.controller.js';

const router = express.Router()

router.get('/',getDives)
router.get('/:diveId',getById)
router.post('/',saveDive)
router.put('/:diveId',saveDive)
router.delete('/:diveId',removeDive)


export const diveRouter = router