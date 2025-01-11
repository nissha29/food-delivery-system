import express from 'express';
import register from '../controllers/register.controller.js';
import login from '../controllers/login.controller.js';
import auth from '../middlewares/auth.middleware.js';
import verify from '../controllers/verify.controller.js'

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/verify', auth, verify);

export default authRouter;

