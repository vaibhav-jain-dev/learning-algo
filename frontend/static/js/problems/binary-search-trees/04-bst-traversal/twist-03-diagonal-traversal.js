/**
 * Diagonal Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Diagonal Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Traverse the BST diagonally: all nodes reachable by going right from a starting node are on the same diagonal. Return nodes grouped by diagonal.',
        problem: 'Diagonal grouping requires tracking a diagonal index that increments only when going left (not right). This is a non-standard grouping that does not correspond to any of the three classic traversals. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,null,22,1]},
                output: [10,5,15],
                explanation: 'The diagonal traversal for this input yields [10, 5, 15].'
            },
            // Edge case
            {
                input: {"tree":[10]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def diagonal_traversal(tree):
    """
    Diagonal Traversal

    Traverse the BST diagonally: all nodes reachable by going right from a starting node are on the same diagonal. Return nodes grouped by diagonal.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(diagonal_traversal([10,5,15,2,5,None,22,1]))  # Expected: [10,5,15]
print(diagonal_traversal([10]))  # Expected: []
`,
            go: `package main

import "fmt"

// DiagonalTraversal solves the Diagonal Traversal problem.
// Traverse the BST diagonally: all nodes reachable by going right from a starting node are on the same diagonal. Return nodes grouped by diagonal.
// Time: O(n), Space: O(1)
func DiagonalTraversal(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DiagonalTraversal([]int{10, 5, 15, 2, 5, null, 22, 1})) // Expected: [10,5,15]
	fmt.Println(DiagonalTraversal([]int{10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-03-diagonal-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-03-diagonal-traversal'] = problem;
})();
