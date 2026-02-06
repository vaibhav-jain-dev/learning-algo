/**
 * Flatten with Separator Nodes
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten with Separator Nodes',
        difficulty: 'Medium',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list. You must create and insert new nodes during the flattening process. This means the output structure has more nodes than the input, requiring memory allocation decisions and careful pointer management.',
        problem: 'You must create and insert new nodes during the flattening process. This means the output structure has more nodes than the input, requiring memory allocation decisions and careful pointer management.',
        hints: [
            'Consider: Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list.',
            'You must create and insert new nodes during the flattening process.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [2, 1, 3].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [2, 1, 3]' },
                output: 'See explanation',
                explanation: 'Tree [2, 1, 3]. Inorder: 1, 2, 3. Flattened: 1 <-> -1 <-> 2 <-> -1 <-> 3.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def flatten_with_separator_nodes(data):
    """
    Flatten with Separator Nodes

    Flatten the tree inorder but insert a sentinel node with value -1 between each original node in the resulting linked list.

    Approach: You must create and insert new nodes during the flattening process

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: You must create and insert new nodes during the flattening process

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Flatten with Separator Nodes
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [2, 1, 3]
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

// FlattenWithSeparatorNodes solves: Flatten with Separator Nodes
// You must create and insert new nodes during the flattening process
// Time: O(n), Space: O(n)
func FlattenWithSeparatorNodes(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Flatten with Separator Nodes
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
    // Example: Tree [2, 1, 3]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-04-flatten-with-separator-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-04-flatten-with-separator-nodes'] = problem;
})();
