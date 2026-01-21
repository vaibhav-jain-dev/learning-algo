/**
 * Serialize and Deserialize BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Serialize and Deserialize BST',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        description: 'Design an algorithm to serialize and deserialize a **binary search tree**. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a BST can be serialized to a string and this string can be deserialized to the original tree structure. **The encoded string should be as compact as possible.**',
        complexity: {
            time: 'O(n) for both serialize and deserialize',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "tree": [
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ]
},
        output: "5,3,2,4,7,6,8",
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), the result is 5,3,2,4,7,6,8.'
    },
    {
        input: {
        "tree": [
                2,
                1,
                3
        ]
},
        output: "2,1,3",
        explanation: 'Processing the input data produces the output. For input tree=[2, 1, 3], the result is 2,1,3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/03-serialize-deserialize-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/03-serialize-deserialize-bst'] = problem;

})();
