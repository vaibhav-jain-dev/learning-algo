/**
 * Maintenance Cost Over Time
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kruskals-algorithm
 * Parent: 06-kruskals-algorithm/03-optimize-water-distribution
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maintenance Cost Over Time',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/03-optimize-water-distribution',
        description: 'Wells have annual maintenance costs, while pipes have one-time installation costs. Minimize total cost over T years.',
        problem: 'The well cost is now wells[i]*T (recurring) while pipe costs are one-time, changing the tradeoff and potentially different optimal solutions for different time horizons.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the maintenance cost over time criteria.'
            },
            // Edge case
            {
                input: {"n":0,"wells":[1],"pipes":[[1,2,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def maintenance_cost_over_time(n, wells, pipes):
    """
    Maintenance Cost Over Time

    Wells have annual maintenance costs, while pipes have one-time installation costs. Minimize total cost over T years.

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
print(maintenance_cost_over_time(3, [1,2,2], [[1,2,1],[2,3,1]]))  # Expected: 1
print(maintenance_cost_over_time(0, [1], [[1,2,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaintenanceCostOverTime solves the Maintenance Cost Over Time problem.
// Wells have annual maintenance costs, while pipes have one-time installation costs. Minimize total cost over T years.
// Time: O(?), Space: O(?)
func MaintenanceCostOverTime(n int, wells []int, pipes [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaintenanceCostOverTime(3, []int{1, 2, 2}, [][]int{{1, 2, 1}, {2, 3, 1}})) // Expected: 1
	fmt.Println(MaintenanceCostOverTime(0, []int{1}, [][]int{{1, 2, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution/twist-03-maintenance-cost-over-time', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution/twist-03-maintenance-cost-over-time'] = problem;
})();
