/**
 * Single Cycle Check
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-single-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Single Cycle Check',
        difficulty: 'Medium',
        algorithm: 'graph-single-cycle',
        description: 'You\'re given an array of integers where each integer represents a jump of its value in the array. For instance, the integer 2 represents a jump of two indices forward, and -3 represents a jump of three indices backward. If a jump spills past the array\'s bounds, it wraps over to the other side. For instance, a jump of -1 at index 0 brings us to the last index in the array. Similarly, a jump of 1 at the last index brings us to index 0. Write a function that returns a boolean representing whether t',
        complexity: {
            time: 'O(N)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                2,
                3,
                1,
                -4,
                -4,
                2
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input array=[2, 3, ..., 2] (length 6), the result is true.'
    },
    {
        input: {
        "array": [
                2,
                2,
                -1
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input array=[2, 2, -1], the result is true.'
    },
    {
        input: {
        "array": [
                1,
                1,
                1,
                1,
                2
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input array=[1, 1, 1, 1, 2], the result is false.'
    }
        ],
        similar: [
    { id: '01-linked-list-cycle', name: 'Linked List Cycle', difficulty: 'Easy' },
    { id: '02-find-duplicate-number', name: 'Find Duplicate Number', difficulty: 'Medium' },
    { id: '03-circular-array-loop', name: 'Circular Array Loop', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check'] = problem;

})();
