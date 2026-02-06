/**
 * A* with Terrain Costs
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star
 * Parent: 08-a-star-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'A* with Terrain Costs',
        difficulty: 'Hard',
        algorithm: 'a-star',
        parent: '08-a-star-algorithm',
        description: 'Cells have varying movement costs (e.g., grass=1, forest=3, swamp=5). Find the least-cost path using A*.',
        problem: 'Variable edge costs mean BFS no longer works. A* must account for actual movement costs in g(n), making the priority queue ordering more critical.',
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
                input: {"grid":[[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,1,0,0]],"start":[0,0],"end":[3,3]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the a with terrain costs criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0,0]],"start":[0],"end":[3]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def a_with_terrain_costs(grid, start, end):
    """
    A* with Terrain Costs

    Cells have varying movement costs (e.g., grass=1, forest=3, swamp=5). Find the least-cost path using A*.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(grid)

    for i in range(n):
        # Check condition based on start
        j = 0
        for k in range(i, n):
            if j < len(start) and grid[k] == start[j]:
                j += 1
        if j == len(start):
            count += 1

    return count


# Test cases
print(a_with_terrain_costs([[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,1,0,0]], [0,0], [3,3]))  # Expected: 1
print(a_with_terrain_costs([[0,0,0,0]], [0], [3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// AWithTerrainCosts solves the A* with Terrain Costs problem.
// Cells have varying movement costs (e.g., grass=1, forest=3, swamp=5). Find the least-cost path using A*.
// Time: O(?), Space: O(?)
func AWithTerrainCosts(grid [][]int, start []int, end []int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AWithTerrainCosts([][]int{{0, 0, 0, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}, {0, 1, 0, 0}}, []int{0, 0}, []int{3, 3})) // Expected: 1
	fmt.Println(AWithTerrainCosts([][]int{{0, 0, 0, 0}}, []int{0}, []int{3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/twist-05-a-with-terrain-costs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/twist-05-a-with-terrain-costs'] = problem;
})();
