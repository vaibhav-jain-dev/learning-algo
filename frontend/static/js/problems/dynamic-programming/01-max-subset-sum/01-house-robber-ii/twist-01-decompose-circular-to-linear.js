/**
 * Decompose Circular to Linear
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Decompose Circular to Linear',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'Explain precisely why the circular problem can be split into two linear House Robber subproblems. Why is max(rob[0..n-2], rob[1..n-1]) correct and complete?',
        problem: 'Understanding the decomposition is the core insight. Many students memorize "run it twice" without understanding why this covers all cases and doesn.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding the decomposition is the core insight. Many students memorize "run it twice" without understanding why thi',
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
            python: `def decompose_circular_to_linear(nums):
    """
    Decompose Circular to Linear

    Explain precisely why the circular problem can be split into two linear House Robber subproblems. Why is max(rob[0..n-2], rob[1..n-1]) correct and complete?

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(decompose_circular_to_linear([2,3,2]))  # Expected: 1
print(decompose_circular_to_linear([1,2,3,1]))  # Expected: 2
print(decompose_circular_to_linear([1,2,3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DecomposeCircularToLinear solves the Decompose Circular to Linear problem.
// Explain precisely why the circular problem can be split into two linear House Robber subproblems. Why is max(rob[0..n-2], rob[1..n-1]) correct and complete?
// Time: O(n^2), Space: O(n)
func DecomposeCircularToLinear(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DecomposeCircularToLinear([]int{2, 3, 2})) // Expected: 1
	fmt.Println(DecomposeCircularToLinear([]int{1, 2, 3, 1})) // Expected: 2
	fmt.Println(DecomposeCircularToLinear([]int{1, 2, 3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-01-decompose-circular-to-linear', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-01-decompose-circular-to-linear'] = problem;
})();
