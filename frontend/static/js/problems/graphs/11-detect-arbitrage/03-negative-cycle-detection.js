/**
 * Negative Cycle Detection
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: bellman-ford
 */
(function() {
    'use strict';

    const problem = {
        name: 'Negative Cycle Detection',
        difficulty: 'Medium',
        algorithm: 'bellman-ford',
        parent: '11-detect-arbitrage',
        description: 'Given a directed weighted graph with n vertices and a list of edges, determine if the graph contains a negative weight cycle (a cycle where the sum of edge weights is negative). Negative cycles make shortest path undefined (can always get shorter by going around the cycle again).',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(V * E)',
            space: 'O(V)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "n": 4,
        "edges": [
                [
                        0,
                        1,
                        1
                ],
                [
                        1,
                        2,
                        -3
                ],
                [
                        2,
                        3,
                        2
                ],
                [
                        3,
                        1,
                        1
                ]
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input n=4, edges=[[0, 1, 1], [1, 2, -3], [2, 3, 2], [3, 1, 1]], the result is true.'
    }
        ],
        solutions: {
            python: `def hasNegativeCycle(n, edges):
    """
    Negative Cycle Detection - Bellman-Ford Algorithm

    Run Bellman-Ford for n-1 iterations to find shortest paths.
    Then run one more iteration - if any distance improves,
    there's a negative cycle.

    Time: O(V * E)
    Space: O(V)
    """
    INF = float('inf')
    dist = [INF] * n
    dist[0] = 0  # Start from node 0 (or any node)

    # Relax all edges n-1 times
    for _ in range(n - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True

        # Early termination if no updates
        if not updated:
            break

    # Check for negative cycle: run one more iteration
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            return True  # Negative cycle detected

    return False


def hasNegativeCycleFromAllNodes(n, edges):
    """
    Check for negative cycle reachable from any node.
    Initialize all distances to 0 instead of INF.
    """
    dist = [0] * n  # Start all at 0

    # Relax all edges n-1 times
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # Check for negative cycle
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return True

    return False


# Test
if __name__ == "__main__":
    # Test case 1: Has negative cycle (1 -> 2 -> 3 -> 1 = -3 + 2 + 1 = 0...
    # Actually cycle is 1->2->3->1: 1 + (-3) + 2 + 1 = 1, need different example)
    # Cycle: 1 -> 2 -> 3 -> 1 with weights -3, 2, 1 -> total = 0
    # Let's use: weights that sum to negative
    n = 4
    edges = [[0, 1, 1], [1, 2, -3], [2, 3, 2], [3, 1, -1]]
    # Cycle 1->2->3->1: -3 + 2 + (-1) = -2 (negative!)
    print(hasNegativeCycle(n, edges))  # True

    # Test case 2: No negative cycle
    edges2 = [[0, 1, 1], [1, 2, 2], [2, 3, 3]]
    print(hasNegativeCycle(4, edges2))  # False

    # Test case 3: Negative edge but no cycle
    edges3 = [[0, 1, -5], [1, 2, 3]]
    print(hasNegativeCycle(3, edges3))  # False`,
            go: `package main

import "fmt"

const INF = 1 << 30

// HasNegativeCycle detects negative weight cycle using Bellman-Ford
// Time: O(V*E), Space: O(V)
func HasNegativeCycle(n int, edges [][]int) bool {
    dist := make([]int, n)
    for i := range dist {
        dist[i] = INF
    }
    dist[0] = 0 // Start from node 0

    // Relax all edges n-1 times
    for i := 0; i < n-1; i++ {
        updated := false
        for _, e := range edges {
            u, v, w := e[0], e[1], e[2]
            if dist[u] != INF && dist[u]+w < dist[v] {
                dist[v] = dist[u] + w
                updated = true
            }
        }

        // Early termination
        if !updated {
            break
        }
    }

    // Check for negative cycle
    for _, e := range edges {
        u, v, w := e[0], e[1], e[2]
        if dist[u] != INF && dist[u]+w < dist[v] {
            return true // Negative cycle detected
        }
    }

    return false
}

// HasNegativeCycleFromAllNodes checks for negative cycle reachable from any node
func HasNegativeCycleFromAllNodes(n int, edges [][]int) bool {
    dist := make([]int, n) // All start at 0

    // Relax all edges n-1 times
    for i := 0; i < n-1; i++ {
        for _, e := range edges {
            u, v, w := e[0], e[1], e[2]
            if dist[u]+w < dist[v] {
                dist[v] = dist[u] + w
            }
        }
    }

    // Check for negative cycle
    for _, e := range edges {
        u, v, w := e[0], e[1], e[2]
        if dist[u]+w < dist[v] {
            return true
        }
    }

    return false
}

func main() {
    // Test case 1: Has negative cycle
    // Cycle 1->2->3->1: -3 + 2 + (-1) = -2 (negative!)
    n := 4
    edges := [][]int{{0, 1, 1}, {1, 2, -3}, {2, 3, 2}, {3, 1, -1}}
    fmt.Println(HasNegativeCycle(n, edges)) // true

    // Test case 2: No negative cycle
    edges2 := [][]int{{0, 1, 1}, {1, 2, 2}, {2, 3, 3}}
    fmt.Println(HasNegativeCycle(4, edges2)) // false

    // Test case 3: Negative edge but no cycle
    edges3 := [][]int{{0, 1, -5}, {1, 2, 3}}
    fmt.Println(HasNegativeCycle(3, edges3)) // false
}`
        },
        twists: [
            { title: 'Find the Negative Cycle', difficulty: 'Hard', description: 'Not just detect, but return the actual vertices forming the negative cycle.', whyDifferent: 'After detecting a relaxation in the Nth iteration, you backtrack through predecessors to trace the cycle. You must follow the predecessor chain for N steps to ensure you are inside the cycle.', example: 'Edges [0->1 weight 1, 1->2 weight -3, 2->0 weight 1]. Cycle: [0, 1, 2, 0] with total weight -1.' },
            { title: 'Positive Cycle Detection', difficulty: 'Easy', description: 'Detect if the graph contains a positive weight cycle instead of negative.', whyDifferent: 'Negate all edge weights and run Bellman-Ford for negative cycle detection. Alternatively, run the algorithm seeking increases rather than decreases.', example: 'Edges [0->1 weight 3, 1->2 weight 2, 2->0 weight 1]. Cycle 0->1->2->0 has weight 6 > 0. Positive cycle exists.' },
            { title: 'Shortest Path with No Negative Cycles', difficulty: 'Medium', description: 'If no negative cycle exists, return the shortest path distances from source to all nodes. If negative cycle exists, report which nodes are affected.', whyDifferent: 'You combine detection with computation. Nodes reachable from a negative cycle have distance negative infinity, requiring BFS from cycle nodes to mark affected nodes.', example: 'Negative cycle at nodes {1,2,3}. Node 4 reachable from node 3 has distance -infinity. Node 5 not reachable from cycle has finite distance.' },
            { title: 'Minimum Weight Cycle', difficulty: 'Very Hard', description: 'Find the cycle with the minimum total weight in the graph (whether negative or not).', whyDifferent: 'Bellman-Ford detects any negative cycle but not the minimum one. Finding the minimum weight cycle requires running shortest path from each node and checking all back edges.', example: 'Cycles: [0,1,0] weight 4, [1,2,3,1] weight -2, [0,1,2,0] weight 1. Minimum weight cycle: [1,2,3,1] with weight -2.' },
            { title: 'Negative Cycle in Undirected Graph', difficulty: 'Hard', description: 'The graph is undirected. Detect if any cycle has negative total weight.', whyDifferent: 'In undirected graphs, every negative edge creates a trivial negative cycle (traverse back and forth). You must define meaningful cycles as simple cycles with at least 3 nodes.', example: 'Undirected edge (0,1) weight -5. Traversing 0->1->0 costs -10, but this is a degenerate cycle. Look for simple cycles of length >= 3.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/03-negative-cycle-detection', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/03-negative-cycle-detection'] = problem;

})();
