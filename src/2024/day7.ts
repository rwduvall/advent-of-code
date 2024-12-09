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

function totalCal(
  input: {
    total: number;
    nums: number[];
  }[],
  approach: Function
) {
  let total = 0;
  input.forEach((line) => {
    if (approach(line.total, line.nums[0], line.nums.slice(1))) {
      total += line.total;
    }
  });

  //   console.log({ part1 });
  return total;
}

function totalCalibrationResult(total: number, current: number, remainingNumbers: number[]): boolean {
  if (current > total) return false;
  if (remainingNumbers.length === 0) return current === total;

  const first = remainingNumbers[0];
  const newRemaining = remainingNumbers.slice(1);
  if (totalCalibrationResult(total, current + first, newRemaining)) return true;
  return totalCalibrationResult(total, current * first, newRemaining);
}

const part1Example = totalCal(parsedExample, totalCalibrationResult);
const part1FullInput = totalCal(parsedInput, totalCalibrationResult);
console.log({ part1Example, part1FullInput });

function totalCalibrationResultWithConcat(total: number, current: number, remainingNumbers: number[]): boolean {
  if (current > total) return false;
  if (remainingNumbers.length === 0) return current === total;

  const first = remainingNumbers[0];
  const newRemaining = remainingNumbers.slice(1);
  if (totalCalibrationResultWithConcat(total, current + first, newRemaining)) return true;
  const contactNum = Number(current.toString() + first.toString());
  if (totalCalibrationResultWithConcat(total, contactNum, newRemaining)) return true;
  return totalCalibrationResultWithConcat(total, current * first, newRemaining);
}

const part2Example = totalCal(parsedExample, totalCalibrationResultWithConcat);
const part2FullInput = totalCal(parsedInput, totalCalibrationResultWithConcat);
console.log({ part2Example, part2FullInput });
