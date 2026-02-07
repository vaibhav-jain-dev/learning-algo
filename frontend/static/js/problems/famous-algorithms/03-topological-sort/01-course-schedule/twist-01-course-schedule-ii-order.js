/**
 * Course Schedule II (Order)
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule II (Order)',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Return one valid order in which courses can be taken, not just whether it is possible.',
        problem: 'Extends from boolean feasibility to constructing a concrete ordering, requiring you to record the topological order during BFS.',
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
                input: {"numCourses":2,"prerequisites":[[1,0]]},
                output: true,
                explanation: 'The course schedule ii order condition is satisfied for this input.'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: false,
                explanation: 'The course schedule ii order condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: false,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def course_schedule_ii_order(numCourses, prerequisites):
    """
    Course Schedule II (Order)

    Return one valid order in which courses can be taken, not just whether it is possible.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(numCourses)):
        if j < len(prerequisites) and numCourses[i] == prerequisites[j]:
            j += 1

    return j == len(prerequisites)


# Test cases
print(course_schedule_ii_order(2, [[1,0]]))  # Expected: True
print(course_schedule_ii_order(2, [[1,0],[0,1]]))  # Expected: False
print(course_schedule_ii_order(0, [[1,0]]))  # Expected: False
`,
            go: `package main

import "fmt"

// CourseScheduleIiOrder solves the Course Schedule II (Order) problem.
// Return one valid order in which courses can be taken, not just whether it is possible.
// Time: O(?), Space: O(?)
func CourseScheduleIiOrder(numCourses int, prerequisites [][]int) bool {
	j := 0

	for i := 0; i < len(numCourses) && j < len(prerequisites); i++ {
		if numCourses[i] == prerequisites[j] {
			j++
		}
	}

	return j == len(prerequisites)
}

func main() {
	fmt.Println(CourseScheduleIiOrder(2, [][]int{{1, 0}})) // Expected: true
	fmt.Println(CourseScheduleIiOrder(2, [][]int{{1, 0}, {0, 1}})) // Expected: false
	fmt.Println(CourseScheduleIiOrder(0, [][]int{{1, 0}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-01-course-schedule-ii-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-01-course-schedule-ii-order'] = problem;
})();
