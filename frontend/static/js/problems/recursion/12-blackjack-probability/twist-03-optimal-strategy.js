/**
 * Optimal Strategy
 * Category: recursion
 * Difficulty: Very Hard
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';
    const problem = {
        name: 'Optimal Strategy',
        difficulty: 'Very Hard',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'At each hand value, you can choose to draw or stand. Find the strategy that minimizes bust probability (or maximizes expected value).',
        problem: 'Introduces a decision at each step, transforming from a pure probability calculation into a dynamic programming optimization with choice.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'At hand value 17 with target 21, is it better to stand or draw? Compute the optimal threshold for standing.' },
                output: 'See example',
                explanation: 'At hand value 17 with target 21, is it better to stand or draw? Compute the optimal threshold for standing.'
            }
        ],
        solutions: {
            python: `# Optimal Strategy
# Category: recursion
# Difficulty: Very Hard
# Parent: 12-blackjack-probability

def solve():
    """
    At each hand value, you can choose to draw or stand. Find the strategy that minimizes bust probability (or maximizes expected value).

    Key insight: Introduces a decision at each step, transforming from a pure probability calculation into a dynamic programming optimization with choice.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Optimal Strategy problem.
// At each hand value, you can choose to draw or stand. Find the strategy that minimizes bust probability (or maximizes expected value).
// Key insight: Introduces a decision at each step, transforming from a pure probability calculation into a dynamic programming optimization with choice.
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
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-03-optimal-strategy', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-03-optimal-strategy'] = problem;
})();
