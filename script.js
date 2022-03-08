// ******************************************************* 
// QUERY SELECTORS
// *******************************************************

const container = document.getElementById('container');
const btnClear = document.getElementById('btn-clear');
const btnNew = document.getElementById('btn-new-grid');
const btnBlack = document.getElementById('btn-black');
const btnHex = document.getElementById('btn-hex');
const btnShader = document.getElementById('btn-shader');
const btnEraser = document.getElementById('btn-eraser');
const toggler = document.getElementById('toggleAll');

// ******************************************************* 
// BUTTON EVENT LISTENERS
// *******************************************************

btnClear.addEventListener('click', clearGrid);
btnNew.addEventListener('click', makeCustomGrid);
btnHex.addEventListener('click', changeToHex);
btnBlack.addEventListener('click', changeToBlack);
btnShader.addEventListener('click', changeToShade);
btnEraser.addEventListener('click', erase);

// ******************************************************* 

// CREATES INITIAL GRID

makeGrid(16); 

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

function checkToggler () {
  return toggler.checked == true ? 'click' : 'mouseenter';
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
    gridItem.style.opacity = 1;
    gridItem.addEventListener('mouseenter', addBlackColor);
    container.appendChild(gridItem);
  }
}

function makeCustomGrid() {
  cols = prompt('How many columns?');
  cols < 100 ? makeGrid(cols) : makeGrid(99);
}

// *******************************************************
// ITEM COLORING FUNCTIONS
// *******************************************************

function changeToBlack () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener('mouseenter', addBlackColor)});
}

function changeToHex () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener('mouseenter', addHexColor)});
}

function changeToShade () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener('mouseenter', addShade);
  });
}

function addBlackColor (e) {
  e.target.style.backgroundColor = 'black';
}

function addHexColor (e) {
  e.target.style.backgroundColor = `${pickHexColor()}`;
}

function addShade (e) {
  e.target.style.opacity -= 0.1;
}

// *******************************************************
// ERASER FUNCTIONS
// *******************************************************

function clearGrid () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.style.backgroundColor = 'white';
    item.style.opacity = 1;
  });
}

function erase () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener('mouseenter', whiteColor);
  });
}

function whiteColor (e) {
  e.target.style.backgroundColor = 'white';
  e.target.style.opacity = 1;
}