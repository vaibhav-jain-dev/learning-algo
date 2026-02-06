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
            {
                title: 'Non-Constructible with Coin Reuse',
                difficulty: 'Medium',
                description: 'You have unlimited copies of each coin denomination. Find the minimum non-constructible amount.',
                whyDifferent: 'With unlimited coins, you can make any amount that is a linear combination. This becomes a Frobenius/Chicken McNugget problem, requiring GCD-based analysis.',
                example: 'coins=[3,5] → with unlimited copies, non-constructible amounts are 1,2,4,7 → minimum is 1'
            },
            {
                title: 'Kth Non-Constructible Change',
                difficulty: 'Hard',
                description: 'Instead of the minimum non-constructible amount, find the kth smallest non-constructible amount.',
                whyDifferent: 'Requires enumerating gaps between constructible ranges, potentially needing subset-sum DP to identify all constructible values.',
                example: 'coins=[1,2,5], k=1 → constructible: 1-8. First non-constructible is 4... depends on which subsets work'
            },
            {
                title: 'Non-Constructible Change from Two Pockets',
                difficulty: 'Medium',
                description: 'You have coins in two separate pockets. Find the minimum non-constructible amount using coins from both pockets combined.',
                whyDifferent: 'Must merge two coin sets before applying the greedy algorithm, or apply the algorithm to the combined sorted sequence.',
                example: 'pocket1=[1,2], pocket2=[5,10] → combined=[1,2,5,10] → sorted, apply greedy → min non-constructible is 4'
            },
            {
                title: 'Maximum Non-Constructible Under a Limit',
                difficulty: 'Hard',
                description: 'Find the largest value under a given limit that cannot be constructed from the coins.',
                whyDifferent: 'Inverts the direction: instead of finding the first gap, you need to find the last gap, requiring full subset-sum analysis up to the limit.',
                example: 'coins=[1,5,10], limit=20 → constructible: 1,5,6,10,11,15,16 → largest non-constructible ≤20 is 19'
            },
            {
                title: 'Non-Constructible After Removing One Coin',
                difficulty: 'Medium',
                description: 'For each coin, what would the minimum non-constructible amount be if you removed that coin? Return the array of answers.',
                whyDifferent: 'Requires running the greedy algorithm n times with one coin removed each time, or cleverly reusing partial computation.',
                example: 'coins=[1,2,3] → remove 1:[2,3]→min=1, remove 2:[1,3]→min=2, remove 3:[1,2]→min=4'
            }
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
