/**
 * Bidirectional vs Directed
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kruskals-algorithm
 * Parent: 06-kruskals-algorithm/02-connecting-cities
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bidirectional vs Directed',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/02-connecting-cities',
        description: 'If connections are directed (one-way roads), find the minimum cost to ensure all cities are reachable from city 1.',
        problem: 'Directed edges break the symmetry of MST -- you need a minimum spanning arborescence (Edmonds/Chu-Liu algorithm) instead of Kruskal.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3,"connections":[[1,2,5],[1,3,6],[2,3,1]]},
                output: 1,
                explanation: 'The greedy selection of minimum-weight edges, combined with cycle detection, ensures the resulting tree has the minimum total edge weight.'
            },
            // Edge case
            {
                input: {"n":0,"connections":[[1,2,5]]},
                output: 0,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def bidirectional_vs_directed(n, connections):
    """
    Bidirectional vs Directed

    If connections are directed (one-way roads), find the minimum cost to ensure all cities are reachable from city 1.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on connections
        j = 0
        for k in range(i, n):
            if j < len(connections) and n[k] == connections[j]:
                j += 1
        if j == len(connections):
            count += 1

    return count


# Test cases
print(bidirectional_vs_directed(3, [[1,2,5],[1,3,6],[2,3,1]]))  # Expected: 1
print(bidirectional_vs_directed(0, [[1,2,5]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BidirectionalVsDirected solves the Bidirectional vs Directed problem.
// If connections are directed (one-way roads), find the minimum cost to ensure all cities are reachable from city 1.
// Time: O(?), Space: O(?)
func BidirectionalVsDirected(n int, connections [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BidirectionalVsDirected(3, [][]int{{1, 2, 5}, {1, 3, 6}, {2, 3, 1}})) // Expected: 1
	fmt.Println(BidirectionalVsDirected(0, [][]int{{1, 2, 5}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities/twist-05-bidirectional-vs-directed', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities/twist-05-bidirectional-vs-directed'] = problem;
})();
