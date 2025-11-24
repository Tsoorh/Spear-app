import express from 'express';

const router = express.Router()

router.get('/',getUsers)
router.get('/:userId',getById)
router.post('/',saveUser)
router.put('/:userId',saveUser)
router.remove('/:userId',removeUser)


export const userRouter = router