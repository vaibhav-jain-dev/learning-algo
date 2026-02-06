/**
 * Count Distinct Happy Prefixes
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Distinct Happy Prefixes',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Count how many distinct happy prefixes exist for the string.',
        problem: 'Requires traversing the full LPS chain from the end and counting distinct values, understanding the nested structure of prefix-suffix matches.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "aaaa", happy prefixes are "a", "aa", "aaa" -- count is 3.' },
                output: 'See example',
                explanation: 'For "aaaa", happy prefixes are "a", "aa", "aaa" -- count is 3.'
            }
        ],
        solutions: {
            python: `# Count Distinct Happy Prefixes
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt/03-longest-happy-prefix

def solve():
    """
    Count how many distinct happy prefixes exist for the string.

    Key insight: Requires traversing the full LPS chain from the end and counting distinct values, understanding the nested structure of prefix-suffix matches.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Count Distinct Happy Prefixes problem.
// Count how many distinct happy prefixes exist for the string.
// Key insight: Requires traversing the full LPS chain from the end and counting distinct values, understanding the nested structure of prefix-suffix matches.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-04-count-distinct-happy-prefixes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-04-count-distinct-happy-prefixes'] = problem;
})();
