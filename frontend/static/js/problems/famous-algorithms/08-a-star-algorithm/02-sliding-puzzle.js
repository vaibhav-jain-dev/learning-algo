/**
 * Sliding Puzzle
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sliding Puzzle',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        parent: '08-a-star-algorithm',
        description: 'On a 2x3 board, there are 5 tiles labeled 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping them. The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]]. Given the puzzle board, return the least number of moves required to solve the puzzle. If it is impossible to solve, return -1.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O((mn)!)',
            space: 'O((mn)!)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "board": [
                [
                        1,
                        2,
                        3
                ],
                [
                        4,
                        0,
                        5
                ]
        ]
},
        output: 1,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input board=[[1, 2, 3], [4, 0, 5]], the result is 1.'
    }
        ],
        solutions: {
            python: `def slidingPuzzle(data):
    """
    Sliding Puzzle

    Time: O(n)
    Space: O(n)
    """
    # TODO: Implement solution
    # Key insight: Identify the optimal data structure and algorithm

    result = None

    # Process input
    # ...

    return result


# Test
if __name__ == "__main__":
    # Add test cases
    pass`,
            go: `package main

import "fmt"

// SlidingPuzzle solves the Sliding Puzzle problem.
// Time: O(n), Space: O(n)
func SlidingPuzzle(data interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Identify the optimal data structure and algorithm

    var result interface{}

    // Process input
    // ...

    return result
}

func main() {
    // Test cases
    fmt.Println("Test")
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/02-sliding-puzzle', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/02-sliding-puzzle'] = problem;

})();
