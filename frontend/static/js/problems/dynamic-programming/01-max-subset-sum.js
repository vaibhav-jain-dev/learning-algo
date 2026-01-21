/**
 * Max Subset Sum No Adjacent
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Subset Sum No Adjacent',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        description: 'Write a function that takes in an array of positive integers and returns the maximum sum of non-adjacent elements in the array. If the input array is empty, the function should return 0.',
        problem: 'At each position i, you have two choices: include the current element (and add to the max sum up to i-2) or skip it (and keep the max sum up to i-1). The recurrence is: dp[i] = max(dp[i-1], dp[i-2] + array[i]). Since you only need the previous two values, you can optimize space to O(1) using two variables.',
        hints: [
            'Think about what decision you make at each element: include it or skip it.',
            'If you include element at index i, you cannot include element at i-1. What\'s the best sum you can achieve including i?',
            'Define dp[i] as the maximum sum achievable considering elements 0 to i. What\'s the recurrence relation?',
            'dp[i] = max(dp[i-1], dp[i-2] + array[i]). You only need two previous values, so optimize to O(1) space.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [75, 105, 120, 75, 90, 135]
        },
        output: 330,
        explanation: 'Optimal selection: 75 + 120 + 135 = 330. We skip 105 (adjacent to 75), include 120 (not adjacent to 75), skip 75 (adjacent to 120), skip 90 (to include 135), include 135.'
    },
    {
        input: {
        "array": [7, 10, 12, 7, 9, 14]
        },
        output: 33,
        explanation: 'Optimal selection: 7 + 12 + 14 = 33. At each step: max(prev, prevPrev + current). Building up: 7, max(7,10)=10, max(10,7+12)=19, max(19,10+7)=19, max(19,19+9)=28, max(28,19+14)=33.'
    }
        ],
        similar: [
    { id: '01-house-robber-ii', name: 'House Robber II', difficulty: 'Medium' },
    { id: '02-delete-and-earn', name: 'Delete and Earn', difficulty: 'Medium' },
    { id: '03-paint-house', name: 'Paint House', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum'] = problem;

})();
