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
            { id: '06-find-loop/twist-01-find-loop-length', name: 'Find Loop Length', difficulty: 'Medium' },
            { id: '06-find-loop/twist-02-detect-if-loop-exists', name: 'Detect If Loop Exists', difficulty: 'Easy' },
            { id: '06-find-loop/twist-03-remove-the-loop', name: 'Remove the Loop', difficulty: 'Hard' },
            { id: '06-find-loop/twist-04-find-loop-with-o-n-space', name: 'Find Loop With O(n) Space', difficulty: 'Easy' },
            { id: '06-find-loop/twist-05-find-loop-in-doubly-linked-list', name: 'Find Loop in Doubly Linked List', difficulty: 'Medium' }
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
