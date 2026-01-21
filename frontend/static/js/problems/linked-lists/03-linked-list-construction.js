/**
 * Linked List Construction
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Linked List Construction',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        description: 'Write a DoublyLinkedList class that has a head and a tail, both of which point to either a linked list Node or None / null. The class should support: 1. **setHead(node)**: Set the head of the linked list to an existing node 2. **setTail(node)**: Set the tail of the linked list to an existing node 3. **insertBefore(node, nodeToInsert)**: Insert a node before another node 4. **insertAfter(node, nodeToInsert)**: Insert a node after another node 5. **insertAtPosition(position, nodeToInsert)**: Inser',
        complexity: {
            time: 'O(1) for most operations',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "initialList": [
                1,
                2,
                3,
                4,
                5
        ],
        "operations": [
                "setHead(4)",
                "setTail(6)",
                "insertBefore(6,3)",
                "insertAfter(6,3)",
                "insertAtPosition(1,3)",
                "removeNodesWithValue(3)",
                "remove(2)",
                "containsNodeWithValue(5)"
        ]
},
        output: [4, 1, 5, 6],
        explanation: 'Processing the input data produces the output. For input initialList=[1, 2, 3, 4, 5], operations=[setHead(4), setTail(6), ..., containsNodeWithValue(5)] (length 8), the result is [4, 1, 5, 6].'
    }
        ],
        similar: [
    { id: '01-copy-list-random-pointer', name: 'Copy List with Random Pointer', difficulty: 'Medium' },
    { id: '02-flatten-multilevel-list', name: 'Flatten a Multilevel Doubly Linked List', difficulty: 'Medium' },
    { id: '03-clone-graph', name: 'Clone Graph', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction'] = problem;

})();
