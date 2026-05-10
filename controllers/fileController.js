//@desc Upload File
//@route POST /api/files/upload
//@access Private
const File = require("../models/File");
const mongoose=require("mongoose");

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
            file:newFile,
            fileUrl:`${req.protocol}://${req.get("host")}/uploads/${newFile.filename}`
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
        //query params
        const page = parseInt(req.query.page)||1;
        const limit = parseInt(req.query.limit)||5;
        const search = req.query.search||"";

        const skip = (page - 1)*limit;

        //search filter
        const query = {
            user: req.user._id,
            originalName: { $regex:search, $options:"i"}
        };

        //fetch files
        const files = await File.find(query)
            .sort({ createdAt: -1}) //newly created first
            .skip(skip)
            .limit(limit);
        const updatedFiles = files.map((file) => ({
            ...file.toObject(),
            fileUrl:
                `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        }));

        //total count
        const total = await File.countDocuments(query);

        //response
        res.status(200).json({
            total,
            page,
            pages: Math.ceil(total/limit),
            files:updatedFiles
        });

    }catch(error){
        res.status(500).json({message:error.message});
    }
};

//@desc Download file
//@route GET /api/files/:id
//@access Private
const path = require("path");
const fs = require("fs");

const downloadFile = async (req,res)=>{
    try{
        //1. Validate ObjectId
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:"Invalid file ID"});
        }

        //2. Find file in DB
        const file = await File.findById(req.params.id);

        if(!file){
            return res.status(404).json({message:"File not found"});
        }

        //3. Ensure user owns file
        if(file.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({message:"Not authorized"});
        }

        //4. Build safe file path
        const filePath = path.join(__dirname,"..","uploads",file.filename);

        //5. Check file exists
        if(!fs.existsSync(filePath)){
            return res.status(404).json({message:"File missing on server"});
        }

        //6. Send file securely
        res.download(filePath,file.originalName);
    }catch(error){
        return res.status(500).json({message:error.message});
    }
};


//@desc Delete file
//@route DELETE /api/files/:id
//@access Private
const deleteFile = async (req,res)=>{
    try{
        //1. Validate ObjectID
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:"Invalid file ID"});
        }

        //2. Find file
        const file = await File.findById(req.params.id);

        //if file not found
        if(!file){
            return res.status(404).json({message:"File not Found"});
        }

        //3. Ownership check
        if(file.user.toString() != req.user._id.toString()){
            return res.status(401).json({message:"Not authorized"});
        }
        
        //4. Builf file path
        const filePath = path.join(__dirname,"../uploads",file.filename);

        //5. Delete file from disk(safe)
        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
        }else{
            console.warn("File missing on disk: ",filePath);
        }

        //6. Delete from DB
        await file.deleteOne();

        //7. Response
        res.status(200).json({message:"File deleted successfully"});    
    }catch(error){
        return res.status(500).json({message:error.message});
    }
};

//@desc Rename File (update originalName)
//@route PUT /api/files/:id/rename
//@access Private
const renameFile = async (req,res)=>{
    try{
        const {newName}=req.body;

        //1. Validate id
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({message:"Invalid file ID"});
        }

        //2. Validate input
        if(!newName || !newName.trim()){
            return res.status(400).json({meassage:"New name is required"});
        }

        //Bonus: Prevent path tricks / weird chars
        const safeName = newName.replace(/[\/\\?%*:|"<>]/g,"").trim();

        //3. Find file
        const file = await File.findById(req.params.id);
        if(!file){
            return res.status(404).json({message:"File not found"});
        }

        //4. Ownership check
        if(file.user.toString()!== req.user._id.toString()){
            return res.status(401).json({message:"Not authorized"});
        }

        //5. Update
        file.originalName= safeName;
        await file.save();

        //6. Respond (include URL)
        const fileUrl = `${req.protocol}://${req.get("host")}/api/files/${file._id}`;

        res.status(200).json({
            message:"File renamed Successfully",
            file:{
                ...file._doc,
                fileUrl
            }
        });
    }catch(error){
        return res.status(500).json({message:error.message});
    }
};

module.exports = { uploadFile,getUserFiles,downloadFile,deleteFile,renameFile };
