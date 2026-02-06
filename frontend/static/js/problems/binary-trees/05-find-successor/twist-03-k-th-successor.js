/**
 * K-th Successor
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 05-find-successor
 */
(function() {
    'use strict';
    const problem = {
        name: 'K-th Successor',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        parent: '05-find-successor',
        description: 'Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal). Instead of returning the immediate next, you need to advance k steps in in-order traversal. This may cross multiple subtree boundaries and parent links, requiring a general in-order iteration mechanism.',
        problem: 'Instead of returning the immediate next, you need to advance k steps in in-order traversal. This may cross multiple subtree boundaries and parent links, requiring a general in-order iteration mechanism.',
        hints: [
            'Consider: Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal).',
            'Instead of returning the immediate next, you need to advance k steps in in-order traversal.',
            'Think about how the base case differs from the original problem.',
            'Review the example: In-order: 6,4,2,5,1,3.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'In-order: 6,4,2,5,1,3' },
                output: 'See explanation',
                explanation: 'In-order: 6,4,2,5,1,3. 2nd successor of 4 is 5. 3rd successor of 4 is 1.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def k_th_successor(data):
    """
    K-th Successor

    Find the k-th in-order successor of the target node (the node that is k positions after it in in-order traversal).

    Approach: Instead of returning the immediate next, you need to advance k steps in in-order traversal

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of returning the immediate next, you need to advance k steps in in-order traversal

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement K-th Successor
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

// KthSuccessor solves: K-th Successor
// Instead of returning the immediate next, you need to advance k steps in in-order traversal
// Time: O(n), Space: O(n)
func KthSuccessor(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement K-th Successor
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
        window.ProblemRenderer.register('binary-trees', '05-find-successor/twist-03-k-th-successor', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor/twist-03-k-th-successor'] = problem;
})();
