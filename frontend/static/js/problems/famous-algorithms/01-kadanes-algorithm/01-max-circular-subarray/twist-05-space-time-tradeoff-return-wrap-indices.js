/**
 * Space-Time Tradeoff: Return Wrap Indices
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 01-kadanes-algorithm/01-max-circular-subarray
 */
(function() {
    'use strict';
    const problem = {
        name: 'Space-Time Tradeoff: Return Wrap Indices',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/01-max-circular-subarray',
        description: 'Return the actual indices of the maximum circular subarray. If the subarray wraps around, return [start, end] where start > end indicates wrapping (e.g., [4, 1] means elements at indices 4, 0, 1).',
        problem: 'Tracking indices for both the standard and circular cases simultaneously requires careful bookkeeping. The circular case needs you to track min subarray indices and invert them.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Array [5, -3, 5]: max circular subarray is [5, 5] at indices [2, 0] (wrapping). Must track both Kadane max indices and Kadane min indices.' },
                output: 'See example',
                explanation: 'Array [5, -3, 5]: max circular subarray is [5, 5] at indices [2, 0] (wrapping). Must track both Kadane max indices and Kadane min indices.'
            }
        ],
        solutions: {
            python: `# Space-Time Tradeoff: Return Wrap Indices
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 01-kadanes-algorithm/01-max-circular-subarray

def solve():
    """
    Return the actual indices of the maximum circular subarray. If the subarray wraps around, return [start, end] where start > end indicates wrapping (e.g., [4, 1] means elements at indices 4, 0, 1).

    Key insight: Tracking indices for both the standard and circular cases simultaneously requires careful bookkeeping. The circular case needs you to track min subarray indices and invert them.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Space-Time Tradeoff: Return Wrap Indices problem.
// Return the actual indices of the maximum circular subarray. If the subarray wraps around, return [start, end] where start > end indicates wrapping (e.g., [4, 1] means elements at indices 4, 0, 1).
// Key insight: Tracking indices for both the standard and circular cases simultaneously requires careful bookkeeping. The circular case needs you to track min subarray indices and invert them.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/01-max-circular-subarray/twist-05-space-time-tradeoff-return-wrap-indices', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/01-max-circular-subarray/twist-05-space-time-tradeoff-return-wrap-indices'] = problem;
})();
