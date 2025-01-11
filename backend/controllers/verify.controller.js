import User from '../models/user.model.js'
export default async function verify(req,res){
    try{
        const user = await User.findById(req.userId)
        return res.status(200).json({
            user
        })
    }catch(err){
        res.status(500).json({
            message: `Error in myInfo EP, ${err}`
        })
    }
}