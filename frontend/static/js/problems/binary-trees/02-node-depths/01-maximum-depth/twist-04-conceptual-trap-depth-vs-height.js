/**
 * Conceptual Trap: Depth vs Height
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Depth vs Height',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'What is the maximum depth of a tree with a single node? Some define depth as edges (answer: 0), others as nodes (answer: 1). Solve for both definitions. Forces you to clarify the definition. The recursive base case changes: return 0 for null (node-counting) vs return -1 for null (edge-counting). Off-by-one errors are extremely common here.',
        problem: 'Forces you to clarify the definition. The recursive base case changes: return 0 for null (node-counting) vs return -1 for null (edge-counting). Off-by-one errors are extremely common here.',
        hints: [
            'Consider: What is the maximum depth of a tree with a single node? Some define depth as edges (answer: 0), others as nodes (answer: 1).',
            'Solve for both definitions.',
            'Key insight: Forces you to clarify the definition.',
            'Off-by-one errors are extremely common here.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Single node tree: depth=1 (counting nodes) or depth=0 (counting edges)' },
                output: 'See explanation',
                explanation: 'Single node tree: depth=1 (counting nodes) or depth=0 (counting edges).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_depth_vs_height(data):
    """
    Conceptual Trap: Depth vs Height

    What is the maximum depth of a tree with a single node? Some define depth as edges (answer: 0), others as nodes (answer: 1).
     Solve for both definitions.

    Approach: Forces you to clarify the definition

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Forces you to clarify the definition

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Conceptual Trap: Depth vs Height
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Single node tree: depth=1 (counting nodes) or depth=0 (counting edges)
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

// ConceptualTrapDepthVsHeight solves: Conceptual Trap: Depth vs Height
// Forces you to clarify the definition
// Time: O(n), Space: O(n)
func ConceptualTrapDepthVsHeight(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Conceptual Trap: Depth vs Height
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
    // Example: Single node tree: depth=1 (counting nodes) or depth=0 (counting edges)
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-04-conceptual-trap-depth-vs-height', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-04-conceptual-trap-depth-vs-height'] = problem;
})();
