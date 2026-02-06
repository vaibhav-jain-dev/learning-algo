/**
 * House Robber II
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 */
(function() {
    'use strict';

    const problem = {
        name: 'House Robber II',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**. Given an integer array nums representing the amount of money of each house, return the maximum am',
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
        "nums": [
                2,
                3,
                2
        ]
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[2, 3, 2], the result is 3.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                1
        ]
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3, 1], the result is 4.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3
        ]
},
        output: 3,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input nums=[1, 2, 3], the result is 3.'
    }
        ],
        solutions: {
            python: `def houseRobberIi(data):
    """
    House Robber II - Circular arrangement of houses.

    Key insight: Since houses are in a circle, we can't rob both
    first and last house. So we solve two subproblems:
    1. Rob houses[0..n-2] (exclude last)
    2. Rob houses[1..n-1] (exclude first)
    Take the maximum of both.

    Time: O(n)
    Space: O(1)
    """
    nums = data["nums"]
    n = len(nums)

    if n == 0:
        return 0
    if n == 1:
        return nums[0]
    if n == 2:
        return max(nums[0], nums[1])

    def rob_linear(houses):
        """Standard house robber for linear arrangement."""
        prev2, prev1 = 0, 0
        for money in houses:
            curr = max(prev1, prev2 + money)
            prev2, prev1 = prev1, curr
        return prev1

    # Case 1: Rob houses 0 to n-2 (exclude last house)
    # Case 2: Rob houses 1 to n-1 (exclude first house)
    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))


# Test
if __name__ == "__main__":
    print(houseRobberIi({"nums": [2, 3, 2]}))  # Expected: 3
    print(houseRobberIi({"nums": [1, 2, 3, 1]}))  # Expected: 4
    print(houseRobberIi({"nums": [1, 2, 3]}))  # Expected: 3`,
            go: `package main

import "fmt"

// HouseRobberIi solves the House Robber II problem.
// Since houses are circular, we can't rob both first and last.
// We solve two subproblems and take the maximum.
// Time: O(n), Space: O(1)
func HouseRobberIi(data map[string]interface{}) int {
    numsInterface := data["nums"].([]interface{})
    nums := make([]int, len(numsInterface))
    for i, v := range numsInterface {
        nums[i] = int(v.(float64))
    }

    n := len(nums)
    if n == 0 {
        return 0
    }
    if n == 1 {
        return nums[0]
    }
    if n == 2 {
        return max(nums[0], nums[1])
    }

    // Helper function for linear house robber
    robLinear := func(houses []int) int {
        prev2, prev1 := 0, 0
        for _, money := range houses {
            curr := max(prev1, prev2+money)
            prev2, prev1 = prev1, curr
        }
        return prev1
    }

    // Case 1: Rob houses 0 to n-2 (exclude last)
    // Case 2: Rob houses 1 to n-1 (exclude first)
    return max(robLinear(nums[:n-1]), robLinear(nums[1:]))
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func main() {
    fmt.Println(HouseRobberIi(map[string]interface{}{"nums": []interface{}{2.0, 3.0, 2.0}}))  // Expected: 3
    fmt.Println(HouseRobberIi(map[string]interface{}{"nums": []interface{}{1.0, 2.0, 3.0, 1.0}}))  // Expected: 4
}`
        },
        twists: [
            {
                title: 'Decompose Circular to Linear',
                difficulty: 'Medium',
                description: 'Explain precisely why the circular problem can be split into two linear House Robber subproblems. Why is max(rob[0..n-2], rob[1..n-1]) correct and complete?',
                whyDifferent: 'Understanding the decomposition is the core insight. Many students memorize "run it twice" without understanding why this covers all cases and doesn\'t double-count.',
                example: 'For [1, 2, 3, 1]: Either we don\'t rob house 0 (solve [2, 3, 1] = 3) or we don\'t rob house n-1 (solve [1, 2, 3] = 4). Answer: max(3, 4) = 4. This works because any valid solution must exclude at least one of house 0 or house n-1.'
            },
            {
                title: 'Track Which Houses Were Robbed',
                difficulty: 'Hard',
                description: 'Modify the solution to return not just the maximum amount, but the list of house indices that were actually robbed in the optimal solution.',
                whyDifferent: 'Reconstructing the solution path from the circular variant is trickier than linear. You must backtrack through whichever subproblem gave the better answer, then map indices back to the original array.',
                example: 'For [1, 2, 3, 1]: if rob[1..3] gives 4 (houses 1 and 2 in the subproblem), the actual house indices are [1, 2].'
            },
            {
                title: 'Conceptual Trap: Off-by-One in Circular Indexing',
                difficulty: 'Medium',
                description: 'When solving the two subproblems (exclude first, exclude last), what are the exact array slices? What happens if n <= 2? Walk through the edge cases.',
                whyDifferent: 'Off-by-one errors in the circular decomposition are the most common bug. You must handle n=1 (just return nums[0]) and n=2 (return max) as special cases.',
                example: 'n=1: [5] -> return 5. n=2: [5, 3] -> return 5. n=3: [2, 3, 2] -> solve [2, 3] and [3, 2], both give 3. The slices are nums[0..n-2] and nums[1..n-1] inclusive.'
            },
            {
                title: 'Top-Down Memoization Approach',
                difficulty: 'Medium',
                description: 'Rewrite the solution using top-down recursion with memoization instead of the bottom-up iterative approach. How do you handle the circular constraint in recursive form?',
                whyDifferent: 'Top-down thinking is different - you start from the goal and ask "what are my choices?" Converting circular constraints into recursive parameters requires careful thought about what state to pass.',
                example: 'def rob(nums, start, end, memo): base case when start > end. Choice: rob(start) + rob(start+2, end) or rob(start+1, end). Call max(rob(0, n-2), rob(1, n-1)).'
            },
            {
                title: 'Three Houses in a Triangle',
                difficulty: 'Hard',
                description: 'Generalize: what if houses are arranged not in a circle but in a general graph? With just 3 houses where each is adjacent to both others, what is the maximum you can rob?',
                whyDifferent: 'Forces thinking about the problem beyond the 1D circular case. On a general graph, this becomes the Maximum Independent Set problem, which is NP-hard. The circular structure is what makes it tractable.',
                example: 'Three houses with values [10, 20, 30] all adjacent to each other: you can only rob one house. Answer: 30. This is much harder on general graphs.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii'] = problem;

})();
