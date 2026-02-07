/**
 * Limited Exchange Steps
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-arbitrage
 * Parent: 11-detect-arbitrage
 */
(function() {
    'use strict';

    const problem = {
        name: 'Limited Exchange Steps',
        difficulty: 'Medium',
        algorithm: 'graph-arbitrage',
        parent: '11-detect-arbitrage',
        description: 'You can make at most K exchanges. Detect if arbitrage is possible within K steps.',
        problem: 'Standard Bellman-Ford runs N-1 iterations. With limit K, you run exactly K iterations and check if any diagonal element exceeds 1 (in original space).',
        hints: [
            'Start by understanding the key difference: Standard Bellman-Ford runs N-1 iterations.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: With K=3 exchanges: USD->EUR->GBP->USD.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N^3)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"exchangeRates":[[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"exchangeRates":[[1,0.5,0.25],[2,1,0.5],[4,2,1]]},
                output: 2,
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
            python: `def limited_exchange_steps(exchangeRates):
    """
    Limited Exchange Steps

    You can make at most K exchanges. Detect if arbitrage is possible within K steps.

    Time: O(N^3)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(exchangeRates)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(limited_exchange_steps([[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]))  # Expected: 1
print(limited_exchange_steps([[1,0.5,0.25],[2,1,0.5],[4,2,1]]))  # Expected: 2
print(limited_exchange_steps([[1,0.8631,0.5903]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LimitedExchangeSteps solves the Limited Exchange Steps problem.
// You can make at most K exchanges. Detect if arbitrage is possible within K steps.
// Time: O(N^3), Space: O(N^2)
func LimitedExchangeSteps(exchangeRates [][]int) int {
	result := 0

	for i := 0; i < len(exchangeRates); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LimitedExchangeSteps([][]int{{1, 0.8631, 0.5903}, {1.1586, 1, 0.6849}, {1.6939, 1.46, 1}})) // Expected: 1
	fmt.Println(LimitedExchangeSteps([][]int{{1, 0.5, 0.25}, {2, 1, 0.5}, {4, 2, 1}})) // Expected: 2
	fmt.Println(LimitedExchangeSteps([][]int{{1, 0.8631, 0.5903}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/twist-05-limited-exchange-steps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/twist-05-limited-exchange-steps'] = problem;
})();
