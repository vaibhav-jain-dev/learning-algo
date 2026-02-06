/**
 * Right Smaller Than
 * Category: binary-search-trees
 * Difficulty: Very
 * Algorithm: bst-augmented
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Smaller Than',
        difficulty: 'Very',
        algorithm: 'bst-augmented',
        description: 'Write a function that takes in an array of integers and returns an array of the same length, where each element in the output array corresponds to the number of integers in the input array that are to the right of the relevant index and that are strictly smaller than the integer at that index. In other words, for each index i, find the count of elements array[j] where j > i and array[j] < array[i].',
        complexity: {
            time: 'O(n log n) average, O(n^2) worst',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                8,
                5,
                11,
                -1,
                3,
                4,
                2
        ]
},
        output: [5, 4, 4, 0, 1, 1, 0],
        explanation: 'Processing the input data produces the output. For input array=[8, 5, ..., 2] (length 7), the result is [5, ..., 0] (length 7).'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: [0, 0, 0, 0, 0],
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 3, 4, 5], the result is [0, 0, 0, 0, 0].'
    }
        ],
        twists: [
            { id: '09-right-smaller-than/twist-01-right-greater-than', name: 'Right Greater Than', difficulty: 'Hard' },
            { id: '09-right-smaller-than/twist-02-right-smaller-than-with-duplicates', name: 'Right Smaller Than with Duplicates', difficulty: 'Hard' },
            { id: '09-right-smaller-than/twist-03-left-larger-than', name: 'Left Larger Than', difficulty: 'Hard' },
            { id: '09-right-smaller-than/twist-04-right-smaller-using-merge-sort', name: 'Right Smaller Using Merge Sort', difficulty: 'Very Hard' },
            { id: '09-right-smaller-than/twist-05-range-count-to-the-right', name: 'Range Count to the Right', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than'] = problem;

})();
