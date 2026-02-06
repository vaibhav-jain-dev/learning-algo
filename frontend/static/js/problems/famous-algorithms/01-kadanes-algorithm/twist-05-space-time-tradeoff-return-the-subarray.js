/**
 * Space-Time Tradeoff: Return the Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Space-Time Tradeoff: Return the Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Modify Kadane\'s to return the actual subarray (start and end indices), not just the sum. Then extend it to return the top-K non-overlapping maximum subarrays.',
        problem: 'Tracking indices requires careful bookkeeping of when you start fresh vs extend. The top-K extension breaks the O(n) single-pass approach and requires fundamentally different thinking about excluding previously found ranges.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]. Max subarray is indices [3, 6] with sum 6. Top-2 might be [3,6]=6 and [8,8]=4.' },
                output: 'See example',
                explanation: 'Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]. Max subarray is indices [3, 6] with sum 6. Top-2 might be [3,6]=6 and [8,8]=4.'
            }
        ],
        solutions: {
            python: `# Space-Time Tradeoff: Return the Subarray
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 01-kadanes-algorithm

def solve():
    """
    Modify Kadane's to return the actual subarray (start and end indices), not just the sum. Then extend it to return the top-K non-overlapping maximum subarrays.

    Key insight: Tracking indices requires careful bookkeeping of when you start fresh vs extend. The top-K extension breaks the O(n) single-pass approach and requires fundamentally different thinking about excluding previously found ranges.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Space-Time Tradeoff: Return the Subarray problem.
// Modify Kadane's to return the actual subarray (start and end indices), not just the sum. Then extend it to return the top-K non-overlapping maximum subarrays.
// Key insight: Tracking indices requires careful bookkeeping of when you start fresh vs extend. The top-K extension breaks the O(n) single-pass approach and requires fundamentally different thinking about excluding previously found ranges.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-05-space-time-tradeoff-return-the-subarray', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-05-space-time-tradeoff-return-the-subarray'] = problem;
})();
