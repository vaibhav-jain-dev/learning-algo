/**
 * Blackjack Probability
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Blackjack Probability',
        difficulty: 'Medium',
        algorithm: 'recursion-probability',
        description: 'In a simplified blackjack game, you are given a target value (the maximum hand value before busting, typically 21) and your current hand value startingHand. Your goal is to calculate the probability that you will "bust" (exceed the target) if you keep drawing cards until your hand value is greater than or equal to target. The deck has an infinite number of cards with values 1 through 10, and each card has an equal probability (1/10) of being drawn. Write a function that returns the probability o',
        complexity: {
            time: 'O(target - startingHand)',
            space: 'O(target - startingHand)'
        },
        examples: [
    {
        input: {
        "target": 21,
        "startingHand": 15
},
        output: 0.45,
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input target=21, startingHand=15, the result is 0.45.'
    }
        ],
        twists: [
            { title: 'Finite Deck', difficulty: 'Hard', description: 'Instead of an infinite deck with uniform distribution, use a standard 52-card deck where drawn cards are removed (without replacement).', whyDifferent: 'Cards are no longer independent -- the probability of drawing each value changes with each draw, requiring tracking the remaining deck composition in the state.', example: 'With a finite deck, drawing a 10 first reduces the probability of drawing another 10 from 4/52 to 3/51, affecting all subsequent bust calculations.' },
            { title: 'Expected Hand Value', difficulty: 'Medium', description: 'Instead of bust probability, compute the expected (average) final hand value when drawing until reaching the target or busting.', whyDifferent: 'Changes the recursion from probability accumulation to expected value calculation, summing weighted hand values instead of just bust probabilities.', example: 'For target=21, startingHand=15, compute the expected final hand value across all possible draw sequences.' },
            { title: 'Optimal Strategy', difficulty: 'Very Hard', description: 'At each hand value, you can choose to draw or stand. Find the strategy that minimizes bust probability (or maximizes expected value).', whyDifferent: 'Introduces a decision at each step, transforming from a pure probability calculation into a dynamic programming optimization with choice.', example: 'At hand value 17 with target 21, is it better to stand or draw? Compute the optimal threshold for standing.' },
            { title: 'Multiple Players', difficulty: 'Hard', description: 'Compute the probability that player 1 beats player 2, where both draw from the same infinite deck following the same rules.', whyDifferent: 'Requires computing the probability distribution of final hand values for each player, then convolving them to find the win probability.', example: 'Player 1 starts at 12, player 2 starts at 14. Both draw until >= 21. What is the probability player 1 gets a higher non-bust hand?' },
            { title: 'Bust Probability with Aces', difficulty: 'Hard', description: 'Add the rule that aces can count as 1 or 11, automatically choosing the best value. Compute the bust probability with this flexible card.', whyDifferent: 'Aces create branching hand values -- a hand might be simultaneously valued at both X and X+10, requiring tracking of "soft" vs "hard" hand states.', example: 'Starting hand 15, draw an ace: hand is either 16 or 26. Since 26 busts, ace counts as 1 giving 16. This changes all probability calculations.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '12-blackjack-probability', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability'] = problem;

})();
