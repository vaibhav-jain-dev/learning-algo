/**
 * Ways To Traverse Graph
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-graph-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Ways To Traverse Graph',
        difficulty: 'Medium',
        algorithm: 'dp-graph-traversal',
        description: 'You\'re given two positive integers representing the width and height of a grid-shaped, rectangular graph. Write a function that returns the number of ways to reach the bottom-right corner of the graph when starting at the top-left corner. Each move you take must either go down or right. In other words, you can never move up or left in the graph. For example, given a graph of width 2 and height 3, there are 3 ways to reach the bottom-right corner: 1. Down, Down, Right 2. Down, Right, Down 3. Righ',
        complexity: {
            time: 'O(width * height)',
            space: 'O(width * height)'
        },
        examples: [
    {
        input: {
        "width": 4,
        "height": 3
},
        output: 10,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input width=4, height=3, the result is 10.'
    },
    {
        input: {
        "width": 2,
        "height": 2
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input width=2, height=2, the result is 2.'
    },
    {
        input: {
        "width": 3,
        "height": 3
},
        output: 6,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input width=3, height=3, the result is 6.'
    },
    {
        input: {
        "width": 1,
        "height": 5
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input width=1, height=5, the result is 1.'
    }
        ],
        twists: [
            { id: '16-ways-to-traverse-graph/twist-01-graph-with-obstacles', title: 'Graph With Obstacles', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-02-minimum-cost-path', title: 'Minimum Cost Path', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-03-count-paths-with-diagonal-moves', title: 'Count Paths With Diagonal Moves', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-04-count-paths-modulo-m', title: 'Count Paths Modulo M', difficulty: 'Medium' },
            { id: '16-ways-to-traverse-graph/twist-05-paths-through-mandatory-waypoint', title: 'Paths Through Mandatory Waypoint', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph'] = problem;

})();
