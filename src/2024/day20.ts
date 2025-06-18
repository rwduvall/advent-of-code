const raceTrackString = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;

let raceTrack = raceTrackString.split('\n').map((row) => row.split(''));

function findS(): { x: number; y: number } {
  let y = 0;
  let x = 0;
  for (let yc = 0; yc < raceTrack.length; yc++) {
    if (raceTrack[yc].some((val) => val === 'S')) y = yc;
  }
  x = raceTrack[y].findIndex((val) => val === 'S');
  return { x, y };
}
const startPosition = findS();
let trackSpaceDistance = {};
const debug = false;
function findPathLength(x: number, y: number, distance: number, hasCheated: boolean, createTrackingObj: boolean = false): number {
  let queue = [{ x, y, distance }];

  let visited = new Set<string>();

  while (queue.length > 0) {
    // console.log(queue);
    let { x, y, distance } = queue.shift()!;
    if (x < 0 || y < 0 || x >= raceTrack[0].length || y >= raceTrack.length) {
      if (debug) console.log('out of bounds');
      continue;
    }
    if (raceTrack[y][x] === '#') {
      if (debug) console.log('hit wall');

      if (!hasCheated) {
        if (debug) console.log('cheating');
        hasCheated = true;
        // not just this but all of them
        queue.push({ x: x + 1, y, distance: distance + 1 });
        queue.push({ x: x - 1, y, distance: distance + 1 });
        queue.push({ x, y: y + 1, distance: distance + 1 });
        queue.push({ x, y: y - 1, distance: distance + 1 });
      } else {
        continue;
      }
      //   continue;
    }
    if (visited.has(`${x},${y}`)) {
      if (debug) console.log('already visited');
      continue;
    }
    visited.add(`${x},${y}`);
    if (createTrackingObj) trackSpaceDistance[distance] = { x, y }; //[`${x},${y}`] = distance;

    if (raceTrack[y][x] === 'E') {
      if (debug) console.log('found end');
      return distance;
    }

    queue.push({ x: x + 1, y, distance: distance + 1 });
    queue.push({ x: x - 1, y, distance: distance + 1 });
    queue.push({ x, y: y + 1, distance: distance + 1 });
    queue.push({ x, y: y - 1, distance: distance + 1 });

    raceTrack[y][x] = 'O';
  }
  return -1;
}

findPathLength(startPosition.x, startPosition.y, 0, true, true);

const distances = [];
for (const obj of Object.keys(trackSpaceDistance)) {
  const point = trackSpaceDistance[obj];
  let hasCheated = false;
  const distance = findPathLength(point.x, point.y, parseInt(obj), hasCheated);
  distances.push(distance);
  console.log();
  console.log(distance);
  console.log(raceTrack.map((row) => row.join('')).join('\n'));
  raceTrack = raceTrackString.split('\n').map((row) => row.split(''));
  hasCheated = false;
}
distances.sort((a, b) => a - b);
console.log(distances);
const highest = distances[distances.length - 1];
let numberThatSave100 = 0;
for (const distance of distances) {
  if (distance <= highest - 100) {
    numberThatSave100++;
    // console.log(distance);
  }
}
console.log({ numberThatSave100 });
