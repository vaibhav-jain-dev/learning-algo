/**
 * Next Right Pointer in Non-Perfect Tree
 * Category: binary-trees
 * Difficulty: Hard
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
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, null, 7]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, null, 7]. Node 4.right_sibling = 5, node 5.right_sibling = 7 (skipping the missing child of 3).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def next_right_pointer_in_non_perfect_tree(data):
    """
    Next Right Pointer in Non-Perfect Tree

    Connect right sibling pointers in a binary tree that is NOT perfect (has missing nodes).
     Each node should point to the next node on the same level, skipping gaps.

    Approach: In a perfect tree, every level is full so siblings are straightforward

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: In a perfect tree, every level is full so siblings are straightforward

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Next Right Pointer in Non-Perfect Tree
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5, null, 7]
    print("See problem description for test cases")`,
            go: `package main

import "fmt"

// TreeNode represents a node in the binary tree
type TreeNode struct {
    Value int
    Left  *TreeNode
    Right *TreeNode
}

func buildTree(data map[string]interface{}) *TreeNode {
    if data == nil {
        return nil
    }
    node := &TreeNode{Value: int(data["value"].(float64))}
    if left, ok := data["left"].(map[string]interface{}); ok {
        node.Left = buildTree(left)
    }
    if right, ok := data["right"].(map[string]interface{}); ok {
        node.Right = buildTree(right)
    }
    return node
}

// NextRightPointerInNonperfectTree solves: Next Right Pointer in Non-Perfect Tree
// In a perfect tree, every level is full so siblings are straightforward
// Time: O(n), Space: O(n)
func NextRightPointerInNonperfectTree(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Next Right Pointer in Non-Perfect Tree
    var solve func(node *TreeNode) interface{}
    solve = func(node *TreeNode) interface{} {
        if node == nil {
            return nil
        }

        solve(node.Left)
        solve(node.Right)

        return nil
    }

    return solve(root)
}

func main() {
    // Example: Tree [1, 2, 3, 4, 5, null, 7]
    fmt.Println("See problem description for test cases")
}`
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
