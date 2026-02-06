/**
 * Middle Node of Linked List
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-middle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Middle Node of Linked List',
        difficulty: 'Easy',
        algorithm: 'll-middle',
        description: 'Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes (i.e., the list has an even number of nodes), return the second middle node.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3, 4, 5], the result is 3.'
    },
    {
        input: {
        "list": [
                1,
                2,
                3,
                4,
                5,
                6
        ]
},
        output: 4,
        explanation: 'Processing the input data produces the output. For input list=[1, 2, ..., 6] (length 6), the result is 4.'
    },
    {
        input: {
        "list": [
                1
        ]
},
        output: 1,
        explanation: 'Processing the input data produces the output. For input list=[1], the result is 1.'
    }
        ],
        twists: [
            {
                title: 'Circular Linked List Middle',
                difficulty: 'Medium',
                description: 'Find the middle node of a circular singly linked list. You are given a pointer to one node in the cycle. Return the node that is floor(n/2) steps from the given node.',
                whyDifferent: 'The slow/fast pointer technique needs a different termination condition. Fast pointer will never hit null; instead you must detect when it returns to the start node. Also, you need to first determine the length of the cycle.',
                example: 'Circular: 1->2->3->4->5->back to 1. Start at 1, n=5, middle is node 3 (floor(5/2)=2 steps from start).'
            },
            {
                title: 'Return First Middle for Even Length',
                difficulty: 'Easy',
                description: 'If the list has even length, return the FIRST of the two middle nodes instead of the second. Adjust the slow/fast pointer approach accordingly.',
                whyDifferent: 'The standard approach returns the second middle because slow advances once per two fast steps. To get the first middle, you must either start fast one step ahead or use a prev pointer, subtly changing the pointer dance.',
                example: 'Input: 1->2->3->4->5->6. Two middles: 3 and 4. Standard returns 4. This twist returns 3.'
            },
            {
                title: 'Delete Middle In-Place (No Return)',
                difficulty: 'Medium',
                description: 'Given only a pointer to the middle node (not the head), delete it from the singly linked list. You do not have access to the head or any node before the middle.',
                whyDifferent: 'Without access to the previous node, you cannot rewire pointers normally. The classic trick is to copy the next node\'s value into the current node and delete the next node instead. This fails for the tail node.',
                example: 'Given pointer to node 3 in 1->2->3->4->5. Copy 4 into node 3: 1->2->4->4->5. Delete second 4: 1->2->4->5.'
            },
            {
                title: 'Doubly Linked List Middle from Ends',
                difficulty: 'Easy',
                description: 'Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.',
                whyDifferent: 'Instead of the slow/fast single-direction approach, you walk inward from head and tail. When pointers meet or cross, you have found the middle. This is a completely different traversal pattern.',
                example: 'Doubly linked: 1<->2<->3<->4<->5. Left starts at 1, right at 5. Step 1: left=2, right=4. Step 2: left=3, right=3. Meet at 3.'
            },
            {
                title: 'Streaming Middle (Unknown Length)',
                difficulty: 'Hard',
                description: 'Elements arrive one at a time and you must report the current middle after each insertion. Maintain the ability to return the middle in O(1) at any point.',
                whyDifferent: 'You need to maintain a persistent middle pointer that updates incrementally with each insertion. When the count goes from odd to even or vice versa, the middle pointer may or may not advance. This is a state-machine problem rather than a traversal problem.',
                example: 'Insert 1: middle=1. Insert 2: middle=2. Insert 3: middle=2. Insert 4: middle=3. Insert 5: middle=3.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node'] = problem;

})();
