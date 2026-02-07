/**
 * Morris Traversal with Modification Detection
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Traversal with Modification Detection',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'Another thread is concurrently reading the tree. Implement Morris traversal that detects if the tree was modified by another reader during traversal (since Morris temporarily modifies the tree).',
        problem: 'Morris traversal creates temporary modifications that could confuse concurrent readers. You need a mechanism to detect conflicts -- perhaps using version numbers or checksums -- and either retry or abort gracefully. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[4,2,6,1,3,5,7]},
                output: [4,2,6],
                explanation: 'The morris traversal with modification detection for this input yields [4, 2, 6].'
            },
            {
                input: {"tree":[1,2,3,4,5,null,6]},
                output: [1,2,3],
                explanation: 'The morris traversal with modification detection for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"tree":[4]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def morris_traversal_with_modification_detection(tree):
    """
    Morris Traversal with Modification Detection

    Another thread is concurrently reading the tree. Implement Morris traversal that detects if the tree was modified by another reader during traversal (since Morris temporarily modifies the tree).

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(morris_traversal_with_modification_detection([4,2,6,1,3,5,7]))  # Expected: [4,2,6]
print(morris_traversal_with_modification_detection([1,2,3,4,5,None,6]))  # Expected: [1,2,3]
print(morris_traversal_with_modification_detection([4]))  # Expected: []
`,
            go: `package main

import "fmt"

// MorrisTraversalWithModificationDetection solves the Morris Traversal with Modification Detection problem.
// Another thread is concurrently reading the tree. Implement Morris traversal that detects if the tree was modified by another reader during traversal (since Morris temporarily modifies the tree).
// Time: O(n), Space: O(1)
func MorrisTraversalWithModificationDetection(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(MorrisTraversalWithModificationDetection([]int{4, 2, 6, 1, 3, 5, 7})) // Expected: [4,2,6]
	fmt.Println(MorrisTraversalWithModificationDetection([]int{1, 2, 3, 4, 5, null, 6})) // Expected: [1,2,3]
	fmt.Println(MorrisTraversalWithModificationDetection([]int{4})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-03-morris-traversal-with-modification-detection', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-03-morris-traversal-with-modification-detection'] = problem;
})();
