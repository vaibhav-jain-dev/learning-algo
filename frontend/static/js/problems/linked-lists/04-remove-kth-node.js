/**
 * Remove Kth Node From End
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Kth Node From End',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        description: 'Write a function that takes in the head of a singly linked list and an integer k, and removes the kth node from the end of the list. The removal should be done in place, meaning that the original data structure should be mutated. The function doesn\'t need to return anything. Each LinkedList node has an integer value and a next node pointer. You can assume that the input linked list will always have at least two nodes and, more specifically, at least k nodes.',
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
                5,
                6,
                7,
                8,
                9
        ],
        "k": 4
},
        output: [0, 1, 2, 3, 4, 5, 7, 8, 9],
        explanation: 'Processing the input data produces the output. For input list=[0, 1, ..., 9] (length 10), k=4, the result is [0, ..., 9] (length 9).'
    },
    {
        input: {
        "list": [
                1,
                2,
                3
        ],
        "k": 3
},
        output: [2, 3],
        explanation: 'Processing the input data produces the output. For input list=[1, 2, 3], k=3, the result is [2, 3].'
    }
        ],
        twists: [
            { title: 'Remove Kth Node From Beginning', difficulty: 'Easy', description: 'Remove the kth node from the beginning of the list instead of from the end. Do this in a single pass without knowing the length.', whyDifferent: 'Simplifies the two-pointer approach since you do not need the gap technique; just traverse k-1 nodes. But consider edge cases when k=1 (removing the head).', example: 'list=[0,1,2,3,4,5], k=2: remove the 2nd node from start (value 1), result=[0,2,3,4,5].' },
            { title: 'Remove All Kth Nodes From End', difficulty: 'Medium', description: 'Remove the kth node, the 2kth node, the 3kth node, etc., all counted from the end of the list.', whyDifferent: 'Requires either knowing the full length to compute all positions, or multiple passes. The single two-pointer trick no longer suffices for multiple removals.', example: 'list=[1,2,3,4,5,6,7,8], k=2: remove 2nd from end (7), 4th from end (5), 6th from end (3), 8th from end (1). Result=[2,4,6,8].' },
            { title: 'Remove Kth Node in Doubly Linked List', difficulty: 'Medium', description: 'Remove the kth node from the end in a doubly linked list. You have access to both head and tail.', whyDifferent: 'Having a tail pointer and prev pointers lets you traverse backward from the tail, turning this into a simple k-step traversal from the end rather than a two-pointer problem.', example: 'list=[0,1,2,3,4], k=2: start from tail (4), go back 2 to node 3. Remove it. Result=[0,1,2,4].' },
            { title: 'Return the Removed Node Value', difficulty: 'Easy', description: 'Remove the kth node from the end and return its value, not the modified list head.', whyDifferent: 'Requires capturing the value before removal. The two-pointer technique remains the same, but you must track the target node to extract its value.', example: 'list=[0,1,2,3,4,5,6,7,8,9], k=4: remove node with value 6, return 6.' },
            { title: 'Remove Kth From End in Circular List', difficulty: 'Hard', description: 'The linked list is circular (tail points back to head). Remove the kth node from the end, where "end" is defined as the node just before the head in the cycle.', whyDifferent: 'The circular structure means there is no null terminator. You must detect the cycle boundary and define what "from the end" means, using the list length modulo to find the position.', example: 'circular list=[0,1,2,3,4]->(back to 0), k=2: "end" is node 4, kth from end is node 3. Remove it.' }
        ],
        similar: [
    { id: '04-remove-kth-node/01-remove-nodes-greater-right', name: 'Remove Nodes With Greater Value on Right', difficulty: 'Medium' },
    { id: '04-remove-kth-node/02-delete-middle-node', name: 'Delete the Middle Node of a Linked List', difficulty: 'Medium' },
    { id: '04-remove-kth-node/03-swapping-nodes', name: 'Swapping Nodes in a Linked List', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node'] = problem;

})();
