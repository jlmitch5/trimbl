//api.js
var router = require('express').Router();
var http = require('http');
var https = require('https');

var blogger_options = [
    {
        hostname: 'www.googleapis.com',
        path: '/blogger/v3/blogs/6798191055822974877/posts?maxResults=10&key=AIzaSyCGZsGPtx_ePwT1Tyiqv47P5bfQggVeLH4',
        method: 'GET'
    },
    {
        hostname: 'www.googleapis.com',
        path: '/blogger/v3/blogs/2795121378275054408/posts?maxResults=10&key=AIzaSyCGZsGPtx_ePwT1Tyiqv47P5bfQggVeLH4',
        method: 'GET'
    }
];

var wordpress_options = [
    {
        hostname: 'citydazemusic.com',
        path: '/api/get_recent_posts/',
        method: 'GET'
    }
]

//you can use something like this: .../api/posts?searchQuery=goodBand+dateSelection=lastWeek
router.get('/posts', function(req, res){
    var done = 0;
    var posts = [];

    function callBlogger(blog_url, name) {
        req = https.request(blog_url, function(resFromBlog) {
            var jsonFromBlog = '';

            resFromBlog.on('data', function(chunk) {
                jsonFromBlog += chunk;
            });

            resFromBlog.on('end', function() {
                //test: send as JSON
                objectFromBlog = JSON.parse(jsonFromBlog, function(k,v) {
                    //make the json prettier!
                    if (k === "displayName" || k === "author" || k === "labels" || k === "selfLink" || k === "published" || k === "kind" || k === "nextPageToken" || k === "id" || k === "replies" || k === "content" || k === "etag") {
                        //delete this type
                    } else if (k === "blog") {
                        v = name;
                        return v;
                    } else if (k === "updated") {
                        v = v.slice(0, -6);
                        //change key name from updated to date
                        this.date = v;
                    } else {
                        return v;
                    }
                });
                objectFromBlog.items.forEach(function (element, index, array) {
                    posts.push(element);
                });
                done++;
                if (done == 3) {
                    res.send(JSON.stringify(posts.sort(function (a,b) {
                        a = new Date(a.date);
                        b = new Date(b.date);
                        return a>b ? -1 : a<b ? 1 : 0;
                    })))
                }
            });
        })

        req.end();
    }

    function callWordpress(blog_url, name) {
        req = http.request(blog_url, function(resFromBlog) {
            var jsonFromBlog = '';

            resFromBlog.on('data', function(chunk) {
                jsonFromBlog += chunk;
            });

            resFromBlog.on('end', function() {
                //test: send as JSON
                objectFromBlog = JSON.parse(jsonFromBlog, function(k,v) {
                    //make the json prettier!
                    if (k === "thumbnail" || k === "thumbnail_size" || k === "thumbnail_images" ||k === "comment_status" || k === "custom_fields" || k === "comments" || k === "attachments" || k === "comment_count" || k === "modified" || k === "categories" || k === "tags" || k === "author" || k === "pages" || k === "title_plain" || k === "excerpt" || k === "slug" || k === "id" || k === "status" || k === "count" || k === "count_total" || k === "content") {
                        //delete this type
                    } else if (k === "type") {
                        v = name;
                        this.blog = v;
                    } else if (k === "posts") {
                        //change key name from type to blog
                        this.items = v;
                    } else if (k === "date") {
                        v = v.replace(" ", "T")
                        return v;
                    } else {
                        return v;
                    }
                });
                objectFromBlog.items.forEach(function (element, index, array) {
                    posts.push(element);
                });
                done++;
                if (done == 3) {
                    res.send(JSON.stringify(posts.sort(function (a,b) {
                        a = new Date(a.date);
                        b = new Date(b.date);
                        return a>b ? -1 : a<b ? 1 : 0;
                    })))
                }
            });
        })

        req.end();
    }

    callBlogger(blogger_options[0], "The Bottom String");
    callBlogger(blogger_options[1], "Triangle Beat");
    callWordpress(wordpress_options[0], "CityDaze");

});

module.exports = router;