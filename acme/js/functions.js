/************************************
 * ACME website JavaScript Functions
************************************/ 

console.log("My JavaScript is being read.");
let acmeUrl = './js/acme.json';
let pageNav = document.getElementById('nav-bar');


    fetch (acmeUrl)
    .then(function(response) {
        if (response.ok) {
            return response.json(); 
        }

        throw new ERROR('Network response was not OK.');
    })
    .then (function(data) {
        console.log(data);
        let count = Object.keys(data).length;
        console.log(count);
        let pageLink = ' ';

        for (let i = 0; i < data.navigation.length; i++) {
            pageLink += '<li><a href = "#">' + data.navigation[i] + '</a></li>';
        }
        console.log(pageLink);
        document.getElementById('navbar-list').innerHTML = pageLink;


    })

    .catch(function(error){
        console.log('There was a fetch problem: ', error.message);
})

pageNav.addEventListener('click', function(evt){

    let sectionA = document.getElementById('section-a');
    let sectionB = document.getElementById('section-b');
    // get page name
    let pageName = evt.target.innerHTML;
    console.log(pageName);
    switch (pageName) {
      case "Anvils":
      case "Explosives":
      case "Decoys":
      case "Traps":
        sectionA.setAttribute("class", "hide");
        sectionB.setAttribute("class", " ");
        evt.preventDefault();    
        break;
      case "Home":
        document.getElementById('page-title').innerHTML = 'Welcome to Acme!';
        sectionA.setAttribute("class", " ");
        sectionB.setAttribute("class", "hide");
        evt.preventDefault();
        break;
    }

    fetch(acmeUrl)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new ERROR('Network response was not ok.');
    })
    .then(function(data) {
        console.log(data);

        let g = data[pageName];

        let itemDesc = g.description;
        let itemManuf = g.manufacturer;
        let itemName = g.name; 
        let itemPicture = g.path;
        let itemPrice = g.price;
        let itemReview = g.reviews;

        console.log(itemPicture);


        let pageTitle = document.getElementById('title');

        let pageNameNode = document.createTextNode(pageName);

        if (pageTitle.childNodes.length > 1) {
            pageTitle.removeChild(pageTitle.childNodes[0]);
        }
        pageTitle.insertBefore(pageNameNode, pageTitle.childNodes[0]);

        document.getElementById('page-title').innerHTML = itemName;
        document.getElementById('item-img').innerHTML = '<img src = "' + itemPicture + '"' + ' alt = "' + itemName + '"' + ' id = "item-pic">';
        document.getElementById('desc').innerHTML = itemDesc;
        document.getElementById('made').innerHTML = '<span class = "man-rev">Made by: </span>' + itemManuf;
        document.getElementById('item-reviews').innerHTML = '<span class = "man-rev">Reviews: </span>' + itemReview + ' / 5 stars';
        document.getElementById('price').innerHTML = 'Price: $' + itemPrice;
    })
    .catch(function(error){
        console.log('There was a fetch problem: ', error.message);
    })
})


    