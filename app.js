const express = require('express');
const bodyParser = require('body-Parser');
const app = express();
const config = require('./config');
const db = require('./db'); 
const userRoutes = require('./api/routes/user');
const postRoutes = require('./api/routes/post');
const commentRoutes = require('./api/routes/comment');

const port = process.env.PORT || config.port;

// middleware

app.use('/profilePicUploads',express.static('profilePicUploads'));
app.use('/postPicUploads',express.static('postPicUploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/* app.use(bodyParser.json({
    limit: config.bodyLimit
})); */


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


//Routes which should handle requests
/* app.use('/',  (req, res) => {
    res.json({ message: "Welcome to IssueTracker REST API V1" });
});
  */

// api routes v1
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

app.listen(port, () => {
    console.log('Issue Tracker API server listening on port ' + port);
});

module.exports = app;
