define([
    'dojo/_base/declare'
], function (declare) {
    return declare(null, {
        activeFloorNumber: null,


        findActiveFloor: function () {
            const basement = document.getElementById('0floor');
            const firstFloor = document.getElementById('1floor');
            const secondFloor = document.getElementById('2floor');
            const thirdFloor = document.getElementById('3floor');
            const fourthFloor = document.getElementById('4floor');
            const fifthFloor = document.getElementById('5floor');

            const config = { attributes: true };


            const callback = function (mutationList) {
                mutationList.forEach(mutation => {
                    if (mutation.attributeName === 'class' && mutation.target.className == 'button-floor-selected') {
                        console.log(mutation.target.innerText);
                        this.activeFloorNumber = mutation.target.innerText;
                    }
                })
            };

            const observer = new MutationObserver(callback);
            observer.observe(basement, config);
            observer.observe(firstFloor, config);
            observer.observe(secondFloor, config);
            observer.observe(thirdFloor, config);
            observer.observe(fourthFloor, config);
            observer.observe(fifthFloor, config);
        }
    })
})