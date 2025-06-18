const example = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

type Coordinate = {
  x: number;
  y: number;
};

enum ArrowDirection {
  Up,
  Right,
  Left,
  Down,
}

function turnRight(currentDirection: ArrowDirection): ArrowDirection {
  switch (currentDirection) {
    case ArrowDirection.Up:
      return ArrowDirection.Right;
    case ArrowDirection.Right:
      return ArrowDirection.Down;
    case ArrowDirection.Left:
      return ArrowDirection.Up;
    case ArrowDirection.Down:
      return ArrowDirection.Left;
  }
}

function findPath(map: string, currentD: ArrowDirection, startX: number, startY: number) {
  let currentDirection = currentD;
  const parsedMap = map.split('\n').map((line) => line.split(''));
  let currentPosition: Coordinate = { x: startX, y: startY };

  // Base case: stop if current position is out of bounds or reaches 'E'
  //   if (currentPosition.x < 0 || currentPosition.x >= parsedMap.length || currentPosition.y < 0 || currentPosition.y >= parsedMap[0].length) {
  //     return;
  //   }

  let nextChar;

  // Initialize characters around the current position safely
  console.log();
  console.log({ currentDirection, currentPosition });
  console.log(parsedMap.map((row) => row.join('')).join('\n'));

  let charAbove = parsedMap[currentPosition.x - 1][currentPosition.y];
  let charToRight = parsedMap[currentPosition.x][currentPosition.y + 1];
  let charBelow = parsedMap[currentPosition.x + 1][currentPosition.y];
  let charToLeft = parsedMap[currentPosition.x][currentPosition.y - 1];

  if (currentDirection == ArrowDirection.Up) {
    while (charAbove != '#') {
      let xPostion;
      let yPostion;
      if (currentDirection == ArrowDirection.Up) {
        xPostion = currentPosition.x - 1;
        yPostion = currentPosition.y;
      }
      parsedMap[currentPosition.x][currentPosition.y] = 'X';
      currentPosition = { x: currentPosition.x - 1, y: currentPosition.y };
      if (currentPosition.x - 1 < 0) console.log('end 1'); // Should Prevent out of bounds but doesn't
      charAbove = parsedMap[currentPosition.x - 1][currentPosition.y];
      nextChar = charAbove;
    }
    currentDirection = turnRight(currentDirection);
  } else if (currentDirection == ArrowDirection.Right) {
    while (charToRight != '#') {
      parsedMap[currentPosition.x][currentPosition.y] = 'X';
      currentPosition = { x: currentPosition.x, y: currentPosition.y + 1 };
      if (currentPosition.y + 1 > parsedMap[0].length - 1) console.log('end 2');
      charToRight = parsedMap[currentPosition.x][currentPosition.y + 1];
      nextChar = charToRight;
    }
    currentDirection = turnRight(currentDirection);
  } else if (currentDirection == ArrowDirection.Down) {
    while (charBelow != '#') {
      parsedMap[currentPosition.x][currentPosition.y] = 'X';
      currentPosition = { x: currentPosition.x + 1, y: currentPosition.y };
      if (currentPosition.x + 1 > parsedMap.length - 1) console.log('end');
      charBelow = parsedMap[currentPosition.x + 1][currentPosition.y];
      nextChar = charBelow;
    }
    currentDirection = turnRight(currentDirection);
  } else if (currentDirection == ArrowDirection.Left) {
    while (charToLeft != '#') {
      parsedMap[currentPosition.x][currentPosition.y] = 'X';
      currentPosition = { x: currentPosition.x, y: currentPosition.y - 1 };
      if (currentPosition.y - 1 < 0) console.log('end 4');
      charToLeft = parsedMap[currentPosition.x][currentPosition.y - 1];
      nextChar = charToLeft;
    }
    currentDirection = turnRight(currentDirection);
  }

  if (nextChar != undefined) {
    const newMap = parsedMap.map((row) => row.join('')).join('\n');
    findPath(newMap, currentDirection, currentPosition.x, currentPosition.y);
  }
  console.log();
  console.log({ currentDirection, currentPosition });
  console.log(parsedMap.map((row) => row.join('')).join('\n'));
}

// findPath(example, ArrowDirection.Up, 36, 81);
findPath(example, ArrowDirection.Up, 6, 4);

export {};
