import { search } from './search.js';

const queryBox = document.getElementById('search');

queryBox.addEventListener('keyup', search);
