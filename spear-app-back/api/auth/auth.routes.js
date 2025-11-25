import express from 'express'
import { login,signup,logout } from './auth.constroller.js';
const route = express.Router();

route.post('/login',login)
route.post('/register',signup)
route.post('/logout',logout)


export const authRouter = route;