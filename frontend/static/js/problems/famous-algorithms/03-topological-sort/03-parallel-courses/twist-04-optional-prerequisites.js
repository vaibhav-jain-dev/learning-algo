/**
 * Optional Prerequisites
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';

    const problem = {
        name: 'Optional Prerequisites',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Some prerequisites are optional (recommended but not required). Find the minimum semesters if you skip all optional prerequisites.',
        problem: 'Requires partitioning edges into required and optional, then finding the critical path considering only required edges while tracking optional ones for reporting.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the optional prerequisites criteria.'
            },
            // Edge case
            {
                input: {"n":0,"relations":[[1,3]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def optional_prerequisites(n, relations):
    """
    Optional Prerequisites

    Some prerequisites are optional (recommended but not required). Find the minimum semesters if you skip all optional prerequisites.

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
print(optional_prerequisites(3, [[1,3],[2,3]]))  # Expected: 1
print(optional_prerequisites(0, [[1,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// OptionalPrerequisites solves the Optional Prerequisites problem.
// Some prerequisites are optional (recommended but not required). Find the minimum semesters if you skip all optional prerequisites.
// Time: O(?), Space: O(?)
func OptionalPrerequisites(n int, relations [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(OptionalPrerequisites(3, [][]int{{1, 3}, {2, 3}})) // Expected: 1
	fmt.Println(OptionalPrerequisites(0, [][]int{{1, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-04-optional-prerequisites', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-04-optional-prerequisites'] = problem;
})();
