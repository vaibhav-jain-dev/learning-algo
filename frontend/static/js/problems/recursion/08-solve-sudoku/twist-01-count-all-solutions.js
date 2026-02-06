/**
 * Count All Solutions
 * Category: recursion
 * Difficulty: Hard
 * Parent: 08-solve-sudoku
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count All Solutions',
        difficulty: 'Hard',
        algorithm: 'recursion-sudoku',
        parent: '08-solve-sudoku',
        description: 'Instead of returning one solved board, count the total number of valid solutions for the given Sudoku puzzle.',
        problem: 'Requires exhaustive search instead of stopping at the first solution, changing the backtracking to continue exploring after finding each valid completion.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'A puzzle with 2 valid solutions returns 2. A well-formed puzzle returns 1. An invalid puzzle returns 0.' },
                output: 'See example',
                explanation: 'A puzzle with 2 valid solutions returns 2. A well-formed puzzle returns 1. An invalid puzzle returns 0.'
            }
        ],
        solutions: {
            python: `# Count All Solutions
# Category: recursion
# Difficulty: Hard
# Parent: 08-solve-sudoku

def solve():
    """
    Instead of returning one solved board, count the total number of valid solutions for the given Sudoku puzzle.

    Key insight: Requires exhaustive search instead of stopping at the first solution, changing the backtracking to continue exploring after finding each valid completion.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count All Solutions problem.
// Instead of returning one solved board, count the total number of valid solutions for the given Sudoku puzzle.
// Key insight: Requires exhaustive search instead of stopping at the first solution, changing the backtracking to continue exploring after finding each valid completion.
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
        window.ProblemRenderer.register('recursion', '08-solve-sudoku/twist-01-count-all-solutions', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/08-solve-sudoku/twist-01-count-all-solutions'] = problem;
})();
