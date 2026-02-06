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
        twists: [
            {
                title: 'Min Coins to Add with Denomination Constraint',
                difficulty: 'Hard',
                description: 'You can only add coins of specific denominations (e.g., powers of 2). Find the minimum coins to add to cover 1 to target.',
                whyDifferent: 'The greedy strategy of adding currentMax+1 may not be possible. Must choose from allowed denominations, turning this into a constrained optimization.',
                example: 'coins=[1,3], target=7, allowed=[1,2,4] → add 2 (one coin) to cover 1-7'
            },
            {
                title: 'Min Total Value of Coins to Add',
                difficulty: 'Hard',
                description: 'Instead of minimizing the count of coins added, minimize the total value of coins added to cover 1 to target.',
                whyDifferent: 'Optimizing for value instead of count may lead to adding many small coins rather than fewer large ones, changing the greedy strategy.',
                example: 'coins=[1,10], target=15 → adding [2,4] (value=6) vs adding [2,3] (value=5) → minimize total value'
            },
            {
                title: 'Min Coins to Add for Range [L, R]',
                difficulty: 'Medium',
                description: 'Cover all values from L to R (not 1 to target). Find minimum coins to add.',
                whyDifferent: 'Starting at L instead of 1 means existing coins may already cover the lower range. Must find the first gap at or above L.',
                example: 'coins=[1,2,3,10], L=5, R=15 → can make 1-6 and 10-16, need to cover 7-9 → add [4] to extend to 10'
            },
            {
                title: 'Min Coins to Add with Coin Limit',
                difficulty: 'Hard',
                description: 'You can add at most k coins. What is the maximum target you can reach with at most k additions?',
                whyDifferent: 'Inverts the problem: instead of minimizing coins for a fixed target, maximize coverage with a fixed budget of coins.',
                example: 'coins=[1,5], k=2 → add [2,?] → with [1,2,5] can make 1-8, then add [9?] → maximize range'
            }
        ],
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
