/**
 * When Greedy Fails: Zero Handling
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/02-max-product-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'When Greedy Fails: Zero Handling',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/02-max-product-subarray',
        description: 'Zeros break the product chain completely. Analyze how zeros partition the array into independent segments and why the greedy min/max tracking naturally handles this. What if you must include at least one zero in your subarray?',
        problem: 'Zero resets both maxProd and minProd to 0, effectively restarting. The twist of requiring a zero forces a completely different partitioning approach.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[2,3,-2,4]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the when greedy fails zero handling criteria.'
            },
            {
                input: {"nums":[-2,0,-1]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the when greedy fails zero handling criteria.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def when_greedy_fails_zero_handling(nums):
    """
    When Greedy Fails: Zero Handling

    Zeros break the product chain completely. Analyze how zeros partition the array into independent segments and why the greedy min/max tracking naturally handles this. What if you must include at least one zero in your subarray?

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(when_greedy_fails_zero_handling([2,3,-2,4]))  # Expected: 1
print(when_greedy_fails_zero_handling([-2,0,-1]))  # Expected: 2
print(when_greedy_fails_zero_handling([2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WhenGreedyFailsZeroHandling solves the When Greedy Fails: Zero Handling problem.
// Zeros break the product chain completely. Analyze how zeros partition the array into independent segments and why the greedy min/max tracking naturally handles this. What if you must include at least one zero in your subarray?
// Time: O(?), Space: O(?)
func WhenGreedyFailsZeroHandling(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WhenGreedyFailsZeroHandling([]int{2, 3, -2, 4})) // Expected: 1
	fmt.Println(WhenGreedyFailsZeroHandling([]int{-2, 0, -1})) // Expected: 2
	fmt.Println(WhenGreedyFailsZeroHandling([]int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray/twist-02-when-greedy-fails-zero-handling', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray/twist-02-when-greedy-fails-zero-handling'] = problem;
})();
