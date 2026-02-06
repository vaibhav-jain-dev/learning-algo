/**
 * Shortest Period
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 04-knuth-morris-pratt/03-longest-happy-prefix
 */
(function() {
    'use strict';
    const problem = {
        name: 'Shortest Period',
        difficulty: 'Hard',
        algorithm: 'kmp-algorithm',
        parent: '04-knuth-morris-pratt/03-longest-happy-prefix',
        description: 'Find the shortest period of the string -- the smallest string p such that s is a prefix of p repeated infinitely.',
        problem: 'Directly derived from the LPS value: period = n - lps[n-1]. But understanding why this formula works requires deep insight into the KMP failure function.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For "ababab", period is "ab" (length 2). For "abcabc", period is "abc" (length 3). For "abcd", period is "abcd" itself (length 4).' },
                output: 'See example',
                explanation: 'For "ababab", period is "ab" (length 2). For "abcabc", period is "abc" (length 3). For "abcd", period is "abcd" itself (length 4).'
            }
        ],
        solutions: {
            python: `# Shortest Period
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 04-knuth-morris-pratt/03-longest-happy-prefix

def solve():
    """
    Find the shortest period of the string -- the smallest string p such that s is a prefix of p repeated infinitely.

    Key insight: Directly derived from the LPS value: period = n - lps[n-1]. But understanding why this formula works requires deep insight into the KMP failure function.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Shortest Period problem.
// Find the shortest period of the string -- the smallest string p such that s is a prefix of p repeated infinitely.
// Key insight: Directly derived from the LPS value: period = n - lps[n-1]. But understanding why this formula works requires deep insight into the KMP failure function.
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
        window.ProblemRenderer.register('famous-algorithms', '04-knuth-morris-pratt/03-longest-happy-prefix/twist-05-shortest-period', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/04-knuth-morris-pratt/03-longest-happy-prefix/twist-05-shortest-period'] = problem;
})();
