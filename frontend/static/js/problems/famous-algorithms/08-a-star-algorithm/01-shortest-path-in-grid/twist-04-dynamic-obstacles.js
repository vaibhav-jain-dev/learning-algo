/**
 * Dynamic Obstacles
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';
    const problem = {
        name: 'Dynamic Obstacles',
        difficulty: 'Hard',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Obstacles appear and disappear at known time steps. Find the shortest path accounting for time-dependent obstacles.',
        problem: 'The state space becomes 3D (row, col, time), as a cell might be blocked at time t but open at time t+1, requiring time-expanded graph search.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Cell (1,1) is blocked at times 0-2 but open at time 3+. You might need to wait or take a detour, making the search 3D.' },
                output: 'See example',
                explanation: 'Cell (1,1) is blocked at times 0-2 but open at time 3+. You might need to wait or take a detour, making the search 3D.'
            }
        ],
        solutions: {
            python: `# Dynamic Obstacles
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm/01-shortest-path-in-grid

def solve():
    """
    Obstacles appear and disappear at known time steps. Find the shortest path accounting for time-dependent obstacles.

    Key insight: The state space becomes 3D (row, col, time), as a cell might be blocked at time t but open at time t+1, requiring time-expanded graph search.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Dynamic Obstacles problem.
// Obstacles appear and disappear at known time steps. Find the shortest path accounting for time-dependent obstacles.
// Key insight: The state space becomes 3D (row, col, time), as a cell might be blocked at time t but open at time t+1, requiring time-expanded graph search.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-04-dynamic-obstacles', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-04-dynamic-obstacles'] = problem;
})();
