/**
 * Maximum Parallelism
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Parallelism',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Find the maximum number of courses that can be taken simultaneously in any single semester.',
        problem: 'Instead of counting semesters, find the widest level in the BFS -- the semester where the most courses have all prerequisites met simultaneously.',
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
                input: {"n":3,"relations":[[1,3],[2,3]]},
                output: 2,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"n":0,"relations":[[1,3]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def maximum_parallelism(n, relations):
    """
    Maximum Parallelism

    Find the maximum number of courses that can be taken simultaneously in any single semester.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on relations
        j = 0
        for k in range(i, n):
            if j < len(relations) and n[k] == relations[j]:
                j += 1
        if j == len(relations):
            count += 1

    return count


# Test cases
print(maximum_parallelism(3, [[1,3],[2,3]]))  # Expected: 2
print(maximum_parallelism(0, [[1,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaximumParallelism solves the Maximum Parallelism problem.
// Find the maximum number of courses that can be taken simultaneously in any single semester.
// Time: O(?), Space: O(?)
func MaximumParallelism(n int, relations [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaximumParallelism(3, [][]int{{1, 3}, {2, 3}})) // Expected: 2
	fmt.Println(MaximumParallelism(0, [][]int{{1, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-05-maximum-parallelism', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-05-maximum-parallelism'] = problem;
})();
