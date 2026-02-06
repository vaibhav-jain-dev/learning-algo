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
        twists: [
            { title: 'Insert and Merge', difficulty: 'Medium', description: 'Given an already-merged set of non-overlapping intervals sorted by start, insert a new interval and merge as needed.', whyDifferent: 'The intervals are already sorted and non-overlapping, so you can find the insertion point and only merge locally.', example: 'intervals = [[1,3],[6,9]], newInterval = [2,5]. Result: [[1,5],[6,9]].' },
            { title: 'Intersection of Interval Lists', difficulty: 'Medium', description: 'Given two lists of sorted non-overlapping intervals, find all intersections between them.', whyDifferent: 'Instead of merging overlaps, you find where intervals from two lists overlap, requiring a two-pointer approach.', example: 'A = [[0,2],[5,10]], B = [[1,5],[8,12]]. Intersections: [[1,2],[5,5],[8,10]].' },
            { title: 'Minimum Intervals to Remove', difficulty: 'Hard', description: 'Find the minimum number of intervals to remove so that the remaining intervals are non-overlapping.', whyDifferent: 'Optimization problem: instead of merging, you select which intervals to keep, a greedy interval scheduling problem.', example: 'intervals = [[1,2],[2,3],[3,4],[1,3]]. Remove [1,3] to get non-overlapping. Min removals = 1.' },
            { title: 'Merge with Weights', difficulty: 'Hard', description: 'Each interval has a weight. When merging, the merged interval weight is the sum of constituent weights. Return merged intervals with weights.', whyDifferent: 'Must track cumulative weight during merging, adding an aggregation dimension to the standard merge.', example: 'intervals = [[1,3,5],[2,4,3]]. Merged: [[1,4,8]] (weight 5+3=8).' },
            { title: 'Count Overlap Depth', difficulty: 'Medium', description: 'Instead of merging, find the maximum number of intervals that overlap at any single point.', whyDifferent: 'A sweep line approach counting active intervals at each event point, fundamentally different from merging.', example: 'intervals = [[1,5],[2,6],[4,7]]. Max overlap depth = 3 (at point 4 or 5).' }
        ],
        similar: []
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '14-merge-overlapping-intervals', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/14-merge-overlapping-intervals'] = problem;

})();
