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
        description: 'In a simplified blackjack game, you are given a target value (the maximum hand value before busting, typically 21) and your current hand value startingHand. Your goal is to calculate the probability that you will "bust" (exceed the target) if you keep drawing cards until your hand value is greater than or equal to target. The deck has an infinite number of cards with values 1 through 10, and each card has an equal probability (1/10) of being drawn. Write a function that returns the probability o.',
        problem: 'Break the problem into smaller subproblems recursively. Define clear base cases and recursive cases. At each step, assume the recursive call returns the correct result for smaller inputs, and combine them. This achieves O(target - startingHand) time with O(target - startingHand) space.',
        hints: [
            'Define your base case clearly. When should the recursion stop?',
            'For the recursive case, assume the function works for smaller inputs. How do you use that?',
            'Think about whether you need to pass additional state through parameters.',
            'Consider memoization if the same subproblems are being computed multiple times.'
        ],

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
            { id: '12-blackjack-probability/twist-01-finite-deck', name: 'Finite Deck', difficulty: 'Hard' },
            { id: '12-blackjack-probability/twist-02-expected-hand-value', name: 'Expected Hand Value', difficulty: 'Medium' },
            { id: '12-blackjack-probability/twist-03-optimal-strategy', name: 'Optimal Strategy', difficulty: 'Very Hard' },
            { id: '12-blackjack-probability/twist-04-multiple-players', name: 'Multiple Players', difficulty: 'Hard' },
            { id: '12-blackjack-probability/twist-05-bust-probability-with-aces', name: 'Bust Probability with Aces', difficulty: 'Hard' }
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
