/**
 * Merge Linked Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-merge
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Linked Lists',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        description: 'Write a function that takes in the heads of two Singly Linked Lists that are in sorted order, respectively. The function should merge the lists in place (i.e., it shouldn\'t create a brand new list) and return the head of the merged list; the merged list should be in sorted order. Each LinkedList node has an integer value as well as a next node pointing to the next node in the list or to None/null if it\'s the tail of the list.',
        complexity: {
            time: 'O(n+m)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "list1": [
                2,
                6,
                7,
                8
        ],
        "list2": [
                1,
                3,
                4,
                5,
                9,
                10
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        explanation: 'Processing the input data produces the output. For input list1=[2, 6, 7, 8], list2=[1, 3, ..., 10] (length 6), the result is [1, ..., 10] (length 10).'
    },
    {
        input: {
        "list1": [
                1,
                2,
                3
        ],
        "list2": [
                4,
                5,
                6
        ]
},
        output: [1, 2, 3, 4, 5, 6],
        explanation: 'Processing the input data produces the output. For input list1=[1, 2, 3], list2=[4, 5, 6], the result is [1, ..., 6] (length 6).'
    },
    {
        input: {
        "list1": [
                5
        ],
        "list2": [
                1,
                2,
                3
        ]
},
        output: [1, 2, 3, 5],
        explanation: 'Processing the input data produces the output. For input list1=[5], list2=[1, 2, 3], the result is [1, 2, 3, 5].'
    }
        ],
        twists: [
            { title: 'Merge K Sorted Lists', difficulty: 'Hard', description: 'Merge k sorted linked lists into one sorted linked list, not just two.', whyDifferent: 'With k lists, pairwise merging is O(nk). Using a min-heap to track the smallest head across all lists reduces to O(n log k), requiring a fundamentally different data structure.', example: 'lists=[[1,4,5],[1,3,4],[2,6]]: merge all into [1,1,2,3,4,4,5,6].' },
            { title: 'Merge Two Unsorted Lists Into Sorted', difficulty: 'Medium', description: 'Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.', whyDifferent: 'Cannot use the merge step directly since inputs are unsorted. Must either sort each list first (merge sort on linked lists) or collect all values and sort.', example: 'list1=[3,1,4], list2=[2,5,0]: sorted merge result=[0,1,2,3,4,5].' },
            { title: 'Merge by Alternating Nodes', difficulty: 'Medium', description: 'Merge two lists by alternating nodes: take one from list1, then one from list2, then one from list1, etc. Append remaining nodes at the end.', whyDifferent: 'Ignores sorted order entirely. The merge pattern is round-robin rather than comparison-based, requiring simple alternating pointer reassignment.', example: 'list1=[1,3,5], list2=[2,4,6,8]: result=[1,2,3,4,5,6,8].' },
            { title: 'Merge In Descending Order', difficulty: 'Medium', description: 'Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.', whyDifferent: 'Building the result in reverse order means prepending each chosen node to the result head, flipping the construction direction from typical merge.', example: 'list1=[1,3,5], list2=[2,4,6]: merge descending result=[6,5,4,3,2,1]. Build by prepending the larger element each time.' },
            { title: 'Intersection of Sorted Lists', difficulty: 'Medium', description: 'Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.', whyDifferent: 'Instead of including all elements, you only include matches. The two-pointer technique advances the smaller pointer until values match, then captures the common element.', example: 'list1=[1,2,3,4,6], list2=[2,4,6,8]: intersection=[2,4,6].' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists'] = problem;

})();
