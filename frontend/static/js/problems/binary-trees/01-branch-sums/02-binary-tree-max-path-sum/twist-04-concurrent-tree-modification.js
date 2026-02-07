/**
 * Concurrent Tree Modification
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Concurrent Tree Modification',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'While computing the max path sum, node values can be updated by another thread. Design a solution that handles concurrent modifications safely. Forces thinking about read consistency, locking strategies, or snapshot isolation. A simple DFS may read stale values partway through traversal, producing incorrect results.',
        problem: 'Forces thinking about read consistency, locking strategies, or snapshot isolation. A simple DFS may read stale values partway through traversal, producing incorrect results.',
        hints: [
            'Consider: While computing the max path sum, node values can be updated by another thread.',
            'Design a solution that handles concurrent modifications safely.',
            'Key insight: Forces thinking about read consistency, locking strategies, or snapshot isolation.',
            'A simple DFS may read stale values partway through traversal, producing incorrect results.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def concurrent_tree_modification(tree):
    """
    Concurrent Tree Modification

    While computing the max path sum, node values can be updated by another thread. Design a solution that handles concurrent modifications safely. Forces thinking about read consistency, locking strategies, or snapshot isolation. A simple DFS may read stale values partway through traversal, producing incorrect results.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(concurrent_tree_modification({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 1
print(concurrent_tree_modification({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(concurrent_tree_modification({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// ConcurrentTreeModification solves the Concurrent Tree Modification problem.
// While computing the max path sum, node values can be updated by another thread. Design a solution that handles concurrent modifications safely. Forces thinking about read consistency, locking strategies, or snapshot isolation. A simple DFS may read stale values partway through traversal, producing incorrect results.
// Time: O(n), Space: O(n)
func ConcurrentTreeModification(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ConcurrentTreeModification({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 1
	fmt.Println(ConcurrentTreeModification({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(ConcurrentTreeModification({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-04-concurrent-tree-modification', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-04-concurrent-tree-modification'] = problem;
})();
