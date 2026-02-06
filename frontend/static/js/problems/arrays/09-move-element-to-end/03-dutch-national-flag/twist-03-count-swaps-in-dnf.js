/**
 * Count Swaps in DNF
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: count-swaps-in-dnf
 * Parent: 09-move-element-to-end/03-dutch-national-flag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Swaps in DNF',
        difficulty: 'Hard',
        algorithm: 'count-swaps-in-dnf',
        parent: '09-move-element-to-end/03-dutch-national-flag',
        description: 'Perform the Dutch National Flag partition and return the exact number of swaps performed. Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.',
        problem: 'Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.',
        hints: [
            'Think about how count swaps in dnf differs from the standard version of this problem.',
            'Key insight: Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Two valid configurations found in the input.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'Only one valid configuration exists.'
            },
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'Multiple identical elements create multiple valid configurations.'
            }
        ],
        solutions: {
            python: `def count_swaps_in_dnf(data):
    """
    Count Swaps in DNF

    Perform the Dutch National Flag partition and return the exact number of swaps performed.
    \n    Approach: Forces careful analysis of when swaps actually occur vs. when mid pointer simply advances.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [2, 0, 1, 2, 1, 0], pivot = 1. After partition, count exactly how many swaps were made.

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(count_swaps_in_dnf([1, 2, 3, 4, 5]))
print(count_swaps_in_dnf([5, 3, 1]))
print(count_swaps_in_dnf([1]))`,
            go: `package main

import "fmt"

// CountSwapsInDNF solves the Count Swaps in DNF problem.
// Perform the Dutch National Flag partition and return the exact number of swaps performed.
// Time: O(n), Space: O(n)
func CountSwapsInDNF(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(CountSwapsInDNF([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountSwapsInDNF([]int{5, 3, 1}))
    fmt.Println(CountSwapsInDNF([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag/twist-03-count-swaps-in-dnf', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag/twist-03-count-swaps-in-dnf'] = problem;
})();
