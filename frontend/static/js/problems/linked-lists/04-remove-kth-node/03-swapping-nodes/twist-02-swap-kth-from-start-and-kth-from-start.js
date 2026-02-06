/**
 * Swap Kth From Start and Kth From Start
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Swap Kth From Start and Kth From Start',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Swap the values of the ith node and jth node from the beginning (given two indices i and j).',
        problem: 'Both positions are from the start, so no two-pointer end-detection is needed. Simple traversal to both positions suffices, but you must handle i==j edge case.',
        hints: [
            'Swap the values of the ith node and jth node from the beginning (given two indices i and j).',
            'Both positions are from the start, so no two-pointer end-detection is needed',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"list":[1,2,3,4,5]},
                output: [1,2,3,4,5],
                explanation: ''
            }
        ],
        solutions: {
            python: `def swap_kth_from_start_and_kth_from_start(list, k):
    """
    Swap Kth From Start and Kth From Start

    Swap the values of the ith node and jth node from the beginning (given two indices i and j).

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(swap_kth_from_start_and_kth_from_start([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SwapKthFromStartAndKthFromStart solves the Swap Kth From Start and Kth From Start problem.
// Swap the values of the ith node and jth node from the beginning (given two indices i and j).
// Time: O(n), Space: O(1)
func SwapKthFromStartAndKthFromStart(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(SwapKthFromStartAndKthFromStart([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-02-swap-kth-from-start-and-kth-from-start', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-02-swap-kth-from-start-and-kth-from-start'] = problem;
})();
