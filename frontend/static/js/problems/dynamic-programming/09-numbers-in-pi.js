/**
 * Numbers in Pi
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-pi-numbers
 */
(function() {
    'use strict';

    const problem = {
        name: 'Numbers in Pi',
        difficulty: 'Hard',
        algorithm: 'dp-pi-numbers',
        description: 'Given a string representation of the first n digits of Pi and a list of positive integers (as strings), write a function that returns the smallest number of spaces that can be added to the Pi string such that all resulting numbers are found in the list of integers. If there is no way to split Pi such that all numbers are in the list, return -1. Note that a single digit from Pi can only be used once in a number.',
        complexity: {
            time: 'O(n^2 * m)',
            space: 'O(n + k)'
        },
        examples: [
    {
        input: {
        "pi": "3141592653589793238462643383279",
        "numbers": [
                "314159265358979323846",
                "26433",
                "8",
                "3279",
                "314159265",
                "35897932384626433832",
                "79"
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input pi=3141592653589793238462643383279, numbers=[314159265358979323846, 26433, ..., 79] (length 7), the result is 2.'
    },
    {
        input: {
        "pi": "314159",
        "numbers": [
                "314",
                "159",
                "3141",
                "59"
        ]
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input pi=314159, numbers=[314, 159, 3141, 59], the result is 1.'
    },
    {
        input: {
        "pi": "123456",
        "numbers": [
                "12",
                "34",
                "56"
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input pi=123456, numbers=[12, 34, 56], the result is 2.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '09-numbers-in-pi', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/09-numbers-in-pi'] = problem;

})();
