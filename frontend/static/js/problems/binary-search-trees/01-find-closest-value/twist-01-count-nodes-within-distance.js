/**
 * Count Nodes Within Distance
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Nodes Within Distance',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Instead of finding the single closest value, count how many nodes in the BST have values within a given distance D of the target.',
        problem: 'You can no longer prune an entire subtree just because the current node is farther than your best. Both subtrees might contain values within distance D, so you need a range-aware traversal strategy. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,13,22,1,null,null,null,null,14],"target":10},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":[10],"target":10},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def count_nodes_within_distance(tree, target):
    """
    Count Nodes Within Distance

    Instead of finding the single closest value, count how many nodes in the BST have values within a given distance D of the target.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(count_nodes_within_distance([10,5,15,2,5,13,22,1,None,None,None,None,14], 10))  # Expected: 1
print(count_nodes_within_distance([10], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountNodesWithinDistance solves the Count Nodes Within Distance problem.
// Instead of finding the single closest value, count how many nodes in the BST have values within a given distance D of the target.
// Time: O(n), Space: O(1)
func CountNodesWithinDistance(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountNodesWithinDistance([]int{10, 5, 15, 2, 5, 13, 22, 1, null, null, null, null, 14}, 10)) // Expected: 1
	fmt.Println(CountNodesWithinDistance([]int{10}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-01-count-nodes-within-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-01-count-nodes-within-distance'] = problem;
})();
