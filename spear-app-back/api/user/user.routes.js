import express from 'express';
import { getById, getUsers, removeUser, saveUser } from './user.controller.js';

const router = express.Router()

router.get('/:userId',getUsers)
router.get('/:userId',getById)
router.post('/',saveUser)
router.put('/:userId',saveUser)
router.delete('/:userId',removeUser)


export const userRouter = router