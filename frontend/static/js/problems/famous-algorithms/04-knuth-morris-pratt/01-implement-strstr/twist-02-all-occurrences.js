/**
 * All Occurrences
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Occurrences',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Find all starting indices where needle appears in haystack, including overlapping occurrences.',
        problem: 'After each match, instead of returning immediately, use the LPS array to continue searching from the appropriate position for overlapping matches.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For haystack="AAAA", needle="AA", return [0,1,2] for all overlapping positions.' },
                output: 'See example',
                explanation: 'For haystack="AAAA", needle="AA", return [0,1,2] for all overlapping positions.'
            }
        ],
        solutions: {
            python: `# All Occurrences
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt/01-implement-strstr

def solve():
    """
    Find all starting indices where needle appears in haystack, including overlapping occurrences.

    Key insight: After each match, instead of returning immediately, use the LPS array to continue searching from the appropriate position for overlapping matches.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the All Occurrences problem.
// Find all starting indices where needle appears in haystack, including overlapping occurrences.
// Key insight: After each match, instead of returning immediately, use the LPS array to continue searching from the appropriate position for overlapping matches.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-02-all-occurrences', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-02-all-occurrences'] = problem;
})();
