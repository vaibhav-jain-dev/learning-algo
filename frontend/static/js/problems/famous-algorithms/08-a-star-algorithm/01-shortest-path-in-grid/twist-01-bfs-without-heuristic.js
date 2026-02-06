/**
 * BFS Without Heuristic
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';
    const problem = {
        name: 'BFS Without Heuristic',
        difficulty: 'Easy',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Solve the shortest path using plain BFS instead of A*, since all edges have unit weight.',
        problem: 'For unweighted grids, BFS guarantees shortest path without needing a heuristic or priority queue, making it simpler and potentially faster due to queue vs heap constants.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'BFS from (0,0) explores level by level. When it first reaches (n-1,n-1), the path length is guaranteed optimal.' },
                output: 'See example',
                explanation: 'BFS from (0,0) explores level by level. When it first reaches (n-1,n-1), the path length is guaranteed optimal.'
            }
        ],
        solutions: {
            python: `# BFS Without Heuristic
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 08-a-star-algorithm/01-shortest-path-in-grid

def solve():
    """
    Solve the shortest path using plain BFS instead of A*, since all edges have unit weight.

    Key insight: For unweighted grids, BFS guarantees shortest path without needing a heuristic or priority queue, making it simpler and potentially faster due to queue vs heap constants.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the BFS Without Heuristic problem.
// Solve the shortest path using plain BFS instead of A*, since all edges have unit weight.
// Key insight: For unweighted grids, BFS guarantees shortest path without needing a heuristic or priority queue, making it simpler and potentially faster due to queue vs heap constants.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-01-bfs-without-heuristic', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-01-bfs-without-heuristic'] = problem;
})();
