/**
 * Rabin-Karp Alternative
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';
    const problem = {
        name: 'Rabin-Karp Alternative',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Implement strStr using the Rabin-Karp rolling hash algorithm instead of KMP.',
        problem: 'Uses a completely different approach based on hashing -- compute a rolling hash of each window and compare with the pattern hash, only doing full comparison on hash matches.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Hash "sad" = h1. Slide window over "sadbutsad", comparing rolling hash with h1. On match, verify character by character.' },
                output: 'See example',
                explanation: 'Hash "sad" = h1. Slide window over "sadbutsad", comparing rolling hash with h1. On match, verify character by character.'
            }
        ],
        solutions: {
            python: `# Rabin-Karp Alternative
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt/01-implement-strstr

def solve():
    """
    Implement strStr using the Rabin-Karp rolling hash algorithm instead of KMP.

    Key insight: Uses a completely different approach based on hashing -- compute a rolling hash of each window and compare with the pattern hash, only doing full comparison on hash matches.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Rabin-Karp Alternative problem.
// Implement strStr using the Rabin-Karp rolling hash algorithm instead of KMP.
// Key insight: Uses a completely different approach based on hashing -- compute a rolling hash of each window and compare with the pattern hash, only doing full comparison on hash matches.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-04-rabin-karp-alternative', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-04-rabin-karp-alternative'] = problem;
})();
