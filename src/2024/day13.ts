// const machine1 = `Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400`;

// type Machine = { a: { x: number; y: number }; b: { x: number; y: number }; goal: { x: number; y: number } };

// function parseMachine(machineString: string): Machine {
//   const linesOfString = machineString.split('\n').map((line) => {
//     const s = line.split(': ');
//     const xY = s[1].split(', ');
//     return { partLabel: s[0], x: xY[0].replace('X+', ''), y: xY[1].replace('Y+', '') };
//   });
//   const goal = { x: Number(linesOfString[2].x.replace('X=', '')), y: Number(linesOfString[2].y.replace('Y=', '')) };
//   return {
//     a: { x: Number(linesOfString[0].x), y: Number(linesOfString[0].y) },
//     b: { x: Number(linesOfString[1].x), y: Number(linesOfString[1].y) },
//     goal,
//   };
// }

// console.log(8400 / 94);
// console.log(5400 / 34);

// console.log();
// console.log(8400 / 22);
// console.log(5400 / 67);
// // 94a + 22b = 8400
// // 8400/90 = a + 22b
// // 34a + 67b = 5400

// function getCountFor(machine: { a: { x: number; y: number }; b: { x: number; y: number }; goal: { x: number; y: number } }) {
//   const { a, b, goal: t } = machine;
//   //   var a = ParseButtonText(input[0]);
//   //   var b = ParseButtonText(input[1]);
//   //   var t = ParseTargetText(input[2], targetPadding);

//   var bCount = (a.x * t.x - a.x * t.y) / (a.y * b.x - a.x * b.y);
//   var aCount = (t.x - bCount * b.x) / a.x;

//   console.log({ bCount, aCount, t });
//   if (aCount * a.y + bCount * b.y != t.y || aCount < 0 || bCount < 0) return null;

//   return { aCount, bCount };
// }

// console.log(getCountFor(parseMachine(machine1)));

interface ClawMachine {
  buttonA: { x: number; y: number };
  buttonB: { x: number; y: number };
  prize: { x: number; y: number };
}

function parseInput(input: string): ClawMachine[] {
  return input.split('\n\n').map((machine) => {
    const [buttonA, buttonB, prize] = machine.split('\n');
    return {
      buttonA: {
        x: parseInt(buttonA.match(/X\+(\d+)/)?.[1] || '0'),
        y: parseInt(buttonA.match(/Y\+(\d+)/)?.[1] || '0'),
      },
      buttonB: {
        x: parseInt(buttonB.match(/X\+(\d+)/)?.[1] || '0'),
        y: parseInt(buttonB.match(/Y\+(\d+)/)?.[1] || '0'),
      },
      prize: {
        x: parseInt(prize.match(/X=(\d+)/)?.[1] || '0'),
        y: parseInt(prize.match(/Y=(\d+)/)?.[1] || '0'),
      },
    };
  });
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function isWinnable(machine: ClawMachine): boolean {
  const { buttonA, buttonB, prize } = machine;

  // Check if the prize coordinates are reachable
  const dxGcd = gcd(buttonA.x, buttonB.x);
  const dyGcd = gcd(buttonA.y, buttonB.y);

  if (prize.x % dxGcd !== 0 || prize.y % dyGcd !== 0) {
    return false;
  }

  // Additional check for solution within 100 button presses
  for (let a = 0; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
      if (a * buttonA.x + b * buttonB.x === prize.x && a * buttonA.y + b * buttonB.y === prize.y) {
        return true;
      }
    }
  }

  return false;
}

function minTokens(machine: ClawMachine): number {
  const { buttonA, buttonB, prize } = machine;

  let minTokens = Infinity;

  for (let a = 0; a <= 100; a++) {
    for (let b = 0; b <= 100; b++) {
      if (a * buttonA.x + b * buttonB.x === prize.x && a * buttonA.y + b * buttonB.y === prize.y) {
        const tokens = a * 3 + b;
        if (tokens < minTokens) {
          minTokens = tokens;
        }
      }
    }
  }

  return minTokens === Infinity ? 0 : minTokens;
}

function solvePuzzle(input: string): number {
  const machines = parseInput(input);
  let totalTokens = 0;
  let winnableMachines = 0;

  machines.forEach((machine) => {
    if (isWinnable(machine)) {
      const tokens = minTokens(machine);
      totalTokens += tokens;
      winnableMachines++;
      console.log(`Winnable machine found. Tokens needed: ${tokens}`);
    }
  });

  console.log(`Total winnable machines: ${winnableMachines}`);
  return totalTokens;
}

// Example usage
const input = `Button A: X+94, Y+34
  Button B: X+22, Y+67
  Prize: X=8400, Y=5400
  
  Button A: X+26, Y+66
  Button B: X+67, Y+21
  Prize: X=12748, Y=12176
  
  Button A: X+17, Y+86
  Button B: X+84, Y+37
  Prize: X=7870, Y=6450
  
  Button A: X+69, Y+23
  Button B: X+27, Y+71
  Prize: X=18641, Y=10279`;

console.log(solvePuzzle(input)); // Output: 480

export {};
