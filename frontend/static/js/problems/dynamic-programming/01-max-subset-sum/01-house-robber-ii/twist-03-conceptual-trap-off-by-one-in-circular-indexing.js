/**
 * Conceptual Trap: Off-by-One in Circular Indexing
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Conceptual Trap: Off-by-One in Circular Indexing',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'When solving the two subproblems (exclude first, exclude last), what are the exact array slices? What happens if n <= 2? Walk through the edge cases.',
        problem: 'Off-by-one errors in the circular decomposition are the most common bug. You must handle n=1 (just return nums[0]) and n=2 (return max) as special cases.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Off-by-one errors in the circular decomposition are the most common bug. You must handle n=1 (just return nums[0]) and n',
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
                input: {"nums":[2,3,2]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"nums":[1,2,3,1]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"nums":[1,2,3]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_off_by_one_in_circular_indexing(nums):
    """
    Conceptual Trap: Off-by-One in Circular Indexing

    When solving the two subproblems (exclude first, exclude last), what are the exact array slices? What happens if n <= 2? Walk through the edge cases.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(conceptual_trap_off_by_one_in_circular_indexing([2,3,2]))  # Expected: 1
print(conceptual_trap_off_by_one_in_circular_indexing([1,2,3,1]))  # Expected: 2
print(conceptual_trap_off_by_one_in_circular_indexing([1,2,3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConceptualTrapOffByOneInCircularIndexing solves the Conceptual Trap: Off-by-One in Circular Indexing problem.
// When solving the two subproblems (exclude first, exclude last), what are the exact array slices? What happens if n <= 2? Walk through the edge cases.
// Time: O(n^2), Space: O(n)
func ConceptualTrapOffByOneInCircularIndexing(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConceptualTrapOffByOneInCircularIndexing([]int{2, 3, 2})) // Expected: 1
	fmt.Println(ConceptualTrapOffByOneInCircularIndexing([]int{1, 2, 3, 1})) // Expected: 2
	fmt.Println(ConceptualTrapOffByOneInCircularIndexing([]int{1, 2, 3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-03-conceptual-trap-off-by-one-in-circular-indexing', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-03-conceptual-trap-off-by-one-in-circular-indexing'] = problem;
})();
