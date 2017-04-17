/**
 * Created by whamsy on 4/17/17.
 */

var Consumer = require('sqs-consumer');

var MonkeyLearn = require('monkeylearn');
var ml = new MonkeyLearn('f42620f327e7f9d3f76ddc93654e594b94eae8e6');
var module_id = 'cl_qkjxv9Ly';

// var text_list = ["This is a text to test your classifier", "This is some more text"];


var app = Consumer.create({
    queueUrl: 'https://sqs.us-west-2.amazonaws.com/453367379586/CloudTweetMap',
    handleMessage: (message, done) => {

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
                    lng:data["coordinates"]["lng"][0]
                },
                sentiment:{
                    label:res.result[0][0]['label'],
                    probability:res.result[0][0]['probability']
                }
            };
            // console.log(res.result[0][0]['label']);
            console.log(tweetdata);
        });

        done();

    }
});

app.on('error', function (err) {
    console.log(err);
});

app.start();
