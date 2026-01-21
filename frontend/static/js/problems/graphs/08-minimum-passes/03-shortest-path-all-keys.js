/**
 * Shortest Path to Get All Keys
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path to Get All Keys',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '08-minimum-passes',
        description: 'You are given an m x n grid grid where: - \'.\' is an empty cell - \'#\' is a wall - \'@\' is the starting point - Lowercase letters represent keys - Uppercase letters are locks that require the matching key Return the minimum number of moves to get all keys. If impossible, return -1.',
        complexity: {
            time: 'O(M * N * 2^K)',
            space: 'O(M * N * 2^K)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "grid": [
                "@.a..",
                "###.#",
                "b.A.B"
        ]
},
        output: 8,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[@.a.., ###.#, b.A.B], the result is 8.'
    }
        ],
        solutions: {
            python: `def shortestPathToGetAllKeys(data):
    """
    Shortest Path to Get All Keys

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: BFS explores breadth-first, ideal for shortest paths

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// ShortestPathToGetAllKeys solves the Shortest Path to Get All Keys problem.
// Time: O(n), Space: O(n)
func ShortestPathToGetAllKeys(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: BFS explores breadth-first, ideal for shortest paths

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/03-shortest-path-all-keys', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/03-shortest-path-all-keys'] = problem;

})();
