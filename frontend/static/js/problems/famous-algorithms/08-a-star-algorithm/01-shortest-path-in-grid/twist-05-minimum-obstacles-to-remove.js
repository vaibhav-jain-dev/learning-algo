/**
 * Minimum Obstacles to Remove
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Obstacles to Remove',
        difficulty: 'Hard',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Instead of finding a path avoiding obstacles, find the path from start to end that requires removing the fewest obstacles.',
        problem: 'Transforms to a 0-1 BFS problem where moving to an empty cell costs 0 and moving to an obstacle costs 1 (to remove it). Uses deque instead of priority queue.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Grid has a wall of obstacles. The shortest path by cell count goes around, but removing 2 obstacles creates a much shorter direct path.' },
                output: 'See example',
                explanation: 'Grid has a wall of obstacles. The shortest path by cell count goes around, but removing 2 obstacles creates a much shorter direct path.'
            }
        ],
        solutions: {
            python: `# Minimum Obstacles to Remove
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm/01-shortest-path-in-grid

def solve():
    """
    Instead of finding a path avoiding obstacles, find the path from start to end that requires removing the fewest obstacles.

    Key insight: Transforms to a 0-1 BFS problem where moving to an empty cell costs 0 and moving to an obstacle costs 1 (to remove it). Uses deque instead of priority queue.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Minimum Obstacles to Remove problem.
// Instead of finding a path avoiding obstacles, find the path from start to end that requires removing the fewest obstacles.
// Key insight: Transforms to a 0-1 BFS problem where moving to an empty cell costs 0 and moving to an obstacle costs 1 (to remove it). Uses deque instead of priority queue.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-05-minimum-obstacles-to-remove', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-05-minimum-obstacles-to-remove'] = problem;
})();
