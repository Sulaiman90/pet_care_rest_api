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

   // console.log(" totalPosts "+newPost.totalPosts);

    newPost.save(err => {
        if (err) {
            return res.status(500).send("Problem adding new post to the database.");
            res.status(200).send(err);
        }
        res.json({ message: 'New post added successfully' });
    });
};

exports.get_all_posts = (req, res) => {
  
    var perPage = req.query.limit > 0 ? req.query.limit : 2;
    perPage = parseInt(perPage);
  
    var page = req.query.page > 0 ? req.query.page : 1;
    //console.log("page no : "+page,perPage,typeof(perPage));

    Post
    .find()
    .skip(perPage * (page-1))
    .limit(perPage)
    .sort({time: -1})  // sort by time
    .populate('comments')
    .populate('_user')
    .exec(function (err, posts){
        //console.log("posts : "+posts);
        if(err){
            return res.status(500).send("Problem getting all posts.");
        }
        Post.count().exec(function (err, count){
            const response = {
                currentPage: page,
                totalPages: Math.ceil(count / perPage),
                totalPosts: count,
                posts: posts
            }
            //console.log("posts : "+posts);
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json(response);
        })
    })
};

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
    console.log("updatePost ");
    Post.findByIdAndUpdate({ _id: req.params.id }, {$set:req.body}, {new:true}, function (err, post) {
        if (err){
            res.status(500).send(err);
        } 
        res.status(200).send(post);
    });  
};

exports.upvotePost = (req, res) => {
     //console.log("upvotePost "+req.query.postId,req.query.upvote);
     var upvote = parseInt(req.query.upvote);
     var msg;
     if(upvote == 1){
        msg = "Upvoted successfully";
     }
     else{
        msg = "Downvoted successfully";
     }

     Post.update(
        {_id: req.query.postId },
        {
            $inc: { upVotes: upvote}
        },
        (err, post) => {
            if (err) {
                return res.status(500).send(err);
                res.status(200).send(err);
            }
            res.json({message : msg});
        }
    ); 
}

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

exports.deletePost = (req, res) => {
    Post.remove({ _id: req.params.id}, (err, post) => {
        if (err) {
            return res.status(500).send(err);
            res.status(200).send(err);
        }
        res.json({message : "Post removed successfully"});
    });
};

