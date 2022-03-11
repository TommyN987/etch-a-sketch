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
const btnColorPicker = document.getElementById('btn-color-picker');
const hexText = document.getElementById('hex-text');
let activeEvent;
let activeHandler;
let activeButton;

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
  return toggler.checked ? 'click' : 'mouseenter';
}

// *******************************************************
// GRID LAYOUT FUNCTIONS
// *******************************************************

function makeGrid (cols) {
  document.getElementById('container').style.gridTemplateColumns = `repeat(${cols}, 1fr)`; // adjusts CSS
  removeGrid(); 
  for (i = 0; i < (cols*cols); i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.toggle('grid-item');
    gridItem.style.opacity = 1;
    gridItem.addEventListener(checkToggler(), addHexColor);
    container.appendChild(gridItem);
  }
  activeHandler = addHexColor;
  activeEvent = checkToggler();
  activeButton = btnHex;
  activeButton.classList.toggle('active');
}

function makeCustomGrid(event) {
  if (event.key === 'Enter') {
    const cols = customGrid.value;
    cols < 100 ? makeGrid(cols) : makeGrid(99);
  }
}

function activateButton (btn) {
  activeButton = btn;
  activeButton.classList.toggle('active');
}

// *******************************************************
// ITEM COLORING FUNCTIONS
// *******************************************************

function colorize (color) {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    const newItem = item.cloneNode(true);
    item.replaceWith(newItem);
    newItem.addEventListener(checkToggler(), color)});
  activeHandler = color;
  activeButton.classList.toggle('active');
}

function changeToBlack () {
  colorize (e => {
    e.target.style.backgroundColor = 'black';
    }
  );
  activateButton(btnBlack);
}

function changeToHex () {
  colorize (e => {
    e.target.style.backgroundColor = `${pickHexColor()}`;
    }
  );
  activateButton(btnHex);
}

function changeToShade () {
  colorize (e => {
    e.target.style.opacity -= 0.1;
    }
  );
  activateButton(btnShader);
}

function changeToUserPick () {
  colorize (e => {
    e.target.style.backgroundColor = `${colorPicker.value}`;
  });
  hexText.innerText = colorPicker.value;
  activateButton(btnColorPicker);
}

function addHexColor (e) {
  e.target.style.backgroundColor = `${pickHexColor()}`;
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
  colorize (whiteColor);
  activateButton(btnEraser);
}

function whiteColor (e) {
  e.target.style.backgroundColor = 'white';
  e.target.style.opacity = 1;
}

// *******************************************************
// TOGGLER FUNCTIONS
// *******************************************************

function toggleFlyAndClick () {
  colorize (activeHandler);
  activateButton(activeButton);
  activeEvent = checkActiveEvent();
}

function checkActiveEvent () {
  return activeEvent == 'mouseenter' ? 'click' : 'mouseenter';
}