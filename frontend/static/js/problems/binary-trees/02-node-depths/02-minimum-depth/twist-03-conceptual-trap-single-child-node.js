/**
 * Conceptual Trap: Single-Child Node
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Single-Child Node',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3. What is the minimum depth? Many people incorrectly answer 1, thinking the null left child of the root makes depth 1. But a leaf must have NO children. Node 1 has a right child, so it is not a leaf. The minimum depth is 3.',
        problem: 'Many people incorrectly answer 1, thinking the null left child of the root makes depth 1. But a leaf must have NO children. Node 1 has a right child, so it is not a leaf. The minimum depth is 3.',
        hints: [
            'Consider: Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3.',
            'What is the minimum depth?.',
            'Key insight: But a leaf must have NO children.',
            'The minimum depth is 3.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->null(left), 1->2->null(left), 1->2->3' },
                output: 'See explanation',
                explanation: 'Tree: 1->null(left), 1->2->null(left), 1->2->3. Answer: 3, NOT 1.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_single_child_node(data):
    """
    Conceptual Trap: Single-Child Node

    Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3.
     What is the minimum depth?

    Approach: Many people incorrectly answer 1, thinking the null left child of the root makes depth 1

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Many people incorrectly answer 1, thinking the null left child of the root makes depth 1

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Conceptual Trap: Single-Child Node
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->null(left), 1->2->null(left), 1->2->3
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

// ConceptualTrapSinglechildNode solves: Conceptual Trap: Single-Child Node
// Many people incorrectly answer 1, thinking the null left child of the root makes depth 1
// Time: O(n), Space: O(n)
func ConceptualTrapSinglechildNode(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Conceptual Trap: Single-Child Node
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
    // Example: Tree: 1->null(left), 1->2->null(left), 1->2->3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-03-conceptual-trap-single-child-node', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-03-conceptual-trap-single-child-node'] = problem;
})();
