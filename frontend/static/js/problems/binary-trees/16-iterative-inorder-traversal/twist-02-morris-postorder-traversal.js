/**
 * Morris Postorder Traversal
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Morris Postorder Traversal',
        difficulty: 'Very Hard',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'Implement postorder traversal using Morris traversal with O(1) space. Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees. The trick involves reversing right edges of left subtrees, adding significant complexity.',
        problem: 'Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees. The trick involves reversing right edges of left subtrees, adding significant complexity.',
        hints: [
            'Consider: Implement postorder traversal using Morris traversal with O(1) space.',
            'Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [4, 2, 6, 1, 3, 5, 7].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [4, 2, 6, 1, 3, 5, 7]' },
                output: 'See explanation',
                explanation: 'Tree [4, 2, 6, 1, 3, 5, 7]. Postorder: [1, 3, 2, 5, 7, 6, 4]. Requires reverse-printing right-edge paths when a thread is detected.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def morris_postorder_traversal(data):
    """
    Morris Postorder Traversal

    Implement postorder traversal using Morris traversal with O(1) space.

    Approach: Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Morris Postorder Traversal
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [4, 2, 6, 1, 3, 5, 7]
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

// MorrisPostorderTraversal solves: Morris Postorder Traversal
// Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node after both subtrees
// Time: O(n), Space: O(n)
func MorrisPostorderTraversal(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Morris Postorder Traversal
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
    // Example: Tree [4, 2, 6, 1, 3, 5, 7]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-02-morris-postorder-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-02-morris-postorder-traversal'] = problem;
})();
