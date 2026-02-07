/**
 * Next Right Pointer in Non-Perfect Tree
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-sibling
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Next Right Pointer in Non-Perfect Tree',
        difficulty: 'Hard',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Connect right sibling pointers in a binary tree that is NOT perfect (has missing nodes). Each node should point to the next node on the same level, skipping gaps. In a perfect tree, every level is full so siblings are straightforward. With missing nodes, finding the "next right" requires scanning across potentially many null children, making the pointer-chasing logic much more complex.',
        problem: 'In a perfect tree, every level is full so siblings are straightforward. With missing nodes, finding the "next right" requires scanning across potentially many null children, making the pointer-chasing logic much more complex.',
        hints: [
            'Consider: Connect right sibling pointers in a binary tree that is NOT perfect (has missing nodes).',
            'Each node should point to the next node on the same level, skipping gaps.',
            'Key insight: In a perfect tree, every level is full so siblings are straightforward.',
            'With missing nodes, finding the "next right" requires scanning across potentially many null children, making the pointer-chasing logic much more complex.'
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
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}}},
                output: "",
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def next_right_pointer_in_non_perfect_tree(tree):
    """
    Next Right Pointer in Non-Perfect Tree

    Connect right sibling pointers in a binary tree that is NOT perfect (has missing nodes). Each node should point to the next node on the same level, skipping gaps. In a perfect tree, every level is full so siblings are straightforward. With missing nodes, finding the "next right" requires scanning across potentially many null children, making the pointer-chasing logic much more complex.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in tree:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(next_right_pointer_in_non_perfect_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: "result"
print(next_right_pointer_in_non_perfect_tree({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 8}, "right": {"value": 9}}, "right": {"value": 5, "right": {"value": 10}}}, "right": {"value": 3, "left": {"value": 6, "left": {"value": 11}, "right": {"value": 12}}, "right": {"value": 7}}}))  # Expected: ""
`,
            go: `package main

import "fmt"

// NextRightPointerInNonPerfectTree solves the Next Right Pointer in Non-Perfect Tree problem.
// Connect right sibling pointers in a binary tree that is NOT perfect (has missing nodes). Each node should point to the next node on the same level, skipping gaps. In a perfect tree, every level is full so siblings are straightforward. With missing nodes, finding the "next right" requires scanning across potentially many null children, making the pointer-chasing logic much more complex.
// Time: O(n), Space: O(n)
func NextRightPointerInNonPerfectTree(tree *TreeNode) string {
	result := ""

	for _, v := range tree {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(NextRightPointerInNonPerfectTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: "result"
	fmt.Println(NextRightPointerInNonPerfectTree({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":8},"right":{"value":9}},"right":{"value":5,"right":{"value":10}}},"right":{"value":3,"left":{"value":6,"left":{"value":11},"right":{"value":12}},"right":{"value":7}}})) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-03-next-right-pointer-in-non-perfect-tree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-03-next-right-pointer-in-non-perfect-tree'] = problem;
})();
