/**
 * Remove Duplicates From Linked List
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates From Linked List',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        description: 'You\'re given the head of a Singly Linked List whose nodes are in sorted order with respect to their values. Write a function that returns a modified version of the Linked List that doesn\'t contain any nodes with duplicate values. The Linked List should be modified in place (i.e., you shouldn\'t create a brand new list), and the modified Linked List should still have its nodes sorted with respect to their values.',
        problem: 'Since the list is sorted, duplicates are always adjacent. Traverse the list with a pointer. For each node, check if the next node has the same value. If so, skip it by updating the current node\'s next pointer to skip over duplicates. Continue until you find a different value or reach the end.',
        hints: [
            'The list is sorted - what does this tell you about where duplicates will appear?',
            'You don\'t need extra space because duplicates are always consecutive in a sorted list.',
            'For each node, look ahead while the next node has the same value, then update the pointer to skip all duplicates.',
            'Handle the edge case where multiple consecutive nodes have the same value - you need to skip all of them.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [1, 1, 3, 4, 4, 4, 5, 6, 6]
        },
        output: [1, 3, 4, 5, 6],
        explanation: 'At node 1: next is also 1, skip it. At node 1: next is 3 (different), move to 3. At node 3: next is 4, move. At node 4: next two are also 4, skip both. At node 4: next is 5, move. Continue until end.'
    },
    {
        input: {
        "list": [1, 1, 1, 1, 1]
        },
        output: [1],
        explanation: 'Starting at the first 1, keep skipping while next node is also 1. After skipping all duplicates, the list contains only the first node with value 1.'
    }
        ],
        twists: [
            { id: '01-remove-duplicates/twist-01-doubly-linked-list-variant', name: 'Doubly Linked List Variant', difficulty: 'Easy' },
            { id: '01-remove-duplicates/twist-02-circular-sorted-linked-list', name: 'Circular Sorted Linked List', difficulty: 'Medium' },
            { id: '01-remove-duplicates/twist-03-recursive-without-extra-space', name: 'Recursive Without Extra Space', difficulty: 'Medium' },
            { id: '01-remove-duplicates/twist-04-count-duplicates-instead-of-removing', name: 'Count Duplicates Instead of Removing', difficulty: 'Easy' },
            { id: '01-remove-duplicates/twist-05-in-place-with-xor-linked-list', name: 'In-Place with XOR Linked List', difficulty: 'Very Hard' }
        ],
        similar: [
    { id: '01-remove-duplicates/01-remove-duplicates-unsorted', name: 'Remove Duplicates from Unsorted Linked List', difficulty: 'Medium' },
    { id: '01-remove-duplicates/02-remove-all-duplicate-nodes', name: 'Remove All Nodes with Duplicate Values', difficulty: 'Medium' },
    { id: '01-remove-duplicates/03-remove-duplicates-keep-k', name: 'Remove Duplicates Keeping At Most K Occurrences', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates'] = problem;

})();
