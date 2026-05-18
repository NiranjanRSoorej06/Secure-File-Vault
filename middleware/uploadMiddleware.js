const multer = require("multer");
const path = require("path");

//1. storage config
// Use memory storage so files are available as buffers for remote upload
const storage = multer.memoryStorage();

//2. Allowed file types
const allowedTypes =[
    "image/jpeg",
    "image/png",
    "application/pdf"
];
const allowedExt = [
    ".jpg",".jpeg",".png",".pdf"
];

//3. file filter
const fileFilter =(req,file,cb) =>{
    const ext=path.extname(file.originalname).toLowerCase();

    if(allowedTypes.includes(file.mimetype) && allowedExt.includes(ext)){
        cb(null,true);
    }else{
        cb(new Error("Only JPG, PNG, PDF allowed"),false);
    }
};

//4. multer config
const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 5*1024*1024   // 5MB
    }
 });

module.exports = upload;