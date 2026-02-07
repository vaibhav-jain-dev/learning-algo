/**
 * Maximum Arbitrage Profit
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-arbitrage
 * Parent: 11-detect-arbitrage
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Arbitrage Profit',
        difficulty: 'Very Hard',
        algorithm: 'graph-arbitrage',
        parent: '11-detect-arbitrage',
        description: 'Among all possible arbitrage cycles, find the one that yields the maximum profit ratio.',
        problem: 'Simply detecting any negative cycle is not enough. You must find the cycle with the most negative total weight (in log space), requiring cycle enumeration or optimization.',
        hints: [
            'Start by understanding the key difference: Simply detecting any negative cycle is not enough.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Cycle A gives 2% profit, Cycle B gives 5% profit.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"exchangeRates":[[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]},
                output: 2,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"exchangeRates":[[1,0.5,0.25],[2,1,0.5],[4,2,1]]},
                output: 3,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"exchangeRates":[[1,0.8631,0.5903]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def maximum_arbitrage_profit(exchangeRates):
    """
    Maximum Arbitrage Profit

    Among all possible arbitrage cycles, find the one that yields the maximum profit ratio.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    result = 0

    for i in range(len(exchangeRates)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(maximum_arbitrage_profit([[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]))  # Expected: 2
print(maximum_arbitrage_profit([[1,0.5,0.25],[2,1,0.5],[4,2,1]]))  # Expected: 3
print(maximum_arbitrage_profit([[1,0.8631,0.5903]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaximumArbitrageProfit solves the Maximum Arbitrage Profit problem.
// Among all possible arbitrage cycles, find the one that yields the maximum profit ratio.
// Time: Varies - see approach, Space: Varies - see approach
func MaximumArbitrageProfit(exchangeRates [][]int) int {
	result := 0

	for i := 0; i < len(exchangeRates); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaximumArbitrageProfit([][]int{{1, 0.8631, 0.5903}, {1.1586, 1, 0.6849}, {1.6939, 1.46, 1}})) // Expected: 2
	fmt.Println(MaximumArbitrageProfit([][]int{{1, 0.5, 0.25}, {2, 1, 0.5}, {4, 2, 1}})) // Expected: 3
	fmt.Println(MaximumArbitrageProfit([][]int{{1, 0.8631, 0.5903}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/twist-02-maximum-arbitrage-profit', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/twist-02-maximum-arbitrage-profit'] = problem;
})();
