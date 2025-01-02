const warehouseString = `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########`;

const instructions = `<^^>>>vv<v>>v<<`.replace('\n', '');

const warehouse = warehouseString.split('\n').map((row) => row.split(''));

let robotCurrentPosition: { row: number; col: number } = findRobot();

// Part 1

function moveRobot(direction: string) {
  // ^ for up, v for down, < for left, > for right
  switch (direction) {
    case '^':
      moveUp();
      break;
    case 'v':
      moveDown();
      break;
    case '<':
      moveLeft();
      break;
    case '>':
      moveRight();
      break;
  }
}

function moveLeft() {
  const floorSpaceToLeft = warehouse[robotCurrentPosition.row][robotCurrentPosition.col - 1];
  if (floorSpaceToLeft === '#') return; // hit a wall so can't move
  if (floorSpaceToLeft === '.') {
    // safe to move left, set old spot to empty and move robot(@)
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
    robotCurrentPosition = { row: robotCurrentPosition.row, col: robotCurrentPosition.col - 1 };
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    return;
  }
  if (floorSpaceToLeft === 'O') {
    let spaceToLeftIndex = robotCurrentPosition.col - 1;
    let charToLeft = warehouse[robotCurrentPosition.row][spaceToLeftIndex];
    do {
      spaceToLeftIndex--;
      charToLeft = warehouse[robotCurrentPosition.row][spaceToLeftIndex];
    } while (charToLeft === 'O');
    if (charToLeft === '.') {
      // save to move all the O over
      warehouse[robotCurrentPosition.row][spaceToLeftIndex] = 'O';
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
      robotCurrentPosition = { row: robotCurrentPosition.row, col: robotCurrentPosition.col - 1 };
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    }
    if (charToLeft === '#') return; // can't move b/c boxes hit a wall
  }
  //   return warehouse;
}

function moveDown() {
  const floorSpaceAbove = warehouse[robotCurrentPosition.row + 1][robotCurrentPosition.col];
  if (floorSpaceAbove === '#') return; // hit a wall so can't move
  if (floorSpaceAbove === '.') {
    // safe to move left, set old spot to empty and move robot(@)
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
    robotCurrentPosition = { row: robotCurrentPosition.row + 1, col: robotCurrentPosition.col };
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    return;
  }
  if (floorSpaceAbove === 'O') {
    let spaceAboveIndex = robotCurrentPosition.row + 1;
    let charToLeft = warehouse[spaceAboveIndex][robotCurrentPosition.col];
    do {
      spaceAboveIndex++;
      charToLeft = warehouse[spaceAboveIndex][robotCurrentPosition.col];
    } while (charToLeft === 'O');
    if (charToLeft === '.') {
      // safe to move all the O over
      warehouse[spaceAboveIndex][robotCurrentPosition.col] = 'O';
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
      robotCurrentPosition = { row: robotCurrentPosition.row + 1, col: robotCurrentPosition.col };
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    }
    if (charToLeft === '#') return; // can't move b/c boxes hit a wall
  }
}

function moveUp() {
  const floorSpaceAbove = warehouse[robotCurrentPosition.row - 1][robotCurrentPosition.col];
  if (floorSpaceAbove === '#') return; // hit a wall so can't move
  if (floorSpaceAbove === '.') {
    // safe to move left, set old spot to empty and move robot(@)
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
    robotCurrentPosition = { row: robotCurrentPosition.row - 1, col: robotCurrentPosition.col };
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    return;
  }
  if (floorSpaceAbove === 'O') {
    let spaceAboveIndex = robotCurrentPosition.row - 1;
    let charToLeft = warehouse[spaceAboveIndex][robotCurrentPosition.col];
    do {
      spaceAboveIndex--;
      charToLeft = warehouse[spaceAboveIndex][robotCurrentPosition.col];
    } while (charToLeft === 'O');
    if (charToLeft === '.') {
      // safe to move all the O over
      warehouse[spaceAboveIndex][robotCurrentPosition.col] = 'O';
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
      robotCurrentPosition = { row: robotCurrentPosition.row - 1, col: robotCurrentPosition.col };
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    }
    if (charToLeft === '#') return; // can't move b/c boxes hit a wall
  }
}

function moveRight() {
  const floorSpaceToRight = warehouse[robotCurrentPosition.row][robotCurrentPosition.col + 1];
  if (floorSpaceToRight === '#') return; // hit a wall so can't move
  if (floorSpaceToRight === '.') {
    // safe to move Right, set old spot to empty and move robot(@)
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
    robotCurrentPosition = { row: robotCurrentPosition.row, col: robotCurrentPosition.col + 1 };
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    return;
  }
  if (floorSpaceToRight === 'O') {
    let spaceToRightIndex = robotCurrentPosition.col + 1;
    let charToRight = warehouse[robotCurrentPosition.row][spaceToRightIndex];
    while (charToRight === 'O') {
      spaceToRightIndex++;
      charToRight = warehouse[robotCurrentPosition.row][spaceToRightIndex];
    }
    if (charToRight === '.') {
      // safe to move all the O over
      warehouse[robotCurrentPosition.row][spaceToRightIndex] = 'O';
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
      warehouse[robotCurrentPosition.row][robotCurrentPosition.col + 1] = '@';
      robotCurrentPosition = { row: robotCurrentPosition.row, col: robotCurrentPosition.col + 1 };
    }
    if (charToRight === '#') return; // can't move b/c boxes hit a wall
  }
}

