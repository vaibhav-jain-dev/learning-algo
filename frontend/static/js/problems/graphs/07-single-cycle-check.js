/**
 * Single Cycle Check
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-single-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Single Cycle Check',
        difficulty: 'Medium',
        algorithm: 'graph-single-cycle',
        description: 'You\'re given an array of integers where each integer represents a jump of its value in the array. For instance, the integer 2 represents a jump of two indices forward, and -3 represents a jump of three indices backward. If a jump spills past the array\'s bounds, it wraps over to the other side. For instance, a jump of -1 at index 0 brings us to the last index in the array. Similarly, a jump of 1 at the last index brings us to index 0. Write a function that returns a boolean representing whether t',
        complexity: {
            time: 'O(N)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                2,
                3,
                1,
                -4,
                -4,
                2
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input array=[2, 3, ..., 2] (length 6), the result is true.'
    },
    {
        input: {
        "array": [
                2,
                2,
                -1
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input array=[2, 2, -1], the result is true.'
    },
    {
        input: {
        "array": [
                1,
                1,
                1,
                1,
                2
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input array=[1, 1, 1, 1, 2], the result is false.'
    }
        ],
        twists: [
            { title: 'Multiple Cycles Check', difficulty: 'Medium', description: 'Instead of checking for a single cycle visiting all elements, check if the array contains exactly K disjoint cycles that together cover all elements.', whyDifferent: 'You must track visited elements across multiple cycle traversals and count distinct cycles, rather than checking if one cycle covers everything.', example: 'Array [1,-1,1,-1]. Two cycles: indices 0->1->0 and 2->3->2. K=2 returns true.' },
            { title: 'Cycle Length', difficulty: 'Easy', description: 'Assuming a single cycle exists, return the length of the cycle. If no single cycle exists, return -1.', whyDifferent: 'You already traverse the array. The twist is to count steps and verify the count equals the array length, making the validation explicit.', example: 'Array [2,3,1,-4,-4,2]. Cycle visits all 6 elements. Answer: 6.' },
            { title: 'Bidirectional Jumps', difficulty: 'Hard', description: 'At each index, you can choose to jump forward OR backward by the absolute value of the element. Check if a single cycle is possible with optimal choices.', whyDifferent: 'Each position offers two choices, turning the problem into a graph search. You must explore all possible paths, not follow a deterministic sequence.', example: 'Array [2,1,3]. From index 0, jump +2 to index 2 or -2 to index 1. Find if any choice sequence creates a single cycle.' },
            { title: 'Minimum Modifications', difficulty: 'Very Hard', description: 'The array does not form a single cycle. Find the minimum number of element changes to make it a single cycle.', whyDifferent: 'This is a permutation cycle decomposition problem. You need to merge multiple cycles into one, which requires understanding cycle structure in permutations.', example: 'Array [1,-1,1,-1] has 2 cycles. Change one element to merge them into a single cycle. Answer: 1.' },
            { title: 'Single Cycle with Visited Order', difficulty: 'Medium', description: 'If the array forms a single cycle, return the order in which indices are visited starting from index 0.', whyDifferent: 'Instead of a boolean check, you collect the traversal sequence. You must store and return the visitation order while still verifying the cycle property.', example: 'Array [2,3,1,-4,-4,2]. Visit order: [0, 2, 3, 5, 1, 4]. Returns this sequence.' }
        ],
        similar: [
    { id: '07-single-cycle-check/01-linked-list-cycle', name: 'Linked List Cycle', difficulty: 'Easy' },
    { id: '07-single-cycle-check/02-find-duplicate-number', name: 'Find Duplicate Number', difficulty: 'Medium' },
    { id: '07-single-cycle-check/03-circular-array-loop', name: 'Circular Array Loop', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check'] = problem;

})();
