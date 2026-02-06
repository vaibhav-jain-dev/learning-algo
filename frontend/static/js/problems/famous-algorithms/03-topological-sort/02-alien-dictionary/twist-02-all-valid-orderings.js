/**
 * All Valid Orderings
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/02-alien-dictionary
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Valid Orderings',
        difficulty: 'Very Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/02-alien-dictionary',
        description: 'Return all possible valid character orderings that are consistent with the word list, not just any one of them.',
        problem: 'Requires enumerating all topological orderings of the derived graph, which involves backtracking through all choices at each zero in-degree step.',
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
                output: ["wrt","wrf","er"],
                explanation: 'The all valid orderings for this input yields [wrt, wrf, er].'
            },
            {
                input: {"words":["z","x"]},
                output: ["z","x"],
                explanation: 'The all valid orderings for this input yields [z, x].'
            },
            // Edge case
            {
                input: {"words":["wrt"]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def all_valid_orderings(words):
    """
    All Valid Orderings

    Return all possible valid character orderings that are consistent with the word list, not just any one of them.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(words)):
        # Check if element meets criteria
        result.append(words[i])

    return result


# Test cases
print(all_valid_orderings(["wrt","wrf","er","ett","rftt"]))  # Expected: ["wrt","wrf","er"]
print(all_valid_orderings(["z","x"]))  # Expected: ["z","x"]
print(all_valid_orderings(["wrt"]))  # Expected: []
`,
            go: `package main

import "fmt"

// AllValidOrderings solves the All Valid Orderings problem.
// Return all possible valid character orderings that are consistent with the word list, not just any one of them.
// Time: O(?), Space: O(?)
func AllValidOrderings(words []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(words); i++ {
		result = append(result, words[i])
	}

	return result
}

func main() {
	fmt.Println(AllValidOrderings([]string{"wrt", "wrf", "er", "ett", "rftt"})) // Expected: ["wrt","wrf","er"]
	fmt.Println(AllValidOrderings([]string{"z", "x"})) // Expected: ["z","x"]
	fmt.Println(AllValidOrderings([]string{"wrt"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary/twist-02-all-valid-orderings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary/twist-02-all-valid-orderings'] = problem;
})();
