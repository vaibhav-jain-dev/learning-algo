/**
 * Sum of Pairwise Distances
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 10-all-kinds-node-depths
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sum of Pairwise Distances',
        difficulty: 'Very Hard',
        algorithm: 'tree-dfs',
        parent: '10-all-kinds-node-depths',
        description: 'Instead of summing depths treating each node as root, compute the sum of distances between all pairs of nodes in the tree. Pairwise distances include horizontal paths (not just root-to-node). Each edge contributes to the total based on how many node pairs it separates, requiring you to count nodes on each side of every edge.',
        problem: 'Pairwise distances include horizontal paths (not just root-to-node). Each edge contributes to the total based on how many node pairs it separates, requiring you to count nodes on each side of every edge.',
        hints: [
            'Consider: Instead of summing depths treating each node as root, compute the sum of distances between all pairs of nodes in the tree.',
            'Pairwise distances include horizontal paths (not just root-to-node).',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3]. Distances: d(1,2)=1, d(1,3)=1, d(2,3)=2. Total = 4. This is different from sum-of-all-depths which would be 0+1+1+1+1+2 = 6.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def sum_of_pairwise_distances(data):
    """
    Sum of Pairwise Distances

    Instead of summing depths treating each node as root, compute the sum of distances between all pairs of nodes in the tree.

    Approach: Pairwise distances include horizontal paths (not just root-to-node)

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Pairwise distances include horizontal paths (not just root-to-node)

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Sum of Pairwise Distances
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3]
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

// SumOfPairwiseDistances solves: Sum of Pairwise Distances
// Pairwise distances include horizontal paths (not just root-to-node)
// Time: O(n), Space: O(n)
func SumOfPairwiseDistances(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Sum of Pairwise Distances
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
    // Example: Tree [1, 2, 3]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '10-all-kinds-node-depths/twist-01-sum-of-pairwise-distances', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/10-all-kinds-node-depths/twist-01-sum-of-pairwise-distances'] = problem;
})();
