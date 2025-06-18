// direction pad
//     +---+---+
//     | ^ | A |
// +---+---+---+
// | < | v | > |
// +---+---+---+

// <vA<AA>>^AvAA<^A>A<v<A>>^AvA^A<vA>^A<v<A>^A>AAvA^A<v<A>A>^AAAvA<^A>A
// v<<A>>^A<A>AvA<^AA>A<vAAA>^A
// <A^A>^^AvvvA
// 029A

/* 964A
^^^A vA <<A >>vvA // num pad
<A>A <A>A <A>A A// robot 
// you 
 */

// direction pad to direction pad
// stat at A move to arrow then back to A
function findCode(input: string): string {
  const directionPad = {
    A: { '^': 'A', v: 'A', '<': 'A', '>': 'A' },
    '^': { '^': '^', v: 'v', '<': '<', '>': '>' },
    v: { '^': '^', v: 'v', '<': '<', '>': '>' },
    '<': { '^': '^', v: 'v', '<': '<', '>': '>' },
    '>': { '^': '^', v: 'v', '<': '<', '>': '>' },
  };

  let current = 'A';
  let result = '';
  for (const char of input) {
    if (char in directionPad[current]) {
      current = directionPad[current][char];
      result += `<${current}>A`;
    } else {
      result += char;
    }
  }
  console.log({ result, current });

  return result;
}

// Example usage
console.log(findCode('^')); // expected output is: <A>A
console.log(findCode('>')); // expected output is: vA^A
console.log(findCode('^<')); // expected output is: <A>AvA^A
console.log(findCode('^^^A')); // expected output is: <A>A<A>A<A>AA
