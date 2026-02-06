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
            { title: 'Maximize Number of Disks', difficulty: 'Medium', description: 'Instead of maximizing total height, maximize the number of disks in the stack while maintaining the strictly-less-than constraint on all three dimensions.', whyDifferent: 'Changes the optimization target from weighted (height sum) to unweighted (count), making it equivalent to the Longest Increasing Subsequence in 3D.', example: 'disks=[[2,1,2],[3,2,3],[2,2,8],[4,4,5]]: max height stack uses 3 disks (height 10), but max count could also be 3 using different disks.' },
            { title: 'Disk Stacking With Rotation', difficulty: 'Hard', description: 'Each disk can be rotated to use any of its three dimensions as the height. A disk [w,d,h] generates three orientations. Find the maximum height stack.', whyDifferent: 'Multiplies the input by 3x and requires deduplication logic since the same physical disk in different orientations cannot both appear in the stack.', example: 'disk [2,3,4] can be oriented as [2,3,4], [2,4,3], or [3,4,2]. This creates more stacking options but the same physical disk can only appear once.' },
            { title: 'Two-Dimensional Stacking', difficulty: 'Medium', description: 'Disks only have width and height (2D rectangles). Stack them so each rectangle is strictly smaller in both dimensions than the one below. Maximize total height.', whyDifferent: 'Reduces from 3D to 2D constraints, simplifying the comparison but also changing which sortings and DP transitions are valid.', example: 'rectangles=[[2,3],[1,2],[3,5],[2,4]]: stack [1,2] on [2,3] on [3,5] for height 10.' },
            { title: 'Minimum Disks to Reach Height', difficulty: 'Hard', description: 'Find the minimum number of disks needed to build a valid stack (all three dimensions strictly increasing) that reaches at least a target total height H.', whyDifferent: 'Inverts the optimization: minimize count subject to a height threshold, requiring a different DP formulation that tracks both count and accumulated height.', example: 'disks=[[2,1,2],[3,2,3],[4,4,5]], H=8: using [2,1,2] and [4,4,5] gives height 7 (not enough). Need all three for height 10 with 3 disks.' },
            { title: 'Count Valid Stackings', difficulty: 'Hard', description: 'Count the total number of distinct valid disk stacks (all dimensions strictly increasing bottom-to-top) that achieve the maximum height.', whyDifferent: 'Adds a counting dimension to the DP. You need to track both the maximum height and the number of ways to achieve it at each position.', example: 'disks=[[1,1,1],[2,2,2],[3,3,3]]: only 1 valid max-height stack exists: all three disks in order.' }
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
