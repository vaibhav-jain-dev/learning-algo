/**
 * Node Depths for Only Leaf Nodes
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 10-all-kinds-node-depths
 */
(function() {
    'use strict';
    const problem = {
        name: 'Node Depths for Only Leaf Nodes',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '10-all-kinds-node-depths',
        description: 'For each node treated as root, compute the sum of depths only for leaf nodes (not all nodes). Return the grand total. Filtering to only leaf nodes changes the counting. The formula approach from the original problem must be modified since non-leaf nodes at each depth no longer contribute, requiring separate tracking of leaf counts per subtree.',
        problem: 'Filtering to only leaf nodes changes the counting. The formula approach from the original problem must be modified since non-leaf nodes at each depth no longer contribute, requiring separate tracking of leaf counts per subtree.',
        hints: [
            'Consider: For each node treated as root, compute the sum of depths only for leaf nodes (not all nodes).',
            'Return the grand total.',
            'Key insight: Filtering to only leaf nodes changes the counting.',
            'The formula approach from the original problem must be modified since non-leaf nodes at each depth no longer contribute, requiring separate tracking of leaf counts per subtree.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5]. Leaves are 4, 5, 3. As root=1: depth(4)=2, depth(5)=2, depth(3)=1. Leaf depth sum = 5. Repeat for all roots.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def node_depths_for_only_leaf_nodes(data):
    """
    Node Depths for Only Leaf Nodes

    For each node treated as root, compute the sum of depths only for leaf nodes (not all nodes).
     Return the grand total.

    Approach: Filtering to only leaf nodes changes the counting

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Filtering to only leaf nodes changes the counting

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Node Depths for Only Leaf Nodes
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5]
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

// NodeDepthsForOnlyLeafNodes solves: Node Depths for Only Leaf Nodes
// Filtering to only leaf nodes changes the counting
// Time: O(n), Space: O(n)
func NodeDepthsForOnlyLeafNodes(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Node Depths for Only Leaf Nodes
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
    // Example: Tree [1, 2, 3, 4, 5]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '10-all-kinds-node-depths/twist-05-node-depths-for-only-leaf-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/10-all-kinds-node-depths/twist-05-node-depths-for-only-leaf-nodes'] = problem;
})();
