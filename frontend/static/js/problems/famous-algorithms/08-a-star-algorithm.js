/**
 * A* Algorithm
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star
 */
(function() {
    'use strict';

    const problem = {
        name: 'A* Algorithm',
        difficulty: 'Hard',
        algorithm: 'a-star',
        description: 'Implement the A* (A-Star) search algorithm to find the shortest path between two nodes in a weighted graph or grid. A* is an informed search algorithm that uses a heuristic function to guide its search, making it more efficient than Dijkstra\'s algorithm for many problems. Given a 2D grid where: - 0 represents a walkable cell - 1 represents an obstacle Find the shortest path from the start position to the end position. You can move in 4 directions (up, down, left, right). Return the length of the',
        complexity: {
            time: 'O(E log V)',
            space: 'O(V)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        0
                ]
        ],
        "start": [
                0,
                0
        ],
        "end": [
                3,
                3
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input grid=[[0, 0, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 1, 0, 0]], start=[0, 0], end=[3, 3], the result is 6.'
    }
        ],
        twists: [
            { title: 'Dijkstra Comparison', difficulty: 'Medium', description: 'Solve the same grid pathfinding problem using Dijkstra\'s algorithm (no heuristic) and compare the number of nodes explored with A*.', whyDifferent: 'Dijkstra explores in all directions equally (like BFS for unweighted), while A* focuses toward the goal. Comparing node counts demonstrates the heuristic\'s value.', example: 'On a 10x10 grid with start at (0,0) and end at (9,9), Dijkstra might explore 80 nodes while A* with Manhattan heuristic explores only 25.' },
            { title: 'Weighted A*', difficulty: 'Hard', description: 'Implement weighted A* where f(n) = g(n) + w*h(n) with w > 1, trading optimality for speed.', whyDifferent: 'A weight w > 1 makes the heuristic more aggressive, exploring fewer nodes but potentially finding suboptimal paths. Understanding the optimality-speed tradeoff is key.', example: 'With w=2, A* explores half the nodes but may return a path that is up to 2x the optimal length. For w=1, it is standard A* with optimal guarantee.' },
            { title: 'Bidirectional A*', difficulty: 'Very Hard', description: 'Run A* simultaneously from start and end, meeting in the middle, to reduce the search space.', whyDifferent: 'Requires running two A* instances with consistent heuristics and detecting when they meet, which is more complex than the simple unidirectional approach.', example: 'Forward A* from start and backward A* from end. When both have explored a common node, check if the combined path is optimal.' },
            { title: 'Different Heuristics', difficulty: 'Medium', description: 'Compare Manhattan, Euclidean, and Chebyshev distance heuristics for grid pathfinding. Analyze admissibility for 4-directional vs 8-directional movement.', whyDifferent: 'Different heuristics affect A* performance differently -- some are more informed (tighter bound) but must remain admissible (never overestimate) for optimality.', example: 'For 4-directional movement, Manhattan is exact. Euclidean underestimates. Chebyshev overestimates (inadmissible for 4-dir) but is perfect for 8-dir.' },
            { title: 'A* with Terrain Costs', difficulty: 'Hard', description: 'Cells have varying movement costs (e.g., grass=1, forest=3, swamp=5). Find the least-cost path using A*.', whyDifferent: 'Variable edge costs mean BFS no longer works. A* must account for actual movement costs in g(n), making the priority queue ordering more critical.', example: 'A path through 5 grass cells (cost 5) may be better than 2 grass + 1 swamp (cost 7) even though it is longer in steps.' }
        ],
        similar: [
    { id: '08-a-star-algorithm/01-shortest-path-in-grid', name: 'Shortest Path in Binary Grid', difficulty: 'Medium' },
    { id: '08-a-star-algorithm/02-sliding-puzzle', name: 'Sliding Puzzle', difficulty: 'Hard' },
    { id: '08-a-star-algorithm/03-word-ladder-heuristic', name: 'Word Ladder with Heuristic', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm'] = problem;

})();
