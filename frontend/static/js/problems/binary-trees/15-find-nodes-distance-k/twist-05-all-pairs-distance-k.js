/**
 * All Pairs Distance K
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Pairs Distance K',
        difficulty: 'Very Hard',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k. Return the count of such pairs. This generalizes from one target to all possible targets. A naive approach runs BFS from each node (O(n^2)). An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.',
        problem: 'This generalizes from one target to all possible targets. A naive approach runs BFS from each node (O(n^2)). An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.',
        hints: [
            'Consider: Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k.',
            'Return the count of such pairs.',
            'Key insight: This generalizes from one target to all possible targets.',
            'An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5], k=2' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5], k=2. Pairs at distance 2: (4,5), (4,1), (5,1), (2,3). Count = 4.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def all_pairs_distance_k(data):
    """
    All Pairs Distance K

    Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k.
     Return the count of such pairs.

    Approach: This generalizes from one target to all possible targets

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: This generalizes from one target to all possible targets

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement All Pairs Distance K
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5], k=2
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

// AllPairsDistanceK solves: All Pairs Distance K
// This generalizes from one target to all possible targets
// Time: O(n), Space: O(n)
func AllPairsDistanceK(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement All Pairs Distance K
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
    // Example: Tree [1, 2, 3, 4, 5], k=2
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-05-all-pairs-distance-k', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-05-all-pairs-distance-k'] = problem;
})();
