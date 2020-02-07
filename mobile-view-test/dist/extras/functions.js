// jquery functions for transitions 
$(document).ready(function () {
    //function to show the sliding menu
    $(".button-menu").click(function () {
        $(".hide").animate({ left: "0" });
    });
    //function to hide the sliding menu
    $(".button-close").click(function () {
        $(".hide").animate({ left: "-340px" });
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
        console.log(toggle);
        item = "";
    });

});
/* function to identify if user is using desktop or mobile device*/
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function whatFloorIsActive() {
    let activeClass = "button-floor-selected";
    let basement = document.getElementById('0floor');
    basement.onclick = function () {
        let basementClass = basement.className;
        if (basementClass == activeClass) {
            console.log(basementClass);
            return basement.innerText;
        }
    }

    let firstFloor = document.getElementById('1floor');
    firstFloor.onclick = function () {
        let firstFloorClass = firstFloor.className;
        if (firstFloorClass == activeClass) {
            return firstFloor.innerHTML;
        }
    }
}
