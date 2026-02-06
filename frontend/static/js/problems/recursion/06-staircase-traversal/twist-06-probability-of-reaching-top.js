/**
 * Probability of Reaching Top
 * Category: recursion
 * Difficulty: Hard
 * Parent: 06-staircase-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Probability of Reaching Top',
        difficulty: 'Hard',
        algorithm: 'recursion-staircase',
        parent: '06-staircase-traversal',
        description: 'At each position, you randomly choose a step size uniformly from 1 to maxSteps. What is the probability of landing exactly on the top?',
        problem: 'Converts the counting problem into a probability problem where each branch has weight 1/maxSteps instead of 1, requiring floating-point DP.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For height=3, maxSteps=2, P(reach 3 exactly) = P(1,1,1) + P(1,2) + P(2,1) = (1/2)^3 + (1/2)^2 + (1/2)^2 = 0.625.' },
                output: 'See example',
                explanation: 'For height=3, maxSteps=2, P(reach 3 exactly) = P(1,1,1) + P(1,2) + P(2,1) = (1/2)^3 + (1/2)^2 + (1/2)^2 = 0.625.'
            }
        ],
        solutions: {
            python: `# Probability of Reaching Top
# Category: recursion
# Difficulty: Hard
# Parent: 06-staircase-traversal

def solve():
    """
    At each position, you randomly choose a step size uniformly from 1 to maxSteps. What is the probability of landing exactly on the top?

    Key insight: Converts the counting problem into a probability problem where each branch has weight 1/maxSteps instead of 1, requiring floating-point DP.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Probability of Reaching Top problem.
// At each position, you randomly choose a step size uniformly from 1 to maxSteps. What is the probability of landing exactly on the top?
// Key insight: Converts the counting problem into a probability problem where each branch has weight 1/maxSteps instead of 1, requiring floating-point DP.
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
        window.ProblemRenderer.register('recursion', '06-staircase-traversal/twist-06-probability-of-reaching-top', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/06-staircase-traversal/twist-06-probability-of-reaching-top'] = problem;
})();
