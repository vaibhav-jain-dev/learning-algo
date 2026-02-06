/**
 * Count Non-Overlapping Matches
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Non-Overlapping Matches',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Find all non-overlapping occurrences of the pattern in the text, where after a match, the search continues from the end of the match.',
        problem: 'After finding a match, instead of using the LPS to find overlapping matches, you reset the pattern pointer to 0 and continue from position i, changing the match counting logic.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For text "AAAA" and pattern "AA", overlapping gives [0,1,2] but non-overlapping gives only [0,2].' },
                output: 'See example',
                explanation: 'For text "AAAA" and pattern "AA", overlapping gives [0,1,2] but non-overlapping gives only [0,2].'
            }
        ],
        solutions: {
            python: `# Count Non-Overlapping Matches
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt

def solve():
    """
    Find all non-overlapping occurrences of the pattern in the text, where after a match, the search continues from the end of the match.

    Key insight: After finding a match, instead of using the LPS to find overlapping matches, you reset the pattern pointer to 0 and continue from position i, changing the match counting logic.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Non-Overlapping Matches problem.
// Find all non-overlapping occurrences of the pattern in the text, where after a match, the search continues from the end of the match.
// Key insight: After finding a match, instead of using the LPS to find overlapping matches, you reset the pattern pointer to 0 and continue from position i, changing the match counting logic.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-02-count-non-overlapping-matches', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-02-count-non-overlapping-matches'] = problem;
})();
