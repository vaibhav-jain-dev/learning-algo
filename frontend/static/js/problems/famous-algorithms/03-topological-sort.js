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
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input n=6, edges=[[5, 2], [5, 0], ..., [3, 1]] (length 6), the result is [5, ..., 0] (length 6).'
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
        explanation: 'After sorting the input, we can apply an efficient algorithm to find the result. For input n=2, edges=[[1, 0], [0, 1]], the result is [].'
    }
        ],
        twists: [
            { title: 'All Topological Orderings', difficulty: 'Hard', description: 'Instead of finding one valid topological ordering, enumerate all possible valid topological orderings of the DAG.', whyDifferent: 'Requires backtracking through all possible choices of zero in-degree nodes at each step, exploring every branch of the decision tree.', example: 'For edges [[0,1],[0,2]], valid orderings are [0,1,2] and [0,2,1]. Return both instead of just one.' },
            { title: 'Detect All Cycles', difficulty: 'Hard', description: 'If the graph contains cycles, identify and return all nodes that participate in at least one cycle.', whyDifferent: 'Goes beyond simple cycle detection to cycle characterization, requiring SCC (Strongly Connected Components) or iterative peeling of zero in-degree nodes.', example: 'For edges [[0,1],[1,2],[2,0],[2,3]], nodes 0,1,2 are in a cycle but node 3 is not. Return [0,1,2].' },
            { title: 'Lexicographically Smallest Order', difficulty: 'Medium', description: 'Find the lexicographically smallest topological ordering of the DAG.', whyDifferent: 'Replaces a regular queue with a min-heap/priority queue to always process the smallest available node first among those with zero in-degree.', example: 'For nodes {0,1,2,3} with edges [[3,0],[3,1]], the lex smallest order is [2,3,0,1] since 2 has no prerequisites and is smallest.' },
            { title: 'DFS-Based Topological Sort', difficulty: 'Medium', description: 'Implement topological sort using DFS with post-order reversal instead of the BFS Kahn approach.', whyDifferent: 'Uses a completely different algorithmic paradigm -- DFS finishes nodes in reverse topological order, requiring a stack to collect the reversed result.', example: 'Run DFS, push nodes to stack after all descendants are processed, then pop the stack for the topological order.' },
            { title: 'Longest Path in DAG', difficulty: 'Hard', description: 'Using topological sort, find the length of the longest path in the DAG (critical path).', whyDifferent: 'Leverages topological order as a preprocessing step for a DP problem, computing maximum distances instead of just ordering.', example: 'For edges [[0,1],[0,2],[1,3],[2,3]], the longest path is 0->1->3 or 0->2->3, length 2.' }
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
