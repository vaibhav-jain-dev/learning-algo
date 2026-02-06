/**
 * Smallest Difference
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-diff
 */
(function() {
    'use strict';

    const problem = {
        name: 'Smallest Difference',
        difficulty: 'Medium',
        algorithm: 'two-pointer-diff',
        description: 'Write a function that takes in two non-empty arrays of integers, finds the pair of numbers (one from each array) whose absolute difference is closest to zero, and returns an array containing these two numbers, with the number from the first array in the first position. Note that the absolute difference of two integers is the distance between them on the real number line.',
        complexity: {
            time: 'O(n log n + m log m)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "arrayOne": [
                -1,
                5,
                10,
                20,
                28,
                3
        ],
        "arrayTwo": [
                26,
                134,
                135,
                15,
                17
        ]
},
        output: [28, 26],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input arrayOne=[-1, 5, ..., 3] (length 6), arrayTwo=[26, 134, 135, 15, 17], the result is [28, 26].'
    },
    {
        input: {
        "arrayOne": [
                10,
                1000
        ],
        "arrayTwo": [
                1001,
                11
        ]
},
        output: [1000, 1001],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input arrayOne=[10, 1000], arrayTwo=[1001, 11], the result is [1000, 1001].'
    }
        ],
        twists: [
            { title: 'Closest to Target Difference', difficulty: 'Medium', description: 'Instead of finding the pair with the smallest absolute difference, find the pair whose absolute difference is closest to a given value D.', whyDifferent: 'The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.', example: 'arrayOne = [1, 5, 10], arrayTwo = [3, 8, 14], D = 4. Pair [10, 14] has diff 4, exactly D.' },
            { title: 'Smallest Difference Unsorted', difficulty: 'Medium', description: 'Find the smallest difference pair but you cannot sort either array. Use a hash-based approach.', whyDifferent: 'Removes the sorted two-pointer technique, forcing a completely different algorithmic strategy with hash sets.', example: 'arrayOne = [10, 5, -1], arrayTwo = [26, 15, 17]. Must find [5, 15] with diff 10 without sorting.' },
            { title: 'K-th Smallest Difference Pair', difficulty: 'Hard', description: 'Instead of the absolute smallest difference, find the K-th smallest difference pair between the two arrays.', whyDifferent: 'Requires either a heap-based approach or binary search on the answer, a fundamentally different technique.', example: 'arrayOne = [1, 3, 5], arrayTwo = [2, 4], K = 2. Sorted diffs: 1,1,1,2,3. K=2 gives diff 1.' },
            { title: 'Smallest Circular Difference', difficulty: 'Hard', description: 'Numbers represent positions on a circular number line of size M. Find the pair with smallest circular distance.', whyDifferent: 'Distance wraps around, so diff(a,b) = min(|a-b|, M-|a-b|). Two-pointer logic needs modification for circular comparison.', example: 'arrayOne = [1, 50], arrayTwo = [99, 30], M = 100. Circular diff between 1 and 99 is 2, not 98.' },
            { title: 'Smallest Difference From Three Arrays', difficulty: 'Hard', description: 'Given three arrays, pick one element from each to minimize (max - min) of the three chosen elements.', whyDifferent: 'Extends the two-pointer approach to three pointers, requiring a different strategy for which pointer to advance.', example: 'arr1 = [1, 4], arr2 = [5, 10], arr3 = [3, 8]. Best triplet [4, 5, 3] gives range 2.' }
        ],
        similar: [
            { id: '08-smallest-difference/01-k-smallest-differences', name: 'K Smallest Differences', difficulty: 'Medium' },
            { id: '08-smallest-difference/02-smallest-diff-triplet', name: 'Smallest Diff Triplet', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference'] = problem;

})();
