//@desc Upload File
//@route POST /api/files/upload
//@access Private
const File = require("../models/File");
const mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadBufferToCloudinary(buffer, folder = 'secure-file-vault'){
    return new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream({ folder }, (error,result)=>{
            if(error) reject(error);
            else resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
}

const uploadFile = async (req,res) =>{
    try{
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"});
        }

        // upload to Cloudinary from buffer
        const result = await uploadBufferToCloudinary(req.file.buffer);

        const newFile = await File.create({
            user:req.user._id,
            filename: result.public_id,
            originalName:req.file.originalname,
            fileSize:req.file.size,
            fileUrl: result.secure_url,
            publicId: result.public_id,
        });

        res.status(200).json({
            message:"File uploaded successfully",
            file:newFile,
            fileUrl: newFile.fileUrl
        });
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

//@desc Get logged-in user's files
//@route GET /api/files
//@access Private
const getUserFiles = async (req, res) => {
    try {
        const requestedPage = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";

        const query = {
            user: req.user._id,
            originalName: { $regex: search, $options: "i" },
        };

        const total = await File.countDocuments(query);
        const pages = Math.max(1, Math.ceil(total / limit));
        const page = Math.min(Math.max(requestedPage, 1), pages);
        const skip = (page - 1) * limit;

        const files = await File.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const updatedFiles = files.map((file) => ({
            ...file.toObject(),
            fileUrl: file.fileUrl || `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        }));

        res.status(200).json({
            total,
            page,
            pages,
            files: updatedFiles,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//@desc Download file
//@route GET /api/files/:id
//@access Private
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

        // Redirect client to the stored file URL (Cloudinary)
        if(file.fileUrl){
            return res.redirect(file.fileUrl);
        }

        return res.status(404).json({message:"File URL not available"});
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
        
        // If file stored in Cloudinary, remove it
        if(file.publicId || file.filename){
            const publicId = file.publicId || file.filename;
            try{
                await cloudinary.uploader.destroy(publicId);
            }catch(err){
                console.warn("Failed to remove asset from Cloudinary", err.message);
            }
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
            return res.status(400).json({message:"New name is required"});
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

        res.status(200).json({
            message:"File renamed Successfully",
            file
        });
    }catch(error){
        return res.status(500).json({message:error.message});
    }
};

module.exports = { uploadFile, getUserFiles, downloadFile, deleteFile, renameFile };
