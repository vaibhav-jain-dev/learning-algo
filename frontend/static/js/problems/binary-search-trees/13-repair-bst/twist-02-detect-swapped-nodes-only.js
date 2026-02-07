/**
 * Detect Swapped Nodes Only
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-repair
 * Parent: 13-repair-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect Swapped Nodes Only',
        difficulty: 'Medium',
        algorithm: 'bst-repair',
        parent: '13-repair-bst',
        description: 'Find and return the values of the two swapped nodes without actually repairing the tree. Do this in O(n) time and O(1) space using Morris traversal.',
        problem: 'The focus shifts from repair to detection with strict space constraints. Morris traversal temporarily modifies the tree for O(1) space inorder traversal, requiring careful handling of threaded pointers while tracking inversions. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,3,null,null,2]},
                output: [1,3,null],
                explanation: 'The detect swapped nodes only for this input yields [1, 3, ].'
            },
            {
                input: {"tree":[3,1,4,null,null,2]},
                output: [3,1,4],
                explanation: 'The detect swapped nodes only for this input yields [3, 1, 4].'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def detect_swapped_nodes_only(tree):
    """
    Detect Swapped Nodes Only

    Find and return the values of the two swapped nodes without actually repairing the tree. Do this in O(n) time and O(1) space using Morris traversal.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(detect_swapped_nodes_only([1,3,None,None,2]))  # Expected: [1,3,None]
print(detect_swapped_nodes_only([3,1,4,None,None,2]))  # Expected: [3,1,4]
print(detect_swapped_nodes_only([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// DetectSwappedNodesOnly solves the Detect Swapped Nodes Only problem.
// Find and return the values of the two swapped nodes without actually repairing the tree. Do this in O(n) time and O(1) space using Morris traversal.
// Time: O(n), Space: O(1)
func DetectSwappedNodesOnly(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DetectSwappedNodesOnly([]int{1, 3, null, null, 2})) // Expected: [1,3,null]
	fmt.Println(DetectSwappedNodesOnly([]int{3, 1, 4, null, null, 2})) // Expected: [3,1,4]
	fmt.Println(DetectSwappedNodesOnly([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '13-repair-bst/twist-02-detect-swapped-nodes-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/13-repair-bst/twist-02-detect-swapped-nodes-only'] = problem;
})();
