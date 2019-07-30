
$(document).ready(function() {
    $(".favoriteIcon").on("click", function() {
        
        var imageURL = $(this).prev().attr("src");
        if($(this).attr("src")=="img/fav_on.png") {
            $(this).attr("src","img/fav_off.png");
            updateFavorite("delete", imageURL);//delete
        }
        else {
            $(this).attr("src","img/fav_on.png");
            updateFavorite("add", imageURL);
        }
    });

    $(".keywordLink").on("click", function() {
        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                "keyword" : $(this).text().trim()
                },
                success: function(rows, status) {
                    $("#favorites").html("");
                    rows.forEach(function(row) {
                        $("#favorites").append("<img class='image' width='200' height='200' src='" + row.imageURL + "'>'");
                    });
                }
        });//ajax
    });

    function updateFavorite(action, imageURL) {
        $.ajax({
            method: "get",
            url: "/api/updateFavorites",
            data: {
                "imageURL": imageURL ,
                "keyword" : $("#keyword").val(),
                "action" : action
                }
        });//ajax
    }

});