import { grid, initializeLookupTables, resetGrid } from './grid';
import { Piece, collectPiecesSorted, matchPiecesToKeys, pieces } from './pieces';
import { solveWithDFS } from './dfs';

document.addEventListener('DOMContentLoaded', () => {
  // create ui elements
  initializeGridHtml(grid);
  initializePiecesHtml(pieces);

  initializeLookupTables(pieces);
  
  document.getElementById('solve-btn')?.addEventListener('click', () => {
    console.log('solving...');

    // reset the situation
    resetGrid();
    resetGridUi();

    try {
      // Collect pieces and sort them by size
      // Add keys to the pieces to enable lookup tables use
      const collectedPieces = matchPiecesToKeys(collectPiecesSorted());
      //console.log(collectedPieces);

      const solved = solveWithDFS(grid, collectedPieces);
      if (solved) {
        // update the ui
        updateGridUi();
      }
      else {
        console.log('No solution found');
      }
    } catch (e) {
      console.error(e);
      return;  
    }
  });
});

//
// some ui functions
//

// create grid and mark blocked cells
function initializeGridHtml(grid: number[][]): void {
  const gridContainer = document.querySelector('.grid');
  if (gridContainer) {
    gridContainer.innerHTML = '';
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (grid[i][j] < 0) {
          cell.classList.add('blocked');
        }
        gridContainer.appendChild(cell);
      }
    }
  }
}

// create pieces and input fields
function initializePiecesHtml(pieces: { [key: string]: Piece }) {
  const piecesContainer = document.querySelector('.pieces');

  if (piecesContainer) {
    piecesContainer.innerHTML = '';
    let tabIndex = 1;

    for (const [key, piece] of Object.entries(pieces)) {
      const pieceContainer = document.createElement('div');
      pieceContainer.className = 'piece-container';

      const labelElement = document.createElement('label');

      const pieceElement = document.createElement('span');
      pieceElement.className = `piece ${key}`;

      const inputElement = document.createElement('input');
      inputElement.type = 'number';
      inputElement.min = '0';
      inputElement.value = '0';
      inputElement.className = 'piece-quantity';
      inputElement.id = `${key}-qty`;
      inputElement.tabIndex = tabIndex++;

      labelElement.appendChild(pieceElement);
      labelElement.appendChild(inputElement);
      pieceContainer.appendChild(labelElement);
      piecesContainer.appendChild(pieceContainer);
    }
  }
}

// updates grid with the solution
function updateGridUi() {
  const gridContainer = document.querySelector('.grid');
  if (gridContainer) {
    const cells = gridContainer.querySelectorAll('.cell');
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const cellIndex = i * grid[i].length + j;
        const cell = cells[cellIndex];
        if (grid[i][j] > 0) {
          const textElement = document.createElement('span');
          textElement.className = 'cell-content';
          textElement.innerHTML = grid[i][j].toString();
          cell.appendChild(textElement);
        }
      }
    }
  }
}

// removes any solution from grid
function resetGridUi() {
  const gridContainer = document.querySelector('.grid');
  if (gridContainer) {
    const cells = gridContainer.querySelectorAll('.cell');
    cells.forEach(cell => {
      const textElement = cell.querySelector('.cell-content');
      if (textElement) {
        cell.removeChild(textElement);
      }
    });
  }
}
