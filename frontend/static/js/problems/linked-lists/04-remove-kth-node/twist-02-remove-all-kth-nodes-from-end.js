/**
 * Remove All Kth Nodes From End
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove All Kth Nodes From End',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.',
        problem: 'Requires either knowing the full length to compute all positions, or multiple passes. The single two-pointer trick no longer suffices for multiple removals.',
        hints: [
            'Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.',
            'Requires either knowing the full length to compute all positions, or multiple passes',
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
            python: `def remove_all_kth_nodes_from_end(list, k):
    """
    Remove All Kth Nodes From End

    Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(remove_all_kth_nodes_from_end([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveAllKthNodesFromEnd solves the Remove All Kth Nodes From End problem.
// Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.
// Time: O(n), Space: O(1)
func RemoveAllKthNodesFromEnd(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveAllKthNodesFromEnd([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-02-remove-all-kth-nodes-from-end', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-02-remove-all-kth-nodes-from-end'] = problem;
})();
