const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadFile, getUserFiles ,downloadFile,deleteFile,renameFile } = require("../controllers/fileController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

//protected upload route
router.post(
    "/upload",
    protect,
    (req,res,next)=>{
        upload.single("file")(req,res,function(err){
            if(err instanceof multer.MulterError){
                return res.status(400).json({message:err.message});
            }else if(err){
                return res.status(400).json({message:err.message});
            }
            next();
        });
    },
    uploadFile
);

//GET all files of logged-in user
router.get("/",protect,getUserFiles);

//Download Route
router.get("/:id",protect,downloadFile);

//Delete Route
router.delete("/:id",protect,deleteFile);

//Rename Route
router.put("/:id/rename",protect,renameFile);

module.exports = router;
