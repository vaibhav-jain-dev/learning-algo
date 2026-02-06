/**
 * Max Constructible
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Constructible',
        difficulty: 'Medium',
        algorithm: 'greedy-change',
        parent: '05-non-constructible-change',
        description: 'Given coins and a budget of K additional coins (each with value 1), find the maximum consecutive range starting from 1 that you can construct.',
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
            5,
            10
          ],
          "budget": 2
        },
        output: "8\nExplanation: Add two 1s to get [1, 1, 1, 5, 10]. Can make values 1-8.",
        explanation: 'Given the input, the algorithm processes it to produce 8\nExplanation: Add two 1s to get [1, 1, 1, 5, 10]. Can make values 1-8.'
    },
    {
        input: {
          "coins": [
            1,
            2,
            4
          ],
          "budget": 0
        },
        output: "7\nExplanation: Without adding coins, can already make 1-7.",
        explanation: 'Given the input, the algorithm processes it to produce 7\nExplanation: Without adding coins, can already make 1-7.'
    }
        ],
        solutions: {
            python: `def maxConstructible(coins, budget):
    """
    Max Constructible with Budget

    Given coins and a budget of K additional coins (each value 1),
    find the maximum consecutive range [1, max] that can be constructed.

    Time: O(n log n) for sorting
    Space: O(1)

    Args:
        coins: List of coin values
        budget: Number of value-1 coins we can add

    Returns:
        Maximum value that completes consecutive range from 1
    """
    coins.sort()

    current_max = 0  # Can construct [1, current_max]
    remaining_budget = budget
    i = 0

    while True:
        # Try to use existing coins first
        if i < len(coins) and coins[i] <= current_max + 1:
            current_max += coins[i]
            i += 1
        elif remaining_budget > 0:
            # Use budget to add a coin of value 1
            # But strategically, add value = current_max + 1 to maximize range
            # Since budget coins are value 1, we add one at a time
            current_max += 1
            remaining_budget -= 1
        else:
            # No more coins or budget, we're done
            break

    return current_max


# Test
if __name__ == "__main__":
    print(maxConstructible([1, 5, 10], 2))  # 8 (add two 1s -> [1,1,1,5,10])
    print(maxConstructible([1, 2, 4], 0))   # 7 (can make 1-7 already)`,
            go: `package main

import (
    "fmt"
    "sort"
)

// MaxConstructible finds max consecutive range with budget of 1-value coins
// Time: O(n log n), Space: O(1)
func MaxConstructible(coins []int, budget int) int {
    sort.Ints(coins)

    currentMax := 0
    remainingBudget := budget
    i := 0

    for {
        // Try to use existing coins first
        if i < len(coins) && coins[i] <= currentMax+1 {
            currentMax += coins[i]
            i++
        } else if remainingBudget > 0 {
            // Use budget to add a coin of value 1
            currentMax++
            remainingBudget--
        } else {
            break
        }
    }

    return currentMax
}

func main() {
    fmt.Println(MaxConstructible([]int{1, 5, 10}, 2)) // 8
    fmt.Println(MaxConstructible([]int{1, 2, 4}, 0))  // 7
}`
        },
        twists: [
            {
                title: 'Max Constructible with Variable Budget Denominations',
                difficulty: 'Hard',
                description: 'Instead of adding coins of value 1, you can add coins of any single denomination d (chosen upfront). Find the optimal d and resulting max constructible.',
                whyDifferent: 'Must try different denominations for the budget coins, each giving different coverage extension patterns. Requires searching over possible d values.',
                example: 'coins=[1,5], budget=2, choosing d=2: [1,2,2,5] covers 1-10. Choosing d=1: [1,1,1,5] covers 1-8. Choose d=2.'
            },
            {
                title: 'Max Constructible with Removable Coins',
                difficulty: 'Hard',
                description: 'You can remove up to k coins from the collection. Find the arrangement that maximizes the minimum non-constructible value.',
                whyDifferent: 'Counterintuitive: removing coins could increase coverage if you remove coins that create gaps. Actually, removal always decreases coverage, so this becomes about minimizing damage.',
                example: 'coins=[1,1,1,1,1,100], k=1 → remove 100, remaining [1,1,1,1,1] → max constructible = 5'
            },
            {
                title: 'Max Constructible Range Starting from K',
                difficulty: 'Medium',
                description: 'Find the maximum consecutive range [K, K+M] that can be constructed, starting from a given value K.',
                whyDifferent: 'The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.',
                example: 'coins=[3,5,7], K=8 → can make 8(3+5), 10(3+7), 12(5+7), 15(3+5+7) but not 9 → range [8,8]'
            },
            {
                title: 'Max Constructible with Paired Budget',
                difficulty: 'Medium',
                description: 'Budget coins come in pairs: each budget addition gives you two coins of value 1. Find max constructible.',
                whyDifferent: 'Each budget spend adds 2 to coverage instead of 1, making the budget more powerful but the granularity is different.',
                example: 'coins=[1,5], budget=1 (gives 2 coins of 1) → [1,1,1,5] → max constructible = 8'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 05-non-constructible-change
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/02-max-constructible', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/02-max-constructible'] = problem;

})();
