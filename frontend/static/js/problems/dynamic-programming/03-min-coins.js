/**
 * Min Number Of Coins For Change
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Number Of Coins For Change',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        description: 'Given an array of positive integers representing coin denominations and a single non-negative integer n representing a target amount of money, write a function that returns the smallest number of coins needed to make change for that target amount. If it\'s impossible to make change for the target amount, return -1.',
        problem: 'Create a DP array where dp[i] = minimum coins needed for amount i. Initialize dp[0] = 0 (zero coins for zero amount) and all others to infinity. For each amount from 1 to n, try each coin denomination: if coin <= amount, dp[amount] = min(dp[amount], 1 + dp[amount - coin]). The answer is dp[n] if it\'s not infinity, else -1.',
        hints: [
            'Think about the subproblem: if you knew the minimum coins for all smaller amounts, how would you find it for the current amount?',
            'For amount i, you can use any coin c where c <= i. Using coin c means you need 1 + (min coins for amount i-c).',
            'Build a DP array of size n+1. dp[i] represents minimum coins for amount i.',
            'For each amount, try all valid coins and take the minimum. Initialize with infinity to detect impossible cases.'
        ],
        complexity: {
            time: 'O(n * d)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 7,
        "denoms": [1, 5, 10]
        },
        output: 3,
        explanation: 'dp[0]=0. For amount 7: using coin 1 gives 1+dp[6], using coin 5 gives 1+dp[2]. dp[5]=1 (one 5-coin), dp[2]=2 (two 1-coins). So dp[7] = min(1+6, 1+2) = 3. Optimal: 5+1+1 = 7 using 3 coins.'
    },
    {
        input: {
        "n": 6,
        "denoms": [1, 2, 4]
        },
        output: 2,
        explanation: 'For amount 6: using coin 4 gives 1+dp[2]=1+1=2, using coin 2 gives 1+dp[4]=1+1=2. Both lead to 2 coins. Optimal solutions: 4+2 or 2+2+2 (but that\'s 3 coins). Best is 4+2 = 2 coins.'
    },
    {
        input: {
        "n": 3,
        "denoms": [2]
        },
        output: -1,
        explanation: 'With only coin 2, we can make amounts 0, 2, 4, 6... (all even). Amount 3 is odd and impossible. dp[3] remains infinity, so return -1.'
    }
        ],
        twists: [
            {
                title: 'Greedy Fails: Classic Counterexample',
                difficulty: 'Medium',
                description: 'The greedy approach always picks the largest coin that fits. Construct a specific input where greedy gives more coins than the DP optimal. Explain why the greedy property fails for arbitrary denominations.',
                whyDifferent: 'Understanding when greedy fails is fundamental to recognizing coin change as a DP problem. Greedy works for specific denomination systems (like US coins) but fails in general.',
                example: 'denoms=[1, 3, 4], n=6. Greedy: 4+1+1=3 coins. Optimal: 3+3=2 coins. Greedy picks 4 first (largest fitting) but this forces two 1s, while two 3s is better.'
            },
            {
                title: 'Print the Actual Coins Used',
                difficulty: 'Medium',
                description: 'Return not just the minimum count but the actual list of coins used. Maintain a way to reconstruct which coin was chosen at each step.',
                whyDifferent: 'Reconstructing the solution requires either storing the coin chosen at each amount in a separate array, or backtracking from dp[n] by checking which coin could have led there.',
                example: 'n=7, denoms=[1,5,10]. dp[7]=3 (coins: 5,1,1). Store parent[7]=5 (coin used), parent[2]=1, parent[1]=1. Backtrack: 7->5 used coin 5, 2->1 used coin 1, 1->0 used coin 1.'
            },
            {
                title: 'Top-Down Recursive with Memoization',
                difficulty: 'Medium',
                description: 'Rewrite the solution as a recursive function minCoins(amount) that tries each coin and memoizes results. Compare the recursion tree to the bottom-up table.',
                whyDifferent: 'Top-down naturally prunes unreachable states (only computes amounts actually needed), while bottom-up fills the entire table. The mental model is different: "what is the min coins for this amount?" vs "build up from 0".',
                example: 'minCoins(7) = 1 + min(minCoins(6), minCoins(2)). minCoins(2)=1+min(minCoins(1))=1+1=2. minCoins(6)=1+min(minCoins(5),minCoins(1))=1+1=2. So minCoins(7)=1+2=3.'
            },
            {
                title: 'Conceptual Trap: Infinity Handling',
                difficulty: 'Easy',
                description: 'Why do we initialize dp[1..n] to infinity and not 0 or -1? What happens if we use 0? What happens if we forget to check for infinity when returning the answer?',
                whyDifferent: 'The initialization is crucial for correctness. Using 0 would make min() always pick 0, giving wrong answers. Using -1 requires special-case logic in the min. Infinity naturally propagates through impossible states.',
                example: 'If dp[3]=infinity with denoms=[2], that means amount 3 is unreachable. When computing dp[5], we get min(inf, 1+dp[3])=min(inf, 1+inf)=inf. Correctly propagates impossibility. Return -1 only at the end if dp[n]=inf.'
            },
            {
                title: 'Trace the DP Table Step by Step',
                difficulty: 'Easy',
                description: 'For n=7, denoms=[1,5,10], fill in dp[0] through dp[7] step by step. At each amount, show which coin gives the minimum.',
                whyDifferent: 'Manual tracing catches off-by-one errors and builds intuition for the recurrence. It helps you see how smaller solutions combine to solve larger amounts.',
                example: 'dp[0]=0. dp[1]=1+dp[0]=1. dp[2]=1+dp[1]=2. dp[3]=3. dp[4]=4. dp[5]=min(1+dp[4], 1+dp[0])=min(5,1)=1. dp[6]=min(1+dp[5], 1+dp[1])=min(2,2)=2. dp[7]=min(1+dp[6], 1+dp[2])=min(3,3)=3.'
            },
            {
                title: 'Counting vs Optimization Duality',
                difficulty: 'Medium',
                description: 'Compare Min Coins (minimize count) with Number of Ways to Make Change (count combinations). Both use the same state space but different operations. Write both recurrences side by side.',
                whyDifferent: 'Seeing the structural similarity deepens understanding of DP as a framework. Same subproblems, same transitions, but += for counting vs min() for optimization.',
                example: 'Min coins: dp[i] = min over coins of (1 + dp[i-coin]). Count ways: dp[i] += dp[i-coin] for each coin. Base: min uses dp[0]=0, rest=inf. Count uses dp[0]=1, rest=0.'
            }
        ],
        similar: [
    { id: '03-min-coins/03-min-coins/01-perfect-squares', name: 'Perfect Squares', difficulty: 'Medium' },
    { id: '03-min-coins/03-min-coins/02-coin-change-ii-exact-coins', name: 'Coin Change II - Exact Coins', difficulty: 'Medium' },
    { id: '03-min-coins/03-integer-break', name: 'Integer Break', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins'] = problem;

})();
