// read fail from puzzle inputs with fs
import { readFileSync } from 'fs';
const day9Input2024 = readFileSync('./puzzleInputs/day9.txt', 'utf-8').split('').map(Number);

const day9Example2024 = '2333133121414131402'.split('').map(Number);

function convertDiskMapToDisk(diskMap: number[]) {
  const disk = [];
  let currentChar = diskMap[0];
  let id = 0;

  for (let i = 1; i < diskMap.length + 1; i++) {
    currentChar = diskMap[i - 1];
    if (i % 2 === 0) {
      for (let j = 0; j < currentChar; j++) {
        disk.push('.');
      }
    } else {
      for (let j = 0; j < currentChar; j++) {
        disk.push(id);
      }
      id++;
    }
  }
  return disk;
}

const disk = convertDiskMapToDisk(day9Input2024);

function fillEmptySpaces(disk: any[]) {
  let indexOfFirstEmptySpace = disk.indexOf('.');

  let indexOfLastNonEmptySpace = disk.length - 1;
  let itemToMove = disk[indexOfLastNonEmptySpace];
  while (itemToMove === '.') {
    indexOfLastNonEmptySpace--;
    itemToMove = disk[indexOfLastNonEmptySpace];
  }

  //   disk.splice(indexOfFirstEmptySpace, 1, itemToMove);
  //   disk.splice(indexOfLastNonEmptySpace, 1, '.');
  disk[indexOfFirstEmptySpace] = itemToMove;
  disk[indexOfLastNonEmptySpace] = '.';
}

function moveUntilAllEmptySpacesAreAtTheEnd(disk: any[]) {
  let indexOfFirstEmptySpace = disk.indexOf('.');

  for (let i = indexOfFirstEmptySpace; i < disk.length; i++) {
    if (disk[i] === '.') {
      fillEmptySpaces(disk);
    }
  }
  // recurrsion here caused a heap out of memory error
  //   let notFinished: boolean = disk.slice(indexOfFirstEmptySpace).some((v) => v != '.');
  //   if (notFinished) moveUntilAllEmptySpacesAreAtTheEnd(disk);
}

// moveUntilAllEmptySpacesAreAtTheEnd(disk);
// let checksum = 0;
// for (let i = 0; i < disk.length; i++) if (disk[i] != '.') checksum += i * disk[i];
// console.log({ checksum });

// Part 2
// I need to know the length of the empty section
// then find

function convertDiskMapToObj(diskMap: number[]) {
  const disk = [];
  let currentChar = diskMap[0];
  let id = 0;

  for (let i = 1; i < diskMap.length + 1; i++) {
    currentChar = diskMap[i - 1];
    if (i % 2 === 0) {
      //   for (let j = 0; j < currentChar; j++) {
      // disk.push('.');

      disk.push({ char: '.', len: currentChar }); // disk[currentChar] = j;
      //   }
    } else {
      //   for (let j = 0; j < currentChar; j++) {
      // disk.push(id);
      disk.push({ char: id, len: currentChar });
      // disk[currentChar] = j;
      //   }
      id++;
    }
  }
  return disk;
}

/*
find a section that will fit the item at the end
the section can be too big, just need to update the empty section to the new size
do this for all the section
*/

const map = convertDiskMapToObj(day9Example2024);
console.log({ map });
for (let fileIndex in map) {
  const fIndex = Number(fileIndex);
  const file = map[fIndex];
  if (file.char === '.') {
    // find the item that will fit from the end
    for (let i = map.length - 1; i >= 0; i--) {
      //   console.log('fill item ', map[i], i, { map });
      if (map[i].len <= file.len && map[i].char != '.') {
        console.log('will fit', map[i]);
        map.splice(i, 1);
        map.splice(fIndex - 1, 0, 'inserted');
        break;
      }
    }
  }
}

// console.log(convertDiskMapToDisk(day9Example2024));
console.log(map);
