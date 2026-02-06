/**
 * Nodes at Distance K in a Graph
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Nodes at Distance K in a Graph',
        difficulty: 'Hard',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'The same problem but the input is a general undirected graph (not a tree). Find all nodes at distance exactly k from a given source node. In a tree, there is exactly one path between any two nodes. In a graph with cycles, BFS naturally handles this, but you must track visited nodes to avoid infinite loops. The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.',
        problem: 'In a tree, there is exactly one path between any two nodes. In a graph with cycles, BFS naturally handles this, but you must track visited nodes to avoid infinite loops. The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.',
        hints: [
            'Consider: The same problem but the input is a general undirected graph (not a tree).',
            'Find all nodes at distance exactly k from a given source node.',
            'Key insight: In a tree, there is exactly one path between any two nodes.',
            'The parent-mapping step from the tree version becomes unnecessary since the graph already has explicit edges.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Graph: edges [(1,2), (2,3), (3,4), (1,4)]' },
                output: 'See explanation',
                explanation: 'Graph: edges [(1,2), (2,3), (3,4), (1,4)]. Source=1, k=2. BFS from 1: distance 0={1}, distance 1={2,4}, distance 2={3}. Answer: [3].'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def nodes_at_distance_k_in_a_graph(data):
    """
    Nodes at Distance K in a Graph

    The same problem but the input is a general undirected graph (not a tree).
     Find all nodes at distance exactly k from a given source node.

    Approach: In a tree, there is exactly one path between any two nodes

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: In a tree, there is exactly one path between any two nodes

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Nodes at Distance K in a Graph
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Graph: edges [(1,2), (2,3), (3,4), (1,4)]
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

// NodesAtDistanceKInAGraph solves: Nodes at Distance K in a Graph
// In a tree, there is exactly one path between any two nodes
// Time: O(n), Space: O(n)
func NodesAtDistanceKInAGraph(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Nodes at Distance K in a Graph
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
    // Example: Graph: edges [(1,2), (2,3), (3,4), (1,4)]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-04-nodes-at-distance-k-in-a-graph', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-04-nodes-at-distance-k-in-a-graph'] = problem;
})();
