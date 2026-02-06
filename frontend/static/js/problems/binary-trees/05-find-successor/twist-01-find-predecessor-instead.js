/**
 * Find Predecessor Instead
 * Category: binary-trees
 * Difficulty: Medium
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
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'In-order: 6,4,2,5,1,3' },
                output: 'See explanation',
                explanation: 'In-order: 6,4,2,5,1,3. Predecessor of 1 is 5. Predecessor of 6 is null.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def find_predecessor_instead(data):
    """
    Find Predecessor Instead

    Find the in-order predecessor of a given node (the node that comes immediately before it in in-order traversal).

    Approach: The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Find Predecessor Instead
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: In-order: 6,4,2,5,1,3
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

// FindPredecessorInstead solves: Find Predecessor Instead
// The logic is mirrored: instead of going to the right subtree and finding the leftmost, go to the left subtree and find the rightmost
// Time: O(n), Space: O(n)
func FindPredecessorInstead(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Find Predecessor Instead
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
    // Example: In-order: 6,4,2,5,1,3
    fmt.Println("See problem description for test cases")
}`
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
