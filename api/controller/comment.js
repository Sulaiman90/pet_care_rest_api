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
        newComment.image = req.body.image;

        //console.log("comment image key" +req.file.key,req.body.image);

        newComment.save((err, comment) => {
            if (err) {
                res.send(err);
                return res.status(500).send("Problem adding new comment to the database.");
                res.status(200).send(err);
            }
           // console.log("comment added");
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
  //  console.log("get_comment "+req.params.id);
    Comment.findById(req.params.id , (err, comments) => {
      //  console.log("get_comment "+req.params.id);
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });  
}

exports.updateComment = (req, res) => {
    //console.log("req.body "+req.body.title);
    Comment.findByIdAndUpdate({ _id: req.params.id }, {$set:req.body}, {new:true}, function (err, comment) {
        if (err){
            res.status(500).send(err);
        } 
        res.status(200).send(comment);
    });  
}


exports.deleteComment = (req, res) => {
    Comment.remove({ _id: req.params.id}, (err, comment) => {
        if (err) {
            return res.status(500).send(err);
            res.status(200).send(err);
        }
        res.json({message : "Comment removed successfully"});
    });
};