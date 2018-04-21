var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    status:{
        type: String,
        enum: ['Open',"InProgress","Resolved","Rejected"],
    },
    time:{
        type: Date, default: Date.now
    },
    category:{
        type: String,
        enum: ['Cat1','Cat2','Cat3']
    },
    location:{
        type: { type: String, default: 'Point' },
        coordinates: {
            lat: Number,
            long: Number
        }
    },
    image:{
        type: String
    },
    _user:{
        type: Schema.Types.ObjectId, ref: 'User', required: true 
    },
    upVotes:{
        type: Number
    },
    comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}]
    
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;