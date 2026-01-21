/**
 * Flatten a Multilevel Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten a Multilevel Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        description: 'You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional **child pointer**. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a **multilevel data structure**. **Flatten** the list so that all the nodes appear in a single-level, doubly linked list. You are given the head of the first level o',
        complexity: {
            time: 'O(n)',
            space: 'O(depth)'
        },
        examples: [
    {
        input: {
        "list": "1-2-3-4-5-6 with 3->7-8-9-10 and 8->11-12"
},
        output: [1, 2, 3, 7, 8, 11, 12, 9, 10, 4, 5, 6],
        explanation: 'Processing the input data produces the output. For input list=1-2-3-4-5-6 with 3->7-8-9-10 and 8->11-12, the result is [1, ..., 6] (length 12).'
    },
    {
        input: {
        "list": "1-2 with 1->3"
},
        output: [1, 3, 2],
        explanation: 'Processing the input data produces the output. For input list=1-2 with 1->3, the result is [1, 3, 2].'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/02-flatten-multilevel-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/02-flatten-multilevel-list'] = problem;

})();
