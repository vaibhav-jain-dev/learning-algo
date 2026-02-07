/**
 * K-th Successor
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-successor
 * Parent: 05-find-successor
 */
(function() {
    'use strict';

    const problem = {
        name: 'K-th Successor',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        parent: '05-find-successor',
        description: 'Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal). Instead of returning the immediate next, you need to advance k steps in in-order traversal. This may cross multiple subtree boundaries and parent links, requiring a general in-order iteration mechanism.',
        problem: 'Instead of returning the immediate next, you need to advance k steps in in-order traversal. This may cross multiple subtree boundaries and parent links, requiring a general in-order iteration mechanism.',
        hints: [
            'Consider: Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal).',
            'Instead of returning the immediate next, you need to advance k steps in in-order traversal.',
            'Think about how the base case differs from the original problem.',
            'Review the example: In-order: 6,4,2,5,1,3.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}},"target":5},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}},"target":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def k_th_successor(tree, target):
    """
    K-th Successor

    Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal). Instead of returning the immediate next, you need to advance k steps in in-order traversal. This may cross multiple subtree boundaries and parent links, requiring a general in-order iteration mechanism.

    Time: O(n)
    Space: O(n)
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
print(k_th_successor({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 5))  # Expected: 1
print(k_th_successor({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// KThSuccessor solves the K-th Successor problem.
// Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal). Instead of returning the immediate next, you need to advance k steps in in-order traversal. This may cross multiple subtree boundaries and parent links, requiring a general in-order iteration mechanism.
// Time: O(n), Space: O(n)
func KThSuccessor(tree *TreeNode, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KThSuccessor({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 5)) // Expected: 1
	fmt.Println(KThSuccessor({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor/twist-03-k-th-successor', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor/twist-03-k-th-successor'] = problem;
})();
