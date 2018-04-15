const express = require("express");
const router = express.Router();
const multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
const PostController = require("../controller/post");

var config = require("../../config");

var accessKeyId = process.env.AWS_ACCESS_KEY || config.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY || config.AWS_SECRET_KEY;

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new aws.S3({ });

// to upload images to S3 using multer
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'pet-care-images/posts',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            var fileName = Date.now() + '-' + file.originalname;
            cb(null, fileName);
            req.body.image = fileName;
        }
    })
})

// POST - CREATES A NEW POST
router.post('/add', upload.single('image'), PostController.add_new_post);

// GET - GET ALL POSTS
// '/v1/post' -GET all posts
router.get('/', PostController.get_all_posts);

// GET A SPECIFIC POST 
// '/v1/post/:id' -GET single post
router.get('/:id', PostController.getPostDetails);

// UPDATE A SPECIFIC POST
// '/v1/post/:id' - POST 
router.put('/:id',  upload.single('image'), PostController.updatePost);

// GET POSTS BY AUTHOR ID
// '/v1/post/author:id' - GET 
router.get('/author/:id', PostController.getPostsByAuthorId);



module.exports = router;