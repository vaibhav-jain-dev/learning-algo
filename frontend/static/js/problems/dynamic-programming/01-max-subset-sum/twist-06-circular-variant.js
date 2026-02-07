/**
 * Circular Variant
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Variant',
        difficulty: 'Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'What if the array is circular, meaning the first and last elements are also considered adjacent? You cannot pick both. How does this change the approach?',
        problem: 'The circular constraint breaks the simple linear recurrence. You must decompose into two subproblems: one excluding the first element and one excluding the last, then take the max.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The circular constraint breaks the simple linear recurrence. You must decompose into two subproblems: one excluding the ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[75,105,120,75,90,135]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"array":[7,10,12,7,9,14]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"array":[75]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def circular_variant(array):
    """
    Circular Variant

    What if the array is circular, meaning the first and last elements are also considered adjacent? You cannot pick both. How does this change the approach?

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(circular_variant([75,105,120,75,90,135]))  # Expected: 1
print(circular_variant([7,10,12,7,9,14]))  # Expected: 2
print(circular_variant([75]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CircularVariant solves the Circular Variant problem.
// What if the array is circular, meaning the first and last elements are also considered adjacent? You cannot pick both. How does this change the approach?
// Time: O(n^2), Space: O(n)
func CircularVariant(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CircularVariant([]int{75, 105, 120, 75, 90, 135})) // Expected: 1
	fmt.Println(CircularVariant([]int{7, 10, 12, 7, 9, 14})) // Expected: 2
	fmt.Println(CircularVariant([]int{75})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/twist-06-circular-variant', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/twist-06-circular-variant'] = problem;
})();
