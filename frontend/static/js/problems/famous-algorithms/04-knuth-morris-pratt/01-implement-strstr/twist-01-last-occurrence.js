/**
 * Last Occurrence
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';
    const problem = {
        name: 'Last Occurrence',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Find the index of the last occurrence of needle in haystack, instead of the first.',
        problem: 'Requires running KMP to completion instead of stopping at the first match, keeping track of the most recent match position found.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For haystack="sadbutsad", needle="sad", return 6 (last occurrence) instead of 0 (first occurrence).' },
                output: 'See example',
                explanation: 'For haystack="sadbutsad", needle="sad", return 6 (last occurrence) instead of 0 (first occurrence).'
            }
        ],
        solutions: {
            python: `# Last Occurrence
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 04-knuth-morris-pratt/01-implement-strstr

def solve():
    """
    Find the index of the last occurrence of needle in haystack, instead of the first.

    Key insight: Requires running KMP to completion instead of stopping at the first match, keeping track of the most recent match position found.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Last Occurrence problem.
// Find the index of the last occurrence of needle in haystack, instead of the first.
// Key insight: Requires running KMP to completion instead of stopping at the first match, keeping track of the most recent match position found.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-01-last-occurrence', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-01-last-occurrence'] = problem;
})();
