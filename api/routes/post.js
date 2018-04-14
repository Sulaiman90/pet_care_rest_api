const express = require("express");
const router = express.Router();

const PostController = require("../controller/post");
const multer = require('multer');

const imgUpload = require("../../imageUpload.js");

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       // console.log("destination")
        cb(null, './postPicUploads/')
    },
    filename: function (req, file, cb) {
       // console.log("filename ");
        cb(null, Date.now() + '-' + file.originalname);
    }
}); */

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: multer.MemoryStorage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5mb
    },
    fileFilter: fileFilter
});


// POST - CREATES A NEW POST
router.post('/add', upload.single('postImage'), imgUpload.uploadToGcs, PostController.add_new_post);

// GET - get alll posts
// '/v1/post' -GET all posts
router.get('/', PostController.get_all_posts);

module.exports = router;