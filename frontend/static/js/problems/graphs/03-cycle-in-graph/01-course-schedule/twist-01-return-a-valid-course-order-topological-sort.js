/**
 * Return a Valid Course Order (Topological Sort)
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-cycle
 * Parent: 03-cycle-in-graph/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return a Valid Course Order (Topological Sort)',
        difficulty: 'Medium',
        algorithm: 'graph-cycle',
        parent: '03-cycle-in-graph/01-course-schedule',
        description: 'Instead of just checking feasibility, return an actual ordering of courses that satisfies all prerequisites. This is Course Schedule II.',
        problem: 'Shifts from pure cycle detection to topological sorting. You must collect nodes in post-order during DFS and reverse them, or use Kahn\\',
        hints: [
            'Start by understanding the key difference: Shifts from pure cycle detection to topological sorting.',
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
                output: true,
                explanation: 'The return a valid course order topological sort condition is satisfied for this input.'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: false,
                explanation: 'The return a valid course order topological sort condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def return_a_valid_course_order_topological_sort(numCourses, prerequisites):
    """
    Return a Valid Course Order (Topological Sort)

    Instead of just checking feasibility, return an actual ordering of courses that satisfies all prerequisites. This is Course Schedule II.

    Time: O(V + E)
    Space: O(V + E)
    """
    j = 0

    for i in range(len(numCourses)):
        if j < len(prerequisites) and numCourses[i] == prerequisites[j]:
            j += 1

    return j == len(prerequisites)


# Test cases
print(return_a_valid_course_order_topological_sort(2, [[1,0]]))  # Expected: True
print(return_a_valid_course_order_topological_sort(2, [[1,0],[0,1]]))  # Expected: False
print(return_a_valid_course_order_topological_sort(0, [[1,0]]))  # Expected: False
`,
            go: `package main

import "fmt"

// ReturnAValidCourseOrderTopologicalSort solves the Return a Valid Course Order (Topological Sort) problem.
// Instead of just checking feasibility, return an actual ordering of courses that satisfies all prerequisites. This is Course Schedule II.
// Time: O(V + E), Space: O(V + E)
func ReturnAValidCourseOrderTopologicalSort(numCourses int, prerequisites [][]int) bool {
	j := 0

	for i := 0; i < len(numCourses) && j < len(prerequisites); i++ {
		if numCourses[i] == prerequisites[j] {
			j++
		}
	}

	return j == len(prerequisites)
}

func main() {
	fmt.Println(ReturnAValidCourseOrderTopologicalSort(2, [][]int{{1, 0}})) // Expected: true
	fmt.Println(ReturnAValidCourseOrderTopologicalSort(2, [][]int{{1, 0}, {0, 1}})) // Expected: false
	fmt.Println(ReturnAValidCourseOrderTopologicalSort(0, [][]int{{1, 0}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '03-cycle-in-graph/01-course-schedule/twist-01-return-a-valid-course-order-topological-sort', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/03-cycle-in-graph/01-course-schedule/twist-01-return-a-valid-course-order-topological-sort'] = problem;
})();
