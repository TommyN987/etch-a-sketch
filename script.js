// ******************************************************* 
// QUERY SELECTORS
// *******************************************************

const container = document.getElementById('container');
const btnClear = document.getElementById('btn-clear');
const btnBlack = document.getElementById('btn-black');
const btnHex = document.getElementById('btn-hex');
const btnShader = document.getElementById('btn-shader');
const btnEraser = document.getElementById('btn-eraser');
const toggler = document.getElementById('toggleAll');
const customGrid = document.getElementById('custom-cols');
const colorPicker = document.querySelector('input[type=color]');
const hexText = document.getElementById('hex-text');
let activeEvent;
let activeHandler;

// ******************************************************* 
// BUTTON EVENT LISTENERS
// *******************************************************

btnClear.addEventListener('click', clearGrid);
btnHex.addEventListener('click', changeToHex);
btnBlack.addEventListener('click', changeToBlack);
btnShader.addEventListener('click', changeToShade);
btnEraser.addEventListener('click', erase);
customGrid.addEventListener('keypress', makeCustomGrid);
colorPicker.addEventListener('input', changeToUserPick);
toggler.addEventListener('change', toggleFlyAndClick);

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
    gridItem.addEventListener(checkToggler(), addHexColor);
    container.appendChild(gridItem);
  }
  activeHandler = addHexColor;
  activeEvent = checkToggler();
}

function makeCustomGrid(event) {
  if (event.key == 'Enter') {
    const cols = customGrid.value;
    cols < 100 ? makeGrid(cols) : makeGrid(99);
  }
}

// *******************************************************
// ITEM COLORING FUNCTIONS
// *******************************************************

function changeToBlack () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener(checkToggler(), addBlackColor)});
  activeEvent = checkToggler();
  activeHandler = addBlackColor;
}

function changeToHex () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener(checkToggler(), addHexColor)});
  activeEvent = checkToggler();
  activeHandler = addHexColor;
}

function changeToShade () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener(checkToggler(), addShade);
  });
  activeEvent = checkToggler();
  activeHandler = addShade;
}

function changeToUserPick () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener(checkToggler(), addPickedColor);
  });
  hexText.innerText = colorPicker.value;
  activeEvent = checkToggler();
  activeHandler = addPickedColor;
}

function addPickedColor (e) {
  e.target.style.backgroundColor = `${colorPicker.value}`;
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
    newItem.addEventListener(checkToggler(), whiteColor);
  });
  activeEvent = checkToggler();
  activeHandler = whiteColor;
}

function whiteColor (e) {
  e.target.style.backgroundColor = 'white';
  e.target.style.opacity = 1;
}

// *******************************************************
// TOGGLER FUNCTIONS
// *******************************************************

function toggleFlyAndClick () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener(checkActiveEvent(), activeHandler);
  });
  activeEvent = checkActiveEvent();
}

function checkActiveEvent () {
  return activeEvent == 'mouseenter' ? 'click' : 'mouseenter';
}