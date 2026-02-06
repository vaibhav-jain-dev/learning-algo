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
            { title: 'Reverse Using Recursion', difficulty: 'Medium', description: 'Reverse the linked list using recursion instead of iteration. No explicit prev/curr/next pointers in a loop.', whyDifferent: 'Forces a recursive mindset where you reverse the rest of the list first, then fix the pointers. The call stack replaces the explicit prev pointer, and the base case returns the new head.', example: 'list=[1,2,3,4,5]: recurse to end, then 5.next=null (base). Return 5. Then 4.next.next=4, 4.next=null. Builds reversed list bottom-up.' },
            { title: 'Reverse Every Other Node', difficulty: 'Hard', description: 'Reverse only the nodes at odd positions (1st, 3rd, 5th...) while keeping even-positioned nodes in place. Positions are 1-indexed.', whyDifferent: 'Requires extracting specific nodes, reversing a subset, then interleaving them back in, combining list splitting with reversal and merging.', example: 'list=[1,2,3,4,5]: odd-position values [1,3,5] reversed to [5,3,1]. Interleave with even [2,4]: result=[5,2,3,4,1].' },
            { title: 'Check If Palindrome', difficulty: 'Medium', description: 'Use linked list reversal as a subroutine to check if a singly linked list is a palindrome in O(n) time and O(1) space.', whyDifferent: 'Reversal is a tool here, not the goal. You reverse the second half, compare with the first half, then optionally re-reverse to restore the list.', example: 'list=[1,2,3,2,1]: reverse second half [2,1] to [1,2]. Compare [1,2,3] with [1,2]: first two match, it is a palindrome.' },
            { title: 'Reverse Doubly Linked List', difficulty: 'Medium', description: 'Reverse a doubly linked list in place, updating both next and prev pointers for every node.', whyDifferent: 'Each node has two pointers to swap (next and prev), and you must update both correctly. The head becomes the tail and vice versa.', example: 'list: null<-1<->2<->3<->4->null becomes null<-4<->3<->2<->1->null.' },
            { title: 'Reverse Without Extra Pointers', difficulty: 'Hard', description: 'Reverse the linked list using only two pointer variables (not three). You may use XOR or other tricks to avoid the temp/next variable.', whyDifferent: 'Constraining to two variables forces creative solutions like using XOR swapping or reusing one of the node next fields as temporary storage.', example: 'list=[1,2,3]: normally need prev, curr, next. With two variables, use curr.next before overwriting it, or use XOR trick to store two values in one.' }
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
