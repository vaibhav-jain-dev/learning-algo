/**
 * Merge Overlapping Intervals
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sort-merge
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Overlapping Intervals',
        difficulty: 'Medium',
        algorithm: 'sort-merge',
        description: 'Write a function that takes in a non-empty array of arbitrary intervals, merges any overlapping intervals, and returns the new intervals in no particular order. Each interval interval is an array of two integers, with interval[0] as the start of the interval and interval[1] as the end of the interval. Note that back-to-back intervals aren\'t considered to be overlapping. For example, [1, 5] and [6, 7] aren\'t overlapping; however, [1, 6] and [6, 7] are indeed overlapping. Also note that the start ',
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "intervals": [
                [
                        1,
                        2
                ],
                [
                        3,
                        5
                ],
                [
                        4,
                        7
                ],
                [
                        6,
                        8
                ],
                [
                        9,
                        10
                ]
        ]
},
        output: [[1, 2], [3, 8], [9, 10]],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input intervals=[[1, 2], [3, 5], [4, 7], [6, 8], [9, 10]], the result is [[1, 2], [3, 8], [9, 10]].'
    },
    {
        input: {
        "intervals": [
                [
                        1,
                        3
                ],
                [
                        2,
                        8
                ],
                [
                        9,
                        10
                ]
        ]
},
        output: [[1, 8], [9, 10]],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input intervals=[[1, 3], [2, 8], [9, 10]], the result is [[1, 8], [9, 10]].'
    },
    {
        input: {
        "intervals": [
                [
                        1,
                        10
                ],
                [
                        2,
                        3
                ],
                [
                        4,
                        5
                ],
                [
                        6,
                        7
                ]
        ]
},
        output: [[1, 10]],
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input intervals=[[1, 10], [2, 3], [4, 5], [6, 7]], the result is [[1, 10]].'
    }
        ],
        similar: [
    { id: '01-minimum-swaps-to-sort', name: 'Minimum Swaps To Sort', difficulty: 'Hard' },
    { id: '02-shortest-unsorted-with-k', name: 'Shortest Unsorted With K', difficulty: 'Medium' },
    { id: '03-max-sorted-subarrays', name: 'Max Sorted Subarrays', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '14-merge-overlapping-intervals', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/14-merge-overlapping-intervals'] = problem;

})();
