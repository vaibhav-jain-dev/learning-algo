/**
 * Larger Puzzle (3x3 or 4x4)
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Parent: 08-a-star-algorithm/02-sliding-puzzle
 */
(function() {
    'use strict';
    const problem = {
        name: 'Larger Puzzle (3x3 or 4x4)',
        difficulty: 'Very Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/02-sliding-puzzle',
        description: 'Scale the solution to a 3x3 (8-puzzle) or 4x4 (15-puzzle) board.',
        problem: 'The state space explodes (9!/2 = 181,440 for 8-puzzle, 16!/2 ~ 10^13 for 15-puzzle), requiring more sophisticated heuristics like pattern databases.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'The 15-puzzle cannot be solved by brute-force BFS. Need IDA* with Manhattan distance heuristic or pattern database heuristic.' },
                output: 'See example',
                explanation: 'The 15-puzzle cannot be solved by brute-force BFS. Need IDA* with Manhattan distance heuristic or pattern database heuristic.'
            }
        ],
        solutions: {
            python: `# Larger Puzzle (3x3 or 4x4)
# Category: famous-algorithms
# Difficulty: Very Hard
# Parent: 08-a-star-algorithm/02-sliding-puzzle

def solve():
    """
    Scale the solution to a 3x3 (8-puzzle) or 4x4 (15-puzzle) board.

    Key insight: The state space explodes (9!/2 = 181,440 for 8-puzzle, 16!/2 ~ 10^13 for 15-puzzle), requiring more sophisticated heuristics like pattern databases.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Larger Puzzle (3x3 or 4x4) problem.
// Scale the solution to a 3x3 (8-puzzle) or 4x4 (15-puzzle) board.
// Key insight: The state space explodes (9!/2 = 181,440 for 8-puzzle, 16!/2 ~ 10^13 for 15-puzzle), requiring more sophisticated heuristics like pattern databases.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/02-sliding-puzzle/twist-03-larger-puzzle-3x3-or-4x4', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/02-sliding-puzzle/twist-03-larger-puzzle-3x3-or-4x4'] = problem;
})();
