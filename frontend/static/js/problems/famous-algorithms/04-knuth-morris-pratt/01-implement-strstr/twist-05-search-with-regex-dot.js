/**
 * Search with Regex Dot
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';
    const problem = {
        name: 'Search with Regex Dot',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Implement strStr where the needle can contain "." characters that match any single character (like simple regex).',
        problem: 'The dot wildcard means the LPS array cannot be built normally, and character comparisons must account for the special dot matching behavior.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For haystack="sadbutsad", needle="s.d", return 0 because "sad" matches "s.d" where . matches a.' },
                output: 'See example',
                explanation: 'For haystack="sadbutsad", needle="s.d", return 0 because "sad" matches "s.d" where . matches a.'
            }
        ],
        solutions: {
            python: `# Search with Regex Dot
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 04-knuth-morris-pratt/01-implement-strstr

def solve():
    """
    Implement strStr where the needle can contain "." characters that match any single character (like simple regex).

    Key insight: The dot wildcard means the LPS array cannot be built normally, and character comparisons must account for the special dot matching behavior.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Search with Regex Dot problem.
// Implement strStr where the needle can contain "." characters that match any single character (like simple regex).
// Key insight: The dot wildcard means the LPS array cannot be built normally, and character comparisons must account for the special dot matching behavior.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-05-search-with-regex-dot', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-05-search-with-regex-dot'] = problem;
})();
