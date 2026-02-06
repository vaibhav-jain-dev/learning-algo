/**
 * Three Number Sum
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sort-three-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Number Sum',
        difficulty: 'Medium',
        algorithm: 'sort-three-sum',
        description: 'Write a function that takes in a non-empty array of distinct integers and an integer representing a target sum. The function should find all triplets in the array that sum up to the target sum and return a two-dimensional array of all these triplets. The numbers in each triplet should be ordered in ascending order, and the triplets themselves should be ordered in ascending order with respect to the numbers they hold. If no three numbers sum up to the target sum, the function should return an emp',
        complexity: {
            time: 'O(n²)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                12,
                3,
                1,
                2,
                -6,
                5,
                -8,
                6
        ],
        "targetSum": 0
},
        output: [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input array=[12, 3, ..., 6] (length 8), targetSum=0, the result is [[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3
        ],
        "targetSum": 6
},
        output: [[1, 2, 3]],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input array=[1, 2, 3], targetSum=6, the result is [[1, 2, 3]].'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ],
        "targetSum": 100
},
        output: [],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input array=[1, 2, 3, 4, 5], targetSum=100, the result is [].'
    }
        ],
        twists: [
            { title: 'Closest Three Sum', difficulty: 'Medium', description: 'Instead of finding triplets that sum exactly to the target, find the triplet whose sum is closest to the target. Return that closest sum.', whyDifferent: 'You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.', example: 'array = [1, 2, 3, 4, 5], target = 10. Closest triplet sum is 3+4+5 = 12, so return 12.' },
            { title: 'Three Sum Count Only', difficulty: 'Medium', description: 'Count the number of unique triplets that sum to the target without enumerating them. Return just the count.', whyDifferent: 'Forces you to think about counting without storing results, and whether early termination or deduplication logic changes.', example: 'array = [1, 2, 3, -1, -2, 0], target = 0. Count = 3 triplets.' },
            { title: 'Three Sum Without Sorting', difficulty: 'Hard', description: 'Find all triplets summing to target but you are not allowed to sort the array. Use a hash-based approach instead.', whyDifferent: 'Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.', example: 'array = [12, 3, 1, 2, -6, 5, -8, 6], target = 0. Same result but found using hash lookups.' },
            { title: 'Three Sum in Range', difficulty: 'Hard', description: 'Find all triplets whose sum falls within a range [lo, hi] inclusive, not just a single target value.', whyDifferent: 'The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.', example: 'array = [1, 2, 3, 4, 5], lo = 8, hi = 10. Triplets: [1,2,5], [1,3,4], [1,4,5], [2,3,4], [2,3,5].' },
            { title: 'Three Sum With Multiplicity', difficulty: 'Hard', description: 'Given an array that may contain duplicates, count all ordered triplet indices (i, j, k) where i < j < k and array[i] + array[j] + array[k] = target.', whyDifferent: 'Instead of unique value triplets, you count index-based combinations, requiring combinatorial math when duplicates exist.', example: 'array = [1, 1, 2, 2, 3, 3], target = 6. Multiple index combinations yield the same value triplet.' }
        ],
        similar: [
            { id: '07-three-number-sum/03-four-number-sum', name: 'Four Number Sum', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum'] = problem;

})();
