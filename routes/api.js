//api.js
var router = require('express').Router();
var http = require('http');
var https = require('https');
var combinedObjectsFromBlogs = "";
var postHasBeenAdded = 0;

// theBottomString test URL
var options = {
    hostname: 'www.googleapis.com',
    path: '/blogger/v3/blogs/6798191055822974877/posts?maxResults=8&key=AIzaSyCGZsGPtx_ePwT1Tyiqv47P5bfQggVeLH4',
    method: 'GET'
};

// tiangleBeat test URL
var options2 = {
    hostname: 'www.googleapis.com',
    path: '/blogger/v3/blogs/2795121378275054408/posts?maxResults=2&key=AIzaSyCGZsGPtx_ePwT1Tyiqv47P5bfQggVeLH4',
    method: 'GET'
};

// tiangleBeat test URL
var options3 = {
    hostname: 'citydazemusic.com',
    path: '/api/get_recent_posts/',
    method: 'GET'
};

//you can use something like this: .../api/posts?searchQuery=goodBand+dateSelection=lastWeek
router.get('/posts', function(req, res){
    var searchQuery = req.query.searchQuery;
    var dateSelection = req.query.dateSelection;
    var responseQuery = 'TODO: get posts with'

    //TODO: this is a search: return posts that match search
    if(searchQuery) {
        responseQuery += ' searchQuery: ' + searchQuery;
        res.json({response: responseQuery});
    }

    //TODO: this is default: return posts < than a week old
    if(dateSelection) {
        responseQuery += ' dateSelection: ' + dateSelection;
        res.json({response: responseQuery});
    }

    //this is a test.  testing url has no params
    if(!dateSelection && !searchQuery) {

        //test: get posts from bottomString
        req = https.request(options, function(resBottomString) {
            var jsonFromBottomString = '';

            resBottomString.on('data', function(chunk) {
                jsonFromBottomString += chunk;
            });

            resBottomString.on('end', function() {
                //test: send as JSON
                objectFromBottomString = JSON.parse(jsonFromBottomString, function(k,v) {
                    //make the json prettier!
                    if (k === "displayName" || k === "author" || k === "labels" || k === "selfLink" || k === "published" || k === "kind" || k === "nextPageToken" || k === "id" || k === "replies") {
                        //delete this type
                    } else if (k === "blog") {
                        v = "theBottomString";
                        return v;
                    } else if (k === "updated") {
                        //change key name from updated to date
                        this.date = v;
                    } else {
                        return v;
                    }
                });
                var bottomStringObjects = JSON.stringify(objectFromBottomString);
                if(postHasBeenAdded == 0) {
                    combinedObjectsFromBlogs += bottomStringObjects.substring(0,(bottomStringObjects.length-2));
                    postHasBeenAdded++;
                } else if (postHasBeenAdded == 1) {
                    combinedObjectsFromBlogs += ",";
                    combinedObjectsFromBlogs += bottomStringObjects.substring(10,(bottomStringObjects.length-2));
                    postHasBeenAdded++;
                } else if (postHasBeenAdded == 2) {
                    combinedObjectsFromBlogs += ",";
                    combinedObjectsFromBlogs += bottomStringObjects.substring(10);
                    res.send(JSON.parse(combinedObjectsFromBlogs));
                    combinedObjectsFromBlogs = "";
                    postHasBeenAdded = 0;
                }
            });
        });

        req.end();

        //test: get posts from bottomString
        req = https.request(options2, function(resTriangleBeat) {
            var jsonFromTriangleBeat = '';

            resTriangleBeat.on('data', function(chunk) {
                jsonFromTriangleBeat += chunk;
            });

            resTriangleBeat.on('end', function() {
                //test: send as JSON
                objectFromTriangleBeat = JSON.parse(jsonFromTriangleBeat, function(k,v) {
                    //make the json prettier!
                    if (k === "displayName" || k === "author" || k === "labels" || k === "selfLink" || k === "published" || k === "kind" || k === "nextPageToken" || k === "id" || k === "replies") {
                        //delete this type
                    } else if (k === "blog") {
                        v = "triangleBeat";
                        return v;
                    } else if (k === "updated") {
                        //change key name from updated to date
                        this.date = v;
                    } else {
                        return v;
                    }
                });
                var triangleBeatObjects = JSON.stringify(objectFromTriangleBeat);
                if(postHasBeenAdded == 0) {
                    combinedObjectsFromBlogs += triangleBeatObjects.substring(0,(triangleBeatObjects.length-2));
                    postHasBeenAdded++;
                } else if (postHasBeenAdded == 1) {
                    combinedObjectsFromBlogs += ",";
                    combinedObjectsFromBlogs += triangleBeatObjects.substring(10,(triangleBeatObjects.length-2));
                    postHasBeenAdded++;
                } else if (postHasBeenAdded == 2) {
                    combinedObjectsFromBlogs += ",";
                    combinedObjectsFromBlogs += triangleBeatObjects.substring(10);
                    res.send(JSON.parse(combinedObjectsFromBlogs));
                    combinedObjectsFromBlogs = "";
                    postHasBeenAdded = 0;
                }
            });
        });

        req.end();

        //test: get posts from bottomString
        req = http.request(options3, function(resCityDaze) {
            var jsonFromCityDaze = '';

            resCityDaze.on('data', function(chunk) {
                jsonFromCityDaze += chunk;
            });

            resCityDaze.on('end', function() {
                var authorName = "";
                objectFromCityDaze= JSON.parse(jsonFromCityDaze, function(k,v) {
                    //make the json prettier!
                    if (k === "thumbnail" || k === "thumbnail_size" || k === "thumbnail_images" ||k === "comment_status" || k === "custom_fields" || k === "comments" || k === "attachments" || k === "comment_count" || k === "modified" || k === "categories" || k === "tags" || k === "author" || k === "pages" || k === "title_plain" || k === "excerpt" || k === "slug" || k === "id" || k === "status" || k === "count" || k === "count_total") {
                        //delete this type
                    } else if (k === "type") {
                        //change key name from type to blog
                        this.blog = v;
                    } else if (k === "posts") {
                        //change key name from type to blog
                        this.items = v;
                    } else {
                        return v;
                    }
                });

                objectFromCityDaze = JSON.parse(JSON.stringify(objectFromCityDaze), function(k,v) {
                    if (k === "blog") {
                        v = "cityDaze";
                        return v;
                    } else {
                        return v;
                    }
                })
                var cityDazeObjects = JSON.stringify(objectFromCityDaze);
                if(postHasBeenAdded == 0) {
                    combinedObjectsFromBlogs += cityDazeObjects.substring(0,(cityDazeObjects.length-2));
                    postHasBeenAdded++;
                } else if (postHasBeenAdded == 1) {
                    combinedObjectsFromBlogs += ",";
                    combinedObjectsFromBlogs += cityDazeObjects.substring(10,(cityDazeObjects.length-2));
                    postHasBeenAdded++;
                } else if (postHasBeenAdded == 2) {
                    combinedObjectsFromBlogs += ",";
                    combinedObjectsFromBlogs += cityDazeObjects.substring(10);
                    res.send(JSON.parse(combinedObjectsFromBlogs));
                    combinedObjectsFromBlogs = "";
                    postHasBeenAdded = 0;
                }
            });
        });

        req.end();
    }
});

module.exports = router;