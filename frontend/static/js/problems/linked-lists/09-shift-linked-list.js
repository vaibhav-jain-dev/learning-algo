/**
 * Shift Linked List
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-shift
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shift Linked List',
        difficulty: 'Hard',
        algorithm: 'll-shift',
        description: 'Write a function that takes in the head of a Singly Linked List and an integer k, shifts the list in place (i.e., doesn\'t create a brand new list) by k positions, and returns its new head. Shifting a Linked List means moving its nodes forward or backward and wrapping them around the list where appropriate. For example, shifting a Linked List forward by one position would make its tail become the new head of the linked list. - If k is positive, shift the list forward (tail nodes move to head) - I',
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
        ],
        "k": 2
},
        output: [4, 5, 0, 1, 2, 3],
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 5] (length 6), k=2, the result is [4, ..., 3] (length 6).'
    },
    {
        input: {
        "list": [
                0,
                1,
                2,
                3,
                4,
                5
        ],
        "k": -2
},
        output: [2, 3, 4, 5, 0, 1],
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 5] (length 6), k=-2, the result is [2, ..., 1] (length 6).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3
        ],
        "k": 4
},
        output: [3, 1, 2],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3], k=4, the result is [3, 1, 2].'
    }
        ],
        twists: [
            { title: 'Shift by Splitting at Value', difficulty: 'Medium', description: 'Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head. Wrap the preceding nodes to the end.', whyDifferent: 'Position-based shifting becomes value-based searching. You must find the target node first, then perform the rotation at that point.', example: 'list=[0,1,2,3,4,5], target=3: node 3 becomes head. Result=[3,4,5,0,1,2].' },
            { title: 'Shift Doubly Linked List', difficulty: 'Medium', description: 'Shift a doubly linked list by k positions, updating both next and prev pointers for all affected nodes.', whyDifferent: 'The circular reconnection must update prev pointers in addition to next pointers, doubling the pointer manipulation at the join points.', example: 'doubly linked [0,1,2,3,4,5], k=2: result=[4,5,0,1,2,3] with all prev pointers correctly updated.' },
            { title: 'Shift Circular Linked List', difficulty: 'Medium', description: 'The list is already circular. Shift it by k positions and return the new head. The tail already points to the head.', whyDifferent: 'No need to make the list circular first. You just need to find the new head position, which is (length - k % length) steps from current head, and update head reference.', example: 'circular list=[0,1,2,3,4,5]->(back to 0), k=2: new head is node 4. Result starts at 4: [4,5,0,1,2,3].' },
            { title: 'Minimum Shifts to Sort', difficulty: 'Hard', description: 'Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.', whyDifferent: 'Requires finding the rotation point (where the order breaks) and computing the distance to the sorted position, combining search with shift calculation.', example: 'list=[4,5,0,1,2,3]: this is sorted [0,1,2,3,4,5] shifted by 2. Minimum shifts to restore: 2 backward or 4 forward. Answer: 2.' },
            { title: 'Shift Every Kth Node', difficulty: 'Hard', description: 'Instead of shifting the entire list, extract every kth node and move them to the front of the list while maintaining their relative order.', whyDifferent: 'Selective extraction and prepending is fundamentally different from a bulk rotation. You must identify specific nodes, remove them, and build a new prefix.', example: 'list=[1,2,3,4,5,6,7,8], k=3: extract nodes at positions 3,6 (values 3,6). Prepend to front: [3,6,1,2,4,5,7,8].' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list'] = problem;

})();
