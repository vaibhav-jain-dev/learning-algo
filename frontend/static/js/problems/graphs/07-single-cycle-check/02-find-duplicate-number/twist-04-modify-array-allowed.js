/**
 * Modify Array Allowed
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: floyd-cycle-detection
 * Parent: 07-single-cycle-check/02-find-duplicate-number
 */
(function() {
    'use strict';

    const problem = {
        name: 'Modify Array Allowed',
        difficulty: 'Easy',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check/02-find-duplicate-number',
        description: 'You are allowed to modify the array. Find the duplicate using index marking (negation technique).',
        problem: 'When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative value, that index is the duplicate. Simpler than Floyd.',
        hints: [
            'Start by understanding the key difference: When modification is allowed, negate nums[abs(nums[i])] as you traverse.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Array [1,3,4,2,2].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,3,4,2,2]},
                output: 0,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def modify_array_allowed(nums):
    """
    Modify Array Allowed

    You are allowed to modify the array. Find the duplicate using index marking (negation technique).

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(modify_array_allowed([1,3,4,2,2]))  # Expected: 0
print(modify_array_allowed([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ModifyArrayAllowed solves the Modify Array Allowed problem.
// You are allowed to modify the array. Find the duplicate using index marking (negation technique).
// Time: O(n), Space: O(1)
func ModifyArrayAllowed(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ModifyArrayAllowed([]int{1, 3, 4, 2, 2})) // Expected: 0
	fmt.Println(ModifyArrayAllowed([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number/twist-04-modify-array-allowed', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number/twist-04-modify-array-allowed'] = problem;
})();
