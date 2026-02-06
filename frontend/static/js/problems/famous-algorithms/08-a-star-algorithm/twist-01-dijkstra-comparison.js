/**
 * Dijkstra Comparison
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 08-a-star-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Dijkstra Comparison',
        difficulty: 'Medium',
        algorithm: 'a-star',
        parent: '08-a-star-algorithm',
        description: 'Solve the same grid pathfinding problem using Dijkstra\'s algorithm (no heuristic) and compare the number of nodes explored with A*.',
        problem: 'Dijkstra explores in all directions equally (like BFS for unweighted), while A* focuses toward the goal. Comparing node counts demonstrates the heuristic\'s value.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'On a 10x10 grid with start at (0,0) and end at (9,9), Dijkstra might explore 80 nodes while A* with Manhattan heuristic explores only 25.' },
                output: 'See example',
                explanation: 'On a 10x10 grid with start at (0,0) and end at (9,9), Dijkstra might explore 80 nodes while A* with Manhattan heuristic explores only 25.'
            }
        ],
        solutions: {
            python: `# Dijkstra Comparison
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 08-a-star-algorithm

def solve():
    """
    Solve the same grid pathfinding problem using Dijkstra's algorithm (no heuristic) and compare the number of nodes explored with A*.

    Key insight: Dijkstra explores in all directions equally (like BFS for unweighted), while A* focuses toward the goal. Comparing node counts demonstrates the heuristic's value.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Dijkstra Comparison problem.
// Solve the same grid pathfinding problem using Dijkstra's algorithm (no heuristic) and compare the number of nodes explored with A*.
// Key insight: Dijkstra explores in all directions equally (like BFS for unweighted), while A* focuses toward the goal. Comparing node counts demonstrates the heuristic's value.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/twist-01-dijkstra-comparison', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/twist-01-dijkstra-comparison'] = problem;
})();
