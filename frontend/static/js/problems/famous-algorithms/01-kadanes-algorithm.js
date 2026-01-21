/**
 * Maximum Subarray Sum
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Subarray Sum',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        description: 'Given an array of integers (which may contain both positive and negative numbers), find the contiguous subarray with the largest sum. Return the maximum sum. This is the classic problem solved efficiently by Kadane\'s Algorithm, which uses dynamic programming to track the maximum subarray ending at each position.',
        problem: 'Kadane\'s key insight: at each position, the maximum subarray ending here is either just the current element (start fresh) or the current element plus the maximum subarray ending at the previous position (extend). Track two values: maxEndingHere (max sum ending at current position) and maxSoFar (global max). For each element: maxEndingHere = max(element, maxEndingHere + element), then update maxSoFar if needed.',
        hints: [
            'Brute force checks all subarrays in O(n²). Can you do better by building on previous computations?',
            'At each index, you have two choices: start a new subarray here, or extend the previous subarray.',
            'If the sum of the previous subarray plus current element is less than just the current element, start fresh.',
            'Track both the maximum ending at current position and the global maximum seen so far.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "nums": [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        },
        output: 6,
        explanation: 'Tracking maxEndingHere: -2→1→-2→4→3→5→6→1→5. At index 3 (value 4), we start fresh because 4 > (-2+4). The subarray [4,-1,2,1] has sum 6, which is the maximum. maxSoFar peaks at 6.'
    }
        ],
        similar: [
    { id: '01-kadanes-algorithm/01-max-circular-subarray', name: 'Maximum Sum Circular Subarray', difficulty: 'Medium' },
    { id: '01-kadanes-algorithm/02-max-product-subarray', name: 'Maximum Product Subarray', difficulty: 'Medium' },
    { id: '01-kadanes-algorithm/03-max-sum-k-elements', name: 'Maximum Sum with at Least K Elements', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm'] = problem;

})();
