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
        similar: [
    { id: '01-course-schedule', name: 'Course Schedule', difficulty: 'Medium' },
    { id: '02-alien-dictionary', name: 'Alien Dictionary', difficulty: 'Hard' },
    { id: '03-parallel-courses', name: 'Parallel Courses', difficulty: 'Medium' }
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
