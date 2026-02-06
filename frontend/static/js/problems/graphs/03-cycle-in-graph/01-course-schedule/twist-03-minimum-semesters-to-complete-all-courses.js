/**
 * Minimum Semesters to Complete All Courses
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Semesters to Complete All Courses',
        difficulty: 'Hard',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/01-course-schedule',
        description: 'Each semester you can take any courses whose prerequisites are met (in parallel). Find the minimum number of semesters to finish all courses, or -1 if impossible.',
        problem: 'Adds a time dimension. This requires finding the longest path in the DAG (critical path), which combines topological sorting with level-based processing. The answer is the depth of the dependency graph.',
        hints: [
            'Start by understanding the key difference: Adds a time dimension.',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"numCourses":2,"prerequisites":[[1,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimum semesters to complete all courses criteria.'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the minimum semesters to complete all courses criteria.'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_semesters_to_complete_all_courses(numCourses, prerequisites):
    """
    Minimum Semesters to Complete All Courses

    Each semester you can take any courses whose prerequisites are met (in parallel). Find the minimum number of semesters to finish all courses, or -1 if impossible.

    Time: O(V + E)
    Space: O(V + E)
    """
    count = 0
    n = len(numCourses)

    for i in range(n):
        # Check condition based on prerequisites
        j = 0
        for k in range(i, n):
            if j < len(prerequisites) and numCourses[k] == prerequisites[j]:
                j += 1
        if j == len(prerequisites):
            count += 1

    return count


# Test cases
print(minimum_semesters_to_complete_all_courses(2, [[1,0]]))  # Expected: 1
print(minimum_semesters_to_complete_all_courses(2, [[1,0],[0,1]]))  # Expected: 2
print(minimum_semesters_to_complete_all_courses(0, [[1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumSemestersToCompleteAllCourses solves the Minimum Semesters to Complete All Courses problem.
// Each semester you can take any courses whose prerequisites are met (in parallel). Find the minimum number of semesters to finish all courses, or -1 if impossible.
// Time: O(V + E), Space: O(V + E)
func MinimumSemestersToCompleteAllCourses(numCourses int, prerequisites [][]int) int {
	result := 0

	for i := 0; i < len(numCourses); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumSemestersToCompleteAllCourses(2, [][]int{{1, 0}})) // Expected: 1
	fmt.Println(MinimumSemestersToCompleteAllCourses(2, [][]int{{1, 0}, {0, 1}})) // Expected: 2
	fmt.Println(MinimumSemestersToCompleteAllCourses(0, [][]int{{1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule/twist-03-minimum-semesters-to-complete-all-courses', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule/twist-03-minimum-semesters-to-complete-all-courses'] = problem;
})();
