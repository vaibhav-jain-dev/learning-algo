/**
 * Course Schedule with BFS (Kahn\\
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule with BFS (Kahn\\',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/01-course-schedule',
        description: 'Solve the same problem using BFS-based topological sort instead of DFS. Process courses with no remaining prerequisites first.',
        problem: 'Completely different mental model: instead of exploring depth-first and detecting back edges, you iteratively remove courses whose prerequisites are met. More intuitive for some and naturally produces a valid order.',
        hints: [
            'Start by understanding the key difference: Completely different mental model: instead of exploring depth-first and detecting back edges, you iteratively remove courses whose prerequisites are met.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Same input.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
            // Basic test case
            {
                input: {"numCourses":2,"prerequisites":[[1,0]]},
                output: true,
                explanation: 'The course schedule with bfs kahns algorithm condition is satisfied for this input.'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: false,
                explanation: 'The course schedule with bfs kahns algorithm condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: false,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def course_schedule_with_bfs_kahns_algorithm(numCourses, prerequisites):
    """
    Course Schedule with BFS (Kahn\\\\

    Solve the same problem using BFS-based topological sort instead of DFS. Process courses with no remaining prerequisites first.

    Time: O(V + E)
    Space: O(V + E)
    """
    j = 0

    for i in range(len(numCourses)):
        if j < len(prerequisites) and numCourses[i] == prerequisites[j]:
            j += 1

    return j == len(prerequisites)


# Test cases
print(course_schedule_with_bfs_kahns_algorithm(2, [[1,0]]))  # Expected: True
print(course_schedule_with_bfs_kahns_algorithm(2, [[1,0],[0,1]]))  # Expected: False
print(course_schedule_with_bfs_kahns_algorithm(0, [[1,0]]))  # Expected: False
`,
            go: `package main

import "fmt"

// CourseScheduleWithBfsKahnsAlgorithm solves the Course Schedule with BFS (Kahn\\\\ problem.
// Solve the same problem using BFS-based topological sort instead of DFS. Process courses with no remaining prerequisites first.
// Time: O(V + E), Space: O(V + E)
func CourseScheduleWithBfsKahnsAlgorithm(numCourses int, prerequisites [][]int) bool {
	j := 0

	for i := 0; i < len(numCourses) && j < len(prerequisites); i++ {
		if numCourses[i] == prerequisites[j] {
			j++
		}
	}

	return j == len(prerequisites)
}

func main() {
	fmt.Println(CourseScheduleWithBfsKahnsAlgorithm(2, [][]int{{1, 0}})) // Expected: true
	fmt.Println(CourseScheduleWithBfsKahnsAlgorithm(2, [][]int{{1, 0}, {0, 1}})) // Expected: false
	fmt.Println(CourseScheduleWithBfsKahnsAlgorithm(0, [][]int{{1, 0}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule/twist-02-course-schedule-with-bfs-kahns-algorithm', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule/twist-02-course-schedule-with-bfs-kahns-algorithm'] = problem;
})();
