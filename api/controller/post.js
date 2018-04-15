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
    newPost.image = req.body.image;
    newPost._user = req.body._user;
    newPost.upVotes = req.body.upVotes;

    //console.log(" fieldName "+ req.file.key,req.file.originalname);

    newPost.save(err => {
        if (err) {
            return res.status(500).send("Problem adding new post to the database.");
            res.status(200).send(err);
        }
        res.json({ message: 'New post added successfully' });
    });
};

exports.get_all_posts = (req, res) => {
    /* Post.find({}, (err, posts) => {
        if (err) {
            return res.status(500).send("Problem getting all posts.");
            res.status(200).send(err);
        }
        res.json(posts);
    });  */
    Post
    .find()
    .populate('comments')
    .populate('_user')
    .exec((err, posts) => {
        if (err) {
            return res.status(500).send("Problem getting all posts.");
            res.status(200).send(err);
        }
        res.json(posts);
    })
;};

exports.getPostDetails = (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            return res.status(500).send("Problem getting a particular post.");
            res.status(200).send(err);
        }
        res.json(post);
    }); 
};

exports.updatePost = (req, res) => {
    //console.log("updatePost ");
    Post.findByIdAndUpdate({ _id: req.params.id }, {$set:req.body}, {new:true}, function (err, post) {
        if (err){
            res.status(500).send(err);
        } 
        res.status(200).send(post);
    });  
};

exports.getPostsByAuthorId = (req, res) => {
    Post.find({ _user :  req.params.id  } , (err, post) => {
     //   console.log("post "+post);
        if (err) {
            return res.status(500).send(err);
            res.status(200).send(err);
        }
        res.json(post);
    }); 
};

