const express = require("express");
const router = express.Router();
const UserController = require('../controller/user');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       // console.log("destination")
        cb(null, './profilePicUploads/')
    },
    filename: function (req, file, cb) {
       // console.log("filename ");
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


//  POST -- CREATES A NEW USER
// api/v1/user/register

router.post('/register', upload.single('profileImage'), UserController.user_signup);

// GET --> GETS ALL USERS FROM THE DATABASE
// api/v1/user/

router.get('/', UserController.get_all_users);

// GETS A SINGLE USER FROM THE DATABASE
// api/v1/user/:id

router.get('/:id', UserController.getUser);

// UPDATES A SINGLE USER IN THE DATABASE
// api/v1/user/:id

router.put('/:id', UserController.updateUser);


module.exports = router;