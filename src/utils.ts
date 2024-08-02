import { Piece } from './pieces';

// return the number of cells occupied by the piece
export function getPieceSize(piece: Piece): number {
  // TODO: should probably only calculate actual cells used, for example in L shaped piece
  return piece.shape.reduce((sum, row) => sum + row.length, 0);
}

// tests if piece can be places on the requested place
export function canPlacePiece(grid: number[][], piece: Piece, startX: number, startY: number): boolean {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j] === 1) {
        const x = startX + i;
        const y = startY + j;
        
        // Check if the piece is out of grid bounds
        if (x >= grid.length || y >= grid[0].length) {
          return false;
        }

        // Check if the cell is blocked or already occupied
        if (grid[x][y] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

// mark the cells as occupied
export function placePiece(grid: number[][], piece: Piece, startX: number, startY: number, index: number): void {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j] === 1) {
        // sanity check
        if (grid[startX + i][startY + j] !== 0) {
          throw new Error('Trying to place piece on occupied cell');
        }
        
        // mark as occupied
        grid[startX + i][startY + j] = index;
      }
    }
  }
}

// unmark the cells as occupied
export function removePiece(grid: number[][], piece: Piece, startX: number, startY: number, index: number): void {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (piece.shape[i][j] === 1) {
        // sanity check
        if (grid[startX + i][startY + j] !== index) {
          throw new Error('Trying to remove piece from unoccupied cell');
        }

        // unmark as occupied
        grid[startX + i][startY + j] = 0;
      }
    }
  }
}
