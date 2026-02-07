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
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(D) time with O(1) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

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
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "tree": "A-B-D-H,A-B-D-I,A-B-E,A-C-F,A-C-G",
        "descendant1": "H",
        "descendant2": "G"
},
        output: "A",
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '04-youngest-common-ancestor/twist-01-common-ancestor-in-a-dag-not-a-tree', name: 'Common Ancestor in a DAG (Not a Tree)', difficulty: 'Hard' },
            { id: '04-youngest-common-ancestor/twist-02-lca-with-binary-lifting-preprocessing', name: 'LCA with Binary Lifting Preprocessing', difficulty: 'Hard' },
            { id: '04-youngest-common-ancestor/twist-03-lca-in-an-undirected-graph', name: 'LCA in an Undirected Graph', difficulty: 'Hard' },
            { id: '04-youngest-common-ancestor/twist-04-distance-between-two-nodes-via-lca', name: 'Distance Between Two Nodes via LCA', difficulty: 'Medium' },
            { id: '04-youngest-common-ancestor/twist-05-lca-of-multiple-nodes-not-just-two', name: 'LCA of Multiple Nodes (Not Just Two)', difficulty: 'Medium' }
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
