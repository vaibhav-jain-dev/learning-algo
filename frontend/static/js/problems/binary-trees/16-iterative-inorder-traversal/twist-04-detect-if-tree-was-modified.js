/**
 * Detect If Tree Was Modified
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-iterative
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect If Tree Was Modified',
        difficulty: 'Hard',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'After performing Morris traversal, verify that the tree structure is fully restored to its original form. Return true if no threading artifacts remain. Morris traversal temporarily creates threads (pointers from inorder predecessors back to successors). A bug in cleanup leaves dangling threads. This twist requires understanding the threading mechanism deeply enough to verify its correctness.',
        problem: 'Morris traversal temporarily creates threads (pointers from inorder predecessors back to successors). A bug in cleanup leaves dangling threads. This twist requires understanding the threading mechanism deeply enough to verify its correctness.',
        hints: [
            'Consider: After performing Morris traversal, verify that the tree structure is fully restored to its original form.',
            'Return true if no threading artifacts remain.',
            'Key insight: Morris traversal temporarily creates threads (pointers from inorder predecessors back to successors).',
            'This twist requires understanding the threading mechanism deeply enough to verify its correctness.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}}},
                output: [0],
                explanation: 'The detect if tree was modified for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2,"left":{"value":3}}}},
                output: [0,1],
                explanation: 'The detect if tree was modified for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def detect_if_tree_was_modified(tree):
    """
    Detect If Tree Was Modified

    After performing Morris traversal, verify that the tree structure is fully restored to its original form. Return true if no threading artifacts remain. Morris traversal temporarily creates threads (pointers from inorder predecessors back to successors). A bug in cleanup leaves dangling threads. This twist requires understanding the threading mechanism deeply enough to verify its correctness.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(detect_if_tree_was_modified({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: [0]
print(detect_if_tree_was_modified({"value": 1, "right": {"value": 2, "left": {"value": 3}}}))  # Expected: [0,1]
print(detect_if_tree_was_modified({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// DetectIfTreeWasModified solves the Detect If Tree Was Modified problem.
// After performing Morris traversal, verify that the tree structure is fully restored to its original form. Return true if no threading artifacts remain. Morris traversal temporarily creates threads (pointers from inorder predecessors back to successors). A bug in cleanup leaves dangling threads. This twist requires understanding the threading mechanism deeply enough to verify its correctness.
// Time: O(n), Space: O(n)
func DetectIfTreeWasModified(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(DetectIfTreeWasModified({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(DetectIfTreeWasModified({"value":1,"right":{"value":2,"left":{"value":3}}})) // Expected: [0,1]
	fmt.Println(DetectIfTreeWasModified({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-04-detect-if-tree-was-modified', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-04-detect-if-tree-was-modified'] = problem;
})();
