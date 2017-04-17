/**
 * Created by whamsy on 4/17/17.
 */

var Consumer = require('sqs-consumer');

var app = Consumer.create({
    queueUrl: 'https://sqs.us-west-2.amazonaws.com/453367379586/CloudTweetMap',
    handleMessage: (message, done) => {

        var msgBody = JSON.parse(JSON.parse(message.Body).Message);

        console.log(msgBody['id']);

        done();

    }
});

app.on('error', function (err) {
    console.log(err);
});

app.start();
