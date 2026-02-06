/**
 * Monotonic Array
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: linear-scan
 */
(function() {
    'use strict';

    const problem = {
        name: 'Monotonic Array',
        difficulty: 'Medium',
        algorithm: 'linear-scan',
        description: 'Write a function that takes in an array of integers and returns a boolean representing whether the array is monotonic. An array is said to be monotonic if its elements, from left to right, are entirely non-increasing or entirely non-decreasing. Non-increasing elements aren\'t necessarily exclusively decreasing; they simply don\'t increase. Similarly, non-decreasing elements aren\'t necessarily exclusively increasing; they simply don\'t decrease. Note that empty arrays and arrays of one element are m',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                -1,
                -5,
                -10,
                -1100,
                -1100,
                -1101,
                -1102,
                -9001
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input array=[-1, -5, ..., -9001] (length 8), the result is true.'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                3,
                4,
                5
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, ..., 5] (length 6), the result is true.'
    },
    {
        input: {
        "array": [
                1,
                2,
                1
        ]
},
        output: false,
        explanation: 'Processing the input data produces the output. For input array=[1, 2, 1], the result is false.'
    }
        ],
        twists: [
            { title: 'Strictly Monotonic Check', difficulty: 'Easy', description: 'Check if the array is strictly increasing or strictly decreasing (no equal adjacent elements allowed).', whyDifferent: 'The comparison changes from <= />= to < / >, which seems trivial but alters edge case handling with equal elements.', example: 'array = [1, 2, 2, 3]. Non-decreasing but NOT strictly increasing, so return false.' },
            { title: 'Monotonic with One Exception', difficulty: 'Medium', description: 'Check if the array can become monotonic by changing at most one element.', whyDifferent: 'Requires tracking violations and determining if a single fix can resolve them, adding a greedy correction step.', example: 'array = [1, 5, 3, 4, 5]. Change 5 at index 1 to 2: [1,2,3,4,5]. Return true.' },
            { title: 'Direction of Monotonicity', difficulty: 'Easy', description: 'Return which direction the array is monotonic: "increasing", "decreasing", "constant", or "neither".', whyDifferent: 'Must distinguish between all four cases explicitly, handling arrays with all equal elements as a special case.', example: 'array = [5, 5, 5] returns "constant". array = [1, 2, 3] returns "increasing".' },
            { title: 'Longest Monotonic Prefix', difficulty: 'Medium', description: 'Find the length of the longest prefix of the array that is monotonic.', whyDifferent: 'You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.', example: 'array = [1, 2, 3, 1, 5]. Longest monotonic prefix is [1,2,3] with length 3.' },
            { title: 'Count Monotonic Subarrays', difficulty: 'Medium', description: 'Count the total number of contiguous subarrays of length >= 2 that are monotonic.', whyDifferent: 'Requires counting all valid subarrays, not just checking the whole array. Use math to count from run lengths.', example: 'array = [1, 2, 3, 1]. Monotonic subarrays: [1,2], [2,3], [1,2,3], [3,1] = 4 total.' }
        ],
        similar: [
    { id: '10-monotonic-array/01-longest-monotonic-subarray', name: '01 Longest Monotonic Subarray', difficulty: 'Medium' },
    { id: '10-monotonic-array/02-minimum-removals-monotonic', name: '02 Minimum Removals Monotonic', difficulty: 'Hard' },
    { id: '10-monotonic-array/03-can-become-monotonic', name: '03 Can Become Monotonic', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array'] = problem;

})();
