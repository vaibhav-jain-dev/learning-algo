/**
 * Count Minimum Moves Only
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 08-a-star-algorithm/02-sliding-puzzle
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Minimum Moves Only',
        difficulty: 'Medium',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm/02-sliding-puzzle',
        description: 'Return just the move count without tracking the actual sequence of moves or states.',
        problem: 'Can use A* without storing the path, only the move count in each state, reducing memory overhead per state from O(moves) to O(1) extra.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For board [[4,1,2],[5,0,3]], return 5 (minimum moves) without specifying which tiles to move in what order.' },
                output: 'See example',
                explanation: 'For board [[4,1,2],[5,0,3]], return 5 (minimum moves) without specifying which tiles to move in what order.'
            }
        ],
        solutions: {
            python: `# Count Minimum Moves Only
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 08-a-star-algorithm/02-sliding-puzzle

def solve():
    """
    Return just the move count without tracking the actual sequence of moves or states.

    Key insight: Can use A* without storing the path, only the move count in each state, reducing memory overhead per state from O(moves) to O(1) extra.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Minimum Moves Only problem.
// Return just the move count without tracking the actual sequence of moves or states.
// Key insight: Can use A* without storing the path, only the move count in each state, reducing memory overhead per state from O(moves) to O(1) extra.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/02-sliding-puzzle/twist-05-count-minimum-moves-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/02-sliding-puzzle/twist-05-count-minimum-moves-only'] = problem;
})();
