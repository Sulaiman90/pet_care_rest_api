var mongoose = require('mongoose');
var config = require('./config');

//Set up default mongoose connection
mongoose.Promise = global.Promise;

//Set up default mongoose connection
var db = mongoose.connect(config.mongodbUrl);

//Get the default connection
var dbConnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
dbConnection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

dbConnection.once('open', function() {
    console.log("Successfully connected to the database");
});

console.log("db file ");