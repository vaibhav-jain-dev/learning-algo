/**
 * Delete and Earn
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete and Earn',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'You are given an integer array nums. You want to maximize the number of points you get by performing the following operation any number of times: - Pick any nums[i] and delete it to earn nums[i] points. - Afterwards, you must delete **every** element equal to nums[i] - 1 and **every** element equal to nums[i] + 1. Return the **maximum number of points** you can earn by applying the above operation some number of times.',
        problem: 'Use 2D dynamic programming where dp[i][j] represents the optimal solution for subproblem (i,j). Build the table by considering all possible transitions from smaller subproblems.',
        complexity: {
            time: 'O(n + max_val)',
            space: 'O(max_val)'
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
        "nums": [
                3,
                4,
                2
        ]
},
        output: 6,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[3, 4, 2], the result is 6.'
    },
    {
        input: {
        "nums": [
                2,
                2,
                3,
                3,
                3,
                4
        ]
},
        output: 9,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[2, 2, ..., 4] (length 6), the result is 9.'
    }
        ],
        solutions: {
            python: `def deleteAndEarn(data):
    """
    Delete and Earn

    Key insight: Transform into House Robber problem.
    - Count total points for each value (value * count)
    - Create array where index = value, arr[i] = total points for value i
    - Can't take adjacent values (i and i+1), just like House Robber

    Time: O(n + max_val)
    Space: O(max_val)
    """
    nums = data["nums"]

    if not nums:
        return 0

    max_val = max(nums)

    # Count points for each value
    points = [0] * (max_val + 1)
    for num in nums:
        points[num] += num

    # Apply House Robber algorithm on points array
    # Can't take adjacent values (i and i+1)
    prev2, prev1 = 0, 0
    for p in points:
        curr = max(prev1, prev2 + p)
        prev2, prev1 = prev1, curr

    return prev1


# Test
if __name__ == "__main__":
    print(deleteAndEarn({"nums": [3, 4, 2]}))  # Expected: 6
    print(deleteAndEarn({"nums": [2, 2, 3, 3, 3, 4]}))  # Expected: 9`,
            go: `package main

import "fmt"

// DeleteAndEarn transforms the problem into House Robber.
// Count total points per value, then apply House Robber on the points array.
// Time: O(n + max_val), Space: O(max_val)
func DeleteAndEarn(data map[string]interface{}) int {
    numsInterface := data["nums"].([]interface{})
    nums := make([]int, len(numsInterface))
    maxVal := 0
    for i, v := range numsInterface {
        nums[i] = int(v.(float64))
        if nums[i] > maxVal {
            maxVal = nums[i]
        }
    }

    if len(nums) == 0 {
        return 0
    }

    // Count points for each value
    points := make([]int, maxVal+1)
    for _, num := range nums {
        points[num] += num
    }

    // Apply House Robber algorithm
    prev2, prev1 := 0, 0
    for _, p := range points {
        curr := max(prev1, prev2+p)
        prev2, prev1 = prev1, curr
    }

    return prev1
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(DeleteAndEarn(map[string]interface{}{"nums": []interface{}{3.0, 4.0, 2.0}}))  // Expected: 6
    fmt.Println(DeleteAndEarn(map[string]interface{}{"nums": []interface{}{2.0, 2.0, 3.0, 3.0, 3.0, 4.0}}))  // Expected: 9
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/02-delete-and-earn', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/02-delete-and-earn'] = problem;

})();
