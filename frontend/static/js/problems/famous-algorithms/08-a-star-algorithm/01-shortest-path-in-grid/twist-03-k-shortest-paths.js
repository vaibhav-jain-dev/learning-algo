/**
 * K Shortest Paths
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';
    const problem = {
        name: 'K Shortest Paths',
        difficulty: 'Very Hard',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Find the k shortest paths from start to end in the binary grid (paths may share cells).',
        problem: 'A* finds only the shortest path. Finding k shortest requires allowing nodes to be visited multiple times and using Yen\'s algorithm or a modified A*.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'In a grid with multiple routes, the 1st shortest path has length 4, 2nd has length 5, 3rd has length 6. Return all k paths.' },
                output: 'See example',
                explanation: 'In a grid with multiple routes, the 1st shortest path has length 4, 2nd has length 5, 3rd has length 6. Return all k paths.'
            }
        ],
        solutions: {
            python: `# K Shortest Paths
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 08-a-star-algorithm/01-shortest-path-in-grid

def solve():
    """
    Find the k shortest paths from start to end in the binary grid (paths may share cells).

    Key insight: A* finds only the shortest path. Finding k shortest requires allowing nodes to be visited multiple times and using Yen's algorithm or a modified A*.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the K Shortest Paths problem.
// Find the k shortest paths from start to end in the binary grid (paths may share cells).
// Key insight: A* finds only the shortest path. Finding k shortest requires allowing nodes to be visited multiple times and using Yen's algorithm or a modified A*.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
}
`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-03-k-shortest-paths', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-03-k-shortest-paths'] = problem;
})();
