/**
 * Conceptual Trap: Diagonal Movement
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 02-dijkstras-algorithm/03-path-with-minimum-effort
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Diagonal Movement',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/03-path-with-minimum-effort',
        description: 'What if diagonal movement is allowed (8 directions instead of 4)? Does the algorithm change structurally, or just the neighbor generation? What if diagonal movement costs sqrt(2) times the height difference?',
        problem: 'Adding diagonals increases edges from ~4*M*N to ~8*M*N but does not change the algorithm structure. The weighted diagonal variant adds complexity to the edge weight calculation and changes the optimal paths.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Grid [[1,10],[10,1]]. With 4-directions: must go through 10, effort=9. With diagonals: can go (0,0)->(1,1) directly, effort=|1-1|=0. Diagonals can dramatically reduce effort.' },
                output: 'See example',
                explanation: 'Grid [[1,10],[10,1]]. With 4-directions: must go through 10, effort=9. With diagonals: can go (0,0)->(1,1) directly, effort=|1-1|=0. Diagonals can dramatically reduce effort.'
            }
        ],
        solutions: {
            python: `# Conceptual Trap: Diagonal Movement
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 02-dijkstras-algorithm/03-path-with-minimum-effort

def solve():
    """
    What if diagonal movement is allowed (8 directions instead of 4)? Does the algorithm change structurally, or just the neighbor generation? What if diagonal movement costs sqrt(2) times the height difference?

    Key insight: Adding diagonals increases edges from ~4*M*N to ~8*M*N but does not change the algorithm structure. The weighted diagonal variant adds complexity to the edge weight calculation and changes the optimal paths.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Conceptual Trap: Diagonal Movement problem.
// What if diagonal movement is allowed (8 directions instead of 4)? Does the algorithm change structurally, or just the neighbor generation? What if diagonal movement costs sqrt(2) times the height difference?
// Key insight: Adding diagonals increases edges from ~4*M*N to ~8*M*N but does not change the algorithm structure. The weighted diagonal variant adds complexity to the edge weight calculation and changes the optimal paths.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/03-path-with-minimum-effort/twist-04-conceptual-trap-diagonal-movement', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/03-path-with-minimum-effort/twist-04-conceptual-trap-diagonal-movement'] = problem;
})();
