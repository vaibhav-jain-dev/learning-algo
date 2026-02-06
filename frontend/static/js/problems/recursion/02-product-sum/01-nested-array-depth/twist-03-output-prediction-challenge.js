/**
 * Output Prediction Challenge
 * Category: recursion
 * Difficulty: Easy
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Output Prediction Challenge',
        difficulty: 'Easy',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Without running code, predict the output for: [[[], [[[]]]], [1, 2]]. What is the maximum depth? Be careful with empty arrays.',
        problem: 'Tests understanding of edge cases: empty arrays have depth 1, and the deeply nested empty array [[[]]] contributes depth even though it contains no integers. You must trace the recursion mentally.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: '[[[], [[[]]]], [1, 2]]: Outer = depth 1. Inner [[], [[[]]]] = depth 2. [] at depth 3 = 3. [[[]]] at depth 3, [[]] at depth 4, [] at depth 5. Answer: 5.' },
                output: 'See example',
                explanation: '[[[], [[[]]]], [1, 2]]: Outer = depth 1. Inner [[], [[[]]]] = depth 2. [] at depth 3 = 3. [[[]]] at depth 3, [[]] at depth 4, [] at depth 5. Answer: 5.'
            }
        ],
        solutions: {
            python: `# Output Prediction Challenge
# Category: recursion
# Difficulty: Easy
# Parent: 02-product-sum/01-nested-array-depth

def solve():
    """
    Without running code, predict the output for: [[[], [[[]]]], [1, 2]]. What is the maximum depth? Be careful with empty arrays.

    Key insight: Tests understanding of edge cases: empty arrays have depth 1, and the deeply nested empty array [[[]]] contributes depth even though it contains no integers. You must trace the recursion mentally.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Output Prediction Challenge problem.
// Without running code, predict the output for: [[[], [[[]]]], [1, 2]]. What is the maximum depth? Be careful with empty arrays.
// Key insight: Tests understanding of edge cases: empty arrays have depth 1, and the deeply nested empty array [[[]]] contributes depth even though it contains no integers. You must trace the recursion mentally.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-03-output-prediction-challenge', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-03-output-prediction-challenge'] = problem;
})();
