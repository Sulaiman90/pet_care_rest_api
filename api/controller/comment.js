const mongoose = require("mongoose");
const Comment = require("../models/comment");
const bodyParser = require('body-parser');
const Post = require('../models/post');

exports.add_new_comment = (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            res.send(err);
        }

        var newComment = new Comment();

        newComment.title = req.body.title;
        newComment.text = req.body.text;
        newComment.post = post._id;

        newComment.save((err, comment) => {
            if (err) {
                res.send(err);
                return res.status(500).send("Problem adding new comment to the database.");
                res.status(200).send(err);
            }
            console.log("comment added");
            post.comments.push(newComment);

            post.save(err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'New comment added to post successfully' });
            });
        });
    });   
}

exports.get_comment = (req, res) => {
    Comment.find({ post: req.params.id }, (err, comments) => {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });  
}