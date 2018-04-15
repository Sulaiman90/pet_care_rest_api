const express = require("express");
const router = express.Router();
const multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk');

const CommentController = require("../controller/comment");
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
        bucket: 'pet-care-images/comments',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldname:file.fieldname });
        },
        key: function (req, file, cb) {
            var fileName = Date.now() + '-' + file.originalname;
            cb(null, fileName);
            req.body.image = fileName;
        }
    })
})

// add a new comment by a specific post id
// '/v1/comment/add/:id'
router.post('/add/:id', upload.single('image'), CommentController.add_new_comment);

// get comments for a specific post id
// '/v1/comment/:id' -GET all comments
router.get('/:id', CommentController.get_comment);


// update a specific comment
// '/v1/comment/:id' 
router.put('/:id', upload.single('image'), CommentController.updateComment);

module.exports = router;