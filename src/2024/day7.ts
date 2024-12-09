import { example, input } from './puzzleInputs/day7';

function parse(input: string): {
  total: number;
  nums: number[];
}[] {
  return input.split('\n').map((line) => {
    const l = line.split(': ');
    return {
      total: Number(l[0]),
      nums: l[1].split(' ').map(Number),
    };
  });
}
const parsedInput = parse(input);
const parsedExample = parse(example);

const add = (a: number, b: number): number => {
  return a + b;
};

function numberOfLinesWhereSimpleAdditionWorks() {
  let passingLines = 0;
  parse(input).forEach((line) => {
    if (line.nums.reduce(add, 0) === line.total) {
      passingLines++;
    }
  });
  console.log(passingLines);
  return passingLines;
}

function numberOfLinesWhereMultiplicationWorks() {
  let passingLines = 0;
  parsedInput.forEach((line) => {
    let ans = 1;
    line.nums.forEach((num) => (ans *= num));
    if (ans === line.total) {
      passingLines++;
    }
  });
  return passingLines;
}

// method and alternates between multiplying and adding the items in an array
function alternateMultiplyAdd(arr: number[]): number {
  return arr.reduce((acc, curr, index) => {
    return index % 2 === 0 ? acc * curr : acc + curr;
  }, 1);
}

function alternateAddMultiply(arr: number[]): number {
  return arr.reduce((acc, curr, index) => {
    return index % 2 === 1 ? acc * curr : acc + curr;
  }, 1);
}

function alternate() {
  let passingLines = 0;
  parsedInput.forEach((line) => {
    if (alternateMultiplyAdd(line.nums) === line.total) {
      passingLines++;
    }
  });
  console.log({ passingLines });
}
function alternate2() {
  let passingLines = 0;
  parsedInput.forEach((line) => {
    if (alternateAddMultiply(line.nums) === line.total) {
      passingLines++;
    }
  });
  console.log({ passingLines });
}

function increaseNumberOfMultiples(lines) {
  let passingLines = 0;
  lines.forEach((line) => {
    const numberOfSpaces = line.nums.length;
    // I don't have the looping right here
    for (let i = 2; i < numberOfSpaces + 1; i++) {
      const firstINums = line.nums.slice(0, i);
      const addFirstNums = firstINums.reduce(add, 0);
      const restOfNums = line.nums.slice(i, numberOfSpaces + 1);
      let a = 1;
      restOfNums.forEach((num) => (a *= num));
      if (addFirstNums + a === line.total) {
        passingLines++;
      }
    }
  });
  console.log(passingLines);
  return passingLines;
}
// const result = alternateMultiplyAdd([11, 6, 16, 20]);
// console.log(result); // Output will depend on the array provided

// numberOfLinesWhereSimpleAdditionWorks(); // 15
// numberOfLinesWhereMultiplicationWorks()); // 28
// alternate(); // 13
// alternate2(); // 1
// increaseNumberOfMultiples([{ total: 21037, nums: [9, 7, 18, 13] }]);
// increaseNumberOfMultiples(parsedInput); // 16
