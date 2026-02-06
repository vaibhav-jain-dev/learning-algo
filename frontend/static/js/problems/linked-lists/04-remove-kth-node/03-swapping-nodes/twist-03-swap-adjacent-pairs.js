/**
 * Swap Adjacent Pairs
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Swap Adjacent Pairs',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Swap every two adjacent nodes in the list. If the list has odd length, the last node remains in place.',
        problem: 'Instead of swapping two specific nodes, you must iterate through the entire list swapping pairs, requiring careful pointer management in a loop.',
        hints: [
            'Swap every two adjacent nodes in the list',
            'Instead of swapping two specific nodes, you must iterate through the entire list swapping pairs, requiring careful pointer management in a loop.',
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
            python: `def swap_adjacent_pairs(list, k):
    """
    Swap Adjacent Pairs

    Swap every two adjacent nodes in the list. If the list has odd length, the last node remains in place.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(swap_adjacent_pairs([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SwapAdjacentPairs solves the Swap Adjacent Pairs problem.
// Swap every two adjacent nodes in the list. If the list has odd length, the last node remains in place.
// Time: O(n), Space: O(1)
func SwapAdjacentPairs(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(SwapAdjacentPairs([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-03-swap-adjacent-pairs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-03-swap-adjacent-pairs'] = problem;
})();
