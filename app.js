const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const request = require('request');
const mysql = require('mysql');

const tools = require("./tools.js")

//routes

app.get("/",async function(req, res) {
    
    var imageURLs = await tools.getRandomImages("",1);
    res.render("index", {"imageURLs":imageURLs});
});


app.get("/search",async function(req, res) {
    var keyword = req.query.keyword;
    var imageURLs = await tools.getRandomImages(keyword,9);
    console.log("imageURLs" , imageURLs);
    res.render("results", {"imageURLs": imageURLs, "keyword": keyword}); 
});


app.get("/displayKeywords",async function(req, res) {
    var sql;
    var sqlParams;
    var conn = tools.createConnection();
    sql = "SELECT DISTINCT keyword from favorites order by keyword";
    conn.connect(function(err) {
        if(err) throw(err);
            conn.query(sql,function(err,results) {
                if(err) throw(err);
                res.render("favorites", {"rows":results});
        });
    });
});

app.get("/api/displayFavorites",async function(req, res) {
    var keyword = req.query.keyword;
    var sql;
    var sqlParams;
    var conn = tools.createConnection();
    sql = "SELECT imageURL from favorites where keyword=?";
    sqlParams = [keyword];
    conn.connect(function(err) {
        if(err) throw(err);
            conn.query(sql,sqlParams,function(err,results) {
                if(err) throw(err);
                res.send(results);
        });
    });
});


app.get("/api/updateFavorites",function(req, res) {
    var imageURL = req.query.imageURL;
    var keyword = req.query.keyword;
    var action = req.query.action;

    var sql;
    var sqlParams;
    var conn = tools.createConnection();
    if(action=="add") {
        sql = "INSERT INTO favorites (imageURL, keyword) VALUES(?,?)";
        sqlParams = [imageURL,keyword];
    }
    else {
        sql = "DELETE FROM favorites WHERE imageURL = ?";
        sqlParams = [imageURL];
    }
    conn.connect(function(err) {
        if(err) throw(err);
        conn.query(sql,sqlParams,function(err,results) {
        res.send("cool!");
        });
    });
    
});
 

//listener
app.listen('8081',"0.0.0.0", function() {
    console.log("Express Server is Running...");
});

