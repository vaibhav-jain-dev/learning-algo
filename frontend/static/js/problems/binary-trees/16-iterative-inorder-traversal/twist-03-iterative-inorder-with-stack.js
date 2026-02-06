/**
 * Iterative Inorder with Stack
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Inorder with Stack',
        difficulty: 'Medium',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'Implement inorder traversal iteratively using an explicit stack (O(h) space). Compare the approach with Morris traversal. The stack-based approach is more intuitive: push all left children, pop and process, then move to right child. It uses O(h) space but does not modify the tree, trading space for simplicity and safety.',
        problem: 'The stack-based approach is more intuitive: push all left children, pop and process, then move to right child. It uses O(h) space but does not modify the tree, trading space for simplicity and safety.',
        hints: [
            'Consider: Implement inorder traversal iteratively using an explicit stack (O(h) space).',
            'Compare the approach with Morris traversal.',
            'Key insight: The stack-based approach is more intuitive: push all left children, pop and process, then move to right child.',
            'It uses O(h) space but does not modify the tree, trading space for simplicity and safety.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [4, 2, 6, 1, 3, 5, 7]' },
                output: 'See explanation',
                explanation: 'Tree [4, 2, 6, 1, 3, 5, 7]. Stack approach: push 4,2,1. Pop 1 (process), pop 2 (process), push 3, pop 3 (process), pop 4 (process), push 6,5, pop 5, pop 6, push 7, pop 7. Output: [1,2,3,4,5,6,7].'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_inorder_with_stack(data):
    """
    Iterative Inorder with Stack

    Implement inorder traversal iteratively using an explicit stack (O(h) space).
     Compare the approach with Morris traversal.

    Approach: The stack-based approach is more intuitive: push all left children, pop and process, then move to right child

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The stack-based approach is more intuitive: push all left children, pop and process, then move to right child

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative Inorder with Stack
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

// IterativeInorderWithStack solves: Iterative Inorder with Stack
// The stack-based approach is more intuitive: push all left children, pop and process, then move to right child
// Time: O(n), Space: O(n)
func IterativeInorderWithStack(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative Inorder with Stack
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
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-03-iterative-inorder-with-stack', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-03-iterative-inorder-with-stack'] = problem;
})();
