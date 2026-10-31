const express = require("express")
const multer = require("multer");
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("../controllers/post.controller");
const router = express.Router();

const upload =  multer({storage : multer.memoryStorage()})
 
router.post("/create", authMiddleware,upload.array("image",5),postController)

module.exports = router;