/**
 * Created by whamsy on 4/11/17.
 */

// var client = require('./connection.js');
// var search = require('./search.js');
//
// var out = new search.Search('trump');
//
// // var out = search('trump')
//
// console.log(out.length);
// // console.log(typeof out);
// // console.log(search('trump').length);


var misc = require('./misc');
// var x = 10;
// console.log(misc.searchResult(x));


// router.post('/search-results', function(req, res) {
//     searchModule.search(req.body, function(data) {
//         res.render('index', { title: 'Express', results: data });
//     });
// });

misc.Search('*', function(data) {
    console.log(data.length);
});