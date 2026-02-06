/**
 * Min Number Of Jumps
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-jumps
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Number Of Jumps',
        difficulty: 'Hard',
        algorithm: 'dp-jumps',
        description: 'You\'re given a non-empty array of positive integers where each integer represents the maximum number of steps you can take forward from that position. For example, if the element at index 1 is 3, you can go from index 1 to index 2, 3, or 4. Write a function that returns the minimum number of jumps needed to reach the last index of the array. If it\'s not possible to reach the last index, return -1.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
    {
        input: {
        "array": [
                3,
                4,
                2,
                1,
                2,
                3,
                7,
                1,
                1,
                1,
                3
        ]
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[3, 4, ..., 3] (length 11), the result is 4.'
    },
    {
        input: {
        "array": [
                2,
                1,
                1
        ]
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[2, 1, 1], the result is 1.'
    },
    {
        input: {
        "array": [
                1,
                1,
                1,
                1
        ]
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[1, 1, 1, 1], the result is 3.'
    },
    {
        input: {
        "array": [
                1,
                0,
                1
        ]
},
        output: -1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input array=[1, 0, 1], the result is -1.'
    }
        ],
        twists: [
            { title: 'Can Reach End (Boolean)', difficulty: 'Easy', description: 'Instead of the minimum number of jumps, simply determine whether it is possible to reach the last index from the first index.', whyDifferent: 'Simplifies from optimization to feasibility. A greedy approach tracking the furthest reachable index suffices, without needing to count jumps.', example: 'array=[2,3,1,1,4]: can reach end? Yes. array=[3,2,1,0,4]: can reach end? No, stuck at index 3.' },
            { title: 'Jump Game With Backward Jumps', difficulty: 'Hard', description: 'Each position allows jumping forward up to array[i] steps OR backward up to array[i] steps. Find the minimum jumps to reach the last index.', whyDifferent: 'Backward jumps turn this into a graph shortest-path problem (BFS) rather than a greedy forward-scan, since you might need to go backward to reach a better forward position.', example: 'array=[4,2,3,0,3,1,2]: might jump backward from index 2 to index 0 to reach further. BFS finds shortest path.' },
            { title: 'Minimum Cost Jumps', difficulty: 'Medium', description: 'Each jump has a cost equal to the landing position value. Find the path from index 0 to the last index with minimum total cost.', whyDifferent: 'Changes from minimizing jump count to minimizing accumulated cost. The DP recurrence adds the destination value instead of incrementing by 1.', example: 'array=[1,3,1,1,5]: jumping to index 2 (cost 1), then index 3 (cost 1), then index 4 (cost 5) = total cost 7. Direct to index 1 (cost 3) then ahead might cost more.' },
            { title: 'Count Minimum Jump Paths', difficulty: 'Hard', description: 'Find how many distinct paths achieve the minimum number of jumps to reach the last index.', whyDifferent: 'Combines the minimum-jumps optimization with counting. You need to track both the minimum jumps to each position and the number of ways to achieve that minimum.', example: 'array=[2,3,1,1,4]: min jumps=2. Paths: [0->1->4] and [0->2->4]? Check if both use 2 jumps. Count all valid minimum-jump paths.' },
            { title: 'Minimum Jumps With Exact Landing', difficulty: 'Hard', description: 'You must land exactly on the last index (not jump past it). Each position lets you jump exactly 1 to array[i] steps forward. Find minimum jumps or return -1 if impossible.', whyDifferent: 'The exact-landing constraint means you cannot overshoot. Near the end, you need a position whose jump range hits the last index precisely, adding boundary conditions.', example: 'array=[3,4,2,1,2,3,7,1,1,1,3], must land exactly on index 10. Some jump sequences might overshoot, making them invalid.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps'] = problem;

})();
