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


// var misc = require('./misc');
// var x = 10;
// console.log(misc.searchResult(x));


// router.post('/search-results', function(req, res) {
//     searchModule.search(req.body, function(data) {
//         res.render('index', { title: 'Express', results: data });
//     });
// });

// misc.Search('*', function(data) {
//     console.log(data.length);
// });


var client = require('./../TweetMap/connection.js');

// client.indices.create({
//     index: 'tweetmap_final2',
// },function(err,resp,status) {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         console.log("create",resp);
//     }
// });

var x = { id: '854120055470030848',
    text: 'WA State Patrol Aviation Unit spotted this aggressively driven semi on US 2/Cashmere. Speeding, left lane violation… https://t.co/tvRXHAcNpV',
    user:
        { id: 74998364,
            id_str: '74998364',
            name: 'Seattle CP',
            screen_name: 'SeattleCP',
            location: 'Seattle, WA',
            url: 'http://seattle.cityandpress.com/',
            description: 'Seattle City And Press',
            protected: false,
            verified: false,
            followers_count: 2160,
            friends_count: 11,
            listed_count: 188,
            favourites_count: 1,
            statuses_count: 247482,
            created_at: 'Thu Sep 17 12:22:26 +0000 2009',
            utc_offset: -25200,
            time_zone: 'Pacific Time (US & Canada)',
            geo_enabled: true,
            lang: 'en',
            contributors_enabled: false,
            is_translator: false,
            profile_background_color: 'FFFFFF',
            profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
            profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
            profile_background_tile: false,
            profile_link_color: '8A1C3B',
            profile_sidebar_border_color: 'FFFFFF',
            profile_sidebar_fill_color: 'FFFFFF',
            profile_text_color: '2A2C31',
            profile_use_background_image: false,
            profile_image_url: 'http://pbs.twimg.com/profile_images/515634311899279360/4O9r0IHP_normal.png',
            profile_image_url_https: 'https://pbs.twimg.com/profile_images/515634311899279360/4O9r0IHP_normal.png',
            profile_banner_url: 'https://pbs.twimg.com/profile_banners/74998364/1411778840',
            default_profile: false,
            default_profile_image: false,
            following: null,
            follow_request_sent: null,
            notifications: null },
    created_at: 'Mon Apr 17 23:51:04 +0000 2017',
    coordinates: { lat: 47.6054773, lng: -122.33247834 },
    sentiment: { label: 'neutral', probability: 0.549 } }


var final_data = 'Palak slap';

client.index({
    index: 'ganubetterberight2day',
    type: 'palakdoesntgiveashitatall',
    body: x
},function(err,resp,status) {
    console.log(resp);
});