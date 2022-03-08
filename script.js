const container = document.getElementById('container');
const btnClear = document.getElementById('btn-clear');
const btnNew = document.getElementById('btn-new-grid');

btnClear.addEventListener('click', clearGrid);
btnNew.addEventListener('click', customGrid);

makeGrid(16);

// deletes all grid items in #container
function restartGrid () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.remove();
  });
}

function makeGrid (cols) {
  document.getElementById('container').style.gridTemplateColumns = `repeat(${cols}, 1fr)`; // adjusts CSS
  restartGrid(); 
  for (i = 0; i < (cols*cols); i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.addEventListener('mouseenter', changeColor);
    container.appendChild(gridItem);
  }
}

function customGrid() {
  cols = prompt('How many cols?');
  makeGrid(cols);
}

function clearGrid () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.classList.remove('black');
  });
}

function changeColor (e) {
  e.target.classList.add('black');
}

