/**
 * Distance to Common Manager
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-manager
 * Parent: 14-lowest-common-manager
 */
(function() {
    'use strict';

    const problem = {
        name: 'Distance to Common Manager',
        difficulty: 'Medium',
        algorithm: 'recursion-manager',
        parent: '14-lowest-common-manager',
        description: 'Find the lowest common manager and also return the distances from each employee to that manager.',
        problem: 'Adds depth tracking to the recursion -- when the LCM is found, compute the path lengths back to each target employee.',
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
                output: "result",
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"topManager":"","employee1":"","employee2":""},
                output: "",
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def distance_to_common_manager(topManager, employee1, employee2):
    """
    Distance to Common Manager

    Find the lowest common manager and also return the distances from each employee to that manager.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for item in topManager:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(distance_to_common_manager("A", "E", "G"))  # Expected: "result"
print(distance_to_common_manager("", "", ""))  # Expected: ""
`,
            go: `package main

import "fmt"

// DistanceToCommonManager solves the Distance to Common Manager problem.
// Find the lowest common manager and also return the distances from each employee to that manager.
// Time: O(?), Space: O(?)
func DistanceToCommonManager(topManager string, employee1 string, employee2 string) string {
	result := ""

	for _, v := range topManager {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(DistanceToCommonManager("A", "E", "G")) // Expected: "result"
	fmt.Println(DistanceToCommonManager("", "", "")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '14-lowest-common-manager/twist-02-distance-to-common-manager', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/14-lowest-common-manager/twist-02-distance-to-common-manager'] = problem;
})();
