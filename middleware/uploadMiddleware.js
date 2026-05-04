const multer = require("multer");

//storage config
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"uploads/");
    },
    filename: (req,file,cb) =>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});

//Allowed file types
const allowedTypes =[
    "image/jpeg",
    "image/png",
    "application/pdf"
];

//file filter
const fileFilter =(req,file,cb) =>{
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only JPG, PNG, PDF allowed"),false);
    }
};

//multer config
const upload = multer({ 
    storage,
    fileFilter,
    limits: {
        fileSize: 5*1024*1024   // 5MB
    }
 });

module.exports = upload;