const express = require("express");
const router = express.Router();
const multer = require('multer');
var multerS3 = require('multer-s3')
var aws = require('aws-sdk');
const UserController = require('../controller/user');

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
        bucket: 'pet-care-images/profiles',
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


//  POST -- CREATES A NEW USER
// api/v1/user/register
router.post('/register', upload.single('image'), UserController.user_signup);


// GET --> GETS ALL USERS FROM THE DATABASE
// api/v1/user/
router.get('/', UserController.get_all_users);


// GETS A SINGLE USER FROM THE DATABASE
// api/v1/user/:id
router.get('/:id', UserController.getUser);


// UPDATES A SINGLE USER IN THE DATABASE
// api/v1/user/:id
router.put('/:id', upload.single('image'), UserController.updateUser);


module.exports = router;