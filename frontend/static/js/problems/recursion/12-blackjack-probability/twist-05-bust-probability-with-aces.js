/**
 * Bust Probability with Aces
 * Category: recursion
 * Difficulty: Hard
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bust Probability with Aces',
        difficulty: 'Hard',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Add the rule that aces can count as 1 or 11, automatically choosing the best value. Compute the bust probability with this flexible card.',
        problem: 'Aces create branching hand values -- a hand might be simultaneously valued at both X and X+10, requiring tracking of "soft" vs "hard" hand states.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Starting hand 15, draw an ace: hand is either 16 or 26. Since 26 busts, ace counts as 1 giving 16. This changes all probability calculations.' },
                output: 'See example',
                explanation: 'Starting hand 15, draw an ace: hand is either 16 or 26. Since 26 busts, ace counts as 1 giving 16. This changes all probability calculations.'
            }
        ],
        solutions: {
            python: `# Bust Probability with Aces
# Category: recursion
# Difficulty: Hard
# Parent: 12-blackjack-probability

def solve():
    """
    Add the rule that aces can count as 1 or 11, automatically choosing the best value. Compute the bust probability with this flexible card.

    Key insight: Aces create branching hand values -- a hand might be simultaneously valued at both X and X+10, requiring tracking of "soft" vs "hard" hand states.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Bust Probability with Aces problem.
// Add the rule that aces can count as 1 or 11, automatically choosing the best value. Compute the bust probability with this flexible card.
// Key insight: Aces create branching hand values -- a hand might be simultaneously valued at both X and X+10, requiring tracking of "soft" vs "hard" hand states.
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
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-05-bust-probability-with-aces', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-05-bust-probability-with-aces'] = problem;
})();
