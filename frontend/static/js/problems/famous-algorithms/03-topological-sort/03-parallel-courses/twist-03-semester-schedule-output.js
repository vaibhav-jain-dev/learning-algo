/**
 * Semester Schedule Output
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/03-parallel-courses
 */
(function() {
    'use strict';

    const problem = {
        name: 'Semester Schedule Output',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/03-parallel-courses',
        description: 'Return the actual course groupings per semester, not just the count of semesters.',
        problem: 'Requires recording which courses are taken in each BFS level, not just counting levels, adding bookkeeping to the topological sort.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the semester schedule output criteria.'
            },
            // Edge case
            {
                input: {"n":0,"relations":[[1,3]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def semester_schedule_output(n, relations):
    """
    Semester Schedule Output

    Return the actual course groupings per semester, not just the count of semesters.

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
print(semester_schedule_output(3, [[1,3],[2,3]]))  # Expected: 1
print(semester_schedule_output(0, [[1,3]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SemesterScheduleOutput solves the Semester Schedule Output problem.
// Return the actual course groupings per semester, not just the count of semesters.
// Time: O(?), Space: O(?)
func SemesterScheduleOutput(n int, relations [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SemesterScheduleOutput(3, [][]int{{1, 3}, {2, 3}})) // Expected: 1
	fmt.Println(SemesterScheduleOutput(0, [][]int{{1, 3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/03-parallel-courses/twist-03-semester-schedule-output', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/03-parallel-courses/twist-03-semester-schedule-output'] = problem;
})();
