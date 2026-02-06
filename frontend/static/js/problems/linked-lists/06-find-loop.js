/**
 * Find Loop
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-find-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Loop',
        difficulty: 'Hard',
        algorithm: 'll-find-loop',
        description: 'Write a function that takes in the head of a Singly Linked List that contains a loop (i.e., the list\'s tail node points to some node in the list instead of None/null). The function should return the node (the actual node, not just its value) from which the loop originates in constant space. Each LinkedList node has an integer value as well as a next node pointing to the next node in the list.',
        problem: 'Use Floyd\'s Tortoise and Hare algorithm. Phase 1: slow moves 1 step, fast moves 2 steps until they meet inside the loop. Phase 2: reset slow to head, keep fast at meeting point, both move 1 step at a time. They meet at the loop start. This works because the distance from head to loop start equals the distance from meeting point to loop start (going around the loop).',
        hints: [
            'A hash set could solve this in O(n) space, but can you do it in O(1) space?',
            'Floyd\'s algorithm: use slow (1 step) and fast (2 step) pointers. They will meet inside the loop.',
            'After they meet, the meeting point is a specific distance from the loop start.',
            'Mathematical insight: reset one pointer to head, move both at speed 1. They meet at loop start.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list": [0, 1, 2, 3, 4, 5, 6],
        "loopStart": 3
        },
        output: 3,
        explanation: 'List: 0→1→2→3→4→5→6→(back to 3). Phase 1: slow and fast meet somewhere in the 3-4-5-6 loop. Phase 2: reset slow to head (0), both move 1 step. They meet at node 3, the loop origin.'
    },
    {
        input: {
        "list": [1, 2, 3, 4],
        "loopStart": 1
        },
        output: 1,
        explanation: 'List: 1→2→3→4→(back to 2, node with value 1). Wait, loopStart=1 means index 1, which is node with value 2. Phase 1 finds meeting point in loop. Phase 2 finds node at index 1.'
    },
    {
        input: {
        "list": [5, 6, 7],
        "loopStart": 6
        },
        output: 6,
        explanation: 'Small list with loop starting at node with value 6 (index 1). Tail (7) points back to node 6. Floyd\'s algorithm finds the loop start at node 6.'
    }
        ],
        twists: [
            { title: 'Find Loop Length', difficulty: 'Medium', description: 'Instead of finding where the loop starts, find the length of the loop (number of nodes in the cycle).', whyDifferent: 'After the slow and fast pointers meet, you keep one pointer fixed and advance the other, counting steps until they meet again. The meeting-point detection is the same but the post-processing differs.', example: 'list=[0,1,2,3,4,5,6]->(back to 3): loop is 3->4->5->6->3, length=4.' },
            { title: 'Detect If Loop Exists', difficulty: 'Easy', description: 'Simply determine whether the linked list contains a cycle or not. Return true/false without finding the loop start.', whyDifferent: 'Simplifies the problem by removing Phase 2 entirely. You only need Floyd Phase 1: if slow and fast meet, there is a cycle; if fast reaches null, there is not.', example: 'list=[1,2,3,4]->null: no loop, return false. list=[1,2,3,4]->(back to 2): has loop, return true.' },
            { title: 'Remove the Loop', difficulty: 'Hard', description: 'Find the loop and then break it by setting the tail node\'s next pointer to null, converting the list back to a standard singly linked list.', whyDifferent: 'After finding the loop start, you must also find the node that points back to the loop start (the loop tail) and set its next to null. Requires tracking one step behind.', example: 'list=[0,1,2,3,4,5,6]->(back to 3): find that node 6 points to 3, set 6.next=null. Result: [0,1,2,3,4,5,6]->null.' },
            { title: 'Find Loop With O(n) Space', difficulty: 'Easy', description: 'Find the loop origin using a hash set to store visited nodes instead of Floyd\'s algorithm.', whyDifferent: 'Trading space for simplicity. The hash set approach is straightforward (first repeated node is loop start) but uses O(n) space. Useful to understand why Floyd\'s O(1) space approach is preferred.', example: 'list=[0,1,2,3,4,5,6]->(back to 3): hash set sees 3 twice, returns node 3.' },
            { title: 'Find Loop in Doubly Linked List', difficulty: 'Medium', description: 'The list is doubly linked (each node has both next and prev). Detect if there is a cycle in the next pointers and find its origin.', whyDifferent: 'The prev pointers can create inconsistencies: if node A.next = B but B.prev != A, there may be structural corruption. Floyd\'s algorithm still works on next pointers, but prev adds diagnostic possibilities.', example: 'Doubly linked list where last node\'s next points back to an earlier node: Floyd\'s works the same on next pointers, but you can also verify prev consistency.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop'] = problem;

})();
