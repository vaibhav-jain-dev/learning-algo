/**
 * Move Element To End
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-move
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Element To End',
        difficulty: 'Medium',
        algorithm: 'two-pointer-move',
        description: 'You\'re given an array of integers and an integer. Write a function that moves all instances of that integer in the array to the end of the array and returns the array. The function should perform this in place (i.e., it should mutate the input array) and doesn\'t need to maintain the order of the other integers.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                2,
                1,
                2,
                2,
                2,
                3,
                4,
                2
        ],
        "toMove": 2
},
        output: [4, 1, 3, 2, 2, 2, 2, 2],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[2, 1, ..., 2] (length 8), toMove=2, the result is [4, ..., 2] (length 8).'
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
        "toMove": 3
},
        output: [1, 2, 5, 4, 3],
        explanation: 'Using two pointers, we traverse the data structure to find the solution efficiently. For input array=[1, 2, 3, 4, 5], toMove=3, the result is [1, 2, 5, 4, 3].'
    }
        ],
        similar: [
    { id: '09-move-element-to-end/01-move-element-preserve-order', name: '01 Move Element Preserve Order', difficulty: 'Medium' },
    { id: '09-move-element-to-end/02-partition-array-by-predicate', name: '02 Partition Array By Predicate', difficulty: 'Medium' },
    { id: '09-move-element-to-end/03-dutch-national-flag', name: '03 Dutch National Flag', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end'] = problem;

})();
