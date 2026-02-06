/**
 * Steps with Costs
 * Category: recursion
 * Difficulty: Hard
 * Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps
 */
(function() {
    'use strict';
    const problem = {
        name: 'Steps with Costs',
        difficulty: 'Hard',
        algorithm: 'recursion-staircase',
        parent: '01-nth-fibonacci/02-climbing-stairs-k-steps',
        description: 'Each step i has a cost cost[i]. Instead of counting paths, find the minimum cost to reach the top, where at each position you can take 1 to k steps.',
        problem: 'Changes the recurrence from summation to minimization. The same recursive/DP structure applies but the combining operation is min() instead of sum(), altering the optimization perspective.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'n=4, k=2, costs=[1,3,2,4]. dp[0]=0, dp[1]=1, dp[2]=min(dp[1]+3, dp[0]+3)=4, dp[3]=min(dp[2]+2, dp[1]+2)=3, dp[4]=min(dp[3]+4, dp[2]+4)=7.' },
                output: 'See example',
                explanation: 'n=4, k=2, costs=[1,3,2,4]. dp[0]=0, dp[1]=1, dp[2]=min(dp[1]+3, dp[0]+3)=4, dp[3]=min(dp[2]+2, dp[1]+2)=3, dp[4]=min(dp[3]+4, dp[2]+4)=7.'
            }
        ],
        solutions: {
            python: `# Steps with Costs
# Category: recursion
# Difficulty: Hard
# Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps

def solve():
    """
    Each step i has a cost cost[i]. Instead of counting paths, find the minimum cost to reach the top, where at each position you can take 1 to k steps.

    Key insight: Changes the recurrence from summation to minimization. The same recursive/DP structure applies but the combining operation is min() instead of sum(), altering the optimization perspective.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Steps with Costs problem.
// Each step i has a cost cost[i]. Instead of counting paths, find the minimum cost to reach the top, where at each position you can take 1 to k steps.
// Key insight: Changes the recurrence from summation to minimization. The same recursive/DP structure applies but the combining operation is min() instead of sum(), altering the optimization perspective.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
}
`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/02-climbing-stairs-k-steps/twist-04-steps-with-costs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/02-climbing-stairs-k-steps/twist-04-steps-with-costs'] = problem;
})();
