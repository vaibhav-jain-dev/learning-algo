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
