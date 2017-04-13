/**
 * Created by whamsy on 4/11/17.
 */

var client = require('./connection.js')

module.exports.Search = function(searchData, callback) {

    var outArray = [];
    var tempArray = [];

    client.search({
        index: 'tweetmap',
        size: 10000,
        type: 'tweetdata',
        q: searchData
        // body: {
        //     query: {
        //         match: {
        //             "text": searchData
        //         }
        //     }
        // }
    }).then(function(resp) {
        console.log('test_success1');
        resp.hits.hits.forEach(function(hit){
            tempArray = [];
            tempArray.push(hit['_source']['geo']['coordinates'][0],hit['_source']['geo']['coordinates'][1],hit['_source']['text'],hit['_source']['user']['name'])
            outArray.push(tempArray);
        })
        console.log(outArray.length);
        callback(outArray);
    }, function (err) {
        callback(err.message)
        console.log(err.message);
    });
}

