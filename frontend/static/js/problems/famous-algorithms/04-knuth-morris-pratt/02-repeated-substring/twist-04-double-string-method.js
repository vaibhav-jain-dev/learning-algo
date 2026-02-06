/**
 * Double String Method
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';
    const problem = {
        name: 'Double String Method',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'Solve the repeated substring problem by checking if s exists in (s + s) with the first and last characters removed.',
        problem: 'Uses a completely different mathematical insight -- if s is a repeated pattern, removing a character from each end of s+s still contains s. No LPS needed.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For s="abab", s+s="abababab". Remove first and last: "babababa". Does "abab" appear in it? Yes, so it is a repeated pattern.' },
                output: 'See example',
                explanation: 'For s="abab", s+s="abababab". Remove first and last: "babababa". Does "abab" appear in it? Yes, so it is a repeated pattern.'
            }
        ],
        solutions: {
            python: `# Double String Method
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt/02-repeated-substring

def solve():
    """
    Solve the repeated substring problem by checking if s exists in (s + s) with the first and last characters removed.

    Key insight: Uses a completely different mathematical insight -- if s is a repeated pattern, removing a character from each end of s+s still contains s. No LPS needed.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Double String Method problem.
// Solve the repeated substring problem by checking if s exists in (s + s) with the first and last characters removed.
// Key insight: Uses a completely different mathematical insight -- if s is a repeated pattern, removing a character from each end of s+s still contains s. No LPS needed.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-04-double-string-method', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-04-double-string-method'] = problem;
})();
