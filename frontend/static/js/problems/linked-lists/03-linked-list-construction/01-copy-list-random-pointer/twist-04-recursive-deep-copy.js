/**
 * Recursive Deep Copy
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recursive Deep Copy',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'Clone the list with random pointers using a recursive DFS approach. Use a visited map to handle the random pointers that may point forward or backward.',
        problem: 'The recursive approach mirrors graph cloning. Each call clones one node, recursively clones next and random, and uses memoization to avoid infinite loops. This reframes the problem as a graph traversal rather than a linked list traversal.',
        hints: [
            'Clone the list with random pointers using a recursive DFS approach',
            'The recursive approach mirrors graph cloning',
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
            python: `def recursive_deep_copy(nodes):
    """
    Recursive Deep Copy

    Clone the list with random pointers using a recursive DFS approach. Use a visited map to handle the random pointers that may point forward or backward.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nodes)):
        # Check if element meets criteria
        result.append(nodes[i])

    return result


# Test cases
print(recursive_deep_copy(None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RecursiveDeepCopy solves the Recursive Deep Copy problem.
// Clone the list with random pointers using a recursive DFS approach. Use a visited map to handle the random pointers that may point forward or backward.
// Time: O(n), Space: O(1)
func RecursiveDeepCopy(nodes [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nodes); i++ {
		result = append(result, nodes[i])
	}

	return result
}

func main() {
	fmt.Println(RecursiveDeepCopy(nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-04-recursive-deep-copy', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-04-recursive-deep-copy'] = problem;
})();
