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
        problem: 'Use three pointers: prev (initially null), current (initially head), and next (to save the next node). For each node: save next, reverse the pointer (current.next = prev), move prev and current forward. When current is null, prev points to the new head.',
        hints: [
            'You need to change each node\'s next pointer to point to the previous node instead of the next.',
            'If you just change current.next, you lose the reference to the rest of the list. Save it first!',
            'Use three pointers: prev (starts null), curr (starts at head), next (temporary storage).',
            'Pattern: save next = curr.next, reverse curr.next = prev, advance prev = curr, advance curr = next.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [0, 1, 2, 3, 4, 5]
        },
        output: [5, 4, 3, 2, 1, 0],
        explanation: 'Start: prev=null, curr=0. Step 1: 0→null, prev=0, curr=1. Step 2: 1→0, prev=1, curr=2. Continue until curr=null. Final: prev=5 is new head, pointing 5→4→3→2→1→0→null.'
    },
    {
        input: {
        "list": [1, 2]
        },
        output: [2, 1],
        explanation: 'Start: prev=null, curr=1. Save next=2, set 1.next=null, prev=1, curr=2. Save next=null, set 2.next=1, prev=2, curr=null. Done. Return prev=2.'
    }
        ],
        twists: [
            { id: '07-reverse-linked-list/twist-01-reverse-using-recursion', name: 'Reverse Using Recursion', difficulty: 'Medium' },
            { id: '07-reverse-linked-list/twist-02-reverse-every-other-node', name: 'Reverse Every Other Node', difficulty: 'Hard' },
            { id: '07-reverse-linked-list/twist-03-check-if-palindrome', name: 'Check If Palindrome', difficulty: 'Medium' },
            { id: '07-reverse-linked-list/twist-04-reverse-doubly-linked-list', name: 'Reverse Doubly Linked List', difficulty: 'Medium' },
            { id: '07-reverse-linked-list/twist-05-reverse-without-extra-pointers', name: 'Reverse Without Extra Pointers', difficulty: 'Hard' }
        ],
        similar: [
    { id: '07-reverse-linked-list/01-reverse-in-groups-of-k', name: 'Reverse Linked List in Groups of K', difficulty: 'Hard' },
    { id: '07-reverse-linked-list/02-reverse-portion-of-list', name: 'Reverse Linked List II (Reverse Portion)', difficulty: 'Medium' },
    { id: '07-reverse-linked-list/03-reverse-alternating-k-nodes', name: 'Reverse Alternating K Nodes', difficulty: 'Hard' }
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
