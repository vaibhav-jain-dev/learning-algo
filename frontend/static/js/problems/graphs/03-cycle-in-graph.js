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
        twists: [
            {
                title: 'Cycle Detection in an Undirected Graph',
                difficulty: 'Medium',
                description: 'Detect whether an undirected graph contains a cycle. The three-color approach for directed graphs needs modification since every edge appears twice.',
                whyDifferent: 'In undirected graphs, a visited neighbor is not always a back edge - it might be the parent you just came from. You must track the parent node to avoid false positives, or use Union-Find instead.',
                example: 'Edges: 1-2, 2-3, 3-1. Cycle exists: 1->2->3->1. But edges: 1-2, 2-3: visiting 1 from 2 is not a cycle (1 is parent).'
            },
            {
                title: 'Find the Actual Cycle Path',
                difficulty: 'Hard',
                description: 'Not only detect whether a cycle exists, but return the actual nodes forming the cycle in order.',
                whyDifferent: 'Detection alone just needs a boolean flag. Extracting the cycle path requires backtracking from the point where the back edge is detected to the ancestor node, reconstructing the cycle from the DFS stack.',
                example: 'Edges: [[1,3],[2,3,4],[0],[],[2,5],[]]. Cycle: [0,1,2,0]. Must trace back from the gray node encounter to build the path.'
            },
            {
                title: 'Detect Cycle of Specific Length',
                difficulty: 'Hard',
                description: 'Determine if the graph contains a cycle of exactly length K. A general cycle detection is not sufficient.',
                whyDifferent: 'Standard DFS cycle detection finds any cycle. Finding a cycle of specific length requires tracking path lengths and potentially exploring all cycles, which is much more computationally expensive.',
                example: 'Graph with cycles of length 3 and 5. Query K=3: true. Query K=4: false. Cannot just find "a cycle" - must verify its length.'
            },
            {
                title: 'Cycle Detection Using BFS (Kahn\'s Algorithm)',
                difficulty: 'Medium',
                description: 'Detect cycles using BFS-based topological sort (Kahn\'s algorithm). If the topological sort does not include all nodes, a cycle exists.',
                whyDifferent: 'Completely different approach: instead of DFS coloring, you process nodes with zero in-degree. This is iterative and avoids recursion, making it conceptually different from the standard DFS approach.',
                example: 'Graph: 0->1, 1->2, 2->0. In-degrees: [1,1,1]. No node has in-degree 0, so topo sort is empty. Since 3 nodes remain, cycle exists.'
            },
            {
                title: 'Count the Number of Distinct Cycles',
                difficulty: 'Very Hard',
                description: 'Count how many distinct cycles exist in the directed graph. Two cycles are distinct if they contain different sets of edges.',
                whyDifferent: 'A single DFS can detect one cycle, but counting all distinct cycles requires finding all back edges and understanding how they form independent cycles. This relates to the cycle space of the graph.',
                example: 'Graph: 0->1->2->0 and 1->3->1. Two distinct cycles: [0,1,2] and [1,3]. A single DFS detection would stop at the first one found.'
            }
        ],
        similar: [
    { id: '03-cycle-in-graph/03-cycle-in-graph/01-course-schedule', name: 'Course Schedule', difficulty: 'Medium' },
    { id: '03-cycle-in-graph/03-cycle-in-graph/02-redundant-connection', name: 'Redundant Connection', difficulty: 'Medium' },
    { id: '03-cycle-in-graph/03-find-eventual-safe-states', name: 'Find Eventual Safe States', difficulty: 'Medium' }
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
