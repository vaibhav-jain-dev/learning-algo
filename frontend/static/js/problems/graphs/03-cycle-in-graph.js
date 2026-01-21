/**
 * Cycle Detection in Graph
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cycle Detection in Graph',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        description: 'Given a directed graph represented as an adjacency list, write a function that returns a boolean indicating whether the graph contains a cycle. A cycle exists in a graph when you can start at some node and follow a sequence of edges that eventually leads back to the starting node.',
        problem: 'Use DFS with three states: WHITE (unvisited), GRAY (in current path), BLACK (fully explored). A cycle exists if you encounter a GRAY node during DFS (back edge to ancestor in current path). Start DFS from each unvisited node. Mark entering node GRAY, explore neighbors, mark leaving node BLACK.',
        hints: [
            'A simple visited array isn\'t enough - you need to distinguish between "currently exploring" and "done exploring".',
            'Use three colors: white (unvisited), gray (in current DFS path), black (completely processed).',
            'A cycle exists if during DFS you visit a gray node - this means you found a back edge to an ancestor.',
            'After fully exploring a node and its descendants, mark it black. Gray nodes are only those in the current path.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "edges": [[1, 3], [2, 3, 4], [0], [], [2, 5], []]
        },
        output: true,
        explanation: 'Starting DFS from node 0: 0(gray)→1(gray)→2(gray)→0 is already gray! Back edge found, cycle exists: 0→1→2→0.'
    },
    {
        input: {
        "edges": [[1, 2], [2], []]
        },
        output: false,
        explanation: 'DFS from 0: 0(gray)→1(gray)→2(gray)→2(black)→1(black)→0(gray)→2 is black (not gray), continue→0(black). No gray nodes encountered during traversal, no cycle.'
    }
        ],
        similar: [
    { id: '01-course-schedule', name: 'Course Schedule', difficulty: 'Medium' },
    { id: '02-redundant-connection', name: 'Redundant Connection', difficulty: 'Medium' },
    { id: '03-find-eventual-safe-states', name: 'Find Eventual Safe States', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph'] = problem;

})();
