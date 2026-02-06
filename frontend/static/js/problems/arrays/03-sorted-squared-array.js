/**
 * Sorted Squared Array
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: two-pointer-sorted-squared
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared Array',
        difficulty: 'Easy',
        algorithm: 'two-pointer-sorted-squared',
        description: 'Write a function that takes in a non-empty array of integers that are sorted in ascending order and returns a new array of the same length with the squares of the original integers also sorted in ascending order.',
        problem: 'The key insight is that negative numbers, when squared, become positive and may be larger than squared positive numbers. Since the input is sorted, the largest squared values must come from either the leftmost (most negative) or rightmost (most positive) elements. Use two pointers at both ends, compare their squared values, place the larger one at the end of the result array, and move that pointer inward.',
        hints: [
            'Simply squaring and sorting would be O(n log n). Can you do better using the fact that the input is already sorted?',
            'After squaring, the largest values could come from either end of the original array (large negatives or large positives).',
            'Use two pointers: one at the start, one at the end. Compare squared values and build the result from largest to smallest.',
            'Fill the result array from the end (index n-1) to the beginning (index 0), placing larger squared values first.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [1, 2, 3, 5, 6, 8, 9]
        },
        output: [1, 4, 9, 25, 36, 64, 81],
        explanation: 'All numbers are positive, so squares maintain the same order. Left pointer at 1, right at 9. Compare 1² vs 9²: 81 wins, place at end. Continue comparing, always placing larger square at current position.'
    },
    {
        input: {
        "array": [-5, -4, -3, -2, -1]
        },
        output: [1, 4, 9, 16, 25],
        explanation: 'All negative numbers. Left pointer at -5, right at -1. Compare 25 vs 1: 25 wins. Next: -4 vs -1, 16 vs 1: 16 wins. The result is built in reverse order from original positions.'
    },
    {
        input: {
        "array": [-7, -3, 1, 9, 22, 30]
        },
        output: [1, 9, 49, 81, 484, 900],
        explanation: 'Mixed array. Compare (-7)²=49 vs 30²=900: 900 wins. Then (-7)² vs 22²=484: 484 wins. Then (-7)²=49 vs 9²=81: 81 wins. Then 49 vs 1²: 49 wins. Continue until done.'
    }
        ],
        twists: [
            {
                title: 'Sorted Cubed Array',
                difficulty: 'Medium',
                description: 'Instead of squaring, cube each element and return the sorted result. Cubing preserves sign, which changes the problem significantly.',
                whyDifferent: 'Unlike squaring, cubing preserves negative signs, so the relative order may already be correct. The two-pointer-from-ends approach needs reconsideration.',
                example: 'array=[-3,-1,0,2,4] → [-27,-1,0,8,64] (already sorted since cubing preserves order)'
            },
            {
                title: 'Sorted Squared with Count of Position Changes',
                difficulty: 'Medium',
                description: 'Return the sorted squared array AND the count of elements that changed position after squaring and sorting.',
                whyDifferent: 'Adds an inversion-counting aspect on top of the squaring problem, requiring you to track original vs final positions.',
                example: 'array=[-3,-1,2,4] → squares=[1,4,9,16], positions changed: -3 moved from 0→2, -1 moved from 1→0 → 2 changes'
            },
            {
                title: 'In-Place Sorted Squared Array',
                difficulty: 'Hard',
                description: 'Square the elements and sort them in-place using O(1) extra space (no result array allowed).',
                whyDifferent: 'The standard two-pointer solution requires O(n) extra space. In-place requires clever swapping strategies, possibly using block-based merging.',
                example: 'array=[-3,-1,2,4] → mutate to [1,4,9,16] in place'
            },
            {
                title: 'Sorted Squared Array with Custom Transform',
                difficulty: 'Medium',
                description: 'Given a sorted array and a quadratic function f(x)=ax^2+bx+c, apply f to each element and return the sorted result.',
                whyDifferent: 'Generalizes squaring to any parabolic transform. The direction of the parabola (a>0 or a<0) determines whether the two-pointer approach fills from the ends or the middle.',
                example: 'array=[-3,-1,0,2], a=1, b=0, c=0 → same as squaring; but a=-1, b=0, c=10 → [1,9,10,6] needs different logic'
            },
            {
                title: 'Streaming Sorted Squared',
                difficulty: 'Hard',
                description: 'Elements arrive one at a time in sorted order. After each new element, output the current sorted squared array in O(n) time.',
                whyDifferent: 'Cannot rebuild from scratch each time. Requires maintaining a sorted squared structure and efficiently inserting new squared values.',
                example: 'stream: -3 → [9], then -1 → [1,9], then 2 → [1,4,9], then 4 → [1,4,9,16]'
            }
        ],
        similar: [
            { id: '03-sorted-squared-array/01-merge-sorted-arrays-with-squares', name: 'Merge Sorted Arrays With Squares', difficulty: 'Medium' },
            { id: '03-sorted-squared-array/02-sorted-squared-no-duplicates', name: 'Sorted Squared No Duplicates', difficulty: 'Medium' },
            { id: '03-sorted-squared-array/03-kth-smallest-squared', name: 'Kth Smallest Squared', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array'] = problem;

})();
