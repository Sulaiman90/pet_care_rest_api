const express = require("express");
const router = express.Router();

const PostController = require("../controller/post");
const multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk')

var accessKeyId =  process.env.AWS_ACCESS_KEY || "AKIAIBE4QTF6F53UMQ3Q";
var secretAccessKey = process.env.AWS_SECRET_KEY || "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";

aws.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

var s3 = new aws.S3({ /* ... */ });

var uploadS3 = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'post-images2/posts',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      }
    })
  })


// POST - CREATES A NEW POST
router.post('/add', uploadS3.single('postImage'), PostController.add_new_post);

// GET - get alll posts
// '/v1/post' -GET all posts
router.get('/', PostController.get_all_posts);

module.exports = router;