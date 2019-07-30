const request = require('request');

module.exports = {

/**
 * Return random image URLs from an API
 * @param {*} keyword - Search Term
 * @param {*} imageCount - number of images to return
 */
getRandomImages_cb: function (keyword, imageCount, callback) {
    requestURL = "https://api.unsplash.com/photos/random/?count=" + 
        imageCount + 
        "&client_id=2166af60ef637498aad08ce472f5f3d1bf7afd3e7c8039bcd7c7b313ea0729f7" +
        "&query=" + keyword;
    request(requestURL, function(error,response,body) {
        if(!error) {
            var parsedData = JSON.parse(body);
            var imageURLs = [];
            for(let i = 0 ; i < 9 ; i++) {
                var imageURL = parsedData[i].urls.regular;
                imageURLs.push(imageURL);                
            }
            callback(imageURLs);
        } else {
            console.log("results", {"error":"Unable to access API"});
        }
    });
},

/**
 * Return random image URLs from an API
 * @param {*} keyword - Search Term
 * @param {*} imageCount - number of images to return
 */
getRandomImages: function (keyword, imageCount) {
    requestURL = "https://api.unsplash.com/photos/random/?count=" + 
        imageCount + 
        "&client_id=2166af60ef637498aad08ce472f5f3d1bf7afd3e7c8039bcd7c7b313ea0729f7" +
        "&query=" + keyword;
    return new Promise( function(resolve, reject) {
        request(requestURL, function(error,response,body) {
            if(!error) {
                var parsedData = JSON.parse(body);
                var imageURLs = [];
                for(let i = 0 ; i < imageCount ; i++) {
                    var imageURL = parsedData[i].urls.regular;
                    imageURLs.push(imageURL);                
                }
                resolve(imageURLs);
            } else {
                console.log("results", {"error":"Unable to access API"});
            }
        });
    });
}



}