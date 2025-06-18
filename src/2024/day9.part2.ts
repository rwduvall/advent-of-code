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

// this changes how the disk is created instead of moving the files. I can manipulate the input. I need to change the acutual disk
for (let itemIdex = day9Example2024.length - 1; itemIdex > 0; itemIdex--) {
  const item = day9Example2024[itemIdex];

  if ((itemIdex + 1) % 2) {
    console.log('empty space size: ', item);
  } else {
    // then I need to find a space starting from the begging of the array that will fit the item
    day9Example2024.findIndex((value, index) => {
      const isBigEnough = value > item;
      const isEmptyFile = (index + 1) % 2;
      if (isBigEnough && isEmptyFile) {
        // this is where the file should go
        day9Example2024[index] = value - item;
      }
    });
    console.log('file size: ', item);
  }
}

// for (let i = 1; i < diskMap.length + 1; i++) {
//   currentChar = diskMap[i - 1];
//   if (i % 2 === 0) {
//   }
// }

const disk = convertDiskMapToDisk(day9Example2024);

// console.log(loopThroughArrayFromEnd(disk));
