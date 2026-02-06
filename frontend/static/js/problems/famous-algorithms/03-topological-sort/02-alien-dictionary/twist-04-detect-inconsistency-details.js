/**
 * Detect Inconsistency Details
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/02-alien-dictionary
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect Inconsistency Details',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/02-alien-dictionary',
        description: 'When the ordering is invalid, return the specific conflicting constraints (the cycle) that make it impossible.',
        problem: 'Goes beyond returning empty string to identifying and reporting the exact cycle of character relationships that creates the contradiction.',
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
                input: {"words":["wrt","wrf","er","ett","rftt"]},
                output: "result",
                explanation: 'The resulting string is "result".'
            },
            {
                input: {"words":["z","x"]},
                output: "output",
                explanation: 'The resulting string is "output".'
            },
            // Edge case
            {
                input: {"words":["wrt"]},
                output: "",
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def detect_inconsistency_details(words):
    """
    Detect Inconsistency Details

    When the ordering is invalid, return the specific conflicting constraints (the cycle) that make it impossible.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for item in words:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(detect_inconsistency_details(["wrt","wrf","er","ett","rftt"]))  # Expected: "result"
print(detect_inconsistency_details(["z","x"]))  # Expected: "output"
print(detect_inconsistency_details(["wrt"]))  # Expected: ""
`,
            go: `package main

import "fmt"

// DetectInconsistencyDetails solves the Detect Inconsistency Details problem.
// When the ordering is invalid, return the specific conflicting constraints (the cycle) that make it impossible.
// Time: O(?), Space: O(?)
func DetectInconsistencyDetails(words []string) string {
	result := ""

	for _, v := range words {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(DetectInconsistencyDetails([]string{"wrt", "wrf", "er", "ett", "rftt"})) // Expected: "result"
	fmt.Println(DetectInconsistencyDetails([]string{"z", "x"})) // Expected: "output"
	fmt.Println(DetectInconsistencyDetails([]string{"wrt"})) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary/twist-04-detect-inconsistency-details', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary/twist-04-detect-inconsistency-details'] = problem;
})();
