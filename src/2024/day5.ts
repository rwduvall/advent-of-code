import { examplePageOrders, exampleUpdates, pageUpdates, pageOrders } from './puzzleInputs/day5';

type Rules = {
  first: number;
  second: number;
};

const ruleList = (pageOrders: string): Rules[] => {
  return pageOrders.split('\n').map((rule) => {
    const splitRule = rule.split('|');
    return { first: Number(splitRule[0]), second: Number(splitRule[1]) };
  });
};

const updatesList = (updates: string): number[][] => {
  return updates.split('\n').map((line) => {
    return line.split(',').map((num) => Number(num));
  });
};

function updateMeetsRules(rules: Rules[], update: number[]): boolean {
  let meetsRule = true;
  let ruleIndex = 0;

  while (meetsRule) {
    let rule = rules[ruleIndex];
    let indexOfFirstRule = update.findIndex((update) => update == rule.first);
    let indexOfSecondRule = update.findIndex((update) => update == rule.second);

    // both rule items found, that means we need to do the check
    if (indexOfFirstRule != -1 && indexOfSecondRule != -1) {
      if (indexOfFirstRule < indexOfSecondRule) {
        // collect the bad ones here
        meetsRule = true;
      } else {
        meetsRule = false;
      }
    }
    ruleIndex++;
    // had this in the while check but it wasn't working correctly
    if (ruleIndex > rules.length - 1) return meetsRule;
  }
  return meetsRule;
}

function middlePageSumFromCorrectUpdates(rules: string, updates: string): number {
  const parsedRules = ruleList(rules);

  const parsedUpdates = updatesList(updates);
  let sum = 0;

  parsedUpdates.forEach((update) => {
    const updateMatchRules = updateMeetsRules(parsedRules, update);
    if (updateMatchRules) {
      const middleIndex = Math.floor(update.length / 2);
      sum += update[middleIndex];
    }
  });
  console.log(`Total Sum: ${sum}`);
  return sum;
}
// console.log(ruleList(pageOrders).length);

// middlePageSumFromCorrectUpdates(examplePageOrders, exampleUpdates);
middlePageSumFromCorrectUpdates(pageOrders, pageUpdates);
// updatesList(exampleUpdates).forEach((update) => console.log(updateMeetsRules(ruleList(examplePageOrders), update)));

// console.log(updateMeetsRules(ruleList(pageOrders), [49, 85, 73, 74, 96, 32, 76, 58, 95, 57, 13, 93, 14, 99, 56, 47, 75]));

// Part 2
function getFailingUpdates(rules: Rules[], update: number[]) {
  let meetsRule = true;
  let ruleIndex = 0;
  const rulesThatApply = [];

  while (meetsRule) {
    //   while (ruleIndex < rules.length - 1) {
    let rule = rules[ruleIndex];
    let indexOfFirstRule = update.findIndex((update) => update == rule.first);
    let indexOfSecondRule = update.findIndex((update) => update == rule.second);

    // both rule items found, that means we need to do the check
    if (indexOfFirstRule != -1 && indexOfSecondRule != -1) {
      // this will only include rules that have been checked which stops once one rule fails
      rulesThatApply.push(rule);

      if (indexOfFirstRule < indexOfSecondRule) {
        // collect the bad ones here
        meetsRule = true;
      } else {
        return { update, failedRule: rule, rulesThatApply };
        meetsRule = false;
      }
    }
    ruleIndex++;
    // had this in the while check but it wasn't working correctly
    if (ruleIndex > rules.length - 1) return meetsRule;
  }
  //   return meetsRule;
}

