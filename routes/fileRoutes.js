const express = require("express");
const router = express.Router();
const { uploadFile, getUserFiles ,downloadFile,deleteFile } = require("../controllers/fileController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

//protected upload route
router.post("/upload",protect,upload.single("file"),uploadFile);

//GET all files of logged-in user
router.get("/",protect,getUserFiles);

//Download Route
router.get("/:id",protect,downloadFile);

//Delete Route
router.delete("/:id",protect,deleteFile);

module.exports = router;
