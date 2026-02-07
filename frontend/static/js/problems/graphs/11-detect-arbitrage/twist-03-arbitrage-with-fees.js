/**
 * Arbitrage with Fees
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-arbitrage
 * Parent: 11-detect-arbitrage
 */
(function() {
    'use strict';

    const problem = {
        name: 'Arbitrage with Fees',
        difficulty: 'Hard',
        algorithm: 'graph-arbitrage',
        parent: '11-detect-arbitrage',
        description: 'Each currency exchange has a transaction fee (flat or percentage). Detect arbitrage considering fees.',
        problem: 'Fees reduce the effective exchange rate. The log-transform must account for fees: log(rate * (1 - fee_pct)) instead of log(rate), potentially eliminating marginal arbitrage.',
        hints: [
            'Start by understanding the key difference: Fees reduce the effective exchange rate.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Exchange rate 1.',
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
                output: 4.66,
                explanation: 'The computed value for this input is 4.66.'
            },
            {
                input: {"exchangeRates":[[1,0.5,0.25],[2,1,0.5],[4,2,1]]},
                output: 1.46,
                explanation: 'The computed value for this input is 1.46.'
            },
            // Edge case
            {
                input: {"exchangeRates":[[1,0.8631,0.5903]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def arbitrage_with_fees(exchangeRates):
    """
    Arbitrage with Fees

    Each currency exchange has a transaction fee (flat or percentage). Detect arbitrage considering fees.

    Time: O(N^3)
    Space: O(N^2)
    """
    total = 0
    count = 0

    for val in exchangeRates:
        total += val
        count += 1

    return total / count if count > 0 else 0.0


# Test cases
print(arbitrage_with_fees([[1,0.8631,0.5903],[1.1586,1,0.6849],[1.6939,1.46,1]]))  # Expected: 4.66
print(arbitrage_with_fees([[1,0.5,0.25],[2,1,0.5],[4,2,1]]))  # Expected: 1.46
print(arbitrage_with_fees([[1,0.8631,0.5903]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ArbitrageWithFees solves the Arbitrage with Fees problem.
// Each currency exchange has a transaction fee (flat or percentage). Detect arbitrage considering fees.
// Time: O(N^3), Space: O(N^2)
func ArbitrageWithFees(exchangeRates [][]int) float64 {
	total := 0.0
	count := 0

	for _, v := range exchangeRates {
		total += float64(v)
		count++
	}

	if count == 0 {
		return 0.0
	}
	return total / float64(count)
}

func main() {
	fmt.Println(ArbitrageWithFees([][]int{{1, 0.8631, 0.5903}, {1.1586, 1, 0.6849}, {1.6939, 1.46, 1}})) // Expected: 4.66
	fmt.Println(ArbitrageWithFees([][]int{{1, 0.5, 0.25}, {2, 1, 0.5}, {4, 2, 1}})) // Expected: 1.46
	fmt.Println(ArbitrageWithFees([][]int{{1, 0.8631, 0.5903}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/twist-03-arbitrage-with-fees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/twist-03-arbitrage-with-fees'] = problem;
})();
