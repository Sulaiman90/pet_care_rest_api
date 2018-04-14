var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: String,
    text: String,
    post: {type : Schema.Types.ObjectId, ref: 'Post'}
});

var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;