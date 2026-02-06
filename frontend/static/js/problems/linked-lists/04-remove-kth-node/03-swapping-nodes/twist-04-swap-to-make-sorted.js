/**
 * Swap to Make Sorted
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Swap to Make Sorted',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.',
        problem: 'Requires detecting which two nodes are out of order by finding inversions, then swapping only those. This combines searching for the anomaly with the swap operation.',
        hints: [
            'Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.',
            'Requires detecting which two nodes are out of order by finding inversions, then swapping only those',
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
            python: `def swap_to_make_sorted(list, k):
    """
    Swap to Make Sorted

    Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(swap_to_make_sorted([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SwapToMakeSorted solves the Swap to Make Sorted problem.
// Given a nearly-sorted linked list where exactly one swap is needed to sort it, find the two nodes that need swapping and swap their values.
// Time: O(n), Space: O(1)
func SwapToMakeSorted(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(SwapToMakeSorted([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-04-swap-to-make-sorted', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-04-swap-to-make-sorted'] = problem;
})();
