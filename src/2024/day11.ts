function splitNumber(num) {
  const str = num.toString();
  const mid = Math.floor(str.length / 2);
  return [parseInt(str.slice(0, mid)), parseInt(str.slice(mid))];
}

function applyRules(stones, memo, blinkCount: number) {
  let newStones = [];
  for (let stone of stones) {
    if (memo.has(`${stone}${blinkCount}`)) {
      newStones.push(...memo.get(`${stone}${blinkCount}`));
    } else {
      let result;
      if (stone === 0) {
        result = [1];
      } else if (stone.toString().length % 2 === 0) {
        result = splitNumber(stone);
      } else {
        result = [stone * 2024];
      }
      memo.set(`${stone}${blinkCount}`, result);
      newStones.push(...result);
    }
  }
  return newStones;
}

function simulateStones(initialStones, blinks) {
  let stones = initialStones;
  const memo = new Map();
  for (let i = 0; i < blinks; i++) {
    stones = applyRules(stones, memo, i);
  }
  return stones;
}

// Initial arrangement
let initialStones = [125, 17];
let blinks = 25; // Number of blinks to simulate

let result = simulateStones(initialStones, blinks).length;
console.log(result);
