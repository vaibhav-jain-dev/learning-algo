/**
 * Case-Insensitive Search
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 04-knuth-morris-pratt/01-implement-strstr
 */
(function() {
    'use strict';
    const problem = {
        name: 'Case-Insensitive Search',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/01-implement-strstr',
        description: 'Implement strStr with case-insensitive matching, where "Hello" matches "hello" and "HELLO".',
        problem: 'Requires normalizing characters during comparison while preserving the original index positions, affecting both LPS building and matching phases.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For haystack="HelloWorld", needle="world", return 5 despite the case difference.' },
                output: 'See example',
                explanation: 'For haystack="HelloWorld", needle="world", return 5 despite the case difference.'
            }
        ],
        solutions: {
            python: `# Case-Insensitive Search
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 04-knuth-morris-pratt/01-implement-strstr

def solve():
    """
    Implement strStr with case-insensitive matching, where "Hello" matches "hello" and "HELLO".

    Key insight: Requires normalizing characters during comparison while preserving the original index positions, affecting both LPS building and matching phases.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Case-Insensitive Search problem.
// Implement strStr with case-insensitive matching, where "Hello" matches "hello" and "HELLO".
// Key insight: Requires normalizing characters during comparison while preserving the original index positions, affecting both LPS building and matching phases.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/01-implement-strstr/twist-03-case-insensitive-search', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/01-implement-strstr/twist-03-case-insensitive-search'] = problem;
})();
