/**
 * Created by whamsy on 4/10/17.
 */

var express = require('express');
var app = express();

var client = require('./connection.js');
var search = require('./search.js');

app.use(express.static('public'));

app.get('/test', function (req, res) {
    res.sendFile( "/Users/whamsy/WebstormProjects/Cloud/TweetMap" + "/" + "index.html" );
})

app.get('/search', function (req, res) {

    var text1 = req.query.q;

    console.log(text1);

    search.Search(text1, function(data) {
        res.send(data);
        // console.log(data);
    });
})

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
})




