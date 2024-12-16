// import { writeFile } from 'fs';
// create grid for puzzle
// const ar = Array(103).fill(Array(101).fill('0'));
// const filename = 'output14.txt';
// writeFile(filename, ar.join('\n'), (err) => {
//   if (err) {
//     console.error('Error writing file:', err);
//   } else {
//     console.log('File written successfully!');
//   }
// });

type Robot = {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
};

// const maxXIndex = 100;
// const maxYIndex = 102;
const maxXIndex = 10;
const maxYIndex = 6;

const exampleDay14 = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

function parseRobot(input: string): Robot[] {
  const robots = [];
  const lines = input.split('\n');
  lines.forEach((line) => {
    const p = line.split(' ')[0].replace('p=', '').split(',').map(Number);
    const position = { x: p[0], y: p[1] };
    const v = line.split(' ')[1].replace('v=', '').split(',').map(Number);
    const velocity = { x: v[0], y: v[1] };
    robots.push({ position, velocity });
  });
  return robots;
}

function move(robot: Robot): Robot {
  const x = () => {
    let newX = robot.position.x + robot.velocity.x;
    if (newX > maxXIndex) {
      newX = newX % (maxXIndex + 1);
    } else if (newX < 0) {
      newX = (newX + (maxXIndex + 1)) % (maxXIndex + 1);
    }
    return newX;
  };

  const y = () => {
    let newY = robot.position.y + robot.velocity.y;
    if (newY > maxYIndex) {
      newY = newY % (maxYIndex + 1);
    } else if (newY < 0) {
      newY = (newY + (maxYIndex + 1)) % (maxYIndex + 1);
    }
    return newY;
  };

  const newPosition = { x: x(), y: y() };

  return { position: newPosition, velocity: robot.velocity };
}

const g = `00000000000
00000000000
00000000000
00000000000
00000000000
00000000000
00000000000`
  .split('\n')
  .map((v) => v.split(''));

let r = parseRobot(exampleDay14);
for (let robotIndex in r) {
  for (let i = 0; i < 100; i++) {
    const robot = r[robotIndex];
    r[robotIndex] = move(robot);
  }
}

for (let robot of r) {
  const spot = g[robot.position.y][robot.position.x];
  g[robot.position.y][robot.position.x] = String(Number(spot) + 1);
}
console.log(g.map((row) => row.join('')).join('\n'));

function findQuadrants(grid: string[][]) {
  const middleRow = maxYIndex / 2;
  const middleCol = maxXIndex / 2;
  let topRightTotal = 0;
  grid.slice(0, middleRow).forEach((row) => {
    const items = row.slice(middleCol + 1);
    topRightTotal += items.reduce((prev, curr) => Number(prev) + Number(curr), 0);
  });

  let bottomRightTotal = 0;
  grid.slice(middleRow + 1).forEach((row) => {
    const items = row.slice(middleCol + 1);
    bottomRightTotal += items.reduce((prev, curr) => Number(prev) + Number(curr), 0);
  });

  let topLeftTotal = 0;
  grid.slice(0, middleRow).forEach((row) => {
    const items = row.slice(0, middleCol);
    topLeftTotal += items.reduce((prev, curr) => Number(prev) + Number(curr), 0);
  });
  let bottomLeftTotal = 0;
  grid.slice(middleRow + 1).forEach((row) => {
    const items = row.slice(0, middleCol);
    bottomLeftTotal += items.reduce((prev, curr) => Number(prev) + Number(curr), 0);
  });

  console.log({ topRightTotal, topLeftTotal, bottomRightTotal, bottomLeftTotal });
  const safetyFactor = topLeftTotal * topRightTotal * bottomLeftTotal * bottomRightTotal;
  console.log({ safetyFactor });
  return safetyFactor;
}

findQuadrants(g);
