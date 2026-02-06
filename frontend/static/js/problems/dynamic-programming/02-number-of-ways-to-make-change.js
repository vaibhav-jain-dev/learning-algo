/**
 * Number of Ways to Make Change
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Ways to Make Change',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given an array of positive integers representing coin denominations and a single non-negative integer n representing a target amount of money, write a function that returns the number of ways to make change for that target amount using the given coin denominations. Note that an unlimited amount of coins is available for each denomination.',
        complexity: {
            time: 'O(n * d)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 6,
        "denoms": [
                1,
                5
        ]
},
        output: 2,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=6, denoms=[1, 5], the result is 2.'
    },
    {
        input: {
        "n": 10,
        "denoms": [
                1,
                5,
                10,
                25
        ]
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=10, denoms=[1, 5, 10, 25], the result is 4.'
    },
    {
        input: {
        "n": 0,
        "denoms": [
                1,
                2
        ]
},
        output: 1,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input n=0, denoms=[1, 2], the result is 1.'
    }
        ],
        twists: [
            {
                title: 'Combinations vs Permutations: Why Loop Order Matters',
                difficulty: 'Hard',
                description: 'The outer loop iterates over coins and the inner loop over amounts. What happens if you swap the loop order? Explain the difference and what each version counts.',
                whyDifferent: 'This is one of the most subtle distinctions in DP. Outer coins = combinations (order doesn\'t matter). Outer amounts = permutations (order matters). Understanding why requires deep thought about what each DP cell means.',
                example: 'n=4, denoms=[1,2,3]. Combinations (coins outer): {1+1+1+1, 1+1+2, 1+3, 2+2} = 4 ways. Permutations (amounts outer): adds orderings like 2+1+1, 1+2+1, etc. = 7 ways.'
            },
            {
                title: 'Print All Combinations',
                difficulty: 'Hard',
                description: 'Instead of counting the number of ways, enumerate and print all distinct combinations that make the target amount.',
                whyDifferent: 'Counting is O(n*d) but printing all solutions may be exponential. You need to either backtrack through the DP table or use recursive enumeration, which is a fundamentally different approach.',
                example: 'n=6, denoms=[1,5]: Output [[1,1,1,1,1,1], [1,5]]. For n=10, denoms=[1,5,10]: Output [[1,1,1,1,1,1,1,1,1,1], [1,1,1,1,1,5], [5,5], [10]].'
            },
            {
                title: 'Conceptual Trap: Base Case dp[0] = 1',
                difficulty: 'Medium',
                description: 'Why is dp[0] = 1 and not 0? There is exactly one way to make change for 0: use no coins. Explain why this base case is correct and what breaks if you set dp[0] = 0.',
                whyDifferent: 'Many students struggle with this base case because it seems counterintuitive. Understanding it requires thinking about what dp[0]=1 means in the recurrence: it allows valid combinations that exactly hit the target.',
                example: 'If dp[0]=0, then dp[coin]=0 for all coins since dp[coin] += dp[coin-coin] = dp[0] = 0. No combination would ever be counted. The 1 acts as the "seed" for building up valid combinations.'
            },
            {
                title: 'Counting vs Optimization',
                difficulty: 'Medium',
                description: 'This problem counts the number of ways. The related Min Coins problem minimizes the count. Compare the two recurrences side by side. What changes between counting and optimization?',
                whyDifferent: 'Counting uses addition (dp[i] += dp[i-coin]) while optimization uses min/max (dp[i] = min(dp[i], 1+dp[i-coin])). Same structure, different aggregation. Understanding this duality is key to DP mastery.',
                example: 'Counting: dp[i] += dp[i-coin]. Optimization: dp[i] = min(dp[i], 1 + dp[i-coin]). Base case differs too: counting uses dp[0]=1, optimization uses dp[0]=0 with others as infinity.'
            },
            {
                title: 'Trace the DP Table',
                difficulty: 'Easy',
                description: 'For n=6, denoms=[1,5], manually fill the DP array step by step. Show the array state after processing each coin denomination.',
                whyDifferent: 'Hand-tracing reveals exactly how each coin contributes to the count. It makes the abstract recurrence concrete and helps debug off-by-one errors.',
                example: 'Initial: dp=[1,0,0,0,0,0,0]. After coin=1: dp=[1,1,1,1,1,1,1]. After coin=5: dp=[1,1,1,1,1,2,2]. Answer: dp[6]=2.'
            },
            {
                title: 'Limited Supply of Each Coin',
                difficulty: 'Hard',
                description: 'What if each denomination has a limited supply? For example, you have 3 pennies, 2 nickels, and 1 dime. How does the DP change?',
                whyDifferent: 'Unlimited coins allow forward iteration (unbounded knapsack). Limited supply requires iterating amounts in reverse for each coin (bounded knapsack), or expanding the state to track how many of each coin is used.',
                example: 'n=7, coins=[1,5] with supply=[3,2]. Cannot use more than 3 ones or 2 fives. Only way: 1+1+5=7 (using 2 ones and 1 five). Answer: 1 way.'
            }
        ],
        similar: [
    { id: '02-number-of-ways-to-make-change/02-number-of-ways-to-make-change/01-combination-sum-iv', name: 'Combination Sum IV', difficulty: 'Medium' },
    { id: '02-number-of-ways-to-make-change/02-target-sum', name: 'Target Sum', difficulty: 'Medium' },
    { id: '02-number-of-ways-to-make-change/03-partition-equal-subset-sum', name: 'Partition Equal Subset Sum', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change'] = problem;

})();
