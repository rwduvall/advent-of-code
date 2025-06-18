import { f } from '../2020/day15';
import { example } from './puzzleInputs/day4';
function colToString(wordSearch: string): string[] {
  const c = wordSearch.split('\n');
  const numOfRows = c.length;
  const numOfCols = c[0].length;
  const newStrings = [];
  // for each col grab the letter and add to newS
  for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
    let newString = '';
    for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
      let row = c[rowIndex];
      newString = newString.concat(row[colIndex]);
    }
    // c[i].forEach((letter, index) => {
    //   newString = newString.concat(c[i]);
    // });
    newStrings.push(newString);
  }
  //   console.log(newStrings);
  return newStrings;
}

function diagonalToString(wordSearch: string, startRow: number, startCol: number): string[] {
  const c = wordSearch.split('\n');
  const numOfRows = c.length;
  const numOfCols = c[0].length;
  const newStrings = [];
  // for each col grab the letter and add to newS
  for (let colIndex = startCol; colIndex < numOfCols; colIndex++) {
    // go right and right
    let newString = '';

    for (let rowIndex = startRow; rowIndex < numOfRows; rowIndex++) {
      let row = c[rowIndex];

      const newLetter = row[colIndex];
      if (newLetter) {
        colIndex++;

        newString = newString.concat(newLetter);
      }
    }
    newStrings.push(newString);
  }
  //   console.log({ newStrings });
  return newStrings;
}

function createDiagonalFromFirstRow(wordSearch: string) {
  const c = wordSearch.split('\n');
  const numOfCols = c[0].length;

  //   const lengthOfRow = 3;
  const newDiagonals = [];
  for (let i = 0; i < numOfCols; i++) {
    const newDiagonal = diagonalToString(wordSearch, 0, i);
    newDiagonals.push(newDiagonal);
  }
  return newDiagonals;
}

function createDiagonalFromEachRow(wordSearch: string) {
  const c = wordSearch.split('\n');
  const numOfCols = c[0].length;
  const numOfRows = c.length;

  const newDiagonals = [];

  // Go down each row and grab the item from the col
  for (let r = 1; r < numOfRows; r++) {
    let colIndex = 0;
    let newLine = '';
    for (let i = r; i < numOfRows; i++) {
      newLine = newLine.concat(c[i][colIndex]);
      colIndex++;
    }
    newDiagonals.push(newLine);
  }

  console.log({ newDiagonals });
  return newDiagonals;
}

function createDiagonalFromEachRowDownLeft(wordSearch: string) {
  const c = wordSearch.split('\n');
  const numOfCols = c[0].length - 1;
  const numOfRows = c.length - 1;

  const newDiagonals = [];

  // Go down each row and grab the item from the col
  for (let r = 0; r < numOfRows; r++) {
    let colIndex = numOfCols;
    let newLine = '';
    for (let i = r; i >= 0; i--) {
      console.log({ i, colIndex });
      if (c[i][colIndex]) {
        newLine = newLine.concat(c[i][colIndex]);
      }
      colIndex--;
    }
    newDiagonals.push(newLine);
  }

  return newDiagonals;
}
// this does same as above func but shouldn't
// this should work more similar to createDiagonalFromEachRow
function createDiagonalFromRowDownLeft(wordSearch: string) {
  // do this for the entire first row
  const c = wordSearch.split('\n');
  const numOfCols = c[0].length;
  const numOfRows = c.length;

  const newDiagonals = [];
  for (let i = 0; i < numOfCols; i++) {
    let colIndex = i;
    let newLine = '';
    for (let r = 0; r < numOfRows; r++) {
      if (c[r][colIndex]) {
        newLine = newLine.concat(c[r][colIndex]);
      }
      colIndex--;
    }
    newDiagonals.push(newLine);
  }
  return newDiagonals;
}

function createNewWordSearch(wordSearch: string) {
  const newLines = colToString(wordSearch);
  // // down right
  const newDiagonalsForFirstRow = createDiagonalFromFirstRow(wordSearch);
  const newDiagonalsFromOtherRows = createDiagonalFromEachRow(wordSearch);
  // down left
  const downLeft1 = createDiagonalFromEachRowDownLeft(wordSearch);
  const downLeft2 = createDiagonalFromRowDownLeft(wordSearch);
  console.log(downLeft1);
  let newSearch = wordSearch;

  newLines.forEach((newLine) => (newSearch = newSearch.concat('\n' + newLine)));
  newDiagonalsForFirstRow.forEach((newLine) => (newSearch = newSearch.concat('\n' + newLine)));
  newDiagonalsFromOtherRows.forEach((newLine) => (newSearch = newSearch.concat('\n' + newLine)));
  downLeft1.forEach((newLine) => (newSearch = newSearch.concat('\n' + newLine)));
  downLeft2.forEach((newLine) => (newSearch = newSearch.concat('\n' + newLine)));

  console.log(newSearch);
}

createNewWordSearch(example);

console.log(
  createNewWordSearch(
    `1234567890
1234567890
1234567890
1234567890
1234567890
1234567890
1234567890
1234567890
1234567890
1234567890`
  )
);
