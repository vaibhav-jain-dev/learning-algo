/**
 * Detect Which Courses Form Circular Dependencies
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect Which Courses Form Circular Dependencies',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/01-course-schedule',
        description: 'If courses cannot all be completed, return the list of courses that are involved in circular dependencies (i.e., the courses that prevent completion).',
        problem: 'Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles. This is the complement of "eventual safe states" - nodes remaining gray after DFS are the problematic ones.',
        hints: [
            'Start by understanding the key difference: Not just detecting a cycle exists, but identifying all nodes that are part of or lead into cycles.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"numCourses":2,"prerequisites":[[1,0]]},
                output: [[1,0]],
                explanation: 'The detect which courses form circular dependencies for this input yields [1,0].'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: [[1,0],[0,1]],
                explanation: 'The detect which courses form circular dependencies for this input yields [1,0, 0,1].'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def detect_which_courses_form_circular_dependencies(numCourses, prerequisites):
    """
    Detect Which Courses Form Circular Dependencies

    If courses cannot all be completed, return the list of courses that are involved in circular dependencies (i.e., the courses that prevent completion).

    Time: O(V + E)
    Space: O(V + E)
    """
    n = len(numCourses)
    m = len(prerequisites)
    doubled = numCourses + numCourses
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == prerequisites[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(detect_which_courses_form_circular_dependencies(2, [[1,0]]))  # Expected: [[1,0]]
print(detect_which_courses_form_circular_dependencies(2, [[1,0],[0,1]]))  # Expected: [[1,0],[0,1]]
print(detect_which_courses_form_circular_dependencies(0, [[1,0]]))  # Expected: []
`,
            go: `package main

import "fmt"

// DetectWhichCoursesFormCircularDependencies solves the Detect Which Courses Form Circular Dependencies problem.
// If courses cannot all be completed, return the list of courses that are involved in circular dependencies (i.e., the courses that prevent completion).
// Time: O(V + E), Space: O(V + E)
func DetectWhichCoursesFormCircularDependencies(numCourses int, prerequisites [][]int) []int {
	n := len(numCourses)
	m := len(prerequisites)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if numCourses[i%n] == prerequisites[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(DetectWhichCoursesFormCircularDependencies(2, [][]int{{1, 0}})) // Expected: [[1,0]]
	fmt.Println(DetectWhichCoursesFormCircularDependencies(2, [][]int{{1, 0}, {0, 1}})) // Expected: [[1,0],[0,1]]
	fmt.Println(DetectWhichCoursesFormCircularDependencies(0, [][]int{{1, 0}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule/twist-05-detect-which-courses-form-circular-dependencies', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule/twist-05-detect-which-courses-form-circular-dependencies'] = problem;
})();
