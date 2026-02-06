/**
 * Find the Repeating Unit
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find the Repeating Unit',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'If the string can be constructed from a repeated substring, return that shortest repeating unit.',
        problem: 'Extends from boolean detection to extraction -- use the same LPS approach but return the substring s[0:patternLen] instead of just true/false.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "abcabcabc", return "abc". For "abab", return "ab". For "abc", return "" (no repeating unit).' },
                output: 'See example',
                explanation: 'For "abcabcabc", return "abc". For "abab", return "ab". For "abc", return "" (no repeating unit).'
            }
        ],
        solutions: {
            python: `# Find the Repeating Unit
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 04-knuth-morris-pratt/02-repeated-substring

def solve():
    """
    If the string can be constructed from a repeated substring, return that shortest repeating unit.

    Key insight: Extends from boolean detection to extraction -- use the same LPS approach but return the substring s[0:patternLen] instead of just true/false.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Find the Repeating Unit problem.
// If the string can be constructed from a repeated substring, return that shortest repeating unit.
// Key insight: Extends from boolean detection to extraction -- use the same LPS approach but return the substring s[0:patternLen] instead of just true/false.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-01-find-the-repeating-unit', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-01-find-the-repeating-unit'] = problem;
})();
