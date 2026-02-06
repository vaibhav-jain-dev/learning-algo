/**
 * Sum of Nodes at Distance K
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Sum of Nodes at Distance K',
        difficulty: 'Medium',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'Instead of returning the list of nodes at distance k from the target, return the sum of their values. While the core algorithm is the same, the aggregation changes. This tests whether your approach cleanly separates the "find nodes" step from the "collect results" step.',
        problem: 'While the core algorithm is the same, the aggregation changes. This tests whether your approach cleanly separates the "find nodes" step from the "collect results" step.',
        hints: [
            'Consider: Instead of returning the list of nodes at distance k from the target, return the sum of their values.',
            'While the core algorithm is the same, the aggregation changes.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3, 4, 5, 6, 7], target=2, k=2.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, 6, 7], target=2, k=2' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, 6, 7], target=2, k=2. Nodes at distance 2: [1 (up to 1, but that is distance 1)... actually 6, 7 via path 2->1->3->6 and 2->1->3->7]. Wait: 4,5 are distance 1, 1 is distance 1, 3 is distance 2, 6 is distance 3. Actually nodes at distance 2 from 2: node 3 and nodes... Let me recalculate. From target 2: distance 0=2, distance 1=4,5,1, distance 2=3, distance 3=6,7. So distance 2 gives [3], sum=3.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def sum_of_nodes_at_distance_k(data):
    """
    Sum of Nodes at Distance K

    Instead of returning the list of nodes at distance k from the target, return the sum of their values.

    Approach: While the core algorithm is the same, the aggregation changes

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: While the core algorithm is the same, the aggregation changes

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Sum of Nodes at Distance K
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5, 6, 7], target=2, k=2
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

// SumOfNodesAtDistanceK solves: Sum of Nodes at Distance K
// While the core algorithm is the same, the aggregation changes
// Time: O(n), Space: O(n)
func SumOfNodesAtDistanceK(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Sum of Nodes at Distance K
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
    // Example: Tree [1, 2, 3, 4, 5, 6, 7], target=2, k=2
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-02-sum-of-nodes-at-distance-k', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-02-sum-of-nodes-at-distance-k'] = problem;
})();
