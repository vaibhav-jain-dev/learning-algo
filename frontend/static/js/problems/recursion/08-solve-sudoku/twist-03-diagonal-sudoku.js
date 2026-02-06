/**
 * Diagonal Sudoku
 * Category: recursion
 * Difficulty: Hard
 * Parent: 08-solve-sudoku
 */
(function() {
    'use strict';
    const problem = {
        name: 'Diagonal Sudoku',
        difficulty: 'Hard',
        algorithm: 'recursion-sudoku',
        parent: '08-solve-sudoku',
        description: 'Solve a Sudoku variant where, in addition to rows, columns, and 3x3 boxes, both main diagonals must also contain digits 1-9.',
        problem: 'Adds two extra constraints to the validity check, significantly reducing the valid states and requiring diagonal-aware constraint propagation.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'A 9x9 board where the main diagonal (top-left to bottom-right) and anti-diagonal both must contain all digits 1-9.' },
                output: 'See example',
                explanation: 'A 9x9 board where the main diagonal (top-left to bottom-right) and anti-diagonal both must contain all digits 1-9.'
            }
        ],
        solutions: {
            python: `# Diagonal Sudoku
# Category: recursion
# Difficulty: Hard
# Parent: 08-solve-sudoku

def solve():
    """
    Solve a Sudoku variant where, in addition to rows, columns, and 3x3 boxes, both main diagonals must also contain digits 1-9.

    Key insight: Adds two extra constraints to the validity check, significantly reducing the valid states and requiring diagonal-aware constraint propagation.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Diagonal Sudoku problem.
// Solve a Sudoku variant where, in addition to rows, columns, and 3x3 boxes, both main diagonals must also contain digits 1-9.
// Key insight: Adds two extra constraints to the validity check, significantly reducing the valid states and requiring diagonal-aware constraint propagation.
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
        window.ProblemRenderer.register('recursion', '08-solve-sudoku/twist-03-diagonal-sudoku', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/08-solve-sudoku/twist-03-diagonal-sudoku'] = problem;
})();
