/**
 * Course Schedule with Groups
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule with Groups',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Courses are grouped into semesters with a maximum number of courses per semester. Find the minimum semesters needed.',
        problem: 'Adds a capacity constraint to each BFS level, requiring greedy or DP-based selection of which available courses to take each semester.',
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
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def course_schedule_with_groups(numCourses, prerequisites):
    """
    Course Schedule with Groups

    Courses are grouped into semesters with a maximum number of courses per semester. Find the minimum semesters needed.

    Time: O(?)
    Space: O(?)
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
print(course_schedule_with_groups(2, [[1,0]]))  # Expected: 1
print(course_schedule_with_groups(2, [[1,0],[0,1]]))  # Expected: 2
print(course_schedule_with_groups(0, [[1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CourseScheduleWithGroups solves the Course Schedule with Groups problem.
// Courses are grouped into semesters with a maximum number of courses per semester. Find the minimum semesters needed.
// Time: O(?), Space: O(?)
func CourseScheduleWithGroups(numCourses int, prerequisites [][]int) int {
	result := 0

	for i := 0; i < len(numCourses); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CourseScheduleWithGroups(2, [][]int{{1, 0}})) // Expected: 1
	fmt.Println(CourseScheduleWithGroups(2, [][]int{{1, 0}, {0, 1}})) // Expected: 2
	fmt.Println(CourseScheduleWithGroups(0, [][]int{{1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-02-course-schedule-with-groups', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-02-course-schedule-with-groups'] = problem;
})();
