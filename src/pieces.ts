
import { getPieceSize } from "./utils";
import { gridSize } from './grid';

export interface Piece {
  shape: number[][];
  name? : string; // optional name property
}

export const pieces: { [key: string]: Piece } = {
  piece1x1: { shape: [[1]] },
  piece1x2: { shape: [[1], [1]] },
  piece2x1: { shape: [[1, 1]] },
  piece2x2: { shape: [[1, 1], [1, 1]] },
  piece1x3: { shape: [[1], [1], [1]] },
  piece3x1: { shape: [[1, 1, 1]] },
  piece1x4: { shape: [[1], [1], [1], [1]] },
  piece4x1: { shape: [[1, 1, 1, 1]] }
};

// from the ui elements, collect the pieces and their quantities
export function collectPiecesSorted(): Piece[] {
  const collectedPieces: Piece[] = [];

  let totalSize = 0;

  for (const [key, piece] of Object.entries(pieces)) {
    const inputElement = document.getElementById(`${key}-qty`) as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);

    // sanity check
    totalSize += getPieceSize(piece) * quantity;
    if (totalSize > gridSize) {
      throw new Error('Total size of pieces exceeds grid size');
    }

    for (let i = 0; i < quantity; i++) {
      collectedPieces.push(piece);
    }
  }

  // Sort collected pieces by size (number of elements in the 2D array)
  collectedPieces.sort((a, b) => getPieceSize(b) - getPieceSize(a));

  return collectedPieces;
}

// add name of the piece to each of the pieces, makes lookups easier
export function matchPiecesToKeys(piecesToSolve: Piece[]): Piece[] {
  return piecesToSolve.map(pieceToSolve => {
    const shapeStr = JSON.stringify(pieceToSolve.shape);
    const matched = Object.keys(pieces).find(key => JSON.stringify(pieces[key].shape) === shapeStr);

    if (matched) {
      return { ...pieceToSolve, name: matched };
    } else {
      throw new Error(`No matching piece found for shape: ${shapeStr}`);
    }
  });
}