function correctOrder(rules: Rules[], update: number[]) {
  const newUpdate = [];
  const rulesThatApply = [];
  for (const rule of rules) {
    const indexOfFirstRule = update.findIndex((page) => page === rule.first);
    const indexOfSecondRule = update.findIndex((page) => page === rule.second);

    const notFound = -1;
    if (indexOfFirstRule != notFound || indexOfSecondRule != notFound) {
      rulesThatApply.push(rule);
    }
  }
  const orderedUpdate = [];
  const addedItems = new Set<number>();

  for (const rule of rulesThatApply) {
    const indexOfFirstRule = update.findIndex((page) => page === rule.first);
    const indexOfSecondRule = update.findIndex((page) => page === rule.second);

    if (indexOfFirstRule < indexOfSecondRule) {
      if (!addedItems.has(update[indexOfFirstRule])) {
        orderedUpdate.push(update[indexOfFirstRule]);
        addedItems.add(update[indexOfFirstRule]);
      }
      if (!addedItems.has(update[indexOfSecondRule])) {
        orderedUpdate.push(update[indexOfSecondRule]);
        addedItems.add(update[indexOfSecondRule]);
      }
    } else {
      if (!addedItems.has(update[indexOfSecondRule])) {
        orderedUpdate.push(update[indexOfSecondRule]);
        addedItems.add(update[indexOfSecondRule]);
      }
      if (!addedItems.has(update[indexOfFirstRule])) {
        orderedUpdate.push(update[indexOfFirstRule]);
        addedItems.add(update[indexOfFirstRule]);
      }
    }
  }

  console.log({ orderedUpdate });
  return orderedUpdate;
}

function middlePageSumFromCorrectUpdatesPart2(rules: string, updates: string): number {
  const parsedRules = ruleList(rules);

  const parsedUpdates = updatesList(updates);
  let sum = 0;
  const updatesThatNeedFixed = [];

  parsedUpdates.forEach((update) => {
    const updateMatchRules = getFailingUpdates(parsedRules, update);
    if (updateMatchRules == true) {
      const middleIndex = Math.floor(update.length / 2);
      sum += update[middleIndex];
    } else if (typeof updateMatchRules == 'object') {
      console.log(updateMatchRules);
      updatesThatNeedFixed.push(update);
    }
  });
  console.log(`Total Sum: ${sum}`);
  //   console.log({ updatesThatNeedFixed });
  return sum;
}

correctOrder(ruleList(examplePageOrders), [75, 97, 47, 61, 53]);
// console.log(getFailingUpdates(ruleList(pageOrders), [49, 73, 74, 96, 85, 32, 76, 58, 95, 57, 13, 93, 14, 99, 56, 47, 75]));
// middlePageSumFromCorrectUpdatesPart2(pageOrders, pageUpdates);

// console.log(getFailingUpdates(ruleList(examplePageOrders), [97, 13, 75, 29, 47]));
// correctOrder(ruleList(examplePageOrders), [75, 47, 61, 53, 29]);

