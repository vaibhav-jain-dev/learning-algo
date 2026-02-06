/**
 * Multiple Players
 * Category: recursion
 * Difficulty: Hard
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';
    const problem = {
        name: 'Multiple Players',
        difficulty: 'Hard',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Compute the probability that player 1 beats player 2, where both draw from the same infinite deck following the same rules.',
        problem: 'Requires computing the probability distribution of final hand values for each player, then convolving them to find the win probability.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Player 1 starts at 12, player 2 starts at 14. Both draw until >= 21. What is the probability player 1 gets a higher non-bust hand?' },
                output: 'See example',
                explanation: 'Player 1 starts at 12, player 2 starts at 14. Both draw until >= 21. What is the probability player 1 gets a higher non-bust hand?'
            }
        ],
        solutions: {
            python: `# Multiple Players
# Category: recursion
# Difficulty: Hard
# Parent: 12-blackjack-probability

def solve():
    """
    Compute the probability that player 1 beats player 2, where both draw from the same infinite deck following the same rules.

    Key insight: Requires computing the probability distribution of final hand values for each player, then convolving them to find the win probability.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Multiple Players problem.
// Compute the probability that player 1 beats player 2, where both draw from the same infinite deck following the same rules.
// Key insight: Requires computing the probability distribution of final hand values for each player, then convolving them to find the win probability.
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
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-04-multiple-players', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-04-multiple-players'] = problem;
})();
