/**
 * Bidirectional BFS
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 08-a-star-algorithm/02-sliding-puzzle
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bidirectional BFS',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/02-sliding-puzzle',
        description: 'Solve the puzzle using bidirectional BFS -- searching forward from initial state and backward from goal, meeting in the middle.',
        problem: 'Explores roughly sqrt(N) states from each direction instead of N total, significantly reducing the search space for puzzles with large state spaces.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Forward BFS from initial state and backward BFS from [[1,2,3],[4,5,0]]. When they share a state, combine the two half-paths.' },
                output: 'See example',
                explanation: 'Forward BFS from initial state and backward BFS from [[1,2,3],[4,5,0]]. When they share a state, combine the two half-paths.'
            }
        ],
        solutions: {
            python: `# Bidirectional BFS
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm/02-sliding-puzzle

def solve():
    """
    Solve the puzzle using bidirectional BFS -- searching forward from initial state and backward from goal, meeting in the middle.

    Key insight: Explores roughly sqrt(N) states from each direction instead of N total, significantly reducing the search space for puzzles with large state spaces.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Bidirectional BFS problem.
// Solve the puzzle using bidirectional BFS -- searching forward from initial state and backward from goal, meeting in the middle.
// Key insight: Explores roughly sqrt(N) states from each direction instead of N total, significantly reducing the search space for puzzles with large state spaces.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/02-sliding-puzzle/twist-04-bidirectional-bfs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/02-sliding-puzzle/twist-04-bidirectional-bfs'] = problem;
})();
