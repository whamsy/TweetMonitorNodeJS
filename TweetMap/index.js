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

    console.log("Received frontend request to search for: ",text1);

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


var Consumer = require('sqs-consumer');

var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});

var client = require('./../TweetMap/connection.js');

var MonkeyLearn = require('monkeylearn');
var ml = new MonkeyLearn('f42620f327e7f9d3f76ddc93654e594b94eae8e6');
var module_id = 'cl_qkjxv9Ly';


var app1 = Consumer.create({
    queueUrl: 'https://sqs.us-west-2.amazonaws.com/453367379586/CloudTweetMap',
    handleMessage: (message, done) => {

        var Publisher = require('aws-sns-publish');

        var data = JSON.parse(JSON.parse(message.Body).Message);

        var list = [];
        list.push(data['text'])
        var p = ml.classifiers.classify(module_id, list, true);
        p.then(function (res) {
            var tweetdata = {
                id:data['id'],
                text:data['text'],
                user:data['user'],
                created_at:data['created_at'],
                coordinates:{
                    lat:data["coordinates"]["lat"],
                    lng:data["coordinates"]["lng"]
                },
                sentiment:{
                    label:res.result[0][0]['label'],
                    probability:res.result[0][0]['probability']
                }
            };

            var senti_sns_output = JSON.stringify(tweetdata);
            var subject_txt = "Processed Tweet "+tweetdata['id'];

            // console.log(senti_sns_output['id'])
            // console.log(JSON.parse(senti_sns_output));

            Publisher(senti_sns_output, {arn: 'arn:aws:sns:us-west-2:453367379586:SentiTweet'});

        });

        done();

    }
});

var app2 = Consumer.create({
    queueUrl: 'https://sqs.us-west-2.amazonaws.com/453367379586/SentiTweetQueue',
    handleMessage: (message, done) => {

        var final_data = JSON.parse(JSON.parse(message.Body).Message);

        // console.log("2nd Queue output is of type ", typeof final_data);

        // console.log(final_data);

        client.index({
            index: 'tweetmap_with_sentiment',
            type: 'tweetdata_with_sentiment',
            body: final_data
        },function(err,resp,status) {
            // console.log(resp);
        });




        done();

    }
});

app1.on('error', function (err) {
    console.log(err);
});

app1.start();

app2.on('error', function (err) {
    console.log(err);
});

app2.start();