const needUpdate = [
  {
    update: [49, 85, 73, 74, 96, 32, 76, 58, 95, 57, 13, 93, 14, 99, 56, 47, 75],
    failedRule: { first: 57, second: 32 },
  },
  {
    update: [96, 27, 17, 64, 78, 16, 56, 63, 18, 87, 33, 75, 22, 88, 49, 91, 67, 41, 55, 39, 15, 29, 47],
    failedRule: { first: 49, second: 22 },
  },
  {
    update: [83, 33, 91, 98, 93, 57, 15, 72, 79, 95, 73, 23, 52, 87, 39, 22, 86],
    failedRule: { first: 72, second: 93 },
  },
  {
    update: [33, 88, 27, 15, 64, 63, 49, 26, 87, 55, 91, 22, 39, 16, 29, 78, 47, 41, 67, 96, 17, 18, 75],
    failedRule: { first: 64, second: 15 },
  },
  {
    update: [67, 56, 39, 52, 94, 33, 22, 78, 27, 18, 29, 35, 63, 87, 86, 26, 79],
    failedRule: { first: 33, second: 39 },
  },
  {
    update: [88, 68, 77, 41, 33, 56, 16, 74, 75, 29, 47, 78, 67, 63, 64, 49, 18],
    failedRule: { first: 64, second: 75 },
  },
  {
    update: [52, 99, 23, 73, 35, 72, 87, 12, 77],
    failedRule: { first: 72, second: 99 },
  },
  {
    update: [85, 83, 91, 23, 94, 39, 33, 15, 35],
    failedRule: { first: 33, second: 85 },
  },
  {
    update: [55, 35, 22, 86, 56, 78, 15, 39, 88, 94, 87, 18, 17, 52, 91],
    failedRule: { first: 88, second: 56 },
  },
  {
    update: [53, 99, 79, 98, 95, 12, 47, 14, 64, 13, 32, 85, 83, 77, 23, 76, 93],
    failedRule: { first: 85, second: 13 },
  },
  {
    update: [67, 15, 73, 33, 93, 91, 12, 79, 41, 57, 63, 55, 22, 86, 98, 35, 72, 94, 16],
    failedRule: { first: 72, second: 93 },
  },
  {
    update: [86, 33, 95, 72, 79, 13, 39, 57, 93, 87, 83, 23, 53, 85, 17, 98, 94, 73, 12],
    failedRule: { first: 85, second: 13 },
  },
  {
    update: [87, 58, 35, 94, 22, 86, 72, 52, 85],
    failedRule: { first: 72, second: 94 },
  },
  {
    update: [99, 23, 98, 64, 77, 57, 12, 74, 47, 76, 75, 96, 32, 49, 68, 53, 93, 13, 73, 83, 95],
    failedRule: { first: 68, second: 96 },
  },
  {
    update: [33, 12, 35, 86, 39, 22, 17, 15, 57, 87, 53, 91, 98, 94, 93, 95, 67, 72, 73, 83, 79],
    failedRule: { first: 83, second: 95 },
  },
  {
    update: [57, 75, 76, 99, 64, 13, 93],
    failedRule: { first: 64, second: 75 },
  },
  {
    update: [86, 35, 72, 52, 23, 73, 15, 53, 39, 12, 55, 79, 33, 93, 17, 83, 67, 94, 57, 22, 41, 87, 98],
    failedRule: { first: 33, second: 53 },
  },
  {
    update: [64, 14, 99, 85, 53, 98, 47, 57, 83, 93, 72, 77, 95, 94, 73, 76, 13],
    failedRule: { first: 83, second: 47 },
  },
  {
    update: [93, 94, 99, 96, 98, 85, 79, 23, 58],
    failedRule: { first: 85, second: 96 },
  },
  {
    update: [17, 53, 22, 12, 58, 93, 83],
    failedRule: { first: 12, second: 53 },
  },
  {
    update: [56, 47, 58, 88, 75, 49, 27, 95, 26, 85, 78, 99, 74, 77, 68, 18, 29, 76, 16, 13, 32],
    failedRule: { first: 68, second: 78 },
  },
  {
    update: [13, 76, 57, 49, 95, 58, 32, 23, 14, 75, 77, 53, 47, 85, 56, 64, 96],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [29, 96, 85, 23, 56, 95, 83, 76, 47, 64, 78, 77, 74, 49, 53, 58, 75],
    failedRule: { first: 85, second: 96 },
  },
  {
    update: [55, 33, 23, 79, 95, 72, 85, 86, 15, 73, 17, 39, 52, 91, 98, 93, 12],
    failedRule: { first: 52, second: 85 },
  },
  {
    update: [78, 93, 76, 99, 68, 96, 49],
    failedRule: { first: 68, second: 78 },
  },
  {
    update: [18, 49, 56, 29, 63, 75, 68, 55, 91, 27, 15],
    failedRule: { first: 15, second: 91 },
  },
  {
    update: [57, 67, 73, 87, 35, 95, 86],
    failedRule: { first: 87, second: 73 },
  },
  {
    update: [49, 93, 68, 74, 95, 32, 57, 29, 64, 75, 14, 13, 53, 77, 96],
    failedRule: { first: 64, second: 49 },
  },
  {
    update: [39, 52, 49, 26, 22, 33, 78],
    failedRule: { first: 33, second: 39 },
  },
  {
    update: [94, 52, 53, 87, 32, 33, 57, 13, 39, 85, 79, 95, 35, 86, 12, 23, 98],
    failedRule: { first: 85, second: 13 },
  },
  {
    update: [23, 72, 14, 98, 57, 64, 12, 13, 93, 47, 95, 68, 85, 79, 73],
    failedRule: { first: 85, second: 13 },
  },
  {
    update: [26, 67, 18, 39, 33, 16, 78, 49, 15, 56, 96, 63, 75, 68, 91],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [14, 63, 74, 99, 64, 15, 88],
    failedRule: { first: 99, second: 63 },
  },
  {
    update: [55, 16, 41, 67, 49, 22, 39, 56, 17, 29, 63, 33, 26, 68, 96],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [55, 63, 67, 27, 79, 78, 87, 41, 56, 15, 86, 22, 91, 17, 18],
    failedRule: { first: 56, second: 63 },
  },
  {
    update: [22, 53, 72, 23, 73, 33, 63],
    failedRule: { first: 33, second: 53 },
  },
  {
    update: [12, 52, 76, 95, 74, 72, 73],
    failedRule: { first: 72, second: 74 },
  },
  {
    update: [14, 83, 98, 68, 75, 88, 49, 93, 57, 99, 85],
    failedRule: { first: 85, second: 75 },
  },
  {
    update: [16, 91, 87, 22, 15, 41, 88, 96, 78, 17, 33, 86, 26, 67, 75, 29, 18, 27, 49],
    failedRule: { first: 49, second: 22 },
  },
  {
    update: [18, 41, 22, 33, 16, 12, 91, 87, 35, 72, 15, 52, 93],
    failedRule: { first: 87, second: 12 },
  },
  {
    update: [78, 75, 85, 76, 13, 32, 56, 29, 88, 93, 68, 47, 49, 77, 53, 58, 74, 14, 96, 99, 83],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [96, 85, 58, 53, 77, 26, 56, 13, 64, 75, 99, 49, 47, 88, 68, 14, 83, 27, 74, 78, 95, 32, 76],
    failedRule: { first: 68, second: 96 },
  },
  {
    update: [74, 29, 17, 33, 16, 64, 27, 47, 75],
    failedRule: { first: 64, second: 16 },
  },
  {
    update: [35, 17, 52, 91, 27, 56, 18, 22, 16, 39, 63],
    failedRule: { first: 56, second: 91 },
  },
  {
    update: [17, 39, 35, 15, 23, 22, 52, 12, 94, 73, 41, 93, 33, 91, 98, 79, 67, 86, 55, 72, 87],
    failedRule: { first: 33, second: 17 },
  },
  {
    update: [98, 53, 99, 68, 85, 83, 47, 64, 76, 75, 58, 95, 49, 13, 96, 32, 88, 57, 77],
    failedRule: { first: 83, second: 68 },
  },
  {
    update: [91, 27, 15, 41, 75, 68, 67, 26, 29, 56, 49, 76, 14],
    failedRule: { first: 49, second: 56 },
  },
  {
    update: [98, 93, 77, 74, 13, 64, 14, 68, 95, 96, 83, 99, 12, 94, 53, 79, 85, 58, 73],
    failedRule: { first: 85, second: 96 },
  },
  {
    update: [85, 88, 78, 32, 99, 49, 26, 64, 76],
    failedRule: { first: 64, second: 49 },
  },
  {
    update: [16, 67, 56, 77, 33, 91, 96, 75, 29, 63, 76, 15, 64, 27, 78, 22, 26, 49, 88, 18, 41],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [53, 23, 98, 47, 95],
    failedRule: { first: 98, second: 23 },
  },
  {
    update: [39, 52, 67, 57, 93, 15, 98, 91, 17, 16, 94, 55, 41, 18, 73],
    failedRule: { first: 67, second: 39 },
  },
  {
    update: [26, 75, 32, 49, 64, 53, 47, 88, 99, 77, 68, 85, 96, 29, 76, 14, 58],
    failedRule: { first: 85, second: 75 },
  },
  {
    update: [49, 58, 63, 27, 13, 32, 77, 76, 26, 41, 29, 99, 14],
    failedRule: { first: 58, second: 49 },
  },
  {
    update: [77, 12, 99, 87, 98, 32, 53],
    failedRule: { first: 87, second: 12 },
  },
  {
    update: [63, 13, 88, 75, 96, 77, 67, 47, 16, 76, 74, 56, 64, 14, 58],
    failedRule: { first: 64, second: 75 },
  },
  {
    update: [16, 67, 91, 56, 33, 29, 18, 41, 17, 26, 86, 78, 22, 96, 52, 75, 49, 39, 63, 55, 27],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [14, 47, 88, 63, 68, 16, 27, 76, 75, 32, 85, 99, 18, 26, 96, 49, 13, 58, 29, 74, 77],
    failedRule: { first: 85, second: 75 },
  },
  {
    update: [47, 95, 58, 13, 98, 99, 77, 64, 68, 93, 12, 57, 53, 85, 74, 73, 72, 32, 94],
    failedRule: { first: 85, second: 13 },
  },
  {
    update: [94, 93, 12, 68, 14, 74, 85, 98, 83, 86, 32, 77, 79, 57, 76, 72, 73, 23, 95],
    failedRule: { first: 83, second: 68 },
  },
  {
    update: [39, 15, 26, 22, 94, 79, 63, 35, 73, 72, 18, 52, 33, 57, 12, 55, 16],
    failedRule: { first: 33, second: 39 },
  },
  {
    update: [56, 96, 85, 58, 13, 32, 75, 23, 95, 77, 14, 76, 83, 53, 93, 73, 68],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [93, 13, 74, 58, 12, 83, 35, 68, 73, 86, 23, 77, 53, 94, 72, 98, 79, 95, 57, 99, 32, 14, 76],
    failedRule: { first: 72, second: 74 },
  },
  {
    update: [16, 63, 78, 98, 52, 39, 22, 87, 33],
    failedRule: { first: 33, second: 39 },
  },
  {
    update: [35, 63, 16, 91, 52, 86, 41, 27, 73, 55, 17, 12, 98, 67, 33, 22, 79, 39, 15],
    failedRule: { first: 33, second: 17 },
  },
  {
    update: [26, 72, 55, 12, 78, 52, 41, 35, 63, 17, 27, 94, 22, 29, 67, 91, 87],
    failedRule: { first: 67, second: 12 },
  },
  {
    update: [35, 16, 15, 78, 72, 56, 22, 26, 67, 55, 18, 86, 33, 88, 94, 87, 41, 29, 63, 39, 91, 27, 17],
    failedRule: { first: 88, second: 56 },
  },
  {
    update: [52, 41, 63, 49, 17, 56, 87, 18, 75, 16, 33, 96, 64, 91, 67],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [39, 53, 58, 93, 57, 23, 72, 83, 17, 86, 94, 35, 99, 85, 73, 87, 12, 13, 95, 98, 52],
    failedRule: { first: 52, second: 85 },
  },
  {
    update: [78, 76, 74, 96, 99, 47, 41, 64, 77, 32, 88],
    failedRule: { first: 64, second: 41 },
  },
  {
    update: [86, 72, 22, 15, 39, 33, 78, 41, 87, 35, 55, 94, 67, 17, 12, 91, 79, 29, 63],
    failedRule: { first: 33, second: 39 },
  },
  {
    update: [12, 67, 93, 53, 63, 55, 22, 39, 23, 72, 94, 35, 91, 98, 79, 41, 17, 57, 15],
    failedRule: { first: 72, second: 23 },
  },
  {
    update: [68, 64, 63, 75, 56, 32, 41],
    failedRule: { first: 56, second: 63 },
  },
  {
    update: [47, 75, 16, 56, 67, 87, 41],
    failedRule: { first: 41, second: 87 },
  },
  {
    update: [91, 15, 39, 29, 56, 35, 41, 86, 18, 87, 22, 75, 52, 72, 63, 17, 33, 27, 55, 88, 78],
    failedRule: { first: 88, second: 56 },
  },
  {
    update: [35, 94, 98, 17, 72, 32, 58, 39, 95, 13, 86, 73, 14, 52, 83, 12, 93, 53, 85, 23, 79, 87, 57],
    failedRule: { first: 52, second: 14 },
  },
  {
    update: [32, 74, 77, 23, 99, 52, 57, 35, 14, 76, 95, 86, 53],
    failedRule: { first: 57, second: 32 },
  },
  {
    update: [56, 99, 49, 75, 27, 74, 77, 63, 96, 29, 47, 91, 67, 22, 26, 41, 88],
    failedRule: { first: 96, second: 56 },
  },
  {
    update: [64, 14, 49, 77, 68, 47, 78, 76, 13, 27, 26],
    failedRule: { first: 47, second: 64 },
  },
  {
    update: [17, 72, 23, 22, 85, 79, 87, 58, 73, 12, 35, 55, 86, 94, 32, 95, 83, 93, 98, 33, 39],
    failedRule: { first: 33, second: 17 },
  },
  {
    update: [83, 68, 14, 75, 77, 76, 56, 18, 13],
    failedRule: { first: 13, second: 68 },
  },
  {
    update: [15, 79, 35, 52, 33, 16, 91, 22, 41, 27, 78, 63, 94, 17, 98, 67, 39, 18, 72, 87, 55],
    failedRule: { first: 72, second: 94 },
  },
  {
    update: [95, 58, 72, 13, 98, 35, 79, 94, 55, 86, 32, 52, 57, 73, 12, 17, 83],
    failedRule: { first: 83, second: 32 },
  },
  {
    update: [67, 64, 75, 22, 33, 56, 55, 68, 49],
    failedRule: { first: 49, second: 22 },
  },
  {
    update: [32, 58, 83, 85, 72, 79, 73, 87, 52],
    failedRule: { first: 52, second: 85 },
  },
  {
    update: [41, 39, 98, 18, 16, 91, 17, 33, 87, 35, 55, 79, 94, 73, 27, 26, 63, 12, 67, 15, 52],
    failedRule: { first: 33, second: 17 },
  },
  {
    update: [91, 17, 86, 41, 72, 75, 88],
    failedRule: { first: 88, second: 41 },
  },
  {
    update: [88, 78, 35, 33, 52, 41, 15, 91, 22, 39, 67, 18, 56, 94, 72, 55, 87, 27, 29],
    failedRule: { first: 72, second: 94 },
  },
  {
    update: [13, 74, 14, 77, 83, 53, 23, 47, 95, 32, 96, 85, 88, 56, 73, 68, 57, 58, 93, 76, 99],
    failedRule: { first: 68, second: 96 },
  },
  {
    update: [75, 58, 88, 77, 99, 13, 18, 96, 49, 85, 68, 47, 14, 64, 74, 76, 16, 78, 29, 63, 56],
    failedRule: { first: 68, second: 96 },
  },
  {
    update: [13, 68, 78, 53, 76, 96, 47, 58, 29, 32, 85, 27, 88, 64, 75],
    failedRule: { first: 85, second: 96 },
  },
  {
    update: [57, 83, 74, 79, 32, 64, 96, 13, 95, 76, 14, 53, 73, 85, 47, 77, 98, 68, 93, 94, 58, 12, 99],
    failedRule: { first: 68, second: 96 },
  },
  {
    update: [17, 22, 35, 86, 29, 39, 55, 26, 91, 33, 67, 75, 87, 18, 16, 27, 56],
    failedRule: { first: 33, second: 17 },
  },
  {
    update: [78, 87, 17, 29, 18, 86, 41, 72, 79, 63, 67, 26, 55, 94, 35, 39, 12, 22, 91, 52, 27, 33, 16],
    failedRule: { first: 33, second: 17 },
  },
  {
    update: [16, 76, 96, 88, 78, 63, 68, 13, 75, 49, 32, 18, 27, 74, 47, 64, 58, 41, 26, 99, 56, 29, 77],
    failedRule: { first: 68, second: 78 },
  },
  {
    update: [91, 52, 41, 15, 26, 72, 67, 87, 18, 63, 17, 73, 33],
    failedRule: { first: 33, second: 17 },
  },
  {
    update: [64, 26, 49, 13, 77, 58, 85, 74, 18, 78, 96, 95, 32, 14, 99, 83, 76],
    failedRule: { first: 85, second: 13 },
  },
  {
    update: [22, 23, 35, 67, 72, 94, 16, 33, 55],
    failedRule: { first: 72, second: 23 },
  },
  {
    update: [12, 73, 68, 96, 13, 74, 76, 99, 32, 14, 57, 85, 53, 58, 64, 47, 77, 23, 49, 75, 83, 98, 95],
    failedRule: { first: 85, second: 96 },
  },
];
