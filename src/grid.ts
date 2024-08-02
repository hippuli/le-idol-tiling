import { Piece } from './pieces';
import { canPlacePiece } from './utils';

export const grid: number[][] = [
  [ -1,  0,  0,  0, -1],
  [  0,  0,  0,  0,  0],
  [  0,  0, -1,  0,  0],
  [  0,  0,  0,  0,  0],
  [ -1,  0,  0,  0, -1]
];

export const gridSize: number = grid.reduce((total, row) => total + row.filter(cell => cell === 0).length, 0);

// lookup table for pieces, tells all the positions a piece is possible to put
export const pieceLookupTables: { [key: string]: [number, number][] } = {};

// initializes said lookup tables
export function initializeLookupTables(pieces: { [key: string]: Piece }) {
  console.log('initializing lookup tables');

  // run thru all pieces
  for (const [key, piece] of Object.entries(pieces)) {
    const lookupTable: [number, number][] = [];

    // run thru all grid places
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (canPlacePiece(grid, piece, i, j)) {
          lookupTable.push([i, j]);
        }
      }
    }

    pieceLookupTables[key] = lookupTable;
  }
}

// returns grid to initial configuration
export function resetGrid() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] > 0) {
        grid[i][j] = 0;
      }
    }
  }
}
