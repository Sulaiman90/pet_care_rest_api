const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Post = require("../models/post");

exports.add_new_post = (req, res) => {
    var newPost = new Post();
    newPost.status = req.body.status;
    newPost.category = req.body.category;
    newPost.time = new Date().valueOf();
    newPost.location.coordinates.lat = req.body.lat;
    newPost.location.coordinates.long = req.body.long;
    newPost.image = req.file.key;
    newPost.user = req.body.user;
    newPost.upVotes = req.body.upVotes;

    console.log(" fieldName "+ req.file.key,req.file.originalname);

    /* const data = request.body;
    if (request.file && request.file.cloudStoragePublicUrl) {
        data.imageUrl = request.file.cloudStoragePublicUrl;
        newPost.image = data.imageUrl;
    } */

    newPost.save(err => {
        if (err) {
            //res.status(500).send("Problem adding new post to the database.");
            res.status(200).send(err);
        }
        res.json({ message: 'New post added successfully' });
    });
};

exports.get_all_posts = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            return res.status(500).send("Problem getting all posts.");
            res.status(200).send(err);
        }
        res.json(posts);
    }); 
};

exports.updatePost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, post) {
        if (err) 
            return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(post);
    });
}
