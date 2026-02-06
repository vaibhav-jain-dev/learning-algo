/**
 * Path Reconstruction
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';
    const problem = {
        name: 'Path Reconstruction',
        difficulty: 'Medium',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Return the actual path (list of coordinates) from start to end, not just the length.',
        problem: 'Requires maintaining a parent/predecessor map during search, then backtracking from the destination to the source to reconstruct the path.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For a 3x3 grid, return [(0,0),(0,1),(0,2),(1,2),(2,2)] as the path, not just length 5.' },
                output: 'See example',
                explanation: 'For a 3x3 grid, return [(0,0),(0,1),(0,2),(1,2),(2,2)] as the path, not just length 5.'
            }
        ],
        solutions: {
            python: `# Path Reconstruction
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 08-a-star-algorithm/01-shortest-path-in-grid

def solve():
    """
    Return the actual path (list of coordinates) from start to end, not just the length.

    Key insight: Requires maintaining a parent/predecessor map during search, then backtracking from the destination to the source to reconstruct the path.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Path Reconstruction problem.
// Return the actual path (list of coordinates) from start to end, not just the length.
// Key insight: Requires maintaining a parent/predecessor map during search, then backtracking from the destination to the source to reconstruct the path.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-02-path-reconstruction', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-02-path-reconstruction'] = problem;
})();
