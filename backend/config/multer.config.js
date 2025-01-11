import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        const dest = 'uploads/images/';
        cb(null,dest);
    },
    filename: function(req,file,cb){
        const suffix = `${Date.now()}-${Math.round(Math.random()*1E9)}`;
        cb(null, suffix + path.extname(file.originalname));
    }
})

function fileFilter(req,file,cb){
    if(file.fieldname === 'image'){
        return file.mimetype.startsWith('image/') 
            ? cb(null, true) 
            : cb(new Error('Invalid image file type'), false)
    }
    else{
        return cb(new Error('Invalid file type'), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 20 * 1024 * 1024}
})

export default upload;
