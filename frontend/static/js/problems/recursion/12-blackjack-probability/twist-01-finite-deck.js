/**
 * Finite Deck
 * Category: recursion
 * Difficulty: Hard
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';
    const problem = {
        name: 'Finite Deck',
        difficulty: 'Hard',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Instead of an infinite deck with uniform distribution, use a standard 52-card deck where drawn cards are removed (without replacement).',
        problem: 'Cards are no longer independent -- the probability of drawing each value changes with each draw, requiring tracking the remaining deck composition in the state.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'With a finite deck, drawing a 10 first reduces the probability of drawing another 10 from 4/52 to 3/51, affecting all subsequent bust calculations.' },
                output: 'See example',
                explanation: 'With a finite deck, drawing a 10 first reduces the probability of drawing another 10 from 4/52 to 3/51, affecting all subsequent bust calculations.'
            }
        ],
        solutions: {
            python: `# Finite Deck
# Category: recursion
# Difficulty: Hard
# Parent: 12-blackjack-probability

def solve():
    """
    Instead of an infinite deck with uniform distribution, use a standard 52-card deck where drawn cards are removed (without replacement).

    Key insight: Cards are no longer independent -- the probability of drawing each value changes with each draw, requiring tracking the remaining deck composition in the state.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Finite Deck problem.
// Instead of an infinite deck with uniform distribution, use a standard 52-card deck where drawn cards are removed (without replacement).
// Key insight: Cards are no longer independent -- the probability of drawing each value changes with each draw, requiring tracking the remaining deck composition in the state.
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
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-01-finite-deck', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-01-finite-deck'] = problem;
})();
