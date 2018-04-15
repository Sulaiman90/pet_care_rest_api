const mongoose = require("mongoose");
const User = require("../models/user");

exports.user_signup = (req, res) => {
    //console.log("req file "+req.file)
    //console.log("updateUser "+req.body.name);
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.image = req.body.image;
    newUser.location.coordinates.lat = req.body.lat;
    newUser.location.coordinates.long = req.body.long;

    newUser.save(function (err) {
        if (err) {
            return res.status(500).send("Problem registering new user to the database.");
            res.status(200).send(err);
        }
        res.json({ message: 'User registered successfully' });
    });
};

exports.get_all_users = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
}

exports.getUser = (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
}

// FOR PUT OPERATIONS, body type should be set to url-encoded (not form-data)
exports.updateUser = (req, res) => {
   // console.log("updateUser ");
     User.findByIdAndUpdate({ _id: req.params.id }, {$set:req.body}, {new:true}, function (err, user) {
        if (err){
            res.status(500).send(err);
        } 
        res.status(200).send(user);
    });  
}
