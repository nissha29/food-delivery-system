import express from 'express';
import register from '../controllers/register.controller.js';
import login from '../controllers/login.controller.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);

export default authRouter;

