const express = require("express");
const router = express.Router();

const CommentController = require("../controller/comment");

// add a new comment by a specific post id
// '/v1/comment/add/:id'

router.post('/add/:id', CommentController.add_new_comment);

// get comments for a specific post id
// '/v1/comment/:id' -GET all comments

router.get('/:id', CommentController.get_comment);

module.exports = router;