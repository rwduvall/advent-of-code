const warehouseString = `##########
#..O..O.O#
#......O.#
#.OO..O.O#
#..O@..O.#
#O#..O...#
#O..O..O.#
#.OO.O.OO#
#....O...#
##########`;

let warehouse = warehouseString.split('\n').map((row) => row.split(''));
let robotCurrentPosition: { row: number; col: number } = findRobot();

function findRobot(): { row: number; col: number } {
  let robotIndex;
  const rowWithRobot = warehouse.findIndex((row) => {
    const index = row.findIndex((char) => char === '@');
    if (index > -1) robotIndex = index;
    return robotIndex > -1;
  });
  return { row: rowWithRobot, col: robotIndex };
}

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

const instructions = `<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`.replace('\n', '');
for (let arrow of instructions) {
  //   console.log(`Move ${arrow}:`);
  moveRobot(arrow);
  //   console.log(warehouse.map((row) => row.join('')).join('\n'));
  //   console.log();
}

let sumOfGPS = 0;
for (let i = 0; i < warehouse.length; i++) {
  for (let j = 0; j < warehouse[0].length; j++) {
    if (warehouse[i][j] === 'O') sumOfGPS += 100 * i + j;
  }
}
console.log(warehouse.map((row) => row.join('')).join('\n'));
console.log({ sumOfGPS });
