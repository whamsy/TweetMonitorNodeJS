/**
 * Created by whamsy on 4/11/17.
 */


var client = require('./../TweetMap/connection.js');

client.indices.delete({
    index: 'gov'
},function (err,resp,status) {
    if(err){
        console.log(err)
    }
    else{
        console.log(resp);
        console.log(status)
    }
})
