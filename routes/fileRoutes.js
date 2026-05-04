const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/fileController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { getUserFiles } = require("../controllers/fileController");

//protected upload route
router.post("/upload",protect,upload.single("file"),uploadFile);

//GET all files of logged-in user
router.get("/",protect,getUserFiles);

module.exports = router;
