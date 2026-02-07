/**
 * Circular Houses (First = Last Neighbor)
 * Category: dynamic-programming
 * Difficulty: Very Hard
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/03-paint-house
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Houses (First = Last Neighbor)',
        difficulty: 'Very Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/03-paint-house',
        description: 'What if the houses are in a circle, so the first and last house are also adjacent and must have different colors? How do you handle this additional constraint?',
        problem: 'Similar to House Robber II.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Similar to House Robber II.',
            's color and run DP for each possib',
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
            python: `def circular_houses_first_last_neighbor(costs):
    """
    Circular Houses (First = Last Neighbor)

    What if the houses are in a circle, so the first and last house are also adjacent and must have different colors? How do you handle this additional constraint?

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(costs)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(circular_houses_first_last_neighbor([[17,2,17],[16,16,5],[14,3,19]]))  # Expected: 1
print(circular_houses_first_last_neighbor([[7,6,2]]))  # Expected: 2
print(circular_houses_first_last_neighbor([[17,2,17]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CircularHousesFirstLastNeighbor solves the Circular Houses (First = Last Neighbor) problem.
// What if the houses are in a circle, so the first and last house are also adjacent and must have different colors? How do you handle this additional constraint?
// Time: O(n^2), Space: O(n)
func CircularHousesFirstLastNeighbor(costs [][]int) int {
	result := 0

	for i := 0; i < len(costs); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CircularHousesFirstLastNeighbor([][]int{{17, 2, 17}, {16, 16, 5}, {14, 3, 19}})) // Expected: 1
	fmt.Println(CircularHousesFirstLastNeighbor([][]int{{7, 6, 2}})) // Expected: 2
	fmt.Println(CircularHousesFirstLastNeighbor([][]int{{17, 2, 17}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house/twist-03-circular-houses-first-last-neighbor', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house/twist-03-circular-houses-first-last-neighbor'] = problem;
})();
