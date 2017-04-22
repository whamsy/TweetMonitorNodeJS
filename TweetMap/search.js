/**
 * Created by whamsy on 4/11/17.
 */

var client = require('./connection.js')

module.exports.Search = function(searchData, callback) {

    var outArray = [];
    var tempArray = [];

    client.search({
        index: 'tweetmap_with_sentiment',
        size: 10000,
        type: 'tweetdata_with_sentiment',
        q: searchData
    }).then(function(resp) {
        console.log('Search Result for: ',searchData,' from Elasticsearch');
        console.log('Results being added to an array');
        resp.hits.hits.forEach(function(hit){
            tempArray = [];
            //adding coordinates
            tempArray.push(hit['_source']['coordinates']['lat'],hit['_source']['coordinates']['lng'])
            //adding tweet text
            tempArray.push(hit['_source']['text'])
            //adding user info (name, pic)
            tempArray.push(hit['_source']['user']['name'],hit['_source']['user']['profile_image_url_https'])
            //adding sentiment
            tempArray.push(hit['_source']['sentiment']['label'])
            outArray.push(tempArray);
        })
        console.log("Array of size ",outArray.length," sent to frontend\n\n");
        callback(outArray);
    }, function (err) {
        callback(err.message)
        console.log(err.message);
    });
}

