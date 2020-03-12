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

    // var $dragging = null;

    // $(document.body).on("mousemove", function(e) {
    //     console.log(e.clientY);
    //     if ($dragging) {
    //         $dragging.offset({
    //             top: e.clientY
    //         });
    //     }
    // });


    // $('#near-mobile').on("mousedown", function (e) {
    //     $dragging = $(e.target);
    //     console.log(e);
    //     let positionY = e.clientY;

    // });

    // $(document.body).on("mouseup", function (e) {
    //     $dragging = null;
    //     // let menu = document.getElementById('near-mobile');
    //     // menu.style.transform = 'translateY(0px)';
    // });

});
/* function to identify if user is using desktop or mobile device*/
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// const eventContract = new jsaction.EventContract();

// eventContract.addContainer(document.getElementById('near-mobile'));

// eventContract.addEvent('pointerleave');
// console.log(eventContract);

// const dispatcher = new new jsaction.Dispatcher();
// eventContract.dispatchTo(dispatcher.dispatch.bind(dispatcher));

// const hideMenu = function(flow) {
//     let menu = document.getElementById('near-mobile');
//     menu.style.transition = 'none 0s ease 0s';
//     menu.style.willChange = 'transform';
//     menu.style.transform = 'matrix(1, 0, 0, 1, 0, -410) translateY(0px)';
// }

// dispatcher.registerHandlers(
//     'start',
//     null,
//     {
//         'drag': hideMenu
//     }
// );

require([
    'dojo/on',
    'dojox/gesture/swipe',
    'dojo/dom',
    'dojo/dom-style'
], function (on, swipe, dom, domStyle, domGeom) {
    const slideTarget = dom.byId("near-mobile");
    let positionY = 0;

    on(slideTarget, swipe, function (evt) {
        if ((positionY + evt.dy) > -315) {
            domStyle.set(slideTarget, { top: (positionY + evt.dy) + "px" });
        }
    });

    on(slideTarget, swipe.end, function (evt) {
        if ((positionY + evt.dy) > -315) {
            positionY += (evt.dy - 1);
        }
        else {
            positionY = -315;
        }
    });
})