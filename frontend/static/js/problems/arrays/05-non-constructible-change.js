/**
 * Non-Constructible Change
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: greedy-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Non-Constructible Change',
        difficulty: 'Easy',
        algorithm: 'greedy-change',
        description: 'Given an array of positive integers representing the values of coins in your possession, write a function that returns the minimum amount of change (the minimum sum of money) that you cannot create. The given coins can have any positive integer value and aren\'t necessarily unique (i.e., you can have multiple coins of the same value).',
        problem: 'Sort the coins. Track the maximum constructible amount starting at 0. For each coin in sorted order: if coin > currentMax + 1, then currentMax + 1 is impossible to create (gap found). Otherwise, add coin to currentMax and continue. If you process all coins, return currentMax + 1.',
        hints: [
            'If you can make change for amounts 1 through N, what coins would allow you to make N+1?',
            'Sort the coins first. Think about what happens when you encounter a coin larger than currentSum + 1.',
            'Key insight: if currentSum = N and next coin > N+1, you cannot make N+1 (there\'s a gap).',
            'Start with currentSum = 0. For each coin: if coin > currentSum + 1, return currentSum + 1. Else currentSum += coin.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "coins": [5, 7, 1, 1, 2, 3, 22]
        },
        output: 20,
        explanation: 'Sorted: [1,1,2,3,5,7,22]. Start sum=0. Coin 1: 1<=1, sum=1. Coin 1: 1<=2, sum=2. Coin 2: 2<=3, sum=4. Coin 3: 3<=5, sum=7. Coin 5: 5<=8, sum=12. Coin 7: 7<=13, sum=19. Coin 22: 22>20, return 20.'
    },
    {
        input: {
        "coins": [1, 1, 1, 1, 1]
        },
        output: 6,
        explanation: 'Sorted: [1,1,1,1,1]. After processing all coins, sum=5. We can make 1-5 but not 6. Return 5+1=6.'
    },
    {
        input: {
        "coins": [1, 5, 1, 1, 1, 10, 15, 20, 100]
        },
        output: 55,
        explanation: 'Sorted: [1,1,1,1,5,10,15,20,100]. Sum grows: 1,2,3,4,9,19,34,54. Coin 100: 100>55, return 55.'
    }
        ],
        twists: [
            { id: '05-non-constructible-change/twist-01-non-constructible-with-coin-reuse', name: 'Non-Constructible with Coin Reuse', difficulty: 'Medium' },
            { id: '05-non-constructible-change/twist-02-kth-non-constructible-change', name: 'Kth Non-Constructible Change', difficulty: 'Hard' },
            { id: '05-non-constructible-change/twist-03-non-constructible-change-from-two-pockets', name: 'Non-Constructible Change from Two Pockets', difficulty: 'Medium' },
            { id: '05-non-constructible-change/twist-04-maximum-non-constructible-under-a-limit', name: 'Maximum Non-Constructible Under a Limit', difficulty: 'Hard' },
            { id: '05-non-constructible-change/twist-05-non-constructible-after-removing-one-coin', name: 'Non-Constructible After Removing One Coin', difficulty: 'Medium' }
        ],
        similar: [
    { id: '05-non-constructible-change/01-min-coins-to-add', name: '01 Min Coins To Add', difficulty: 'Medium' },
    { id: '05-non-constructible-change/02-max-constructible', name: '02 Max Constructible', difficulty: 'Medium' },
    { id: '05-non-constructible-change/03-all-non-constructible', name: '03 All Non Constructible', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change'] = problem;

})();
