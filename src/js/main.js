const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Type Method
TypeWriter.prototype.type = function () {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullTxt = this.words[current];

  // Check if deleting
  if (this.isDeleting) {
    // Remove a char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert Txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial Type speed
  let typeSpeed = 200;

  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // Check if the word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make a pause at end
    typeSpeed = this.wait;
    // Set deleting to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
};

// Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

const links = [
  {
    label: 'Week 1 Notes',
    url: '/portfolioWdd330/week1/',
  },
];

function addNotes() {
  links.forEach(item => {
    const liContent = `<a href='${item.url}'>${item.label}</a>`;
    const li = document.createElement('li');
    li.innerHTML = liContent;
    const ol = document.getElementById('list');
    ol.appendChild(li);
  });
}

addNotes();

const colors = ['red', 'blue', 'green', 'yellow', 'orange'];
const adjectives = ['bold', 'shy', 'strong', 'lazy', 'round', 'flat', 'old'];
const nouns = ['bike', 'cat', 'plate', 'computer', 'student', 'car', 'house'];
const numbers = [1, 4, 7, 34, 54, 234, 67, 89, 21, 12345];
const ships = [];

colors.forEach(item => {
  console.log(item);
});
