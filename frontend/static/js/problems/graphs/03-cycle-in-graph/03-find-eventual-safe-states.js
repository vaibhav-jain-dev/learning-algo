/**
 * Find Eventual Safe States
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Eventual Safe States',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph',
        description: 'There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i]. A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a terminal node (or another safe node). Return an array containing all the safe nodes of ',
        problem: 'Detect cycles using DFS with node coloring: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        hints: [
            'Use three states: unvisited, in-progress, completed.',
            'A back edge to an in-progress node indicates a cycle.',
            'For undirected graphs, track parent to avoid false positives.',
            'Consider using Union-Find as an alternative approach.',
            'DFS naturally handles cycle detection with recursion stack.'
        ],
        examples: [
    {
        input: {
        "graph": [
                [
                        1,
                        2
                ],
                [
                        2,
                        3
                ],
                [
                        5
                ],
                [
                        0
                ],
                [
                        5
                ],
                [],
                []
        ]
},
        output: [2, 4, 5, 6],
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2], [2, 3], ..., []] (length 7), the result is [2, 4, 5, 6].'
    },
    {
        input: {
        "graph": [
                [
                        1,
                        2,
                        3,
                        4
                ],
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ],
                [
                        0,
                        4
                ],
                []
        ]
},
        output: [4],
        explanation: 'Exploring the graph structure, we find the required path or value. For input graph=[[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []], the result is [4].'
    }
        ],
        solutions: {
            python: `def eventualSafeNodes(graph):
    """
    Find Eventual Safe States - DFS with coloring to find nodes not in cycles.

    A safe node is one that doesn't lead to a cycle (all paths end at terminal).

    Time: O(V + E) where V is nodes, E is edges
    Space: O(V) for color array and recursion stack
    """
    n = len(graph)
    # Colors: 0 = white (unvisited), 1 = gray (visiting), 2 = black (safe)
    color = [0] * n

    def dfs(node):
        """Returns True if node is safe (not part of or leading to a cycle)"""
        if color[node] == 1:  # Gray - in current path, cycle found
            return False
        if color[node] == 2:  # Black - already confirmed safe
            return True

        # Mark as visiting (gray)
        color[node] = 1

        # Check all neighbors
        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False  # Neighbor leads to cycle

        # All paths from this node are safe
        color[node] = 2  # Mark as safe (black)
        return True

    # Find all safe nodes
    result = []
    for i in range(n):
        if dfs(i):
            result.append(i)

    return result


# Test
if __name__ == "__main__":
    # Example 1
    graph1 = [[1, 2], [2, 3], [5], [0], [5], [], []]
    print(eventualSafeNodes(graph1))  # Output: [2, 4, 5, 6]

    # Example 2
    graph2 = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]
    print(eventualSafeNodes(graph2))  # Output: [4]`,
            go: `package main

import "fmt"

// eventualSafeNodes finds all safe nodes using DFS with coloring.
// Time: O(V + E), Space: O(V)
func eventualSafeNodes(graph [][]int) []int {
    n := len(graph)
    // Colors: 0 = white (unvisited), 1 = gray (visiting), 2 = black (safe)
    color := make([]int, n)

    var dfs func(node int) bool
    dfs = func(node int) bool {
        if color[node] == 1 { // Gray - cycle found
            return false
        }
        if color[node] == 2 { // Black - already safe
            return true
        }

        // Mark as visiting (gray)
        color[node] = 1

        // Check all neighbors
        for _, neighbor := range graph[node] {
            if !dfs(neighbor) {
                return false // Neighbor leads to cycle
            }
        }

        // All paths from this node are safe
        color[node] = 2 // Mark as safe (black)
        return true
    }

    // Find all safe nodes
    result := []int{}
    for i := 0; i < n; i++ {
        if dfs(i) {
            result = append(result, i)
        }
    }

    return result
}

func main() {
    // Example 1
    graph1 := [][]int{{1, 2}, {2, 3}, {5}, {0}, {5}, {}, {}}
    fmt.Println(eventualSafeNodes(graph1)) // Output: [2 4 5 6]

    // Example 2
    graph2 := [][]int{{1, 2, 3, 4}, {1, 2}, {3, 4}, {0, 4}, {}}
    fmt.Println(eventualSafeNodes(graph2)) // Output: [4]
}`
        },
        twists: [
            {
                title: 'Find Eventual Safe States Using Reverse Graph BFS',
                difficulty: 'Medium',
                description: 'Solve the problem by reversing all edges and using BFS from terminal nodes. Process nodes whose all original outgoing edges lead to safe nodes.',
                whyDifferent: 'Completely different approach: instead of DFS with coloring, you reverse the graph and propagate "safety" backward from terminal nodes using topological-sort-like BFS processing.',
                example: 'Same graph. Reverse edges, start BFS from terminal nodes (5,6). Propagate safety: 2 and 4 are safe (all successors safe). 0,1,3 are unsafe (part of cycle).'
            },
            {
                title: 'Find Unsafe States and the Cycles They Belong To',
                difficulty: 'Hard',
                description: 'Return not just the safe nodes, but for each unsafe node, identify which cycle it participates in or leads to.',
                whyDifferent: 'Requires not just classification but cycle extraction. You need to trace back through gray nodes to reconstruct the actual cycles, grouping unsafe nodes by their associated cycle.',
                example: 'Graph: [[1,2],[2,3],[5],[0],[5],[],[]]. Unsafe: {0,1,3} form cycle 0->1->3->0. Node 1 also reaches safe node 2 but has a path to cycle.'
            },
            {
                title: 'Safe States in an Undirected Graph',
                difficulty: 'Hard',
                description: 'Define a "safe node" in an undirected graph as one that is not part of any cycle. Find all such nodes (articulation-related concept).',
                whyDifferent: 'In undirected graphs, cycle detection works differently (must track parent). A node is "safe" only if it is not on any cycle, which relates to biconnected components and bridge detection.',
                example: 'Undirected: 0-1, 1-2, 2-0, 2-3, 3-4. Nodes 0,1,2 are in a cycle (unsafe). Nodes 3,4 are safe (not in any cycle).'
            },
            {
                title: 'Safe States with Time-Varying Edges',
                difficulty: 'Very Hard',
                description: 'Edges are active only during certain time intervals. A node is safe if at no point in time can following active edges from it lead to an infinite loop.',
                whyDifferent: 'The graph structure changes over time, so a static DFS is insufficient. You must consider temporal paths where each step uses an edge active at the right time, creating a much more complex state space.',
                example: 'Edge 0->1 active t=[0,5], Edge 1->0 active t=[3,8]. At t=4, cycle 0->1->0 is possible (both edges active). Node 0 is unsafe during t=[3,5].'
            },
            {
                title: 'Output Prediction: Which Nodes are Safe?',
                difficulty: 'Medium',
                description: 'Given a graph diagram, predict which nodes are safe without running an algorithm. Trace paths mentally from each node to determine if all paths terminate.',
                whyDifferent: 'Tests conceptual understanding rather than coding. You must reason about the difference between "some paths terminate" and "ALL paths terminate" from a node, which is the key insight of the problem.',
                example: 'Graph: A->B, A->C, B->D, D->B, C->E. A is unsafe (path A->B->D->B loops). C is safe (C->E terminates). Even though A->C->E terminates, A is still unsafe because A->B loops.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/03-find-eventual-safe-states', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/03-find-eventual-safe-states'] = problem;

})();
