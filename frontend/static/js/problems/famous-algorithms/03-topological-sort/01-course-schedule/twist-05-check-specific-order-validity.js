/**
 * Check Specific Order Validity
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/01-course-schedule
 */
(function() {
    'use strict';

    const problem = {
        name: 'Check Specific Order Validity',
        difficulty: 'Easy',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/01-course-schedule',
        description: 'Given a proposed course ordering, verify if it respects all prerequisite constraints.',
        problem: 'Inverts from generating a valid order to validating a given one, which is simpler -- just check that every prerequisite appears before its dependent course.',
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
                explanation: 'The check specific order validity condition is satisfied for this input.'
            },
            {
                input: {"numCourses":2,"prerequisites":[[1,0],[0,1]]},
                output: false,
                explanation: 'The check specific order validity condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"numCourses":0,"prerequisites":[[1,0]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def check_specific_order_validity(numCourses, prerequisites):
    """
    Check Specific Order Validity

    Given a proposed course ordering, verify if it respects all prerequisite constraints.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(numCourses)):
        if j < len(prerequisites) and numCourses[i] == prerequisites[j]:
            j += 1

    return j == len(prerequisites)


# Test cases
print(check_specific_order_validity(2, [[1,0]]))  # Expected: True
print(check_specific_order_validity(2, [[1,0],[0,1]]))  # Expected: False
print(check_specific_order_validity(0, [[1,0]]))  # Expected: False
`,
            go: `package main

import "fmt"

// CheckSpecificOrderValidity solves the Check Specific Order Validity problem.
// Given a proposed course ordering, verify if it respects all prerequisite constraints.
// Time: O(?), Space: O(?)
func CheckSpecificOrderValidity(numCourses int, prerequisites [][]int) bool {
	j := 0

	for i := 0; i < len(numCourses) && j < len(prerequisites); i++ {
		if numCourses[i] == prerequisites[j] {
			j++
		}
	}

	return j == len(prerequisites)
}

func main() {
	fmt.Println(CheckSpecificOrderValidity(2, [][]int{{1, 0}})) // Expected: true
	fmt.Println(CheckSpecificOrderValidity(2, [][]int{{1, 0}, {0, 1}})) // Expected: false
	fmt.Println(CheckSpecificOrderValidity(0, [][]int{{1, 0}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/01-course-schedule/twist-05-check-specific-order-validity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/01-course-schedule/twist-05-check-specific-order-validity'] = problem;
})();
