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
        twists: [
            { title: 'Move to Front Instead', difficulty: 'Easy', description: 'Move all instances of the target integer to the front of the array instead of the end, without maintaining order of other elements.', whyDifferent: 'The pointer logic reverses: the write pointer starts at the beginning, and you scan from the end.', example: 'array = [1, 2, 3, 2, 4], toMove = 2. Result: [2, 2, 3, 1, 4] or similar.' },
            { title: 'Move and Count Swaps', difficulty: 'Medium', description: 'Move all target elements to the end and return the minimum number of swaps performed.', whyDifferent: 'Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.', example: 'array = [2, 1, 2, 2, 3, 4, 2], toMove = 2. After moving, count = 2 swaps.' },
            { title: 'Move Multiple Values', difficulty: 'Medium', description: 'Given a set of values to move (not just one), move all of them to the end of the array.', whyDifferent: 'Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.', example: 'array = [1, 2, 3, 4, 5], toMove = {2, 4}. Result: [1, 3, 5, 2, 4] or [1, 5, 3, 4, 2].' },
            { title: 'Move Preserving Relative Order', difficulty: 'Medium', description: 'Move target elements to the end while preserving the relative order of all remaining elements.', whyDifferent: 'Swapping disrupts order; you need a read/write pointer approach instead, fundamentally changing the algorithm.', example: 'array = [2, 1, 2, 3, 2, 4], toMove = 2. Result must be [1, 3, 4, 2, 2, 2].' },
            { title: 'Alternating Placement', difficulty: 'Hard', description: 'Rearrange the array so target elements alternate with non-target elements. If not possible, place remaining at the end.', whyDifferent: 'Requires a two-phase approach: separate elements, then interleave them, a completely different strategy from simple partitioning.', example: 'array = [2, 1, 2, 3, 2, 4], toMove = 2. Result: [1, 2, 3, 2, 4, 2].' }
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
