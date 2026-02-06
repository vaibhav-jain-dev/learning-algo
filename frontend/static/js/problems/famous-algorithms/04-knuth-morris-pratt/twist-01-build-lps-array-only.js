/**
 * Build LPS Array Only
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';
    const problem = {
        name: 'Build LPS Array Only',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Given a pattern, build and return just the LPS (Longest Proper Prefix which is also Suffix) failure function array.',
        problem: 'Focuses on understanding the preprocessing step in isolation, which is the core insight of KMP and often the hardest part to understand.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For pattern "ABABCABAB", the LPS array is [0,0,1,2,0,1,2,3,4].' },
                output: 'See example',
                explanation: 'For pattern "ABABCABAB", the LPS array is [0,0,1,2,0,1,2,3,4].'
            }
        ],
        solutions: {
            python: `# Build LPS Array Only
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt

def solve():
    """
    Given a pattern, build and return just the LPS (Longest Proper Prefix which is also Suffix) failure function array.

    Key insight: Focuses on understanding the preprocessing step in isolation, which is the core insight of KMP and often the hardest part to understand.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Build LPS Array Only problem.
// Given a pattern, build and return just the LPS (Longest Proper Prefix which is also Suffix) failure function array.
// Key insight: Focuses on understanding the preprocessing step in isolation, which is the core insight of KMP and often the hardest part to understand.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-01-build-lps-array-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-01-build-lps-array-only'] = problem;
})();
