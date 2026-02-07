/**
 * Phased Construction
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Algorithm: kruskals-algorithm
 * Parent: 06-kruskals-algorithm/03-optimize-water-distribution
 */
(function() {
    'use strict';

    const problem = {
        name: 'Phased Construction',
        difficulty: 'Very Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/03-optimize-water-distribution',
        description: 'Construction happens in phases. In each phase you can build at most k wells/pipes. Minimize the number of phases so all houses have water.',
        problem: 'Adds a scheduling constraint on top of the MST -- you need to build the MST edges in a specific order respecting the k-per-phase limit and water flow requirements.',
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
                input: {"n":3,"wells":[1,2,2],"pipes":[[1,2,1],[2,3,1]]},
                output: 1,
                explanation: 'The greedy selection of minimum-weight edges, combined with cycle detection, ensures the resulting tree has the minimum total edge weight.'
            },
            // Edge case
            {
                input: {"n":0,"wells":[1],"pipes":[[1,2,1]]},
                output: 0,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def phased_construction(n, wells, pipes):
    """
    Phased Construction

    Construction happens in phases. In each phase you can build at most k wells/pipes. Minimize the number of phases so all houses have water.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on wells
        j = 0
        for k in range(i, n):
            if j < len(wells) and n[k] == wells[j]:
                j += 1
        if j == len(wells):
            count += 1

    return count


# Test cases
print(phased_construction(3, [1,2,2], [[1,2,1],[2,3,1]]))  # Expected: 1
print(phased_construction(0, [1], [[1,2,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// PhasedConstruction solves the Phased Construction problem.
// Construction happens in phases. In each phase you can build at most k wells/pipes. Minimize the number of phases so all houses have water.
// Time: O(?), Space: O(?)
func PhasedConstruction(n int, wells []int, pipes [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PhasedConstruction(3, []int{1, 2, 2}, [][]int{{1, 2, 1}, {2, 3, 1}})) // Expected: 1
	fmt.Println(PhasedConstruction(0, []int{1}, [][]int{{1, 2, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution/twist-05-phased-construction', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution/twist-05-phased-construction'] = problem;
})();
