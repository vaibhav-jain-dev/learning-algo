/**
 * Memoization Top-Down Approach
 * Category: recursion
 * Difficulty: Easy
 * Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps
 */
(function() {
    'use strict';
    const problem = {
        name: 'Memoization Top-Down Approach',
        difficulty: 'Easy',
        algorithm: 'recursion-staircase',
        parent: '01-nth-fibonacci/02-climbing-stairs-k-steps',
        description: 'Solve using pure top-down recursion with memoization instead of the bottom-up sliding window. Compare the trade-offs.',
        problem: 'Top-down memoization naturally follows the recursive definition but uses O(n) space for the cache. The sliding window optimization requires a fundamentally different way of thinking about the problem.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'climb(n, k, memo) = sum of climb(n-i, k, memo) for i in 1..k. For n=4, k=2: climb(4) = climb(3) + climb(2), each cached after first computation.' },
                output: 'See example',
                explanation: 'climb(n, k, memo) = sum of climb(n-i, k, memo) for i in 1..k. For n=4, k=2: climb(4) = climb(3) + climb(2), each cached after first computation.'
            }
        ],
        solutions: {
            python: `# Memoization Top-Down Approach
# Category: recursion
# Difficulty: Easy
# Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps

def solve():
    """
    Solve using pure top-down recursion with memoization instead of the bottom-up sliding window. Compare the trade-offs.

    Key insight: Top-down memoization naturally follows the recursive definition but uses O(n) space for the cache. The sliding window optimization requires a fundamentally different way of thinking about the problem.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Memoization Top-Down Approach problem.
// Solve using pure top-down recursion with memoization instead of the bottom-up sliding window. Compare the trade-offs.
// Key insight: Top-down memoization naturally follows the recursive definition but uses O(n) space for the cache. The sliding window optimization requires a fundamentally different way of thinking about the problem.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/02-climbing-stairs-k-steps/twist-02-memoization-top-down-approach', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/02-climbing-stairs-k-steps/twist-02-memoization-top-down-approach'] = problem;
})();
