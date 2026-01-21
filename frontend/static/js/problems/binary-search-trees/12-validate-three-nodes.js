/**
 * Validate Three Nodes
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-validation-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Validate Three Nodes',
        difficulty: 'Hard',
        algorithm: 'bst-validation-nodes',
        description: 'You\'re given three nodes that are contained in the same Binary Search Tree: nodeOne, nodeTwo, and nodeThree. Write a function that returns a boolean representing whether one of nodeOne or nodeThree is an ancestor of nodeTwo and the other node is a descendant of nodeTwo. For example, if your function determines that nodeOne is an ancestor of nodeTwo, then it needs to see if nodeThree is a descendant of nodeTwo. If your function determines that nodeThree is an ancestor of nodeTwo, then it needs to',
        complexity: {
            time: 'O(h)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": [
                5,
                2,
                7,
                1,
                4,
                6,
                8,
                0,
                null,
                3
        ],
        "nodeOne": 5,
        "nodeTwo": 2,
        "nodeThree": 3
},
        output: true,
        explanation: 'Processing the input data produces the output. For input tree=[5, 2, ..., 3] (length 10), nodeOne=5, nodeTwo=2, nodeThree=3, the result is true.'
    },
    {
        input: {
        "tree": [
                5,
                2,
                7,
                1,
                4,
                6,
                8,
                0,
                null,
                3
        ],
        "nodeOne": 5,
        "nodeTwo": 3,
        "nodeThree": 2
},
        output: false,
        explanation: 'Processing the input data produces the output. For input tree=[5, 2, ..., 3] (length 10), nodeOne=5, nodeTwo=3, nodeThree=2, the result is false.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes'] = problem;

})();
