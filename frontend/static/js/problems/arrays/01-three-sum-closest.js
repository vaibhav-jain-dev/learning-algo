/**
 * Three Sum Closest
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-three-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest',
        difficulty: 'Medium',
        algorithm: 'two-pointer-three-sum',
        description: 'Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution. The key insight is that after sorting the array, you can use two pointers to efficiently search for the closest sum.',
        problem: 'Sort the array first. For each element, use two pointers (left and right) to find the pair that makes the sum closest to target. Track the minimum difference between current sum and target. If sum < target, move left pointer right to increase sum. If sum > target, move right pointer left to decrease sum. If sum equals target exactly, return immediately.',
        hints: [
            'Sorting the array enables efficient two-pointer traversal.',
            'For each fixed element, the problem reduces to finding two numbers closest to (target - fixed element).',
            'Track the closest sum found so far by comparing absolute differences.',
            'Move pointers based on whether current sum is less or greater than target.'
        ],
        complexity: {
            time: 'O(n²)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {
                    "nums": [-1, 2, 1, -4],
                    "target": 1
                },
                output: 2,
                explanation: 'The sum closest to target 1 is 2. We get 2 from -1 + 2 + 1 = 2. Other combinations: -1 + 2 + (-4) = -3, -1 + 1 + (-4) = -4, 2 + 1 + (-4) = -1. The difference |2-1| = 1 is smallest.'
            },
            {
                input: {
                    "nums": [0, 0, 0],
                    "target": 1
                },
                output: 0,
                explanation: 'Only one triplet exists: 0 + 0 + 0 = 0. This is the closest sum to target 1.'
            },
            {
                input: {
                    "nums": [1, 1, 1, 0],
                    "target": -100
                },
                output: 2,
                explanation: 'The smallest possible sum is 0 + 1 + 1 = 2. Even though -100 is far away, 2 is the closest we can get with these numbers.'
            },
            {
                input: {
                    "nums": [4, 0, 5, -5, 3, 3, 0, -4, -5],
                    "target": -2
                },
                output: -2,
                explanation: 'We can find an exact match: 0 + 3 + (-5) = -2 equals the target exactly.'
            }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-three-sum-closest', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/01-three-sum-closest'] = problem;

})();
