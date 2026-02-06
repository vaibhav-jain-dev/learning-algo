/**
 * Diameter as Node Count
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 04-binary-tree-diameter
 */
(function() {
    'use strict';
    const problem = {
        name: 'Diameter as Node Count',
        difficulty: 'Easy',
        algorithm: 'tree-diameter',
        parent: '04-binary-tree-diameter',
        description: 'Compute the diameter measured in nodes instead of edges. The diameter is the number of nodes on the longest path. Off-by-one difference. The diameter in edges equals diameter in nodes minus 1. The base case changes: a single node has diameter 1 (nodes) vs 0 (edges). Tests precision in definition.',
        problem: 'Off-by-one difference. The diameter in edges equals diameter in nodes minus 1. The base case changes: a single node has diameter 1 (nodes) vs 0 (edges). Tests precision in definition.',
        hints: [
            'Consider: Compute the diameter measured in nodes instead of edges.',
            'The diameter is the number of nodes on the longest path.',
            'Key insight: The diameter in edges equals diameter in nodes minus 1.',
            'Tests precision in definition.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Path 8->7->3->4->5->6: 6 nodes, 5 edges' },
                output: 'See explanation',
                explanation: 'Path 8->7->3->4->5->6: 6 nodes, 5 edges. Node-diameter=6, edge-diameter=5.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def diameter_as_node_count(data):
    """
    Diameter as Node Count

    Compute the diameter measured in nodes instead of edges.
     The diameter is the number of nodes on the longest path.

    Approach: Off-by-one difference

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Off-by-one difference

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Diameter as Node Count
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Path 8->7->3->4->5->6: 6 nodes, 5 edges
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

// DiameterAsNodeCount solves: Diameter as Node Count
// Off-by-one difference
// Time: O(n), Space: O(n)
func DiameterAsNodeCount(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Diameter as Node Count
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
    // Example: Path 8->7->3->4->5->6: 6 nodes, 5 edges
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '04-binary-tree-diameter/twist-03-diameter-as-node-count', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/04-binary-tree-diameter/twist-03-diameter-as-node-count'] = problem;
})();
