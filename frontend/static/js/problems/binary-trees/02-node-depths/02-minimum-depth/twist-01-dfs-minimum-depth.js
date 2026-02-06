/**
 * DFS Minimum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'DFS Minimum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Solve minimum depth using DFS (recursion) instead of BFS. Be careful about the definition of minimum depth when one child is null. Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree. The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.',
        problem: 'Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree. The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.',
        hints: [
            'Consider: Solve minimum depth using DFS (recursion) instead of BFS.',
            'Be careful about the definition of minimum depth when one child is null.',
            'Key insight: Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree.',
            'The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->null, 1->2->3' },
                output: 'See explanation',
                explanation: 'Tree: 1->null, 1->2->3. Min depth is 3 (leaf at 3), NOT 1. The root is not a leaf despite having a null left child.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def dfs_minimum_depth(data):
    """
    DFS Minimum Depth

    Solve minimum depth using DFS (recursion) instead of BFS.
     Be careful about the definition of minimum depth when one child is null.

    Approach: Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement DFS Minimum Depth
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->null, 1->2->3
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

// DfsMinimumDepth solves: DFS Minimum Depth
// Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree
// Time: O(n), Space: O(n)
func DfsMinimumDepth(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement DFS Minimum Depth
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
    // Example: Tree: 1->null, 1->2->3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-01-dfs-minimum-depth', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-01-dfs-minimum-depth'] = problem;
})();
