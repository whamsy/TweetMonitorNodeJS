/**
 * Created by whamsy on 4/11/17.
 */
var client = require('./connection.js');

client.cluster.health({},function(err,resp,status) {
    console.log("\n\nClient Health: \n",resp);
});


client.count({index: 'tweetmap',type: 'tweetdata'},function(err,resp,status) {
    console.log("\n\n\nNumber of Tweets: \n",resp);
});