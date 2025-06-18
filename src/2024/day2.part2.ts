import { readFileSync } from 'fs';

const puzzleInput = readFileSync('./puzzleInputs/day2.txt', 'utf-8');

function doesRowMatchCriteria(row: number[], runCount: number) {
  // The levels are either all increasing or all decreasing.
  // Any two adjacent levels differ by at least one and at most three.
  let rowIncreases = row[0] > row[1];
  let rowDecreases = row[0] < row[1];
  const steps = [];
  // handle the case where first 2 are the same
  if (row[0] == row[1]) {
    rowIncreases = row[1] > row[2];
    rowDecreases = row[1] < row[2];
  }

  let greaterThanOne = true;
  let lessThanThree = true;

  for (let index = 0; index < row.length - 1; index++) {
    const currentItem = row[index];
    const nextItem = row[index + 1];
    let continueChecking = true;

    if (rowIncreases) {
      if (currentItem <= nextItem) {
        steps.push(false);
        continueChecking = false;
      }
    }
    if (rowDecreases) {
      if (currentItem >= nextItem) {
        steps.push(false);
        continueChecking = false;
      }
    }

    if (continueChecking) {
      greaterThanOne = currentItem != nextItem;
      lessThanThree = Math.abs(currentItem - nextItem) <= 3;
      steps.push(!!(greaterThanOne && lessThanThree));
    }
  }
  const only1Wrong = steps.filter((v) => v === false).length === 1;
  if (only1Wrong && runCount < 2) {
    // if only first or last are wrong we know we can remove one
    if (steps[0] === false) {
      return true;
    }
    if (steps[steps.length - 1] === false) {
      return true;
    }

    // try removing each item. after console logging this doesn't seem to be doing what I expected
    for (let i = 0; i < row.length - 1; i++) {
      if (doesRowMatchCriteria(row.slice(0, i).concat(row.slice(i + 1)), runCount)) {
        return true;
      }
    }

    // tried only removing around a bad number but it was giving me an answer that was too low
    // I also used 'runCount' to make sure I didn't remove more than 1 item
    // const indexOfFalse = steps.findIndex((v) => v === false);
    // const removeFalse = row.slice(0, indexOfFalse).concat(row.slice(indexOfFalse + 1));
    // const removeBeforeFalse = row.slice(0, indexOfFalse - 1).concat(row.slice(indexOfFalse));
    // const removeAfterFalse = row.slice(0, indexOfFalse + 1).concat(row.slice(indexOfFalse + 2));
    // runCount++;

    // if (
    //   doesRowMatchCriteria(removeFalse, runCount) ||
    //   doesRowMatchCriteria(removeBeforeFalse, runCount) ||
    //   doesRowMatchCriteria(removeAfterFalse, runCount)
    // ) {
    //   // console.log({ row, removeBeforeFalse, removeFalse, removeAfterFalse, steps });
    //   return true;
    // }
  }
  if (steps.filter((v) => v === false).length === 0) return true;
  return false;
}

function numberOfPassingRows(str: string): number {
  const input = str.split('\n').map((r) => r.split(' ').map((n) => Number(n)));
  let answer = 0;
  input.forEach((row) => {
    const test = doesRowMatchCriteria(row, 0);
    if (test) answer++;
  });
  console.log(answer);
  return answer;
}

// numberOfPassingRows(puzzleInput);

console.log(doesRowMatchCriteria([23, 21, 19, 17, 17, 16], 0));
