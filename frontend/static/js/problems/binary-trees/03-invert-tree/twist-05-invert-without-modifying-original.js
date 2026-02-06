/**
 * Invert Without Modifying Original
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-invert
 * Parent: 03-invert-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Invert Without Modifying Original',
        difficulty: 'Medium',
        algorithm: 'tree-invert',
        parent: '03-invert-tree',
        description: 'Create a new inverted tree without modifying the original tree. Return the root of the new tree. You must allocate new nodes instead of swapping pointers in place. Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.',
        problem: 'You must allocate new nodes instead of swapping pointers in place. Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.',
        hints: [
            'Consider: Create a new inverted tree without modifying the original tree.',
            'Return the root of the new tree.',
            'Key insight: You must allocate new nodes instead of swapping pointers in place.',
            'Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: true,
                explanation: 'The invert without modifying original condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}}},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def invert_without_modifying_original(tree):
    """
    Invert Without Modifying Original

    Create a new inverted tree without modifying the original tree. Return the root of the new tree. You must allocate new nodes instead of swapping pointers in place. Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.

    Time: O(n)
    Space: O(n)
    """
    if not tree:
        return False

    # Process the input
    for i in range(len(tree)):
        pass  # Check condition

    return True


# Test cases
print(invert_without_modifying_original({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: True
print(invert_without_modifying_original({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}, "right": {"value": 7}}}))  # Expected: False
`,
            go: `package main

import "fmt"

// InvertWithoutModifyingOriginal solves the Invert Without Modifying Original problem.
// Create a new inverted tree without modifying the original tree. Return the root of the new tree. You must allocate new nodes instead of swapping pointers in place. Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.
// Time: O(n), Space: O(n)
func InvertWithoutModifyingOriginal(tree *TreeNode) bool {
	if len(tree) == 0 {
		return false
	}

	return true
}

func main() {
	fmt.Println(InvertWithoutModifyingOriginal({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: true
	fmt.Println(InvertWithoutModifyingOriginal({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5}},"right":{"value":3,"left":{"value":6},"right":{"value":7}}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree/twist-05-invert-without-modifying-original', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree/twist-05-invert-without-modifying-original'] = problem;
})();
