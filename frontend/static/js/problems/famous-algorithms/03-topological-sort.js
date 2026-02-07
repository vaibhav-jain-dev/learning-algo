/**
 * DAG Ordering
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'DAG Ordering',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        description: 'Given a Directed Acyclic Graph (DAG) with n vertices and edges, find a topological ordering of the vertices. A topological ordering is a linear ordering of vertices such that for every directed edge (u, v), vertex u comes before v in the ordering. If the graph contains a cycle, return an empty array (no valid topological ordering exists).',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(V + E) time with O(V + E) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "n": 6,
        "edges": [
                [
                        5,
                        2
                ],
                [
                        5,
                        0
                ],
                [
                        4,
                        0
                ],
                [
                        4,
                        1
                ],
                [
                        2,
                        3
                ],
                [
                        3,
                        1
                ]
        ]
},
        output: [5, 4, 2, 3, 1, 0],
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "n": 2,
        "edges": [
                [
                        1,
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: [],
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '03-topological-sort/twist-01-all-topological-orderings', name: 'All Topological Orderings', difficulty: 'Hard' },
            { id: '03-topological-sort/twist-02-detect-all-cycles', name: 'Detect All Cycles', difficulty: 'Hard' },
            { id: '03-topological-sort/twist-03-lexicographically-smallest-order', name: 'Lexicographically Smallest Order', difficulty: 'Medium' },
            { id: '03-topological-sort/twist-04-dfs-based-topological-sort', name: 'DFS-Based Topological Sort', difficulty: 'Medium' },
            { id: '03-topological-sort/twist-05-longest-path-in-dag', name: 'Longest Path in DAG', difficulty: 'Hard' }
        ],
        similar: [
    { id: '03-topological-sort/03-topological-sort/01-course-schedule', name: 'Course Schedule', difficulty: 'Medium' },
    { id: '03-topological-sort/03-topological-sort/02-alien-dictionary', name: 'Alien Dictionary', difficulty: 'Hard' },
    { id: '03-topological-sort/03-parallel-courses', name: 'Parallel Courses', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort'] = problem;

})();
