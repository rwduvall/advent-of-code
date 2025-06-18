type Coord = {
  row: number;
  col: number;
};

const exampleDay122014 = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`
  .split('\n')
  .map((line) => line.split(''));

function getSizeOfGarden(grid: string[][], coord: Coord, gardenChar: string): { gardenSize: number; perimeter: number } {
  let gardenSize = 0;
  let perimeter = 0;
  let queue: Coord[] = [coord];
  let pointsInGarden: Coord[] = [coord];

  while (queue.length > 0) {
    let firstItem = queue.shift();
    let row = firstItem.row;
    let col = firstItem.col;

    if (grid[row][col] == gardenChar) {
      gardenSize += 1;

      let up = row > 0 ? grid[row - 1][col] : 'out';
      let left = col > 0 ? grid[row][col - 1] : 'out';
      let right = col < grid[0].length - 1 ? grid[row][col + 1] : 'out';
      let down = row < grid.length - 1 ? grid[row + 1][col] : 'out';

      if (up == gardenChar) {
        queue.push({ row: row - 1, col });
        pointsInGarden.push({ row: row - 1, col });
      }

      if (left == gardenChar) {
        queue.push({ row: row, col: col - 1 });
        pointsInGarden.push({ row: row, col: col - 1 });
      }

      if (right == gardenChar) {
        queue.push({ row: row, col: col + 1 });
        pointsInGarden.push({ row: row, col: col + 1 });
      }

      if (down == gardenChar) {
        queue.push({ row: row + 1, col: col });
        pointsInGarden.push({ row: row + 1, col: col });
      }

      // how do i know its a middle
      // if all of them around are garden char, im in the middle
    }

    grid[row][col] = '+';
  }

  // some how i ended up with dupliates some times so just deduplicated the array here
  const uniqueSet = new Set();
  pointsInGarden.flat().forEach((antinode) => {
    uniqueSet.add(JSON.stringify(antinode));
  });
  pointsInGarden = Array.from(uniqueSet).map((antinodeStr) => JSON.parse(antinodeStr as string));

  const upEdgePoints: Coord[] = [];
  const leftEdgePoints: Coord[] = [];
  const rightEdgePoints: Coord[] = [];
  const downEdgePoints: Coord[] = [];

  for (let point of pointsInGarden) {
    const row = point.row;
    const col = point.col;

    let up = row > 0 ? grid[row - 1][col] : '-';
    let left = col > 0 ? grid[row][col - 1] : '-';
    let right = col < grid[0].length - 1 ? grid[row][col + 1] : '-';
    let down = row < grid.length - 1 ? grid[row + 1][col] : '-';

    if (up !== '+') upEdgePoints.push({ row, col });
    if (left !== '+') leftEdgePoints.push({ row, col });
    if (right !== '+') rightEdgePoints.push({ row, col });
    if (down !== '+') downEdgePoints.push({ row, col });
  }

  upEdgePoints.sort((a, b) => a.row - b.row);
  leftEdgePoints.sort((a, b) => a.col - b.col);
  downEdgePoints.sort((a, b) => a.row - b.row);
  rightEdgePoints.sort((a, b) => a.col - b.col);

  const upWallLength = lengthOfTopWall(upEdgePoints);
  const downWallLength = lengthOfTopWall(downEdgePoints);
  const rightWallLength = lengthOfRightWall(rightEdgePoints);
  const leftWallLength = lengthOfRightWall(leftEdgePoints);
  perimeter = upWallLength + downWallLength + rightWallLength + leftWallLength;

  //   console.log({ gardenChar, upEdgePoints, leftEdgePoints, rightEdgePoints, downEdgePoints });

  for (let point of pointsInGarden) {
    const row = point.row;
    const col = point.col;

    grid[row][col] = '.';
  }

  return { gardenSize, perimeter };
}

function getGardenSizes(grid: string[][]) {
  const gardenSizes = {};
  let result = 0;
  for (let row in grid) {
    for (let col in grid[row]) {
      const character = grid[row][col];
      if (character != '.') {
        const sizeOfGarden = getSizeOfGarden(exampleDay122014, { row: Number(row), col: Number(col) }, character);
        const key = character + row + col;
        gardenSizes[key] = sizeOfGarden;
        result += sizeOfGarden.gardenSize * sizeOfGarden.perimeter;
      }
    }
  }
  console.log(gardenSizes);
  return result;
}

console.log(getGardenSizes(exampleDay122014));

function lengthOfTopWall(points: Coord[]) {
  let wallSpans = [];
  let currentSpanLength;
  // while the row is the same check if the col is the same, if it is the same add to currentSpanLength
  for (let i = 0; i < points.length; i++) {
    if (i === 0 || points[i].row !== points[i - 1].row) {
      if (currentSpanLength) {
        wallSpans.push(currentSpanLength);
      }
      currentSpanLength = 1;
    } else if (points[i].col === points[i - 1].col + 1) {
      currentSpanLength++;
    } else {
      wallSpans.push(currentSpanLength);
      currentSpanLength = 1;
    }
  }
  if (currentSpanLength) {
    wallSpans.push(currentSpanLength);
  }
  console.log('top', wallSpans.length);
  return wallSpans.length;
}

function lengthOfRightWall(points: Coord[]) {
  let wallSpans = [];
  let currentSpanLength;
  // while the col is the same check the row, if it is the same add to currentSpanLength. if its different add the currentSpanLength to wallSpans
  for (let i = 0; i < points.length; i++) {
    if (i === 0 || points[i].col !== points[i - 1].col) {
      if (currentSpanLength) {
        wallSpans.push(currentSpanLength);
      }
      currentSpanLength = 1;
    } else if (points[i].row === points[i - 1].row + 1) {
      currentSpanLength++;
    } else {
      wallSpans.push(currentSpanLength);
      currentSpanLength = 1;
    }
  }
  if (currentSpanLength) {
    wallSpans.push(currentSpanLength);
  }
  return wallSpans.length;
}
