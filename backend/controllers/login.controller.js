import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import generateJWT from '../utils/generateJWT.util.js';
export default async function (req, res) {
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
                message: "Invalid input format"
            });
        }

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "username and password are required"
            });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({
            success: false,
            message: "Incorrect password"
          });
        }
    
        const token = generateJWT(user._id, "15d");

        const cookieOptions = {
            maxAge: 15 * 24 * 60 * 60 * 1000, 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'localhost',
            path: '/',
        };

        return res
        .cookie('token', token, cookieOptions)
        .status(200)
        .json({
          success: true,
          message: "You are logged in successfully",
          token
        });
    } catch (err) {
        res.status(400).json({ 
            message: 'Login failed, server error in login EP', 
            error: err.message 
        });
    }
}