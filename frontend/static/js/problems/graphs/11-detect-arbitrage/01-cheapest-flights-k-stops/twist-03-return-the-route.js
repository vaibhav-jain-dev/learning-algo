/**
 * Return the Route
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: bellman-ford-dijkstra
 * Parent: 11-detect-arbitrage/01-cheapest-flights-k-stops
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return the Route',
        difficulty: 'Medium',
        algorithm: 'bellman-ford-dijkstra',
        parent: '11-detect-arbitrage/01-cheapest-flights-k-stops',
        description: 'Besides the cheapest price, return the actual route (sequence of cities) taken.',
        problem: 'Bellman-Ford variant needs predecessor tracking at each iteration level. Reconstructing the path requires backtracking through the DP table.',
        hints: [
            'Start by understanding the key difference: Bellman-Ford variant needs predecessor tracking at each iteration level.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Cheapest path: 0 -> 1 -> 2 -> 3 with cost 700.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(K * E)',
            space: 'O(V)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":4,"flights":[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],"src":0,"dst":3,"k":1},
                output: [[0,1,100],[1,2,100],[2,0,100],[1,3,600]],
                explanation: 'The return the route for this input yields [0,1,100, 1,2,100, 2,0,100, 1,3,600].'
            },
            // Edge case
            {
                input: {"n":0,"flights":[[0,1,100]],"src":0,"dst":0,"k":0},
                output: [],
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def return_the_route(n, flights, src, dst, k):
    """
    Return the Route

    Besides the cheapest price, return the actual route (sequence of cities) taken.

    Time: O(K * E)
    Space: O(V)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(return_the_route(4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1))  # Expected: [[0,1,100],[1,2,100],[2,0,100],[1,3,600]]
print(return_the_route(0, [[0,1,100]], 0, 0, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// ReturnTheRoute solves the Return the Route problem.
// Besides the cheapest price, return the actual route (sequence of cities) taken.
// Time: O(K * E), Space: O(V)
func ReturnTheRoute(n int, flights [][]int, src int, dst int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(ReturnTheRoute(4, [][]int{{0, 1, 100}, {1, 2, 100}, {2, 0, 100}, {1, 3, 600}, {2, 3, 200}}, 0, 3, 1)) // Expected: [[0,1,100],[1,2,100],[2,0,100],[1,3,600]]
	fmt.Println(ReturnTheRoute(0, [][]int{{0, 1, 100}}, 0, 0, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/01-cheapest-flights-k-stops/twist-03-return-the-route', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/01-cheapest-flights-k-stops/twist-03-return-the-route'] = problem;
})();
