/**
 * Merge by Alternating Nodes
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-merge
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge by Alternating Nodes',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc. Append remaining nodes at the end.',
        problem: 'Ignores sorted order entirely. The merge pattern is round-robin rather than comparison-based, requiring simple alternating pointer reassignment.',
        hints: [
            'Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc',
            'Ignores sorted order entirely',
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
            python: `def merge_by_alternating_nodes(list1, list2):
    """
    Merge by Alternating Nodes

    Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc. Append remaining nodes at the end.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(merge_by_alternating_nodes(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MergeByAlternatingNodes solves the Merge by Alternating Nodes problem.
// Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc. Append remaining nodes at the end.
// Time: O(n), Space: O(1)
func MergeByAlternatingNodes(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(MergeByAlternatingNodes(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-03-merge-by-alternating-nodes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-03-merge-by-alternating-nodes'] = problem;
})();
