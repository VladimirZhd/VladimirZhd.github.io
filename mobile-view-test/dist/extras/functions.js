// jquery functions for transitions 
$(document).ready(function () {
    //function to show the sliding menu
    $(".button-menu").click(function () {
        $(".hide").animate({ left: "0" });
    });
    $('.nearest-link').click(function () {
        $('.nearest-div').animate({ left: '0' });
    });
    //function to hide the sliding menu
    $(".button-close").click(function () {
        $(".hide").animate({ left: "-340px" });
    });
    $('.button-close').click(function () {
        $('.nearest-div').animate({ left: '-340px' });
    });
    /* function to close the sliding menu with a swipe to left we are using a js plugin jquery.touchSwipe here*/
    $(function () {
        $(".hide").swipe({
            swipeLeft: function () {
                $(".button-close").click();
            }
        });
    });

    /* function to close the sliding menu by typing on the map*/
    $("#viewDiv").on("click", function () {
        $(".button-close").click();
    });
    $("#list2 li").click(function () {
        let item = this.id;
        let toggle = $("#" + item).next("input").attr("id");
        $("#" + toggle).click();
        item = "";
    });


    $(".near").on("click", function () {
        $(".button-close").click();
        $('.clear-nearest').css('display', 'flex');
    });

    $(".near-lg").on("click", function () {
        $('.clear-nearest').css('display', 'flex');
    });

    $('#btn-clear').on('click', function () {
        $('.clear-nearest').css('display', 'none');
    });

    $('#btn-warning').click(function () {
        $('popup-warning').css('display', 'none');
    });

});
/* function to identify if user is using desktop or mobile device*/
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

require([
    'dojo/on',
    'dojox/gesture/swipe',
    'dojo/dom',
    'dojo/dom-style',
    'dojo/number',
    'dojo/fx'
], function (on, swipe, dom, domStyle, number, fx) {
    const slideTarget = dom.byId("near-mobile");
    let positionY = number.parse(domStyle.getComputedStyle(slideTarget).top.match(/(\d+)/)[0]);

    // I think it can be done if event listener is added to that small bar on the bottom
    //
    on(slideTarget, 'click', function (evt) {
        console.log("Sliding");
        fx.slideTo({ node: slideTarget, top: "-185", units: "px" }).play();
        positionY = -185;
    });

    on(slideTarget, swipe, function (evt) {
        if ((positionY + evt.dy) > -185) {
            domStyle.set(slideTarget, { top: (positionY + evt.dy) + "px" });
        }
    });

    on(slideTarget, swipe.end, function (evt) {
        if ((positionY + evt.dy) > -185) {
            positionY += (evt.dy - 1);
        }
        else {
            positionY = -185;
        }
    });


})