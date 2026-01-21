/**
 * Reverse Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Linked List',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        description: 'Write a function that takes in the head of a Singly Linked List, reverses the list in place (i.e., doesn\'t create a brand new list), and returns its new head.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                0,
                1,
                2,
                3,
                4,
                5
        ]
},
        output: [5, 4, 3, 2, 1, 0],
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 5] (length 6), the result is [5, ..., 0] (length 6).'
    },
    {
        input: {
        "list": [
                1,
                2
        ]
},
        output: [2, 1],
        explanation: 'Processing the input data produces the output. For input list=[1, 2], the result is [2, 1].'
    }
        ],
        similar: [
    { id: '01-reverse-in-groups-of-k', name: 'Reverse Linked List in Groups of K', difficulty: 'Hard' },
    { id: '02-reverse-portion-of-list', name: 'Reverse Linked List II (Reverse Portion)', difficulty: 'Medium' },
    { id: '03-reverse-alternating-k-nodes', name: 'Reverse Alternating K Nodes', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list'] = problem;

})();
