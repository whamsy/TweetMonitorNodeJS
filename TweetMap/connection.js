/**
 * Created by whamsy on 4/11/17.
 */
const elasticsearch = require('elasticsearch');

var esClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

module.exports = esClient;
