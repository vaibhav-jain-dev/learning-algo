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
            {
                title: 'Doubly Linked List Variant',
                difficulty: 'Easy',
                description: 'The sorted list is now a doubly linked list with prev and next pointers. Remove duplicates while maintaining valid prev pointers throughout.',
                whyDifferent: 'You must update both prev and next pointers when removing nodes. Forgetting to fix the prev pointer of the node after a removed node is a common bug.',
                example: 'Input: null<->1<->1<->3<->4<->4 => Output: null<->1<->3<->4 with all prev/next pointers valid.'
            },
            {
                title: 'Circular Sorted Linked List',
                difficulty: 'Medium',
                description: 'The sorted linked list is circular (tail points back to head). Remove duplicates while keeping the list circular. The list is sorted, but the "start" could be at any point in the cycle.',
                whyDifferent: 'There is no null terminator to signal the end of traversal. You need a way to detect when you have completed one full cycle without breaking the circular structure.',
                example: 'Input: ...->1->1->3->4->4->... (circular) => Output: ...->1->3->4->... (circular, 3 nodes).'
            },
            {
                title: 'Recursive Without Extra Space',
                difficulty: 'Medium',
                description: 'Solve the remove-duplicates problem using pure recursion with no loops. The function should return the head of the deduplicated list.',
                whyDifferent: 'Forces you to think about the problem in terms of subproblems: "deduplicate the rest of the list, then decide whether to include the current node." The call stack replaces your iterative pointer.',
                example: 'removeDups(1->1->3->4->4) => 1 + removeDups(1->3->4->4) => eventually 1->3->4.'
            },
            {
                title: 'Count Duplicates Instead of Removing',
                difficulty: 'Easy',
                description: 'Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them. Do this in O(1) space.',
                whyDifferent: 'Shifts the focus from pointer manipulation to pure counting logic. You still traverse the same way but the mental model changes from "rewiring" to "tallying."',
                example: 'Input: 1->1->3->4->4->4->5->6->6 => Output: 4 (four nodes would be removed).'
            },
            {
                title: 'In-Place with XOR Linked List',
                difficulty: 'Very Hard',
                description: 'The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer. Remove duplicates from the sorted XOR-linked list.',
                whyDifferent: 'XOR linked lists require you to carry the previous node address to compute the next node. Removing a node means recalculating XOR values for neighboring nodes, making deletion significantly harder.',
                example: 'XOR list: 1(xor01)->1(xor12)->3(xor13)->4(xor34) with XOR-encoded pointers. After dedup: 1->3->4 with recalculated XOR links.'
            }
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
