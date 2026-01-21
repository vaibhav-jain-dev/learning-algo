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
