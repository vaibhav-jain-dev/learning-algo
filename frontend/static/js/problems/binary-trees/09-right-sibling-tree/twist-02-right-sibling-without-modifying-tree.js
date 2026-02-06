/**
 * Right Sibling Without Modifying Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-sibling
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Sibling Without Modifying Tree',
        difficulty: 'Medium',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure. The original problem modifies pointers in-place. Building an external mapping means the tree stays intact, requiring a level-order traversal to identify siblings and store relationships separately.',
        problem: 'The original problem modifies pointers in-place. Building an external mapping means the tree stays intact, requiring a level-order traversal to identify siblings and store relationships separately.',
        hints: [
            'Consider: Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure.',
            'The original problem modifies pointers in-place.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3, 4, 5, 6, 7].'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: "result",
                explanation: 'The resulting string is "result".'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: "",
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def right_sibling_without_modifying_tree(tree):
    """
    Right Sibling Without Modifying Tree

    Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure. The original problem modifies pointers in-place. Building an external mapping means the tree stays intact, requiring a level-order traversal to identify siblings and store relationships separately.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in tree:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(right_sibling_without_modifying_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: "result"
print(right_sibling_without_modifying_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: ""
`,
            go: `package main

import "fmt"

// RightSiblingWithoutModifyingTree solves the Right Sibling Without Modifying Tree problem.
// Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure. The original problem modifies pointers in-place. Building an external mapping means the tree stays intact, requiring a level-order traversal to identify siblings and store relationships separately.
// Time: O(n), Space: O(n)
func RightSiblingWithoutModifyingTree(tree *TreeNode) string {
	result := ""

	for _, v := range tree {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(RightSiblingWithoutModifyingTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: "result"
	fmt.Println(RightSiblingWithoutModifyingTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-02-right-sibling-without-modifying-tree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-02-right-sibling-without-modifying-tree'] = problem;
})();
