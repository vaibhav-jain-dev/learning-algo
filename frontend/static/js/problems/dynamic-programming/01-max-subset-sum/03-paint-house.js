/**
 * Paint House
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Paint House',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'There is a row of n houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that **no two adjacent houses have the same color**. Given a 2D array costs where costs[i][j] is the cost of painting house i with color j: - costs[i][0] = cost to paint house i red - costs[i][1] = cost to paint house i blue - costs[i][2] = cost to paint house i green Return the **minimum cos',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Define the state: what does dp[i][j] represent?',
            'Identify the base cases (usually dp[0][...] and dp[...][0]).',
            'Write the recurrence relation for dp[i][j].',
            'Determine the iteration order to ensure dependencies are computed first.',
            'Consider space optimization if only previous row/column is needed.'
        ],
        examples: [
    {
        input: {
        "costs": [
                [
                        17,
                        2,
                        17
                ],
                [
                        16,
                        16,
                        5
                ],
                [
                        14,
                        3,
                        19
                ]
        ]
},
        output: 10,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input costs=[[17, 2, 17], [16, 16, 5], [14, 3, 19]], the result is 10.'
    },
    {
        input: {
        "costs": [
                [
                        7,
                        6,
                        2
                ]
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input costs=[[7, 6, 2]], the result is 2.'
    }
        ],
        solutions: {
            python: `def paintHouse(data):
    """
    Paint House - Minimum cost to paint houses with 3 colors.

    Key insight: dp[i][j] = min cost to paint house i with color j.
    For each house, the cost of painting it color j is:
    costs[i][j] + min(dp[i-1][other colors])

    Since we only need previous row, we can use O(1) space.

    Time: O(n)
    Space: O(1)
    """
    costs = data["costs"]

    if not costs:
        return 0

    n = len(costs)

    # Track minimum costs for previous house painted red, blue, green
    prev_red, prev_blue, prev_green = costs[0][0], costs[0][1], costs[0][2]

    for i in range(1, n):
        # Current house costs
        curr_red = costs[i][0] + min(prev_blue, prev_green)
        curr_blue = costs[i][1] + min(prev_red, prev_green)
        curr_green = costs[i][2] + min(prev_red, prev_blue)

        prev_red, prev_blue, prev_green = curr_red, curr_blue, curr_green

    return min(prev_red, prev_blue, prev_green)


# Test
if __name__ == "__main__":
    print(paintHouse({"costs": [[17, 2, 17], [16, 16, 5], [14, 3, 19]]}))  # Expected: 10
    print(paintHouse({"costs": [[7, 6, 2]]}))  # Expected: 2`,
            go: `package main

import "fmt"

// PaintHouse finds minimum cost to paint houses with 3 colors.
// Each adjacent house must have different color.
// Time: O(n), Space: O(1)
func PaintHouse(data map[string]interface{}) int {
    costsInterface := data["costs"].([]interface{})
    if len(costsInterface) == 0 {
        return 0
    }

    // Parse costs
    costs := make([][]int, len(costsInterface))
    for i, row := range costsInterface {
        rowInterface := row.([]interface{})
        costs[i] = make([]int, 3)
        for j, v := range rowInterface {
            costs[i][j] = int(v.(float64))
        }
    }

    n := len(costs)

    // Track minimum costs for previous house
    prevRed, prevBlue, prevGreen := costs[0][0], costs[0][1], costs[0][2]

    for i := 1; i < n; i++ {
        currRed := costs[i][0] + min(prevBlue, prevGreen)
        currBlue := costs[i][1] + min(prevRed, prevGreen)
        currGreen := costs[i][2] + min(prevRed, prevBlue)

        prevRed, prevBlue, prevGreen = currRed, currBlue, currGreen
    }

    return min(prevRed, min(prevBlue, prevGreen))
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func main() {
    costs1 := []interface{}{
        []interface{}{17.0, 2.0, 17.0},
        []interface{}{16.0, 16.0, 5.0},
        []interface{}{14.0, 3.0, 19.0},
    }
    fmt.Println(PaintHouse(map[string]interface{}{"costs": costs1}))  // Expected: 10

    costs2 := []interface{}{[]interface{}{7.0, 6.0, 2.0}}
    fmt.Println(PaintHouse(map[string]interface{}{"costs": costs2}))  // Expected: 2
}`
        },
        twists: [
            { id: '01-max-subset-sum/03-paint-house/twist-01-generalize-to-k-colors', title: 'Generalize to K Colors', difficulty: 'Hard' },
            { id: '01-max-subset-sum/03-paint-house/twist-02-print-the-color-assignment', title: 'Print the Color Assignment', difficulty: 'Medium' },
            { id: '01-max-subset-sum/03-paint-house/twist-03-circular-houses-first-last-neighbor', title: 'Circular Houses (First = Last Neighbor)', difficulty: 'Very Hard' },
            { id: '01-max-subset-sum/03-paint-house/twist-04-space-optimization-o1-instead-of-on', title: 'Space Optimization: O(1) Instead of O(n)', difficulty: 'Easy' },
            { id: '01-max-subset-sum/03-paint-house/twist-05-greedy-fails-show-a-counterexample', title: 'Greedy Fails: Show a Counterexample', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house'] = problem;

})();
