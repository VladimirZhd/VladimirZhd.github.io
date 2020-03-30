// jquery functions for transitions 
$(document).ready(function () {
    //function to show the sliding menu
    $(".button-menu").click(function () {
        $(".hide").animate({ left: "0" });
        $("#near-mobile").css('top', '197px');
        $('.open-nearest').css('display', 'flex');
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

    $('li').on('click', function () {
        this.children[0].click();
        $(".hide").animate({ left: "-340px" });
        if (this.children[0].checked == true) {
            $(this.children[1]).css('color', '#bada55');
            $(this).css('color', '#0076b6');
        } else {
            $(this.children[1]).css('color', 'grey');
            $(this).css('color', 'black');
        }
    });


    $(".near").on("click", function () {
        $("#near-mobile").css('top', '197px');
        $('.clear-nearest').css('display', 'flex');
        $('.esri-ui-bottom-right').css('bottom', '30px')
    });

    $(".near-lg").on("click", function () {
        $('.clear-nearest').css('display', 'flex');
    });

    $('#btn-clear').on('click', function () {
        $('.clear-nearest').css('display', 'none');
        if (screen.width < 1024) {
            $('.open-nearest').css('display', 'flex');
        }
    });

    $('#btn-warning').click(function () {
        $('popup-warning').css('display', 'none');
    });

    $('#campus-drop').click(() => {
        $('#campus-dropdown').slideToggle(330);
    });

    $('#parking-drop').click(() => {
        $('#parking-dropdown').slideToggle(330);
    })

    $('#graduation-drop').on('click', () => {
        $('#graduation-dropdown').slideToggle(330);
    });

    $('#connected-drop').on('click', () => {
        $('#connected-dropdown').slideToggle(330);
    })

    $('.open-nearest').click(() => {
        $('.open-nearest').css('display', 'none');
    });

    $('#popup-warning').click(() => {
        $('#popup-warning').css('display', 'none');
    })
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
    'dojo/fx'
], function (on, swipe, dom, domStyle, fx) {
    const slideTarget = dom.byId("near-mobile");
    let positionY = 0;

    on(slideTarget, swipe, function (evt) {
        if ((positionY + evt.dy) > -250) {
            domStyle.set(slideTarget, { top: (positionY + evt.dy) + "px" });
        }
        if ((positionY + evt.dy) >= 140) {
            domStyle.set(slideTarget, { top: "197px" });
            $('.open-nearest').css('display', 'flex');
            $('.esri-ui-bottom-right').css('bottom', '30px')
        }
    });

    on(slideTarget, swipe.end, function (evt) {
        if ((positionY + evt.dy) > -250) {
            positionY += (evt.dy - 1);
        }
        else {
            positionY = -250;
        }
    });

    on(dom.byId('open-nearest'), 'click', () => {
        fx.slideTo({
            node: slideTarget,
            top: '0',
            units: 'px'
        }).play();
        positionY = 0;
    })
})
