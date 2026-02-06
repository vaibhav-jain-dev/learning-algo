/**
 * All Happy Prefixes
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Happy Prefixes',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Return all happy prefixes of the string (not just the longest), sorted by length.',
        problem: 'Requires following the LPS chain from the last position backward -- lps[n-1] gives the longest, then lps[lps[n-1]-1] gives the next, and so on.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "aabaabaa", happy prefixes are "a", "aa", "aabaa" -- all prefixes that are also suffixes.' },
                output: 'See example',
                explanation: 'For "aabaabaa", happy prefixes are "a", "aa", "aabaa" -- all prefixes that are also suffixes.'
            }
        ],
        solutions: {
            python: `# All Happy Prefixes
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt/03-longest-happy-prefix

def solve():
    """
    Return all happy prefixes of the string (not just the longest), sorted by length.

    Key insight: Requires following the LPS chain from the last position backward -- lps[n-1] gives the longest, then lps[lps[n-1]-1] gives the next, and so on.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the All Happy Prefixes problem.
// Return all happy prefixes of the string (not just the longest), sorted by length.
// Key insight: Requires following the LPS chain from the last position backward -- lps[n-1] gives the longest, then lps[lps[n-1]-1] gives the next, and so on.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-01-all-happy-prefixes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-01-all-happy-prefixes'] = problem;
})();
