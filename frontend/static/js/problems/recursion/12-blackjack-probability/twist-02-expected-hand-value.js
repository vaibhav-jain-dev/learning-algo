/**
 * Expected Hand Value
 * Category: recursion
 * Difficulty: Medium
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';
    const problem = {
        name: 'Expected Hand Value',
        difficulty: 'Medium',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Instead of bust probability, compute the expected (average) final hand value when drawing until reaching the target or busting.',
        problem: 'Changes the recursion from probability accumulation to expected value calculation, summing weighted hand values instead of just bust probabilities.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For target=21, startingHand=15, compute the expected final hand value across all possible draw sequences.' },
                output: 'See example',
                explanation: 'For target=21, startingHand=15, compute the expected final hand value across all possible draw sequences.'
            }
        ],
        solutions: {
            python: `# Expected Hand Value
# Category: recursion
# Difficulty: Medium
# Parent: 12-blackjack-probability

def solve():
    """
    Instead of bust probability, compute the expected (average) final hand value when drawing until reaching the target or busting.

    Key insight: Changes the recursion from probability accumulation to expected value calculation, summing weighted hand values instead of just bust probabilities.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Expected Hand Value problem.
// Instead of bust probability, compute the expected (average) final hand value when drawing until reaching the target or busting.
// Key insight: Changes the recursion from probability accumulation to expected value calculation, summing weighted hand values instead of just bust probabilities.
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
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-02-expected-hand-value', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-02-expected-hand-value'] = problem;
})();
