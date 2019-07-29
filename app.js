const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const request = require('request');
const mysql = require('mysql');


//routes

app.get("/",function(req, res) {
    //res.send("it's working")
    //res.render("index.ejs");
    requestURL = 'https://api.unsplash.com/photos/random/?client_id=2166af60ef637498aad08ce472f5f3d1bf7afd3e7c8039bcd7c7b313ea0729f7';
    request(requestURL, function(error,response,body) {
        //console.log('error:', error);
        //console.log('statusCode:', response && response.statusCode);
        //console.log('body:', body); //Print the API data
        if(!error) {
            var parsedData = JSON.parse(body);
            var imageURL = parsedData["urls"]["regular"];
            res.render("index", {"imageURL":imageURL});
        } else {
            res.render("error", {"imageURL":"Unable to access API"});
        }
    });

});


app.get("/search",function(req, res) {
    var keyword = req.query.keyword;

    requestURL = "https://api.unsplash.com/photos/random/?count=" + 
        "9&client_id=2166af60ef637498aad08ce472f5f3d1bf7afd3e7c8039bcd7c7b313ea0729f7" +
        "&query=" + keyword;
    request(requestURL, function(error,response,body) {
        if(!error) {
            var parsedData = JSON.parse(body);
            var imageURLs = [];
            for(let i = 0 ; i < 9 ; i++) {
                var imageURL = parsedData[i].urls.regular;
                imageURLs.push(imageURL);
            }
            res.render("results", {"imageURLs": imageURLs, "keyword": keyword});
        } else {
            res.render("results", {"error":"Unable to access API"});
        }
    });

});

//listener
app.listen('8081',"0.0.0.0", function() {
    console.log("Express Server is Running...");
});

