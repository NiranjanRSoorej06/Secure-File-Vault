const express = require("express");
const router = express.Router();
const { uploadFile } = require("../controllers/fileController");
const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

//protected upload route
router.post("/upload",protect,upload.single("file"),uploadFile);

module.exports = router;
