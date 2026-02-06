/**
 * Longest Happy Suffix
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';
    const problem = {
        name: 'Longest Happy Suffix',
        difficulty: 'Easy',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Find the longest proper suffix that is also a prefix (same as happy prefix but phrased differently to test understanding).',
        problem: 'This is actually the same problem -- a happy prefix IS a suffix by definition. The twist tests whether you recognize the symmetry.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "abcabc", the longest happy prefix/suffix is "abc". Understanding that prefix=suffix in this context is key.' },
                output: 'See example',
                explanation: 'For "abcabc", the longest happy prefix/suffix is "abc". Understanding that prefix=suffix in this context is key.'
            }
        ],
        solutions: {
            python: `# Longest Happy Suffix
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 04-knuth-morris-pratt/03-longest-happy-prefix

def solve():
    """
    Find the longest proper suffix that is also a prefix (same as happy prefix but phrased differently to test understanding).

    Key insight: This is actually the same problem -- a happy prefix IS a suffix by definition. The twist tests whether you recognize the symmetry.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Longest Happy Suffix problem.
// Find the longest proper suffix that is also a prefix (same as happy prefix but phrased differently to test understanding).
// Key insight: This is actually the same problem -- a happy prefix IS a suffix by definition. The twist tests whether you recognize the symmetry.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-03-longest-happy-suffix', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-03-longest-happy-suffix'] = problem;
})();
