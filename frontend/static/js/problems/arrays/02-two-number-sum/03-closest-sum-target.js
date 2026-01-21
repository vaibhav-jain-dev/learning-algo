/**
 * Closest Sum Target (Two Arrays)
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: two-pointer-two-arrays
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Sum Target',
        difficulty: 'Hard',
        algorithm: 'two-pointer-two-arrays',
        description: 'Given two sorted arrays arr1 and arr2, find one element from each array such that their sum is closest to a given target value. Return the pair of elements. If there are multiple pairs with the same closest sum, return any one of them. This problem combines concepts from Two Sum and binary search.',
        problem: 'Sort both arrays if not already sorted. Use two pointers: one starting at the beginning of arr1 (left) and one at the end of arr2 (right). Calculate sum = arr1[left] + arr2[right]. If sum < target, move left pointer right to increase sum. If sum > target, move right pointer left to decrease sum. Track the minimum absolute difference and the corresponding pair throughout.',
        hints: [
            'Sorting both arrays enables the two-pointer approach.',
            'Start with pointers at opposite ends: arr1[0] and arr2[n-1].',
            'Moving left pointer right increases sum; moving right pointer left decreases sum.',
            'Track both the minimum difference AND the pair that achieved it.'
        ],
        complexity: {
            time: 'O(n log n + m log m)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {
                    "arr1": [1, 3, 5, 7],
                    "arr2": [2, 4, 6, 8],
                    "target": 10
                },
                output: [3, 7],
                explanation: 'Pairs and their sums: 3+7=10 (exact match!). We found a pair that sums exactly to target.'
            },
            {
                input: {
                    "arr1": [-1, 3, 8, 12],
                    "arr2": [2, 4, 9, 15],
                    "target": 7
                },
                output: [3, 4],
                explanation: 'Multiple pairs close to 7: -1+9=8, 3+4=7 (exact!), 8+2=10. The pair [3,4] gives sum=7 which equals target.'
            },
            {
                input: {
                    "arr1": [1, 4, 5, 7],
                    "arr2": [10, 20, 30, 40],
                    "target": 32
                },
                output: [1, 30],
                explanation: 'Checking pairs: 7+30=37, 5+30=35, 4+30=34, 1+30=31. Closest to 32 is either [1,30]=31 or [4,30]=34. Return [1,30] with diff=1.'
            },
            {
                input: {
                    "arr1": [-5, -2, 0, 3],
                    "arr2": [-3, 1, 4, 8],
                    "target": 1
                },
                output: [0, 1],
                explanation: 'Pairs near target 1: 0+1=1 (exact match!), -2+3=1 would need 3 in arr2 but its not there. Return [0,1].'
            }
        ],
        similar: []
    };

    // Register with ProblemRenderer - as sub-problem of 02-two-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/03-closest-sum-target', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/03-closest-sum-target'] = problem;

})();
