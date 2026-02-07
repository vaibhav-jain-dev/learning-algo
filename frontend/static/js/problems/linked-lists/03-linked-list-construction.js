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
        description: 'Write a DoublyLinkedList class that has a head and a tail, both of which point to either a linked list Node or None / null. The class should support: 1. **setHead(node)**: Set the head of the linked list to an existing node 2. **setTail(node)**: Set the tail of the linked list to an existing node 3. **insertBefore(node, nodeToInsert)**: Insert a node before another node 4. **insertAfter(node, nodeToInsert)**: Insert a node after another node 5. **insertAtPosition(position, nodeToInsert)**: Inser.',
        problem: 'Traverse the linked list with appropriate pointer management. Keep track of previous, current, and next nodes as needed. Be careful to update pointers in the correct order to avoid losing references. This achieves O(1) for most operations time with O(1) space.',
        hints: [
            'Think about what pointers you need to maintain as you traverse the list.',
            'The runner technique (slow and fast pointers) solves many linked list problems.',
            'Be careful about edge cases: empty list, single node, and the head/tail nodes.',
            'Draw out the pointer changes step by step before coding to avoid losing references.'
        ],

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
        explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
    }
        ],
        twists: [
            { id: '03-linked-list-construction/twist-01-singly-linked-list-construction', name: 'Singly Linked List Construction', difficulty: 'Medium' },
            { id: '03-linked-list-construction/twist-02-circular-doubly-linked-list', name: 'Circular Doubly Linked List', difficulty: 'Medium' },
            { id: '03-linked-list-construction/twist-03-xor-linked-list-implementation', name: 'XOR Linked List Implementation', difficulty: 'Very Hard' },
            { id: '03-linked-list-construction/twist-04-sentinel-dummy-node-simplification', name: 'Sentinel/Dummy Node Simplification', difficulty: 'Easy' },
            { id: '03-linked-list-construction/twist-05-immutable-linked-list-functional-style', name: 'Immutable Linked List (Functional Style)', difficulty: 'Hard' }
        ],
        similar: [
    { id: '03-linked-list-construction/03-linked-list-construction/01-copy-list-random-pointer', name: 'Copy List with Random Pointer', difficulty: 'Medium' },
    { id: '03-linked-list-construction/03-linked-list-construction/02-flatten-multilevel-list', name: 'Flatten a Multilevel Doubly Linked List', difficulty: 'Medium' },
    { id: '03-linked-list-construction/03-clone-graph', name: 'Clone Graph', difficulty: 'Medium' }
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
