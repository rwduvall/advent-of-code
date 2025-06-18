import { exampleInput, input } from './puzzleInputs/day8';

const parsedInput = input.split('\n').map((line) => line.split(''));

type Coordinate = {
  x: number;
  y: number;
};

const charsInInput = input.matchAll(/[a-zA-Z]|\d/g);
// turn the charsInInput into an array with unique characters
const uniqueChars = [];
for (const char of charsInInput) {
  if (!uniqueChars.includes(char[0])) {
    uniqueChars.push(char[0]);
  }
}

function calculateAntinodeCoordinates(a: Coordinate, b: Coordinate) {
  const diffInRow = Math.abs(a.x - b.x);
  const diffInCol = Math.abs(a.y - b.y);
  const aIsAboveB = a.x < b.x;
  const isAToTheRight = a.y < b.y;

  let antinode1X: number;
  let antinode1Y: number;
  if (a.x === b.x) {
    antinode1X = a.x;
  } else if (aIsAboveB) {
    antinode1X = a.x - diffInRow;
  } else {
    antinode1X = a.x + diffInRow;
  }

  if (a.y === b.y) {
    antinode1Y = a.y;
  } else if (isAToTheRight) {
    antinode1Y = a.y - diffInCol;
  } else {
    antinode1Y = a.y + diffInCol;
  }
  let antinodeA = { x: antinode1X, y: antinode1Y };

  let antinode2X: number;
  let antinode2Y: number;
  if (a.x === b.x) {
    antinode2X = a.x;
  } else if (aIsAboveB) {
    antinode2X = b.x + diffInRow;
  } else {
    antinode2X = b.x - diffInRow;
  }

  if (a.y === b.y) {
    antinode2Y = a.y;
  } else if (isAToTheRight) {
    antinode2Y = b.y + diffInCol;
  } else {
    antinode2Y = b.y - diffInCol;
  }
  let antinodeB = { x: antinode2X, y: antinode2Y };

  return { antinodeA, antinodeB };
}

function findAllAntinodes(coordArray: Coordinate[]) {
  const andinotes = [];
  for (let i = 0; i < coordArray.length; i++) {
    for (let j = i; j < coordArray.length; j++) {
      if (i != j) {
        const anti = calculateAntinodeCoordinates(coordArray[i], coordArray[j]);
        andinotes.push(anti.antinodeA, anti.antinodeB);
      }
    }
  }

  // Filter out antinodes that occur at the same coordinates as an antenna
  //   const filteredAntinodes = andinotes.filter((antinode) => !coordArray.some((coord) => coord.x === antinode.x && coord.y === antinode.y));

  return [...new Set(andinotes)];
}

function findMatchingAntennas(map: string[][], searchChar: string) {
  // find the index of every line that contains the search string
  const lineWithChar = map
    .map((line, index) => {
      if (line.includes(searchChar)) {
        return index;
      }
    })
    .filter((line) => line !== undefined);

  // find all indices of the character in the line
  let coordinatesOfMatchingChar: Coordinate[] = [];
  lineWithChar.forEach((lineIndex) => {
    const line = map[lineIndex];
    let charIndex = line.indexOf(searchChar);
    while (charIndex !== -1) {
      coordinatesOfMatchingChar.push({ x: lineIndex, y: charIndex });
      charIndex = line.indexOf(searchChar, charIndex + 1);
    }
  });

  return coordinatesOfMatchingChar;
}

const matchingAntennas = [];
for (const char of uniqueChars) {
  matchingAntennas.push(findMatchingAntennas(parsedInput, char));
}

const allAntinodes = [];
for (const antenna of matchingAntennas) {
  allAntinodes.push(findAllAntinodes(antenna));
}

// Deduplicate the antinodes
const uniqueAntinodesSet = new Set();
allAntinodes.flat().forEach((antinode) => {
  uniqueAntinodesSet.add(JSON.stringify(antinode));
});
const uniqueAntinodes = Array.from(uniqueAntinodesSet).map((antinodeStr) => JSON.parse(antinodeStr as string));
const sorted = uniqueAntinodes.sort((a, b) => a.x - b.x);

let count = 0;
for (const antinode of sorted) {
  // add to count for antinodes that are within the bounds of the map
  if (antinode.x >= 0 && antinode.y >= 0) {
    if (antinode.x < parsedInput.length && antinode.y < parsedInput[0].length) {
      console.log(antinode);
      count++;
    }
  }
}
console.log(count);
