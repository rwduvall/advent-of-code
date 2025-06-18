import { example, puzzleInput } from './puzzleInputs/day4';

function findAllXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [0, 1], // right
    [1, 0], // down
    [1, 1], // diagonal down-right
    [-1, 1], // diagonal up-right
    [0, -1], // left
    [-1, 0], // up
    [-1, -1], // diagonal up-left
    [1, -1], // diagonal down-left
  ];

  const results = [];

  function checkXMAS(row, col, dir) {
    const word = [];
    for (let i = 0; i < 4; i++) {
      const newRow = row + i * dir[0];
      const newCol = col + i * dir[1];
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
        return false;
      }
      word.push(grid[newRow][newCol]);
    }
    return word.join('') === 'XMAS';
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const dir of directions) {
        if (checkXMAS(row, col, dir)) {
          results.push({ start: [row, col], direction: dir });
        }
      }
    }
  }

  return results;
}

// Example usage:
const wordSearch = puzzleInput.split('\n').map((row) => row.split(''));

const xmasInstances = findAllXMAS(wordSearch);
console.log(`Found ${xmasInstances.length} instances of XMAS:`);
// xmasInstances.forEach((instance, index) => {
//   console.log(`${index + 1}. Start: [${instance.start}], Direction: [${instance.direction}]`);
// });
