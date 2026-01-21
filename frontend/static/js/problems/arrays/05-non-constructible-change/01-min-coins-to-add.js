/**
 * Min Coins To Add
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Coins To Add',
        difficulty: 'Medium',
        algorithm: 'greedy-change',
        parent: '05-non-constructible-change',
        description: 'Given an array of coins (positive integers) and a target value, find the minimum number of coins you need to add so that you can construct every value from 1 to target (inclusive).',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
          "coins": [
            1,
            3
          ],
          "target": 6
        },
        output: "1\nExplanation: Add coin with value 2. Now with [1, 2, 3] you can make all values 1-6.",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Add coin with value 2. Now with [1, 2, 3] you can make all values 1-6.'
    },
    {
        input: {
          "coins": [
            1,
            5,
            10
          ],
          "target": 20
        },
        output: "2\nExplanation: Add coins with values 2 and 4. Now you can make all values 1-20.",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Add coins with values 2 and 4. Now you can make all values 1-20.'
    },
    {
        input: {
          "coins": [
            1,
            2,
            5
          ],
          "target": 10
        },
        output: "0\nExplanation: With [1, 2, 5] you can already make all values 1-10.",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: With [1, 2, 5] you can already make all values 1-10.'
    }
        ],
        solutions: {
            python: `def minCoinsToAdd(coins, target):
    """
    Min Coins To Add

    Find minimum coins to add so we can construct all values 1 to target.

    Key insight: If we can construct all values [1, currentMax], and we have
    a coin <= currentMax + 1, we can extend our range to currentMax + coin.
    If no such coin exists, we must add a coin of value currentMax + 1.

    Time: O(n log n) for sorting
    Space: O(1)

    Args:
        coins: List of positive integers (coin values)
        target: Target value we need to reach

    Returns:
        Minimum number of coins to add
    """
    coins.sort()

    current_max = 0  # We can construct all values [1, current_max]
    coins_added = 0
    i = 0

    while current_max < target:
        # If current coin can extend our range
        if i < len(coins) and coins[i] <= current_max + 1:
            current_max += coins[i]
            i += 1
        else:
            # Must add a coin of value current_max + 1
            # This optimally doubles our range (approximately)
            coins_added += 1
            current_max += (current_max + 1)  # Add coin with value current_max + 1

    return coins_added


# Test
if __name__ == "__main__":
    print(minCoinsToAdd([1, 3], 6))       # 1 (add 2)
    print(minCoinsToAdd([1, 5, 10], 20))  # 2 (add 2 and 4)
    print(minCoinsToAdd([1, 2, 5], 10))   # 0 (already can make 1-10)`,
            go: `package main

import (
    "fmt"
    "sort"
)

// MinCoinsToAdd finds minimum coins to add to construct all values 1 to target
// Time: O(n log n), Space: O(1)
func MinCoinsToAdd(coins []int, target int) int {
    sort.Ints(coins)

    currentMax := 0 // Can construct all values [1, currentMax]
    coinsAdded := 0
    i := 0

    for currentMax < target {
        // If current coin can extend our range
        if i < len(coins) && coins[i] <= currentMax+1 {
            currentMax += coins[i]
            i++
        } else {
            // Must add a coin of value currentMax + 1
            coinsAdded++
            currentMax += currentMax + 1
        }
    }

    return coinsAdded
}

func main() {
    fmt.Println(MinCoinsToAdd([]int{1, 3}, 6))       // 1
    fmt.Println(MinCoinsToAdd([]int{1, 5, 10}, 20))  // 2
    fmt.Println(MinCoinsToAdd([]int{1, 2, 5}, 10))   // 0
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 05-non-constructible-change
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/01-min-coins-to-add', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/01-min-coins-to-add'] = problem;

})();
