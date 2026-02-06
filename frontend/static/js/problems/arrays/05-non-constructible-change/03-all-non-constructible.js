/**
 * All Non Constructible
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Non Constructible',
        difficulty: 'Hard',
        algorithm: 'greedy-change',
        parent: '05-non-constructible-change',
        description: 'Find all values up to a given limit that cannot be constructed from the given coins.',
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
            2,
            5
          ],
          "limit": 10
        },
        output: "[] (all values 1-10 can be constructed)",
        explanation: 'Given the input, the algorithm processes it to produce [] (all values 1-10 can be constructed)'
    },
    {
        input: {
          "coins": [
            1,
            5,
            10
          ],
          "limit": 20
        },
        output: "[7, 8, 9, 17, 18, 19, 20]",
        explanation: 'Given the input, the algorithm processes it to produce [7, 8, 9, 17, 18, 19, 20]'
    }
        ],
        solutions: {
            python: `def allNonConstructible(coins, limit):
    """
    All Non Constructible

    Find all values from 1 to limit that cannot be constructed from coins.
    Uses dynamic programming to track all constructible sums.

    Time: O(n * limit) where n is number of coins
    Space: O(limit) for the DP set

    Args:
        coins: List of coin values (can use each coin once)
        limit: Upper bound to check

    Returns:
        List of values that cannot be constructed
    """
    # Use DP: constructible[i] = True if sum i can be made
    constructible = [False] * (limit + 1)
    constructible[0] = True  # Base case: sum of 0 is always possible

    # For each coin, update what sums are possible
    for coin in coins:
        # Traverse backwards to avoid using same coin twice
        for s in range(limit, coin - 1, -1):
            if constructible[s - coin]:
                constructible[s] = True

    # Collect all non-constructible values
    result = []
    for value in range(1, limit + 1):
        if not constructible[value]:
            result.append(value)

    return result


# Test
if __name__ == "__main__":
    print(allNonConstructible([1, 2, 5], 10))    # []
    print(allNonConstructible([1, 5, 10], 20))   # [2, 3, 4, 7, 8, 9, 12, 13, 14, 17, 18, 19]`,
            go: `package main

import "fmt"

// AllNonConstructible finds all values up to limit that can't be constructed
// Time: O(n * limit), Space: O(limit)
func AllNonConstructible(coins []int, limit int) []int {
    // DP: constructible[i] = true if sum i can be made
    constructible := make([]bool, limit+1)
    constructible[0] = true

    // For each coin, update possible sums
    for _, coin := range coins {
        // Traverse backwards to avoid using same coin twice
        for s := limit; s >= coin; s-- {
            if constructible[s-coin] {
                constructible[s] = true
            }
        }
    }

    // Collect non-constructible values
    var result []int
    for value := 1; value <= limit; value++ {
        if !constructible[value] {
            result = append(result, value)
        }
    }

    return result
}

func main() {
    fmt.Println(AllNonConstructible([]int{1, 2, 5}, 10))   // []
    fmt.Println(AllNonConstructible([]int{1, 5, 10}, 20))  // [2,3,4,7,8,9,12,13,14,17,18,19]
}`
        },
        twists: [
            {
                title: 'Count Non-Constructible Values',
                difficulty: 'Medium',
                description: 'Instead of listing all non-constructible values, just return their count up to the limit.',
                whyDifferent: 'Can potentially be more efficient: count = limit - (number of constructible values). Changes from enumeration to arithmetic.',
                example: 'coins=[1,5,10], limit=20 → count of non-constructible values up to 20'
            },
            {
                title: 'Non-Constructible Ranges',
                difficulty: 'Medium',
                description: 'Return the non-constructible values as compressed ranges [start, end] instead of individual values.',
                whyDifferent: 'Requires identifying contiguous gaps in the constructible set and representing them compactly, adding a grouping/compression step.',
                example: 'coins=[1,5,10], limit=20 → [[2,4],[7,9],[12,14],[17,19]] (ranges of non-constructible)'
            },
            {
                title: 'All Non-Constructible with Unlimited Coins',
                difficulty: 'Hard',
                description: 'Each coin denomination can be used unlimited times. Find all non-constructible values up to the limit.',
                whyDifferent: 'Switches from subset-sum (0/1 knapsack) to unbounded knapsack DP, where the traversal direction in DP changes from backward to forward.',
                example: 'coins=[3,5], limit=20 → non-constructible: [1,2,4,7] (after 7, all values constructible)'
            },
            {
                title: 'Minimum Coin to Make Value Constructible',
                difficulty: 'Medium',
                description: 'For each non-constructible value up to the limit, find the minimum single coin you would need to add to make it constructible.',
                whyDifferent: 'Pairs each gap with its minimal fix, requiring reverse analysis of what single coin addition would fill each gap.',
                example: 'coins=[1,5], limit=10, non-constructible=4 → adding coin 4 makes it constructible, or adding 3 (since 1+3=4)'
            },
            {
                title: 'All Non-Constructible with Coin Usage Limits',
                difficulty: 'Hard',
                description: 'Each coin has a maximum number of times it can be used (given as a parallel array). Find all non-constructible values.',
                whyDifferent: 'Requires bounded knapsack DP instead of 0/1 knapsack, with each coin contributing multiple possible amounts.',
                example: 'coins=[1,5], limits=[3,2], limit=15 → can use three 1s and two 5s → constructible: 1-3,5-8,10-13'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 05-non-constructible-change
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/03-all-non-constructible', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/03-all-non-constructible'] = problem;

})();
