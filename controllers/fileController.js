//@desc Upload File
//@route POST /api/files/upload
//@access Private

const uploadFile = (req,res) =>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"});
    }

    res.status(200).json({
        message:"File uploaded successfully",
        file:req.file.filename
    });
};

module.exports = {uploadFile};