// for (let arrow of instructions) {
//   //   console.log(`Move ${arrow}:`);
//   moveRobot(arrow);
//   //   console.log(warehouse.map((row) => row.join('')).join('\n'));
//   //   console.log();
// }

// let sumOfGPS = 0;
// for (let i = 0; i < warehouse.length; i++) {
//   for (let j = 0; j < warehouse[0].length; j++) {
//     if (warehouse[i][j] === 'O') sumOfGPS += 100 * i + j;
//   }
// }
// console.log(warehouse.map((row) => row.join('')).join('\n'));
// console.log({ sumOfGPS });

// Part 2
warehouse.map((row) =>
  row
    .map((space) => {
      if (space === '#') return ['#', '#'];
      if (space === 'O') return ['[', ']'];
      if (space === '.') return ['.', '.'];
      if (space === '@') return ['@', '.'];
    })
    .flat()
);

function findRobot(): { row: number; col: number } {
  let robotIndex;
  const rowWithRobot = warehouse.findIndex((row) => {
    const index = row.findIndex((char) => char === '@');
    if (index > -1) robotIndex = index;
    return robotIndex > -1;
  });

  return { row: rowWithRobot, col: robotIndex };
}

function moveLargeRobot(direction: string) {
  // ^ for up, v for down, < for left, > for right
  switch (direction) {
    case '^':
      largeMoveUp();
      break;
    case 'v':
      largeMoveDown();
      break;
    case '<':
      moveRobotHorizontally('left');
      break;
    case '>':
      moveRobotHorizontally('right');
      break;
  }
  robotCurrentPosition = findRobot();
  console.log(warehouse.map((row) => row.join('')).join('\n'));
}

function findBoxesAbove(currentRow: number, currentCol: number): { row: number; col: number }[] {
  const boxes: { row: number; col: number }[] = [];
  const floorSpaceAbove = warehouse[currentRow - 1][currentCol];

  if (floorSpaceAbove === ']') {
    boxes.push({ row: currentRow, col: currentCol });
    // item below
    boxes.push({ row: currentRow - 1, col: currentCol });
    boxes.push(...findBoxesAbove(currentRow - 1, currentCol));
    // other side of box
    boxes.push({ row: currentRow - 1, col: currentCol - 1 });
    boxes.push(...findBoxesAbove(currentRow - 1, currentCol - 1));
  }

  if (floorSpaceAbove === '[') {
    boxes.push({ row: currentRow, col: currentCol });
    // item below
    boxes.push({ row: currentRow - 1, col: currentCol });
    boxes.push(...findBoxesAbove(currentRow - 1, currentCol));
    // other side of box
    boxes.push({ row: currentRow - 1, col: currentCol + 1 });
    boxes.push(...findBoxesAbove(currentRow - 1, currentCol + 1));
  }

  // deduplicate box spaces
  return makeUniqueSpaces(boxes);
}

/// utility function to deduplicate box spaces array
function makeUniqueSpaces(boxes: { row: number; col: number }[]) {
  const uniqueSpacesSet = new Set();
  boxes.flat().forEach((antinode) => {
    uniqueSpacesSet.add(JSON.stringify(antinode));
  });
  const uniqueSpaces = Array.from(uniqueSpacesSet).map((spaceString) => JSON.parse(spaceString as string));
  // this is missing some of the spaces still. Missing left side of box just below the robot
  const sorted = uniqueSpaces.sort((a, b) => a.row - b.row);
  return sorted;
}

function findBoxesBelow(currentRow: number, currentCol: number): { row: number; col: number }[] {
  const boxes: { row: number; col: number }[] = [];
  const floorSpaceBelow = warehouse[currentRow + 1][currentCol];

  if (floorSpaceBelow === ']') {
    boxes.push({ row: currentRow, col: currentCol });
    // item below
    boxes.push({ row: currentRow + 1, col: currentCol });
    boxes.push(...findBoxesBelow(currentRow + 1, currentCol));
    // other side of box
    boxes.push({ row: currentRow + 1, col: currentCol - 1 });
    boxes.push(...findBoxesBelow(currentRow + 1, currentCol - 1));
  }

  if (floorSpaceBelow === '[') {
    boxes.push({ row: currentRow, col: currentCol });
    // item below
    boxes.push({ row: currentRow + 1, col: currentCol });
    boxes.push(...findBoxesBelow(currentRow + 1, currentCol));
    // other side of box
    boxes.push({ row: currentRow + 1, col: currentCol + 1 });
    boxes.push(...findBoxesBelow(currentRow + 1, currentCol + 1));
  }

  // deduplicate box spaces
  return makeUniqueSpaces(boxes);
}

