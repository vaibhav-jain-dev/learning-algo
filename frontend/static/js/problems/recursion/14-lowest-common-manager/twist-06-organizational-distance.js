/**
 * Organizational Distance
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-manager
 * Parent: 14-lowest-common-manager
 */
(function() {
    'use strict';

    const problem = {
        name: 'Organizational Distance',
        difficulty: 'Medium',
        algorithm: 'recursion-manager',
        parent: '14-lowest-common-manager',
        description: 'Compute the organizational distance between two employees, defined as the number of edges in the path between them through the org chart.',
        problem: 'Once the LCM is identified, the distance is the sum of depths of both employees minus twice the depth of the LCM, requiring depth computation.',
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
                input: {"topManager":"A","employee1":"E","employee2":"G"},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the organizational distance criteria.'
            },
            // Edge case
            {
                input: {"topManager":"","employee1":"","employee2":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def organizational_distance(topManager, employee1, employee2):
    """
    Organizational Distance

    Compute the organizational distance between two employees, defined as the number of edges in the path between them through the org chart.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(topManager)

    for i in range(n):
        # Check condition based on employee1
        j = 0
        for k in range(i, n):
            if j < len(employee1) and topManager[k] == employee1[j]:
                j += 1
        if j == len(employee1):
            count += 1

    return count


# Test cases
print(organizational_distance("A", "E", "G"))  # Expected: 1
print(organizational_distance("", "", ""))  # Expected: 0
`,
            go: `package main

import "fmt"

// OrganizationalDistance solves the Organizational Distance problem.
// Compute the organizational distance between two employees, defined as the number of edges in the path between them through the org chart.
// Time: O(?), Space: O(?)
func OrganizationalDistance(topManager string, employee1 string, employee2 string) int {
	result := 0

	for i := 0; i < len(topManager); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(OrganizationalDistance("A", "E", "G")) // Expected: 1
	fmt.Println(OrganizationalDistance("", "", "")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '14-lowest-common-manager/twist-06-organizational-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/14-lowest-common-manager/twist-06-organizational-distance'] = problem;
})();
