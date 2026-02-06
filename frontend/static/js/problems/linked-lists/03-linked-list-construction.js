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
        twists: [
            {
                title: 'Singly Linked List Construction',
                difficulty: 'Medium',
                description: 'Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.',
                whyDifferent: 'Without prev pointers, operations like insertBefore and remove become O(n) instead of O(1) because you must find the predecessor by traversing from the head. The entire design trade-off changes.',
                example: 'remove(node3) in singly linked 1->2->3->4: must traverse from head to find node2, then set node2.next = node4. Cannot directly access predecessor.'
            },
            {
                title: 'Circular Doubly Linked List',
                difficulty: 'Medium',
                description: 'Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail. All operations must maintain the circular invariant.',
                whyDifferent: 'There is no null in the circular structure. Setting head or tail has ripple effects on the circular connections. Empty list and single-node list edge cases become trickier since head.prev and head.next both point to itself.',
                example: 'After inserting 1,2,3: head=1, tail=3, 3.next=1, 1.prev=3. Removing 2: 1<->3, 3.next=1, 1.prev=3.'
            },
            {
                title: 'XOR Linked List Implementation',
                difficulty: 'Very Hard',
                description: 'Implement a memory-efficient doubly linked list where each node stores prev XOR next instead of separate pointers. Support the same operations.',
                whyDifferent: 'XOR linking means you need the previous node to compute the next node (and vice versa). Every traversal requires carrying the previous address. Insertion and deletion require updating XOR values of neighboring nodes, fundamentally changing every operation.',
                example: 'Node A stores 0 XOR addr(B), Node B stores addr(A) XOR addr(C). To go from A to B: next = 0 XOR npx(A) = addr(B). To go from B to C: next = addr(A) XOR npx(B) = addr(C).'
            },
            {
                title: 'Sentinel/Dummy Node Simplification',
                difficulty: 'Easy',
                description: 'Re-implement the doubly linked list using permanent sentinel head and tail nodes that are never removed. Observe how this eliminates all null checks in every operation.',
                whyDifferent: 'With sentinels, you never need to check if head or tail is null. insertBefore/insertAfter become uniform. This twist highlights how a small design choice (sentinel nodes) dramatically simplifies the code at the cost of two extra nodes.',
                example: 'Empty list: SENTINEL_HEAD <-> SENTINEL_TAIL. Insert 1: SENTINEL_HEAD <-> 1 <-> SENTINEL_TAIL. No null checks needed anywhere.'
            },
            {
                title: 'Immutable Linked List (Functional Style)',
                difficulty: 'Hard',
                description: 'Implement a persistent/immutable linked list where operations return new list versions without modifying the original. Old versions remain accessible.',
                whyDifferent: 'In-place mutation is forbidden. Every insert/remove must create new nodes for the modified path while sharing unchanged nodes. This is a fundamentally different paradigm (structural sharing) used in functional programming.',
                example: 'v1 = [1,2,3]. v2 = insertAfter(v1, node1, 5) => [1,5,2,3]. v1 is still [1,2,3]. Both share nodes 2 and 3.'
            }
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
