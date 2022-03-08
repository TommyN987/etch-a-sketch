// ******************************************************* 
// QUERY SELECTORS
// *******************************************************

const container = document.getElementById('container');
const btnClear = document.getElementById('btn-clear');
const btnNew = document.getElementById('btn-new-grid');
const btnBlack = document.getElementById('btn-black-grid');
const btnHex = document.getElementById('btn-hex-grid');
const btnEraser = document.getElementById('btn-eraser');

// ******************************************************* 
// BUTTON EVENT LISTENERS
// *******************************************************

btnClear.addEventListener('click', clearGrid);
btnNew.addEventListener('click', customGrid);
btnHex.addEventListener('click', changeToHex);
btnBlack.addEventListener('click', changeToBlack);
btnEraser.addEventListener('click', erase);

// ******************************************************* 

makeGrid(16); // CREATES INITIAL GRID

// ******************************************************* 

// ******************************************************* 
// HELPER FUNCTIONS
// *******************************************************

// RETURNS RANDOM HEX COLOR
function pickHexColor () {
  const hexParts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  let newColorArray = [];
  for (i = 0; i < 6; i++) {
    let colorIndex = Math.floor(Math.random() * hexParts.length);
    let newHexPart = hexParts[colorIndex];
    newColorArray.push(newHexPart);
  }
  let newColor = `#${newColorArray.join("")}`;
  return newColor;
}

// DELETES ALL GRID ITEMS IN THE CONTAINER
function removeGrid () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.remove();
  });
}

// *******************************************************
// GRID LAYOUT FUNCTIONS
// *******************************************************

function makeGrid (cols) {
  document.getElementById('container').style.gridTemplateColumns = `repeat(${cols}, 1fr)`; // adjusts CSS
  removeGrid(); 
  for (i = 0; i < (cols*cols); i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.addEventListener('mouseenter', blackColor);
    container.appendChild(gridItem);
  }
}

function customGrid() {
  cols = prompt('How many columns?');
  cols < 100 ? makeGrid(cols) : makeGrid(99);
}

// *******************************************************
// ITEM COLORING FUNCTIONS
// *******************************************************

function changeToBlack () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.removeEventListener('click', whiteColor);
    item.removeEventListener('mouseenter', hexColor);
    item.addEventListener('mouseenter', blackColor)});
}

function changeToHex () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    item.removeEventListener('click', whiteColor);
    item.removeEventListener('mouseenter', blackColor);
    item.addEventListener('mouseenter', hexColor)});
}

function blackColor (e) {
  e.target.style.backgroundColor = 'black';
}

function hexColor (e) {
  e.target.style.backgroundColor = `${pickHexColor()}`;
}

// *******************************************************
// ERASER FUNCTIONS
// *******************************************************

function clearGrid () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.style.backgroundColor = 'white';
  });
}

function erase () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    item.removeEventListener('mouseenter', blackColor);
    item.removeEventListener('mouseenter', hexColor);
    item.addEventListener('click', whiteColor)});
}

function whiteColor (e) {
  e.target.style.backgroundColor = 'white';
}