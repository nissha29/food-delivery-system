import User from '../models/user.model.js';
import generateJWT from '../utils/generateJWT.util.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';

export default async function(req, res){
    try {
        const requiredBody = z.object({
            username: z.string().min(3).max(100),
            password: z.string()
                .min(8, { message: "Password must be at least 8 characters long" })
                .max(50, { message: "Password must be at most 50 characters long" })
        });

        const isParsedWithSuccess = requiredBody.safeParse(req.body);
        if (!isParsedWithSuccess.success) {
            return res.status(400).json({
                success: false,
                message: `invalid input format, ${isParsedWithSuccess.error}`
            })
        }

        const { username, password } = req.body;
        if(!username || !password) {
            return res.status(400).json({
                success: false,
                message: "username and password are required"
            })
        }
        if(await User.findOne({ username })) {
            return res.status(400).json({
                success: false,
                message: "username already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            role: req.body.role,
        })
        const token = generateJWT(user._id, "15d");

        const cookieOptions = {
            maxAge: 15 * 24 * 60 * 60 * 1000, 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            ...(process.env.NODE_ENV === 'production' && { domain: process.env.DOMAIN }),
            path: '/',
        };        

        return res
        .cookie('token', token, cookieOptions)
        .status(201)
        .json({
            success: true,
            message: 'You are registered successfully',
            token: token,
            user
        })
    } catch (err) {
        return res.status(500).json({ 
                message: 'Registration failed, server error in registeration EP', 
                error: err.message 
            });
    }
  }