var mongoose = require('mongoose');
var config = require('./config');

const options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  };

//Set up default mongoose connection
mongoose.Promise = global.Promise;

mongoose.set('debug', true)

//Set up default mongoose connection
var db = mongoose.connect(process.env.MONGODB_URI || config.mongodbUrl, options);

//Get the default connection
var dbConnection = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
dbConnection.on('error', function(err , res) {
    console.log('Could not connect to the database. Exiting now...');
    console.log(err);
    process.exit();
});

dbConnection.once('open', function() {
    console.log("Successfully connected to the database");
});

//console.log("db file ");