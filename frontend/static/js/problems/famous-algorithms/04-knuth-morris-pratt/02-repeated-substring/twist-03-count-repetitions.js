/**
 * Count Repetitions
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Repetitions',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'If the string is a repeated pattern, return how many times the base pattern is repeated.',
        problem: 'After confirming the pattern exists using KMP/LPS, simply divide the string length by the pattern length to get the count.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "abcabcabc", the pattern "abc" repeats 3 times. Return 3.' },
                output: 'See example',
                explanation: 'For "abcabcabc", the pattern "abc" repeats 3 times. Return 3.'
            }
        ],
        solutions: {
            python: `# Count Repetitions
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 04-knuth-morris-pratt/02-repeated-substring

def solve():
    """
    If the string is a repeated pattern, return how many times the base pattern is repeated.

    Key insight: After confirming the pattern exists using KMP/LPS, simply divide the string length by the pattern length to get the count.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Repetitions problem.
// If the string is a repeated pattern, return how many times the base pattern is repeated.
// Key insight: After confirming the pattern exists using KMP/LPS, simply divide the string length by the pattern length to get the count.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-03-count-repetitions', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-03-count-repetitions'] = problem;
})();
