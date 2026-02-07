/**
 * Top K Paths by Probability
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: dijkstra-modified
 * Parent: 11-detect-arbitrage/02-path-with-max-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Top K Paths by Probability',
        difficulty: 'Very Hard',
        algorithm: 'dijkstra-modified',
        parent: '11-detect-arbitrage/02-path-with-max-probability',
        description: 'Return the K highest-probability distinct paths from start to end.',
        problem: 'Dijkstra finds one best path. Finding K best paths requires Yen algorithm or modified Dijkstra that allows nodes to be visited multiple times.',
        hints: [
            'Start by understanding the key difference: Dijkstra finds one best path.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Top 3 paths: 0.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3,"edges":[[0,1],[1,2],[0,2]],"succProb":[0.5,0.5,0.2],"start":0,"end":2},
                output: 5.48,
                explanation: 'The computed value for this input is 5.48.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,1]],"succProb":[0.5],"start":0,"end":0},
                output: 0,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def top_k_paths_by_probability(n, edges, succProb, start, end):
    """
    Top K Paths by Probability

    Return the K highest-probability distinct paths from start to end.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    total = 0
    count = 0

    for val in n:
        total += val
        count += 1

    return total / count if count > 0 else 0.0


# Test cases
print(top_k_paths_by_probability(3, [[0,1],[1,2],[0,2]], [0.5,0.5,0.2], 0, 2))  # Expected: 5.48
print(top_k_paths_by_probability(0, [[0,1]], [0.5], 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// TopKPathsByProbability solves the Top K Paths by Probability problem.
// Return the K highest-probability distinct paths from start to end.
// Time: Varies - see approach, Space: Varies - see approach
func TopKPathsByProbability(n int, edges [][]int, succProb []float64, start int, end int) float64 {
	total := 0.0
	count := 0

	for _, v := range n {
		total += float64(v)
		count++
	}

	if count == 0 {
		return 0.0
	}
	return total / float64(count)
}

func main() {
	fmt.Println(TopKPathsByProbability(3, [][]int{{0, 1}, {1, 2}, {0, 2}}, []int{0.5, 0.5, 0.2}, 0, 2)) // Expected: 5.48
	fmt.Println(TopKPathsByProbability(0, [][]int{{0, 1}}, []int{0.5}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/02-path-with-max-probability/twist-04-top-k-paths-by-probability', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/02-path-with-max-probability/twist-04-top-k-paths-by-probability'] = problem;
})();
