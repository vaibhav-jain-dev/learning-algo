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
        twists: [
            {
                title: 'Validate K Nodes Chain',
                difficulty: 'Hard',
                description: 'Given k nodes in a BST, determine if they form a valid ancestor-descendant chain (each node is an ancestor of the next one in the given order).',
                whyDifferent: 'With three nodes, you only check two relationships. With k nodes, you must verify a chain of ancestor-descendant links efficiently, potentially using LCA (Lowest Common Ancestor) queries or path tracing.',
                example: 'BST [5, 2, 7, 1, 4, 6, 8]. Nodes [5, 2, 4] form a valid chain: 5 is ancestor of 2, and 2 is ancestor of 4. Nodes [5, 7, 4] do not.'
            },
            {
                title: 'Validate Three Nodes Without BST Property',
                difficulty: 'Hard',
                description: 'Given a generic binary tree (not a BST), determine if nodeOne or nodeThree is an ancestor of nodeTwo and the other is a descendant.',
                whyDifferent: 'In a BST, you can navigate from any node to another using value comparisons in O(h) time. In a generic tree, you must traverse subtrees to find nodes, making the problem O(n) and requiring different search strategies.',
                example: 'Binary tree [1, 2, 3, 4, 5, 6, 7]. nodeOne=1, nodeTwo=2, nodeThree=5. Node 1 is ancestor of 2, and 5 is descendant of 2. Returns true.'
            },
            {
                title: 'Find the Middle Node',
                difficulty: 'Medium',
                description: 'Given three nodes in a BST, determine which one is the "middle" node (ancestor of one and descendant of the other). Return null if no such arrangement exists.',
                whyDifferent: 'Instead of validating a given arrangement, you must discover it. You need to test all three possible assignments of which node is the middle, requiring a more exploratory approach.',
                example: 'BST [5, 2, 7, 1, 4, 6, 8]. Given nodes 5, 2, 4: node 2 is the middle (descendant of 5, ancestor of 4). Return 2.'
            },
            {
                title: 'Validate Three Nodes with Parent Pointers',
                difficulty: 'Medium',
                description: 'Solve the same problem but each node has a parent pointer. Use this to achieve O(h) time and O(1) space without traversing from root.',
                whyDifferent: 'Parent pointers enable upward traversal. Instead of going down from nodes, you can walk up from nodeTwo to check if you reach nodeOne or nodeThree, then walk down to verify the other direction. The traversal strategy fundamentally changes.',
                example: 'Starting from nodeTwo=2, walk up: 2 -> 5 (found nodeOne). Then from nodeTwo=2, walk down: 2 -> 4 (found nodeThree as descendant). Return true with O(1) extra space.'
            },
            {
                title: 'All Valid Three-Node Triples',
                difficulty: 'Very Hard',
                description: 'Count all triples (a, b, c) of distinct nodes in the BST such that a is an ancestor of b and b is an ancestor of c.',
                whyDifferent: 'Instead of validating one triple, you count all valid ones. For each node b, you need the count of its ancestors and the count of its descendants. The total is the sum of ancestors(b) * descendants(b) for all b.',
                example: 'BST [5, 2, 7, 1, 4]. Node 2 has 1 ancestor (5) and 2 descendants (1, 4), contributing 1*2=2 triples. Total across all nodes gives the answer.'
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
