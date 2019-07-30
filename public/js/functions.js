
$(document).ready(function() {
    $(".favoriteIcon").on("click", function() {
        
        alert($(this).prev().attr("src"));
        if($(this).attr("src")=="img/fav_on.png") {
            $(this).attr("src","img/fav_off.png");
        }
        else {
            $(this).attr("src","img/fav_on.png");
        }
    });

});