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
            { title: 'Graph With Obstacles', difficulty: 'Medium', description: 'Some cells in the grid are blocked (obstacles). Count the number of ways to reach the bottom-right corner, only moving right or down, while avoiding obstacles.', whyDifferent: 'Obstacles set certain DP cells to zero, disrupting the simple additive pattern. You must check each cell before computing its value.', example: 'width=3, height=3, obstacle at (1,1): some paths are blocked. Instead of 6 total paths, you get fewer.' },
            { title: 'Minimum Cost Path', difficulty: 'Medium', description: 'Each cell has a cost. Find the path from top-left to bottom-right (moving only right or down) with the minimum total cost.', whyDifferent: 'Changes from counting paths to optimizing cost. The DP recurrence uses min instead of sum, and cell values are accumulated rather than counted.', example: 'grid=[[1,3,1],[1,5,1],[4,2,1]]: minimum cost path is 1->3->1->1->1=7 going right,right,down,down.' },
            { title: 'Count Paths With Diagonal Moves', difficulty: 'Medium', description: 'In addition to right and down, you can also move diagonally (down-right). Count all paths to the bottom-right corner.', whyDifferent: 'Adds a third transition to the DP recurrence: dp[i][j] = dp[i-1][j] + dp[i][j-1] + dp[i-1][j-1], significantly increasing the path count.', example: 'width=3, height=3: with only right/down there are 6 paths. With diagonal moves there are 13 paths.' },
            { title: 'Count Paths Modulo M', difficulty: 'Medium', description: 'For very large grids, the number of paths can be enormous. Return the count modulo M (e.g., 10^9 + 7).', whyDifferent: 'Requires modular arithmetic throughout the DP to prevent integer overflow. Also opens the door to the combinatorial formula C(w+h-2, h-1) mod M using modular inverse.', example: 'width=100, height=100: number of paths is C(198,99) which is astronomically large. Return it mod 10^9+7.' },
            { title: 'Paths Through Mandatory Waypoint', difficulty: 'Hard', description: 'Count paths from top-left to bottom-right that must pass through a specific intermediate cell (waypoint).', whyDifferent: 'Decomposes into two subproblems: paths from start to waypoint multiplied by paths from waypoint to end. Requires combining two DP computations.', example: 'width=4, height=3, waypoint=(1,1): count paths from (0,0) to (1,1) times paths from (1,1) to (2,3). Total = 2 * 3 = 6.' }
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
