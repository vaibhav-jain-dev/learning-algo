/**
 * Minimum Appends for Repetition
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 04-knuth-morris-pratt/02-repeated-substring
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Appends for Repetition',
        difficulty: 'Medium',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/02-repeated-substring',
        description: 'Find the minimum number of characters to append to the string so that it becomes a repeated pattern.',
        problem: 'Uses the LPS array to find the longest suffix-prefix overlap, then computes how many more characters are needed to complete the next repetition.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "abcab", the pattern is "abc" and we need to append "c" (1 character) to get "abcabc".' },
                output: 'See example',
                explanation: 'For "abcab", the pattern is "abc" and we need to append "c" (1 character) to get "abcabc".'
            }
        ],
        solutions: {
            python: `# Minimum Appends for Repetition
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 04-knuth-morris-pratt/02-repeated-substring

def solve():
    """
    Find the minimum number of characters to append to the string so that it becomes a repeated pattern.

    Key insight: Uses the LPS array to find the longest suffix-prefix overlap, then computes how many more characters are needed to complete the next repetition.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Minimum Appends for Repetition problem.
// Find the minimum number of characters to append to the string so that it becomes a repeated pattern.
// Key insight: Uses the LPS array to find the longest suffix-prefix overlap, then computes how many more characters are needed to complete the next repetition.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/02-repeated-substring/twist-02-minimum-appends-for-repetition', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/02-repeated-substring/twist-02-minimum-appends-for-repetition'] = problem;
})();
