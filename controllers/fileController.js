//@desc Upload File
//@route POST /api/files/upload
//@access Private
const File = require("../models/File");

const uploadFile = async (req,res) =>{
    try{
        console.log("FILE:", req.file); // keep this for now

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

module.exports = {uploadFile};
