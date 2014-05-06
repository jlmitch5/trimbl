//api.js
var router = require('express').Router();
var https = require('https');
// var google = require('node-google-api')('AIzaSyBAKZ_8FeLGS8LKTAKwYGk2dtg1gQQs0Ws');
var google = require('node-google-api')({
    apiKey: 'AIzaSyCyS0DHikgScB7D7lwEcKzxAoSJE7a8GJc',
    debugMode: true // Throws errors instead of passing them silently.
});

//you can use something like this: .../api/posts?searchQuery=goodBand+dateSelection=lastWeek
router.get('/posts', function(req, res){
    google.build(function(api) {
      api.calendar.events.list({
        calendarid: 'en.usa#holiday@group.v.calendar.google.com'
      }, function(result) {
        if(result.error){
          console.log(result.error);
        } else {
          for(var i in result.items) {
            console.log(result.items[i].summary);
          }
        }
      });
    });
    google.build(function(api) {
        api.blogger.posts.list({
            blogId: '6798191055822974877',
            maxResults: '10'
        }, function(result) {
            if(result.error){
              console.log(result.error);
            } else {
              for(var i in result.items) {
                console.log(result.items[i].summary);
              }
            }
        });
    });
    // var options = {
    //   hostname: 'googleapis.com',
    //   port: 443,
    //   path: '/blogger/v3/blogs/3213900?key=AIzaSyBAKZ_8FeLGS8LKTAKwYGk2dtg1gQQs0Ws',
    //   method: 'GET'
    // };

    // req = https.request(options, function(res) {
    //   console.log("statusCode: ", res.statusCode);
    //   console.log("headers: ", res.headers);

    //   res.on('data', function(d) {
    //     process.stdout.write(d);
    //   });
    // });
    // req.end();

    // var options = {
    //   hostname: 'www.googleapis.com/blogger/v3/blogs/3213900?key=AIzaSyCyS0DHikgScB7D7lwEcKzxAoSJE7a8GJc',
    //   method: 'GET'
    // };
    // var searchQuery = req.query.searchQuery;
    // var dateSelection = req.query.dateSelection;
    // var responseQuery = 'TODO: get posts with'
    // if(searchQuery) {
    // 	responseQuery += ' searchQuery: ' + searchQuery;
    // }
    // if(dateSelection) {
    // 	responseQuery += ' dateSelection: ' + dateSelection;
    // }
    // if(!dateSelection && !searchQuery) {
    //     https.request(options, function(resGoogle) {
    //         res = resGoogle;
    //     }
    // 	// responseQuery = 'Get no posts!'
    // }
    // // do stuff
    // res.json({response: responseQuery});
});

// router.get('/apiGetTheWeeksPosts', function(req, res) {
// 	res.json({"cityDaze": {"item": [{
//           "title": "New Madrid @ Local 506 4/23",
//           "link": "http://citydazemusic.com/2014/04/27/new-madrid-local-506-423/",
//           "pubDate": "Sun, 27 Apr 2014 15:08:59 +0000",
//           "author": "Seth Powell",
//           "blog": "cityDaze",
//           "content:encoded": "<div id=\"attachment_675\" class=\"wp-caption aligncenter\" style=\"width: 310px\"><a href=\"http://citydazemusic.com/wp-content/uploads/2014/04/photo-1.jpg\"><img class=\"size-medium wp-image-675\" alt=\"New Madrid\" src=\"http://citydazemusic.com/wp-content/uploads/2014/04/photo-1-300x300.jpg\" width=\"300\" height=\"300\" /></a><p class=\"wp-caption-text\">New Madrid at Local 506</p></div> <p style=\"text-align: left;\">I was really excited about seeing New Madrid for the first time. I heard the new album <em>Sunswimmer</em> for the first time recently and was immediately blown away by the complexity of their sound. Sure, you could write it off as simple indie rock and let it melt into the plethora of other like-minded musicians and bands all trying to achieve the same thing, most who will never make it past small venues and local college radio stations, but these guys were different. What drew me in, as noted in the preview for this show, was the multiple genre&#8217;s and influences being tapped into here. At the live show on Wednesday, these genres were all present if not a little more highlighted than on the albums.</p> <p>We showed up right around the time these guys were finishing their setup. Fog was rolling out onto the stage from several fog machines and it was already so foggy that I could barely see the drum kit in the back. When the band came up and kicked into their debut&#8217;s opener &#8220;Bee Rapture&#8221; I knew I was in for a treat. On stage, the band had their own lighting rig which consisted of multiple colorful lights facing them (red, purple, green) and then two very bright yellow lights facing the audience from behind them. They had a guy who was controlling the lights for them and as the music became more and more layered and dove more and more into beautiful psychedelic noise washes the lights would turn into a colorful strobe alternating colors and darkness (none of the house lights were on for the majority of the show).</p> <p>Bee Rapture begins with reverb soaked guitar swells before moving into some very smooth pop that could probably be considered pretty tame to the rest of New Madrid&#8217;s catalog. The first thought that I had was that I finally saw the &#8220;appalachian folk&#8221; influence mentioned in their bio sent to me from their marketing group. Perhaps it was my unfamiliarity with their first album or the fact that I was fixated on multiple other aspects on the new album but I had completely missed the vocal harmonies going on. Those paired with the interesting chord progressions in many songs on Wednesday night really brought out that influence.</p> <p>On top of being transfixed by the vocal harmonies, they had brought along a vocal effects processor (literally, earlier that night I had commented to a friend that I was really thinking a vocal processor could make or break a show for this band considering the heavy use of vocal effects in the albums). The vocal effects very frequently sent these guys into psychedelic freakouts that just completely swallowed the Local 506 in such a good way. One of my favorite things about the Local 506 is how loud it can be. New Madrid were no exception and it was great compliment to their high energy set.</p> <p>They also knew how to tone things down, though, and in those moments the atmosphere was no less entrancing. Specifically, the most memorable moment of the show for me was the beautiful extended outro of Homesick. To begin the song, frontman Phil McGill said a few words about where they had been on tour recently. These were some of the only words he mumbled all night in between songs, give or take a few thank you&#8217;s. It was an impressive list of states. From North Carolina to Oregon to Texas two or three times and back up and down the east coast. After naming about 10 or 15 states, he said, &#8220;This song is called Homesick&#8221;. It was a subtle way of saying we&#8217;ve been on the road a lot and it&#8217;s easy to start missing home. The ending of the song beautifully and quietly amplified this emotion.</p> <p>About mid-ways through the set, a group of guys came into the Local 506. They were all seemingly overdressed for the show and had apparently been out drinking elsewhere. They were no doubt UNC Chapel Hill students and possibly members of one of the local fraternities. Throughout the remainder of the show, they talked loud as shit and seemingly only paid attention during the fast paced single &#8220;Manners&#8221; off the new album. It made me think back the preview I wrote a few days ago. In it, I argued that these guys are more than the &#8220;college-rock&#8221; label that pitchfork gave them when reviewing &#8220;Manners&#8221;. This show solidified my thoughts. These guys are possibly one of the hardest working bands I have seen on this small venue circuit in a long time. From the impressive fever dream light show down to the tight guitar riffs and vocal harmonies. As a suggestion to the band, the next time someone is disrupting things at your show, kindly ask them to leave or shut the fuck up. You guys deserve undivided attention.</p>"
//      }]}})
// })

// router.get('/apiGetPostByQuery/:query', function(req, res) {
// 	var query = req.params.query;
// 	var responseQuery = 'TODO: get posts with the following query: ' + query;
// 	res.json({ message: responseQuery});
// })

module.exports = router;