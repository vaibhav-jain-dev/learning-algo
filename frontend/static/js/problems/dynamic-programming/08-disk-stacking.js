/**
 * Disk Stacking
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-disk-stacking
 */
(function() {
    'use strict';

    const problem = {
        name: 'Disk Stacking',
        difficulty: 'Hard',
        algorithm: 'dp-disk-stacking',
        description: 'You are given an array of disks where each disk is represented as an array of three values: [width, depth, height]. Write a function that returns an array representing the disks in a stack that has the maximum height. A disk can only be placed on top of another disk if its width, depth, and height are all strictly less than the other disk\'s corresponding dimensions. The stack must maintain this property from bottom to top.',
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "disks": [
                [
                        2,
                        1,
                        2
                ],
                [
                        3,
                        2,
                        3
                ],
                [
                        2,
                        2,
                        8
                ],
                [
                        2,
                        3,
                        4
                ],
                [
                        1,
                        3,
                        1
                ],
                [
                        4,
                        4,
                        5
                ]
        ]
},
        output: [[2, 1, 2], [3, 2, 3], [4, 4, 5]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input disks=[[2, 1, 2], [3, 2, 3], ..., [4, 4, 5]] (length 6), the result is [[2, 1, 2], [3, 2, 3], [4, 4, 5]].'
    },
    {
        input: {
        "disks": [
                [
                        2,
                        1,
                        2
                ]
        ]
},
        output: [[2, 1, 2]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input disks=[[2, 1, 2]], the result is [[2, 1, 2]].'
    },
    {
        input: {
        "disks": [
                [
                        1,
                        1,
                        1
                ],
                [
                        2,
                        2,
                        2
                ],
                [
                        3,
                        3,
                        3
                ]
        ]
},
        output: [[1, 1, 1], [2, 2, 2], [3, 3, 3]],
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input disks=[[1, 1, 1], [2, 2, 2], [3, 3, 3]], the result is [[1, 1, 1], [2, 2, 2], [3, 3, 3]].'
    }
        ],
        twists: [
            { id: '08-disk-stacking/twist-01-maximize-number-of-disks', title: 'Maximize Number of Disks', difficulty: 'Medium' },
            { id: '08-disk-stacking/twist-02-disk-stacking-with-rotation', title: 'Disk Stacking With Rotation', difficulty: 'Hard' },
            { id: '08-disk-stacking/twist-03-two-dimensional-stacking', title: 'Two-Dimensional Stacking', difficulty: 'Medium' },
            { id: '08-disk-stacking/twist-04-minimum-disks-to-reach-height', title: 'Minimum Disks to Reach Height', difficulty: 'Hard' },
            { id: '08-disk-stacking/twist-05-count-valid-stackings', title: 'Count Valid Stackings', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '08-disk-stacking', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/08-disk-stacking'] = problem;

})();
