/**
 * Count Combinations Only
 * Category: recursion
 * Difficulty: Easy
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Combinations Only',
        difficulty: 'Easy',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Return just the total count of possible letter combinations without generating them.',
        problem: 'Transforms from a generation problem to a pure multiplication problem -- multiply the number of letters mapped to each digit.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "23", digit 2 has 3 letters, digit 3 has 3 letters, so answer is 3*3=9.' },
                output: 'See example',
                explanation: 'For "23", digit 2 has 3 letters, digit 3 has 3 letters, so answer is 3*3=9.'
            }
        ],
        solutions: {
            python: `# Count Combinations Only
# Category: recursion
# Difficulty: Easy
# Parent: 05-phone-mnemonics

def solve():
    """
    Return just the total count of possible letter combinations without generating them.

    Key insight: Transforms from a generation problem to a pure multiplication problem -- multiply the number of letters mapped to each digit.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Combinations Only problem.
// Return just the total count of possible letter combinations without generating them.
// Key insight: Transforms from a generation problem to a pure multiplication problem -- multiply the number of letters mapped to each digit.
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
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-03-count-combinations-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-03-count-combinations-only'] = problem;
})();
