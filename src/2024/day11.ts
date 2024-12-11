import { input } from './puzzleInputs/day11';

const exampleD11 = input.split(' ').map(Number);

function hasEvenNumberOfDigits(stone: number): boolean {
  const numAsString = stone.toString();
  return numAsString.length % 2 === 0;
}

function applyRule1(stone: number) {
  if (stone === 0) return 1;
  else {
    return stone;
  }
}

function applyRule2(stone: number) {
  if (hasEvenNumberOfDigits(stone)) {
    const numAsString = stone.toString();
    const firstHalf = Number(numAsString.substring(0, numAsString.length / 2));
    const secondHalf = Number(numAsString.substring(numAsString.length / 2));
    return [firstHalf, secondHalf];
  }
  return stone;
}

function applyRules(stone: number) {
  const resultOfRule1 = applyRule1(stone);
  const resultOfRule2 = applyRule2(stone);
  if (resultOfRule1 != stone) {
    return resultOfRule1;
  } else if (resultOfRule2 != stone) {
    return resultOfRule2;
  } else {
    return stone * 2024;
  }
}

function blink(stones: number[]) {
  return stones.map((stone) => applyRules(stone)).flat();
}

let stonesAfterBlink = 0;
exampleD11.forEach((stone) => {
  let resultForStone = [stone];
  for (let i = 0; i < 25; i++) {
    resultForStone = blink(resultForStone);
  }
  stonesAfterBlink += resultForStone.length;
});

console.log(stonesAfterBlink);
