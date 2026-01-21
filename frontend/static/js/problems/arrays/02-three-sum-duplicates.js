/**
 * Three Sum With Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-dedup
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum With Duplicates',
        difficulty: 'Medium',
        algorithm: 'two-pointer-dedup',
        description: 'Given an integer array nums that may contain duplicates, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == target. The solution set must not contain duplicate triplets. This is a classic problem that combines sorting, two-pointer technique, and duplicate handling.',
        problem: 'Sort the array first. Iterate through each element as the first number of the triplet. For each first number, use two pointers to find pairs that sum to (target - first). Skip duplicate values to avoid duplicate triplets: skip duplicate first numbers, and when a valid triplet is found, skip duplicate second and third numbers.',
        hints: [
            'Sorting helps both with the two-pointer approach and identifying duplicates.',
            'After finding a valid triplet, skip all duplicate values for both pointers.',
            'When iterating the first element, also skip duplicates to avoid repeated triplets.',
            'The key insight: if nums[i] == nums[i-1], skip it since we already processed that value.'
        ],
        complexity: {
            time: 'O(n²)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {
                    "nums": [1, 1, 1, 2, 2, 3],
                    "target": 6
                },
                output: [[1, 2, 3]],
                explanation: 'Only one unique triplet sums to 6: 1 + 2 + 3 = 6. Even though there are multiple 1s and 2s, we only report [1, 2, 3] once.'
            },
            {
                input: {
                    "nums": [-1, 0, 1, 2, -1, -4],
                    "target": 0
                },
                output: [[-1, -1, 2], [-1, 0, 1]],
                explanation: 'Two unique triplets sum to 0: (-1) + (-1) + 2 = 0 and (-1) + 0 + 1 = 0.'
            },
            {
                input: {
                    "nums": [0, 0, 0, 0],
                    "target": 0
                },
                output: [[0, 0, 0]],
                explanation: 'Only one unique triplet possible: 0 + 0 + 0 = 0. Even with four zeros, we report it once.'
            },
            {
                input: {
                    "nums": [-2, 0, 0, 2, 2],
                    "target": 0
                },
                output: [[-2, 0, 2]],
                explanation: 'One unique triplet: (-2) + 0 + 2 = 0. Although there are multiple 0s and 2s, only one unique combination.'
            }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-three-sum-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-three-sum-duplicates'] = problem;

})();
