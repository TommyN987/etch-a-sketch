const container = document.getElementById('container');
const btnClear = document.getElementById('btn-clear');

function makeGrid (cols) {
  for (i = 0; i < (cols*cols); i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.addEventListener('mouseenter', changeColor);
    container.appendChild(gridItem);
  }
}

makeGrid(16);

function changeColor (e) {
  e.target.classList.add('black');
}

function clearGrid () {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach(item => {
    item.classList.remove('black');
  });
}

btnClear.addEventListener('click', clearGrid);