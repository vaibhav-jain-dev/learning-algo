/**
 * Max Path Sum with Exactly K Nodes
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 07-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Max Path Sum with Exactly K Nodes',
        difficulty: 'Very Hard',
        algorithm: 'tree-max-path',
        parent: '07-max-path-sum',
        description: 'Find the maximum path sum where the path must contain exactly K nodes. The path still follows parent-child connections. Adds a path-length constraint. At each node, you must track the best sum for each possible path length from 1 to K, turning the problem into tree DP where each node returns a length-indexed array of best sums.',
        problem: 'Adds a path-length constraint. At each node, you must track the best sum for each possible path length from 1 to K, turning the problem into tree DP where each node returns a length-indexed array of best sums.',
        hints: [
            'Consider: Find the maximum path sum where the path must contain exactly K nodes.',
            'The path still follows parent-child connections.',
            'Key insight: Adds a path-length constraint.',
            'At each node, you must track the best sum for each possible path length from 1 to K, turning the problem into tree DP where each node returns a length-indexed array of best sums.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2->4, 1->2->5, 1->3->6, 1->3->7' },
                output: 'See explanation',
                explanation: 'Tree: 1->2->4, 1->2->5, 1->3->6, 1->3->7. K=3. Best 3-node path: 5+2+1=8 or 1+3+7=11. Answer: 11.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def max_path_sum_with_exactly_k_nodes(data):
    """
    Max Path Sum with Exactly K Nodes

    Find the maximum path sum where the path must contain exactly K nodes.
     The path still follows parent-child connections.

    Approach: Adds a path-length constraint

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Adds a path-length constraint

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Max Path Sum with Exactly K Nodes
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->2->4, 1->2->5, 1->3->6, 1->3->7
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

// MaxPathSumWithExactlyKNodes solves: Max Path Sum with Exactly K Nodes
// Adds a path-length constraint
// Time: O(n), Space: O(n)
func MaxPathSumWithExactlyKNodes(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Max Path Sum with Exactly K Nodes
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
    // Example: Tree: 1->2->4, 1->2->5, 1->3->6, 1->3->7
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum/twist-01-max-path-sum-with-exactly-k-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum/twist-01-max-path-sum-with-exactly-k-nodes'] = problem;
})();
