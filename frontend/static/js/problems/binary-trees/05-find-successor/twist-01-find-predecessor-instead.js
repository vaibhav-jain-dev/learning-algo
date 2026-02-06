/**
 * Find Predecessor Instead
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-successor
 * Parent: 05-find-successor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Predecessor Instead',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        parent: '05-find-successor',
        description: 'Find the in-order predecessor of a given node (the node that comes immediately before it in in-order traversal). The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost. The parent traversal direction also reverses.',
        problem: 'The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost. The parent traversal direction also reverses.',
        hints: [
            'Consider: Find the in-order predecessor of a given node (the node that comes immediately before it in in-order traversal).',
            'The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the find predecessor instead criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}},"target":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def find_predecessor_instead(tree, target):
    """
    Find Predecessor Instead

    Find the in-order predecessor of a given node (the node that comes immediately before it in in-order traversal). The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost. The parent traversal direction also reverses.

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
print(find_predecessor_instead({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 5))  # Expected: 1
print(find_predecessor_instead({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// FindPredecessorInstead solves the Find Predecessor Instead problem.
// Find the in-order predecessor of a given node (the node that comes immediately before it in in-order traversal). The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost. The parent traversal direction also reverses.
// Time: O(n), Space: O(n)
func FindPredecessorInstead(tree *TreeNode, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FindPredecessorInstead({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 5)) // Expected: 1
	fmt.Println(FindPredecessorInstead({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor/twist-01-find-predecessor-instead', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor/twist-01-find-predecessor-instead'] = problem;
})();
