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
        description: 'You\'re given three nodes that are contained in the same Binary Search Tree: nodeOne, nodeTwo, and nodeThree. Write a function that returns a boolean representing whether one of nodeOne or nodeThree is an ancestor of nodeTwo and the other node is a descendant of nodeTwo. For example, if your function determines that nodeOne is an ancestor of nodeTwo, then it needs to see if nodeThree is a descendant of nodeTwo. If your function determines that nodeThree is an ancestor of nodeTwo, then it needs to.',
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(h) time with O(1) space.',
        hints: [
            'The BST property means left < root < right. Use this to guide your search direction.',
            'Think about which traversal order (inorder, preorder, postorder) best suits this problem.',
            'Consider how the height of the tree affects your algorithm\'s complexity.',
            'For balanced BSTs, operations are O(log n). What happens with skewed trees?'
        ],

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
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        twists: [
            { id: '12-validate-three-nodes/twist-01-validate-k-nodes-chain', name: 'Validate K Nodes Chain', difficulty: 'Hard' },
            { id: '12-validate-three-nodes/twist-02-validate-three-nodes-without-bst-property', name: 'Validate Three Nodes Without BST Property', difficulty: 'Hard' },
            { id: '12-validate-three-nodes/twist-03-find-the-middle-node', name: 'Find the Middle Node', difficulty: 'Medium' },
            { id: '12-validate-three-nodes/twist-04-validate-three-nodes-with-parent-pointers', name: 'Validate Three Nodes with Parent Pointers', difficulty: 'Medium' },
            { id: '12-validate-three-nodes/twist-05-all-valid-three-node-triples', name: 'All Valid Three-Node Triples', difficulty: 'Very Hard' }
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
