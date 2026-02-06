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
            {
                title: 'Generalize to K Colors',
                difficulty: 'Hard',
                description: 'Instead of 3 colors, generalize to k colors. For each house, you have k cost options and no two adjacent houses can share a color. How does the recurrence change? What is the complexity?',
                whyDifferent: 'With 3 colors, you can hardcode min of the other two. With k colors, you need an efficient way to find the minimum of all colors except the current one. Naive is O(n*k^2), but O(n*k) is possible using first and second minimum tracking.',
                example: 'For k=4 colors, dp[i][j] = costs[i][j] + min(dp[i-1][c] for c != j). Track the two smallest values in the previous row to compute this in O(1) per cell.'
            },
            {
                title: 'Print the Color Assignment',
                difficulty: 'Medium',
                description: 'Return not just the minimum cost but which color each house was painted. Backtrack through your DP to reconstruct the optimal assignment.',
                whyDifferent: 'You need to store not just the minimum cost but also which color achieved it, then trace backward from the last house to reconstruct the full coloring.',
                example: 'For costs=[[17,2,17],[16,16,5],[14,3,19]]: optimal is blue(2) + green(5) + blue(3) = 10. Output: ["blue", "green", "blue"].'
            },
            {
                title: 'Circular Houses (First = Last Neighbor)',
                difficulty: 'Very Hard',
                description: 'What if the houses are in a circle, so the first and last house are also adjacent and must have different colors? How do you handle this additional constraint?',
                whyDifferent: 'Similar to House Robber II\'s circular decomposition, but here you fix the first house\'s color and run DP for each possible first color, then check the last house\'s color doesn\'t match.',
                example: 'Fix house 0 as red: solve the rest with house n-1 not red. Repeat for blue and green. Take minimum across all three.'
            },
            {
                title: 'Space Optimization: O(1) Instead of O(n)',
                difficulty: 'Easy',
                description: 'The current solution already uses O(1) space with three variables. Verify you understand why: which values from the previous row do you need to compute the current row?',
                whyDifferent: 'Unlike single-state DP where you need one or two previous values, here you have multiple states (one per color) at each position. Understanding that only the previous row matters is key.',
                example: 'At each step, curr_red = costs[i][0] + min(prev_blue, prev_green). You only need the three previous color costs, not the entire table.'
            },
            {
                title: 'Greedy Fails: Show a Counterexample',
                difficulty: 'Medium',
                description: 'A greedy approach picks the cheapest valid color at each house. Construct an input where this fails to find the global minimum.',
                whyDifferent: 'Understanding when local optimal choices don\'t lead to global optimal is crucial for recognizing when DP is needed over greedy.',
                example: 'Costs=[[1,100,100],[100,1,100],[100,100,1],[1,100,100]]. Greedy: red(1), blue(1), green(1), red(1)=4. But consider: red(1), blue(1), red(100)... greedy can get stuck. Actually with 3 colors this specific greedy works. Try: [[1,5,6],[6,2,5],[5,6,1],[6,1,5]] - greedy picks 1,2,1,1=5, but optimal might differ.'
            }
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
