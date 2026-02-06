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
        twists: [
            {
                title: 'Common Ancestor in a DAG (Not a Tree)',
                difficulty: 'Hard',
                description: 'Find the lowest common ancestor when the structure is a DAG (directed acyclic graph) instead of a tree. A node can have multiple parents.',
                whyDifferent: 'In a tree, each node has exactly one parent, so climbing toward the root is straightforward. In a DAG, nodes can have multiple parents, creating multiple paths to the root and requiring BFS/DFS to find all ancestors before intersecting.',
                example: 'DAG: A->C, B->C, A->D, B->D. LCA of C and D could be both A and B. The "lowest" is whichever is deepest.'
            },
            {
                title: 'LCA with Binary Lifting Preprocessing',
                difficulty: 'Hard',
                description: 'Preprocess the tree to answer multiple LCA queries in O(log N) time each, using binary lifting (sparse table on ancestors).',
                whyDifferent: 'The naive approach walks up from both nodes, which is O(D) per query. Binary lifting requires O(N log N) preprocessing but answers each query in O(log N), essential for handling thousands of queries efficiently.',
                example: 'Tree with 100K nodes, 100K queries. Naive: 100K * 100K = 10^10 operations. Binary lifting: 100K * 17 = 1.7M operations.'
            },
            {
                title: 'LCA in an Undirected Graph',
                difficulty: 'Hard',
                description: 'Given an undirected graph (not a tree) and a chosen root, find the LCA of two nodes. The graph may contain cycles.',
                whyDifferent: 'Must first build a BFS/DFS spanning tree from the root, then find LCA on that tree. The choice of spanning tree affects which node is the LCA, adding ambiguity not present in tree problems.',
                example: 'Graph: 1-2, 2-3, 3-1, 3-4. Root=1. BFS tree: 1->2, 1->3, 3->4. LCA(2,4) = 1 (through tree edges, ignoring back edge 2-3).'
            },
            {
                title: 'Distance Between Two Nodes via LCA',
                difficulty: 'Medium',
                description: 'Find the distance (number of edges) between two nodes in a tree using LCA. Distance = depth(u) + depth(v) - 2*depth(LCA(u,v)).',
                whyDifferent: 'Combines LCA computation with depth tracking. The formula leveraging LCA is the key insight - without it, you would need to find the actual path between two nodes.',
                example: 'Tree with root A at depth 0. Node E at depth 3, Node F at depth 2, LCA(E,F)=B at depth 1. Distance = 3+2-2*1 = 3.'
            },
            {
                title: 'LCA of Multiple Nodes (Not Just Two)',
                difficulty: 'Medium',
                description: 'Find the LCA of K nodes (not just two). The LCA of multiple nodes is the deepest node that is an ancestor of all K nodes.',
                whyDifferent: 'With two nodes, you compare two paths. With K nodes, you must find the common prefix of K paths, or iteratively compute LCA of pairs: LCA(a,b,c) = LCA(LCA(a,b),c).',
                example: 'Tree: A->B->D, A->B->E, A->C->F. LCA(D,E,F) = A. LCA(D,E) = B, then LCA(B,F) = A.'
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
