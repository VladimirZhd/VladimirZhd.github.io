$(document).ready(function(){
    $(".button-menu").click(function(){
        $(".hide").animate({left: "0"});
    });
    $(".button-close").click(function(){
        $(".hide").animate({left: "-340px"});
    })

    $(".hide").on("swipe", function(){
        $(this).hide();
    });

    $(".viewDiv").on("click", function(){
        $(".hide").hide();
    }); 
});

