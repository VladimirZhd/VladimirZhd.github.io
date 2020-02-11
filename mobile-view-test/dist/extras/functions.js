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

// const basement = document.getElementById('0floor');
// const firstFloor = document.getElementById('1floor');
// const secondFloor = document.getElementById('2floor');
// const thirdFloor = document.getElementById('3floor');
// const fourthFloor = document.getElementById('4floor');
// const fifthFloor = document.getElementById('5floor');

// const config = { attributes: true };


// const callback = function (mutationList) {
//     mutationList.forEach(mutation => {
//         if (mutation.attributeName === 'class' && mutation.target.className == 'button-floor-selected') {
//             console.log(mutation.target.innerText);
//         }
//     })
// };

// const observer = new MutationObserver(callback);
// observer.observe(basement, config);
// observer.observe(firstFloor, config);
// observer.observe(secondFloor, config);
// observer.observe(thirdFloor, config);
// observer.observe(fourthFloor, config);
// observer.observe(fifthFloor, config);



