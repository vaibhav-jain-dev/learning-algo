/**
 * Constraint Propagation Only
 * Category: recursion
 * Difficulty: Hard
 * Parent: 08-solve-sudoku
 */
(function() {
    'use strict';
    const problem = {
        name: 'Constraint Propagation Only',
        difficulty: 'Hard',
        algorithm: 'recursion-sudoku',
        parent: '08-solve-sudoku',
        description: 'Solve the Sudoku using only constraint propagation (naked singles, hidden singles) without any backtracking/guessing.',
        problem: 'Eliminates brute-force backtracking entirely, relying purely on logical deduction techniques that mimic how humans solve Sudoku.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For an easy puzzle, iteratively fill cells where only one digit is possible until the board is complete, without ever guessing.' },
                output: 'See example',
                explanation: 'For an easy puzzle, iteratively fill cells where only one digit is possible until the board is complete, without ever guessing.'
            }
        ],
        solutions: {
            python: `# Constraint Propagation Only
# Category: recursion
# Difficulty: Hard
# Parent: 08-solve-sudoku

def solve():
    """
    Solve the Sudoku using only constraint propagation (naked singles, hidden singles) without any backtracking/guessing.

    Key insight: Eliminates brute-force backtracking entirely, relying purely on logical deduction techniques that mimic how humans solve Sudoku.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Constraint Propagation Only problem.
// Solve the Sudoku using only constraint propagation (naked singles, hidden singles) without any backtracking/guessing.
// Key insight: Eliminates brute-force backtracking entirely, relying purely on logical deduction techniques that mimic how humans solve Sudoku.
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
        window.ProblemRenderer.register('recursion', '08-solve-sudoku/twist-05-constraint-propagation-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/08-solve-sudoku/twist-05-constraint-propagation-only'] = problem;
})();
