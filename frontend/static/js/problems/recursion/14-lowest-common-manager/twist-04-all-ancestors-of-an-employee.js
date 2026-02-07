/**
 * All Ancestors of an Employee
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-manager
 * Parent: 14-lowest-common-manager
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Ancestors of an Employee',
        difficulty: 'Easy',
        algorithm: 'recursion-manager',
        parent: '14-lowest-common-manager',
        description: 'Given an employee, return all their managers (ancestors) from direct manager up to the top manager.',
        problem: 'Simplifies to a single-target search but requires collecting the entire path from root to target rather than identifying a meeting point.',
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
            python: `def all_ancestors_of_an_employee(topManager, employee1, employee2):
    """
    All Ancestors of an Employee

    Given an employee, return all their managers (ancestors) from direct manager up to the top manager.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for item in topManager:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(all_ancestors_of_an_employee("A", "E", "G"))  # Expected: "result"
print(all_ancestors_of_an_employee("", "", ""))  # Expected: ""
`,
            go: `package main

import "fmt"

// AllAncestorsOfAnEmployee solves the All Ancestors of an Employee problem.
// Given an employee, return all their managers (ancestors) from direct manager up to the top manager.
// Time: O(?), Space: O(?)
func AllAncestorsOfAnEmployee(topManager string, employee1 string, employee2 string) string {
	result := ""

	for _, v := range topManager {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(AllAncestorsOfAnEmployee("A", "E", "G")) // Expected: "result"
	fmt.Println(AllAncestorsOfAnEmployee("", "", "")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '14-lowest-common-manager/twist-04-all-ancestors-of-an-employee', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/14-lowest-common-manager/twist-04-all-ancestors-of-an-employee'] = problem;
})();
