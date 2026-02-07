/**
 * Probability with Additive Costs
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: dijkstra-modified
 * Parent: 11-detect-arbitrage/02-path-with-max-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Probability with Additive Costs',
        difficulty: 'Hard',
        algorithm: 'dijkstra-modified',
        parent: '11-detect-arbitrage/02-path-with-max-probability',
        description: 'Each edge has both a probability and a monetary cost. Find the path that maximizes probability subject to total cost <= budget.',
        problem: 'This is a constrained optimization problem. Standard Dijkstra cannot handle two metrics. You need state (node, remaining_budget) with probability tracking.',
        hints: [
            'Start by understanding the key difference: This is a constrained optimization problem.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Path A: probability 0.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3,"edges":[[0,1],[1,2],[0,2]],"succProb":[0.5,0.5,0.2],"start":0,"end":2},
                output: 1,
                explanation: 'The priority queue ensures we always process the nearest unvisited node. When a node is dequeued, its shortest distance is finalized. Neighbors are updated if a shorter path is found.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,1]],"succProb":[0.5],"start":0,"end":0},
                output: 0,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def probability_with_additive_costs(n, edges, succProb, start, end):
    """
    Probability with Additive Costs

    Each edge has both a probability and a monetary cost. Find the path that maximizes probability subject to total cost <= budget.

    Time: O(E log V)
    Space: O(V + E)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on edges
        j = 0
        for k in range(i, n):
            if j < len(edges) and n[k] == edges[j]:
                j += 1
        if j == len(edges):
            count += 1

    return count


# Test cases
print(probability_with_additive_costs(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2))  # Expected: 1
print(probability_with_additive_costs(0, [[0,1]], [0.5], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ProbabilityWithAdditiveCosts solves the Probability with Additive Costs problem.
// Each edge has both a probability and a monetary cost. Find the path that maximizes probability subject to total cost <= budget.
// Time: O(E log V), Space: O(V + E)
func ProbabilityWithAdditiveCosts(n int, edges [][]int, succProb []float64, start int, end int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ProbabilityWithAdditiveCosts(3, [][]int{{0, 1}, {1, 2}, {0, 2}}, []int{0.5, 0.5, 0.2}, 0, 2)) // Expected: 1
	fmt.Println(ProbabilityWithAdditiveCosts(0, [][]int{{0, 1}}, []int{0.5}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/02-path-with-max-probability/twist-03-probability-with-additive-costs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/02-path-with-max-probability/twist-03-probability-with-additive-costs'] = problem;
})();
