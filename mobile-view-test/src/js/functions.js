$(document).ready(function(){
    $(".button-menu").click(function(){
        $(".hide").animate({left: "0"});
    });
    $(".button-close").click(function(){
        $(".hide").animate({left: "-340px"});
    })
});