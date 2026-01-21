/**
 * Youngest Common Ancestor
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Youngest Common Ancestor',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        description: 'You\'re given three inputs, all of which are instances of an AncestralTree class that have an ancestor property pointing to their youngest ancestor. The first input is the top ancestor in an ancestral tree (i.e., the only instance that doesn\'t have an ancestor), and the other two inputs are descendants in the ancestral tree. Write a function that returns the youngest common ancestor to the two descendants. Note: A descendant is considered its own ancestor.',
        complexity: {
            time: 'O(D)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "tree": "A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G",
        "descendant1": "E",
        "descendant2": "I"
},
        output: "B",
        explanation: 'Exploring the graph structure, we find the required path or value. For input tree=A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G, descendant1=E, descendant2=I, the result is B.'
    },
    {
        input: {
        "tree": "A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G",
        "descendant1": "H",
        "descendant2": "G"
},
        output: "A",
        explanation: 'Exploring the graph structure, we find the required path or value. For input tree=A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G, descendant1=H, descendant2=G, the result is A.'
    }
        ],
        similar: [
    { id: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree', name: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'Medium' },
    { id: '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node', name: 'Kth Ancestor of a Tree Node', difficulty: 'Hard' },
    { id: '04-youngest-common-ancestor/03-ancestors-in-dag', name: 'All Ancestors of a Node in a DAG', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor'] = problem;

})();
