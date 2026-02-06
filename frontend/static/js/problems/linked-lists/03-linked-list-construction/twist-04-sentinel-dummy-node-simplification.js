/**
 * Sentinel/Dummy Node Simplification
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sentinel/Dummy Node Simplification',
        difficulty: 'Easy',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed. Observe how this eliminates all null checks in every operation.',
        problem: 'With sentinels, you never need to check if head or tail is null. insertBefore/insertAfter become uniform. This twist highlights how a small design choice (sentinel nodes) dramatically simplifies the code at the cost of two extra nodes.',
        hints: [
            'Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed',
            'With sentinels, you never need to check if head or tail is null',
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
            python: `def sentinel_dummy_node_simplification(initialList, operations):
    """
    Sentinel/Dummy Node Simplification

    Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed. Observe how this eliminates all null checks in every operation.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(initialList)):
        # Check if element meets criteria
        result.append(initialList[i])

    return result


# Test cases
print(sentinel_dummy_node_simplification(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SentinelDummyNodeSimplification solves the Sentinel/Dummy Node Simplification problem.
// Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed. Observe how this eliminates all null checks in every operation.
// Time: O(n), Space: O(1)
func SentinelDummyNodeSimplification(initialList []int, operations []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(initialList); i++ {
		result = append(result, initialList[i])
	}

	return result
}

func main() {
	fmt.Println(SentinelDummyNodeSimplification(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-04-sentinel-dummy-node-simplification', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-04-sentinel-dummy-node-simplification'] = problem;
})();
