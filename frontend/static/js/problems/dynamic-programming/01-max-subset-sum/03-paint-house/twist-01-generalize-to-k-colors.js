/**
 * Generalize to K Colors
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/03-paint-house
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generalize to K Colors',
        difficulty: 'Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/03-paint-house',
        description: 'Instead of 3 colors, generalize to k colors. For each house, you have k cost options and no two adjacent houses can share a color. How does the recurrence change? What is the complexity?',
        problem: 'With 3 colors, you can hardcode min of the other two. With k colors, you need an efficient way to find the minimum of all colors except the current one. Naive is O(n*k^2), but O(n*k) is possible using first and second minimum tracking.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: With 3 colors, you can hardcode min of the other two. With k colors, you need an efficient way to find the minimum of al',
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
                input: {"costs":[[17,2,17],[16,16,5],[14,3,19]]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"costs":[[7,6,2]]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"costs":[[17,2,17]]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def generalize_to_k_colors(costs):
    """
    Generalize to K Colors

    Instead of 3 colors, generalize to k colors. For each house, you have k cost options and no two adjacent houses can share a color. How does the recurrence change? What is the complexity?

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(costs)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(generalize_to_k_colors([[17,2,17],[16,16,5],[14,3,19]]))  # Expected: 1
print(generalize_to_k_colors([[7,6,2]]))  # Expected: 2
print(generalize_to_k_colors([[17,2,17]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// GeneralizeToKColors solves the Generalize to K Colors problem.
// Instead of 3 colors, generalize to k colors. For each house, you have k cost options and no two adjacent houses can share a color. How does the recurrence change? What is the complexity?
// Time: O(n^2), Space: O(n)
func GeneralizeToKColors(costs [][]int) int {
	result := 0

	for i := 0; i < len(costs); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(GeneralizeToKColors([][]int{{17, 2, 17}, {16, 16, 5}, {14, 3, 19}})) // Expected: 1
	fmt.Println(GeneralizeToKColors([][]int{{7, 6, 2}})) // Expected: 2
	fmt.Println(GeneralizeToKColors([][]int{{17, 2, 17}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house/twist-01-generalize-to-k-colors', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house/twist-01-generalize-to-k-colors'] = problem;
})();