function canMoveDown():
  | boolean
  | {
      row: number;
      col: number;
    }[] {
  let canMove: boolean;
  if (warehouse[robotCurrentPosition.row + 1][robotCurrentPosition.col] === '#') {
    canMove = false;
  }
  if (warehouse[robotCurrentPosition.row + 1][robotCurrentPosition.col] === '.') {
    canMove = true;
  }
  const boxSpaces = findBoxesBelow(robotCurrentPosition.row, robotCurrentPosition.col);
  boxSpaces.forEach((boxSpace) => {
    if (warehouse[boxSpace.row + 1][boxSpace.col] === '#') {
      canMove = false;
    }
  });
  if (canMove === undefined) return boxSpaces;
  return canMove;
}

function canMoveUp():
  | boolean
  | {
      row: number;
      col: number;
    }[] {
  let canMove: boolean;
  const boxSpaces = findBoxesAbove(robotCurrentPosition.row, robotCurrentPosition.col);
  if (warehouse[robotCurrentPosition.row - 1][robotCurrentPosition.col] === '#') canMove = false;
  if (warehouse[robotCurrentPosition.row - 1][robotCurrentPosition.col] === '.') canMove = true;

  boxSpaces.forEach((boxSpace) => {
    if (warehouse[boxSpace.row - 1][boxSpace.col] === '#') {
      canMove = false;
    }
  });
  if (canMove === undefined) return boxSpaces;
  return canMove;
}

function largeMoveDown() {
  const down = canMoveDown();
  if (down == true) {
    warehouse[robotCurrentPosition.row + 1][robotCurrentPosition.col] = '@';
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
  }
  // if down is not a boolean
  if (Array.isArray(down)) {
    // reverse the array so we can move the boxes in the correct order
    down.reverse();
    down.forEach((boxSpace) => {
      warehouse[boxSpace.row + 1][boxSpace.col] = warehouse[boxSpace.row][boxSpace.col];
      warehouse[boxSpace.row][boxSpace.col] = '.';
    });
    // pull each one down
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
  }
  robotCurrentPosition = findRobot();
}

function largeMoveUp() {
  const up = canMoveUp();
  if (up == true) {
    warehouse[robotCurrentPosition.row - 1][robotCurrentPosition.col] = '@';
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
  }
  if (Array.isArray(up)) {
    up.forEach((boxSpace) => {
      warehouse[boxSpace.row - 1][boxSpace.col] = warehouse[boxSpace.row][boxSpace.col];
      warehouse[boxSpace.row][boxSpace.col] = '.';
    });
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
  }
  robotCurrentPosition = findRobot();
}

function moveRobotHorizontally(direction: 'left' | 'right') {
  let spaceIndex = direction === 'left' ? robotCurrentPosition.col - 1 : robotCurrentPosition.col + 1;
  const floorSpace = warehouse[robotCurrentPosition.row][spaceIndex];
  if (floorSpace === '#') return; // hit a wall so can't move
  if (floorSpace === '.') {
    // safe to move, set old spot to empty and move robot(@)
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '.';
    robotCurrentPosition = { row: robotCurrentPosition.row, col: spaceIndex };
    warehouse[robotCurrentPosition.row][robotCurrentPosition.col] = '@';
    return;
  }

  if (floorSpace === '[' || floorSpace === ']') {
    let charToSide = warehouse[robotCurrentPosition.row][spaceIndex];
    do {
      spaceIndex = direction === 'left' ? spaceIndex - 1 : spaceIndex + 1;
      charToSide = warehouse[robotCurrentPosition.row][spaceIndex];
    } while (charToSide === '[' || charToSide === ']');
    if (charToSide === '.') {
      // safe to move all the boxes over
      warehouse[robotCurrentPosition.row].splice(spaceIndex, 1);
      warehouse[robotCurrentPosition.row].splice(robotCurrentPosition.col, 0, '.');
    } else if (charToSide === '#') return; // can't move b/c boxes hit a wall
  }
  robotCurrentPosition = findRobot();
}

async function moveBot() {
  console.log(warehouse.map((row) => row.join('')).join('\n'));

  let loopCountForAnnimation = 0;
  for (let arrow of instructions) {
    console.log(`Move ${loopCountForAnnimation} ${arrow}:`);
    moveLargeRobot(arrow);
    // sleep for 1 second for the animation in the console
    await new Promise((resolve) => setTimeout(resolve, 1));
    loopCountForAnnimation++;
    console.log();
  }
  let sumOfGPS = 0;
  for (let i = 0; i < warehouse.length; i++) {
    for (let j = 0; j < warehouse[0].length; j++) {
      if (warehouse[i][j] === '[') sumOfGPS += 100 * i + j;
    }
  }
  console.log({ sumOfGPS });
}

moveBot();
