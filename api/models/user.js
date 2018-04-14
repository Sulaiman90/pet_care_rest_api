var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String, required:true},
    profilePicture: {type: String},
    location: {
        type: { type: String, default: 'Point' },
        coordinates: {
            lat: Number,
            long: Number
        }
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;