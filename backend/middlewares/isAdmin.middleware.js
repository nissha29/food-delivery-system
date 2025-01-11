import User from '../models/user.model.js'
export default async function isAdmin(req,res,next){
    try{
        const user = await User.findById(req.userId);
        req.role = user.role;
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: `Error in isAdmin middleware, ${err}`
        })
    }
}