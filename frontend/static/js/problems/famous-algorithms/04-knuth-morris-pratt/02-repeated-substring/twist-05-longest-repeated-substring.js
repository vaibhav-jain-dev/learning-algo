/**
 * Longest Repeated Substring
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';
    const problem = {
        name: 'Longest Repeated Substring',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'Find the longest substring that appears at least twice in the string (not necessarily as a full repetition pattern).',
        problem: 'A fundamentally different problem that requires binary search + rolling hash or suffix array approaches, not just LPS analysis.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "banana", the longest repeated substring is "ana" which appears at positions 1 and 3.' },
                output: 'See example',
                explanation: 'For "banana", the longest repeated substring is "ana" which appears at positions 1 and 3.'
            }
        ],
        solutions: {
            python: `# Longest Repeated Substring
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 04-knuth-morris-pratt/02-repeated-substring

def solve():
    """
    Find the longest substring that appears at least twice in the string (not necessarily as a full repetition pattern).

    Key insight: A fundamentally different problem that requires binary search + rolling hash or suffix array approaches, not just LPS analysis.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Longest Repeated Substring problem.
// Find the longest substring that appears at least twice in the string (not necessarily as a full repetition pattern).
// Key insight: A fundamentally different problem that requires binary search + rolling hash or suffix array approaches, not just LPS analysis.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-05-longest-repeated-substring', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-05-longest-repeated-substring'] = problem;
})();
