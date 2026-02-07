/**
 * Right Smaller Than
 * Category: binary-search-trees
 * Difficulty: Very
 * Algorithm: bst-augmented
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Smaller Than',
        difficulty: 'Very',
        algorithm: 'bst-augmented',
        description: 'Write a function that takes in an array of integers and returns an array of the same length, where each element in the output array corresponds to the number of integers in the input array that are to the right of the relevant index and that are strictly smaller than the integer at that index. In other words, for each index i, find the count of elements array[j] where j > i and array[j] < array[i].',
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(n log n) average, O(n^2) worst time with O(n) space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

        complexity: {
            time: 'O(n log n) average, O(n^2) worst',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "array": [
                8,
                5,
                11,
                -1,
                3,
                4,
                2
        ]
},
        output: [5, 4, 4, 0, 1, 1, 0],
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    },
    {
        input: {
        "array": [
                1,
                2,
                3,
                4,
                5
        ]
},
        output: [0, 0, 0, 0, 0],
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '09-right-smaller-than/twist-01-right-greater-than', name: 'Right Greater Than', difficulty: 'Hard' },
            { id: '09-right-smaller-than/twist-02-right-smaller-than-with-duplicates', name: 'Right Smaller Than with Duplicates', difficulty: 'Hard' },
            { id: '09-right-smaller-than/twist-03-left-larger-than', name: 'Left Larger Than', difficulty: 'Hard' },
            { id: '09-right-smaller-than/twist-04-right-smaller-using-merge-sort', name: 'Right Smaller Using Merge Sort', difficulty: 'Very Hard' },
            { id: '09-right-smaller-than/twist-05-range-count-to-the-right', name: 'Range Count to the Right', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than'] = problem;

})();
