/**
 * Z-Algorithm Alternative
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt
 */
(function() {
    'use strict';
    const problem = {
        name: 'Z-Algorithm Alternative',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt',
        description: 'Solve the same pattern matching problem using the Z-algorithm instead of KMP, and compare the approaches.',
        problem: 'The Z-array provides a different perspective -- Z[i] gives the length of the longest substring starting at i that matches a prefix of the string, offering an alternative to KMP.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "aabxaa", Z-array is [6,1,0,0,2,1]. Use this to find pattern occurrences by concatenating pattern + "$" + text.' },
                output: 'See example',
                explanation: 'For "aabxaa", Z-array is [6,1,0,0,2,1]. Use this to find pattern occurrences by concatenating pattern + "$" + text.'
            }
        ],
        solutions: {
            python: `# Z-Algorithm Alternative
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt

def solve():
    """
    Solve the same pattern matching problem using the Z-algorithm instead of KMP, and compare the approaches.

    Key insight: The Z-array provides a different perspective -- Z[i] gives the length of the longest substring starting at i that matches a prefix of the string, offering an alternative to KMP.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Z-Algorithm Alternative problem.
// Solve the same pattern matching problem using the Z-algorithm instead of KMP, and compare the approaches.
// Key insight: The Z-array provides a different perspective -- Z[i] gives the length of the longest substring starting at i that matches a prefix of the string, offering an alternative to KMP.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/twist-05-z-algorithm-alternative', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/twist-05-z-algorithm-alternative'] = problem;
})();
