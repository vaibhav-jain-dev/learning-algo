/**
 * Min Number Of Jumps
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-jumps
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Number Of Jumps',
        difficulty: 'Hard',
        algorithm: 'dp-jumps',
        description: 'You\'re given a non-empty array of positive integers where each integer represents the maximum number of steps you can take forward from that position. For example, if the element at index 1 is 3, you can go from index 1 to index 2, 3, or 4. Write a function that returns the minimum number of jumps needed to reach the last index of the array. If it\'s not possible to reach the last index, return -1.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                3,
                4,
                2,
                1,
                2,
                3,
                7,
                1,
                1,
                1,
                3
        ]
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[3, 4, ..., 3] (length 11), the result is 4.'
    },
    {
        input: {
        "array": [
                2,
                1,
                1
        ]
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[2, 1, 1], the result is 1.'
    },
    {
        input: {
        "array": [
                1,
                1,
                1,
                1
        ]
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[1, 1, 1, 1], the result is 3.'
    },
    {
        input: {
        "array": [
                1,
                0,
                1
        ]
},
        output: -1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[1, 0, 1], the result is -1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps'] = problem;

})();
