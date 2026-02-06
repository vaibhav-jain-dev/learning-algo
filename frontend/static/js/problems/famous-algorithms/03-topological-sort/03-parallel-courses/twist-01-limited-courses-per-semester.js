/**
 * Limited Courses Per Semester
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';

    const problem = {
        name: 'Limited Courses Per Semester',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'You can take at most k courses per semester. Find the minimum number of semesters to complete all courses.',
        problem: 'With a capacity constraint, you cannot take all available courses each semester, requiring greedy or DP-based selection of which courses to prioritize.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the limited courses per semester criteria.'
            },
            // Edge case
            {
                input: {"n":0,"relations":[[1,3]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def limited_courses_per_semester(n, relations):
    """
    Limited Courses Per Semester

    You can take at most k courses per semester. Find the minimum number of semesters to complete all courses.

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
print(limited_courses_per_semester(3, [[1,3],[2,3]]))  # Expected: 1
print(limited_courses_per_semester(0, [[1,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LimitedCoursesPerSemester solves the Limited Courses Per Semester problem.
// You can take at most k courses per semester. Find the minimum number of semesters to complete all courses.
// Time: O(?), Space: O(?)
func LimitedCoursesPerSemester(n int, relations [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LimitedCoursesPerSemester(3, [][]int{{1, 3}, {2, 3}})) // Expected: 1
	fmt.Println(LimitedCoursesPerSemester(0, [][]int{{1, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-01-limited-courses-per-semester', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-01-limited-courses-per-semester'] = problem;
})();
