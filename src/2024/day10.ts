import { input } from './puzzleInputs/day10';

const grid = input.split('\n').map((line) => line.split('').map(Number));

type TrailLocation = {
  x: number;
  y: number;
  currentHeight: number;
};

function searchGrid(grid, currentLocation: TrailLocation) {
  const searchHeight = currentLocation.currentHeight + 1;
  const { x, y } = currentLocation;
  let foundCoord: TrailLocation[] = [];

  if (grid[x + 1] && grid[x + 1][y] === searchHeight) {
    foundCoord.push({ x: x + 1, y, currentHeight: searchHeight });
  }
  if (grid[x - 1] && grid[x - 1][y] === searchHeight) {
    foundCoord.push({ x: x - 1, y, currentHeight: searchHeight });
  }
  if (grid[x][y + 1] && grid[x][y + 1] === searchHeight) {
    foundCoord.push({ x, y: y + 1, currentHeight: searchHeight });
  }
  if (grid[x][y - 1] && grid[x][y - 1] === searchHeight) {
    foundCoord.push({ x, y: y - 1, currentHeight: searchHeight });
  }

  return foundCoord;
}

function findTrail(grid: number[][], startPosition: TrailLocation) {
  const queue: TrailLocation[] = [startPosition];

  let peaksFound: TrailLocation[] = [];
  while (queue.length > 0) {
    const currentLocation = queue.shift();
    const foundItems = searchGrid(grid, currentLocation);

    foundItems.forEach((location) => {
      if (location.currentHeight === 9) peaksFound.push(location);
      queue.push(location);
    });
  }

  const uniquePeaksFound = new Set();
  peaksFound.forEach((peak) => {
    uniquePeaksFound.add(`${peak.x}${peak.y}`);
  });

  //   return uniquePeaksFound.size; // part 1
  return peaksFound.length; // part 2
}
const trailheads = [];
grid.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
    if (cell === 0) {
      trailheads.push({ x: rowIndex, y: colIndex, currentHeight: cell });
    }
  });
});
console.log({ trailheads });
let trailheadsWithTrailToAPeak = 0;
trailheads.forEach((trailhead) => {
  trailheadsWithTrailToAPeak += findTrail(grid, trailhead);
});
console.log({ trailheadsWithTrailToAPeak });
