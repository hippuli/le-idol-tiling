import { Piece } from './pieces';
import { pieceLookupTables } from './grid';
import { canPlacePiece, placePiece, removePiece } from './utils';

// basic recursive depth-first search algorithm
export function solveWithDFS(grid: number[][], pieces: Piece[], pieceIndex: number = 0): boolean {
  if (pieceIndex >= pieces.length) {
    return true;
  }

  const piece = pieces[pieceIndex];
  const pieceKey : string = piece['name'] ?? '';
  const positions = pieceLookupTables[pieceKey];

  for (const [row, col] of positions) {
    if (canPlacePiece(grid, piece, row, col)) {

      // place the piece, and call the same function recursively, finally remove the piece
      placePiece(grid, piece, row, col, pieceIndex + 1);
      if (solveWithDFS(grid, pieces, pieceIndex + 1)) {
        return true;
      }
      removePiece(grid, piece, row, col, pieceIndex + 1);
    }
  }

  return false;
}
