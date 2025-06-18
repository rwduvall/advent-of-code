import { fullInput } from './puzzleInputs/day5';
function solvePart2(input) {
  const [rulesStr, updatesStr] = input.split('\n\n');
  const rules = parseRules(rulesStr);
  const updates = parseUpdates(updatesStr);

  let sum = 0;

  console.log(updates);
  for (const update of updates) {
    if (!isCorrectOrder(update, rules)) {
      const sortedUpdate = topologicalSort(update, rules);
      console.log({ sortedUpdate });
      const middleIndex = Math.floor(sortedUpdate.length / 2);
      sum += sortedUpdate[middleIndex];
    }
  }

  return sum;
}

function parseRules(rulesStr) {
  const rules = new Map();
  rulesStr.split('\n').forEach((rule) => {
    const [before, after] = rule.split('|').map(Number);
    if (!rules.has(before)) rules.set(before, new Set());
    rules.get(before).add(after);
  });
  return rules;
}

function parseUpdates(updatesStr) {
  return updatesStr.split('\n').map((line) => {
    return line.split(',').map((num) => Number(num));
  });
}

function isCorrectOrder(update, rules) {
  for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      if (rules.has(update[j]) && rules.get(update[j]).has(update[i])) {
        return false;
      }
    }
  }
  return true;
}

function topologicalSort(update, rules) {
  const graph = new Map();
  update.forEach((page) => graph.set(page, new Set()));

  update.forEach((page) => {
    if (rules.has(page)) {
      rules.get(page).forEach((after) => {
        if (update.includes(after)) {
          graph.get(page).add(after);
        }
      });
    }
  });

  const result = [];
  const visited = new Set();
  const temp = new Set();

  function dfs(node) {
    if (temp.has(node)) throw new Error('Not a DAG');
    if (!visited.has(node)) {
      temp.add(node);
      graph.get(node).forEach((neighbor) => dfs(neighbor));
      temp.delete(node);
      visited.add(node);
      result.unshift(node);
    }
  }

  update.forEach((page) => {
    if (!visited.has(page)) {
      dfs(page);
    }
  });

  return result;
}

// Example usage:
const input = `1|2
2|3
3|4

2,1,4,3`;

console.log(solvePart2(input)); // Output: 123
