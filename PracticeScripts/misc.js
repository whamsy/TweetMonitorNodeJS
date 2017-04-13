/**
 * Created by whamsy on 4/12/17.
 */



var addX = function(value) {

    var resultArray = [];
    var i = 0;
    while(i<value){
        resultArray.push(Math.pow(2,i));
        i++;
    }
    return resultArray;
};



var client = require('./../TweetMap/connection.js')
var outArray = [];
var tempArray = [];


// module.exports.searchResult = function(x, callback) {
//         console.log('Searching for: ',x);
//         client.search({
//         index: 'tweetmap',
//         size: 10000,
//         type: 'tweetdata',
//         body: {
//             query: {
//                 match: {
//                     "text": x
//                 }
//             }
//         }
//     },function (error,response,status) {
//         if (error){
//             console.log("search error: "+error)
//         }
//         else {
//             test = 'even more shit';
//             console.log('test_success1');
//             response.hits.hits.forEach(function(hit){
//                 tempArray = [];
//                 tempArray.push(hit['_source']['geo']['coordinates'][0],hit['_source']['geo']['coordinates'][1],hit['_source']['text'],hit['_source']['user']['name'])
//                 outArray.push(tempArray);
//             })
//
//             return test;
//
//             console.log(outArray.length);
//
//             console.log('test_success2');
//         }
//
//         console.log(outArray.length);
//
//
//     });
//     // return test;
// };

var elasticsearch = require('elasticsearch');


module.exports.Search = function(searchData, callback) {
    client.search({
        index: 'tweetmap',
        size: 10000,
        type: 'tweetdata',
        q: searchData
        // body: {
        //     query: {
        //         match: {
        //             "text":searchData
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
        callback(outArray);
    }, function (err) {
        callback(err.message)
        console.log(err.message);
    });
}

module.exports.addX = addX;

