/**
 * Max Path Sum with Exactly K Nodes
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Max Path Sum with Exactly K Nodes',
        difficulty: 'Very Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Find the maximum path sum where the path must contain exactly K nodes. The path still follows parent-child connections. Adds a constraint dimension. At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.',
        problem: 'Adds a constraint dimension. At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.',
        hints: [
            'Consider: Find the maximum path sum where the path must contain exactly K nodes.',
            'The path still follows parent-child connections.',
            'Key insight: Adds a constraint dimension.',
            'At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2->3, 1->4' },
                output: 'See explanation',
                explanation: 'Tree: 1->2->3, 1->4. K=3. Path 3->2->1=6. Path 2->1->4=7. Answer: 7.'
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

    Approach: Adds a constraint dimension

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Adds a constraint dimension

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
    # Example: Tree: 1->2->3, 1->4
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
// Adds a constraint dimension
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
    // Example: Tree: 1->2->3, 1->4
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-03-max-path-sum-with-exactly-k-nodes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-03-max-path-sum-with-exactly-k-nodes'] = problem;
})();
