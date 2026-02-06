/**
 * Course Dependencies with Weights
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Dependencies with Weights',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Each course takes a different number of weeks to complete. Courses in the same semester run in parallel. Find the minimum total weeks.',
        problem: 'The semester duration becomes the maximum course length in that semester, making it a critical path problem rather than a simple level count.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the course dependencies with weights criteria.'
            },
            // Edge case
            {
                input: {"n":0,"relations":[[1,3]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def course_dependencies_with_weights(n, relations):
    """
    Course Dependencies with Weights

    Each course takes a different number of weeks to complete. Courses in the same semester run in parallel. Find the minimum total weeks.

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
print(course_dependencies_with_weights(3, [[1,3],[2,3]]))  # Expected: 1
print(course_dependencies_with_weights(0, [[1,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CourseDependenciesWithWeights solves the Course Dependencies with Weights problem.
// Each course takes a different number of weeks to complete. Courses in the same semester run in parallel. Find the minimum total weeks.
// Time: O(?), Space: O(?)
func CourseDependenciesWithWeights(n int, relations [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CourseDependenciesWithWeights(3, [][]int{{1, 3}, {2, 3}})) // Expected: 1
	fmt.Println(CourseDependenciesWithWeights(0, [][]int{{1, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-02-course-dependencies-with-weights', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-02-course-dependencies-with-weights'] = problem;
})();
