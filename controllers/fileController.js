//@desc Upload File
//@route POST /api/files/upload
//@access Private
const File = require("../models/File");

const uploadFile = async (req,res) =>{
    try{
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"});
        }
    
        const newFile = await File.create({
            user:req.user._id,
            filename: req.file.filename,
            originalName:req.file.originalname,
            fileSize:req.file.size
        });

        res.status(200).json({
            message:"File uploaded successfully",
            file:newFile
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}; 

//@desc Get logged-in user's files
//@route GET /api/files
//@access Private
const getUserFiles = async (req,res) =>{
    try{
        const files = await File.find({ user:req.user._id});
        res.status(200).json(files);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

module.exports = {uploadFile,getUserFiles};
