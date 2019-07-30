

$(document).ready(function() {
    $(".favoriteIcon").on("click", function() {
        favoriteClick(this);
    });


/*
    <div  class='imageContainer'>
        <img class="image" src='<%=imageURL %>' width="200" height="200">
        <img class="favoriteIcon" src="img/fav_off.png" width="20">
    </div>
*/

    $(".keywordLink").on("click", function() {
        $.ajax({
            method: "get",
            url: "/api/displayFavorites",
            data: {
                "keyword" : $(this).text().trim()
                },
                success: function(rows, status) {
                    $("#favorites").html("");
                    $("#favorites").append("<div  class='imageContainer'>")
                    rows.forEach(function(row,i) {
                        //$("#favorites").append("<img class='image' width='200' height='200' src='" + row.imageURL + "'>'");
                        $("#favorites").append("<img class='image' src='" + row.imageURL + "' width='200' height='200'></img>");
                        $("#favorites").append("<img class='favoriteIcon' src='img/fav_on.png' width='20'></img>");
                        if (i%4==3) {
                            $("#favorites").append("<br>");
                        }
                    });
                    $("#favorites").append("</div")
                    $(".favoriteIcon").on("click", function() {
                        favoriteClick(this);
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

    function favoriteClick(elem) {
        var imageURL = $(elem).prev().attr("src");
        if($(elem).attr("src")=="img/fav_on.png") {
            $(elem).attr("src","img/fav_off.png");
            updateFavorite("delete", imageURL);//delete
        }
        else {
            $(elem).attr("src","img/fav_on.png");
            updateFavorite("add", imageURL);
        }
    }

});