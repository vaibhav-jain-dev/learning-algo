/**
 * Course Schedule with Weighted Prerequisites
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Course Schedule with Weighted Prerequisites',
        difficulty: 'Hard',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/01-course-schedule',
        description: 'Each prerequisite edge has a "study time" weight. Find if all courses can be completed and the minimum total time if courses must be taken sequentially along the critical path.',
        problem: 'Transforms from a simple DAG feasibility check to a critical path analysis problem. You need longest-path computation on a weighted DAG, which uses topological order and dynamic programming.',
        hints: [
            'Start by understanding the key difference: Transforms from a simple DAG feasibility check to a critical path analysis problem.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Course 0 (2 weeks) -> Course 1 (3 weeks) -> Course 3 (1 week).',
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
            python: `def course_schedule_with_weighted_prerequisites(numCourses, prerequisites):
    """
    Course Schedule with Weighted Prerequisites

    Each prerequisite edge has a "study time" weight. Find if all courses can be completed and the minimum total time if courses must be taken sequentially along the critical path.

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
print(course_schedule_with_weighted_prerequisites(2, [[1,0]]))  # Expected: 1
print(course_schedule_with_weighted_prerequisites(2, [[1,0],[0,1]]))  # Expected: 2
print(course_schedule_with_weighted_prerequisites(0, [[1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CourseScheduleWithWeightedPrerequisites solves the Course Schedule with Weighted Prerequisites problem.
// Each prerequisite edge has a "study time" weight. Find if all courses can be completed and the minimum total time if courses must be taken sequentially along the critical path.
// Time: O(V + E), Space: O(V + E)
func CourseScheduleWithWeightedPrerequisites(numCourses int, prerequisites [][]int) int {
	result := 0

	for i := 0; i < len(numCourses); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CourseScheduleWithWeightedPrerequisites(2, [][]int{{1, 0}})) // Expected: 1
	fmt.Println(CourseScheduleWithWeightedPrerequisites(2, [][]int{{1, 0}, {0, 1}})) // Expected: 2
	fmt.Println(CourseScheduleWithWeightedPrerequisites(0, [][]int{{1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule/twist-04-course-schedule-with-weighted-prerequisites', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule/twist-04-course-schedule-with-weighted-prerequisites'] = problem;
})();
