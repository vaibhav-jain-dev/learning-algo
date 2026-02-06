/**
 * Variable Step Sizes
 * Category: recursion
 * Difficulty: Medium
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Variable Step Sizes',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'Instead of steps 1 through maxSteps, you are given an arbitrary set of allowed step sizes (e.g., [1,3,5]).',
        problem: 'The sliding window optimization no longer applies since step sizes are not consecutive, requiring a direct DP approach summing over the allowed set.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For height=6 and allowed steps [1,3,5], count paths: you can reach 6 via 1+5, 3+3, 1+1+1+3, etc.' },
                output: 'See example',
                explanation: 'For height=6 and allowed steps [1,3,5], count paths: you can reach 6 via 1+5, 3+3, 1+1+1+3, etc.'
            }
        ],
        solutions: {
            python: `# Variable Step Sizes
# Category: recursion
# Difficulty: Medium
# Parent: 06-staircase-traversal

def solve():
    """
    Instead of steps 1 through maxSteps, you are given an arbitrary set of allowed step sizes (e.g., [1,3,5]).

    Key insight: The sliding window optimization no longer applies since step sizes are not consecutive, requiring a direct DP approach summing over the allowed set.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Variable Step Sizes problem.
// Instead of steps 1 through maxSteps, you are given an arbitrary set of allowed step sizes (e.g., [1,3,5]).
// Key insight: The sliding window optimization no longer applies since step sizes are not consecutive, requiring a direct DP approach summing over the allowed set.
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
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-03-variable-step-sizes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-03-variable-step-sizes'] = problem;
})();
