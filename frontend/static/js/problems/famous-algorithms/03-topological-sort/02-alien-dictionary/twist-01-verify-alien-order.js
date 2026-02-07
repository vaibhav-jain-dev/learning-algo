/**
 * Verify Alien Order
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/02-alien-dictionary
 */
(function() {
    'use strict';

    const problem = {
        name: 'Verify Alien Order',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/02-alien-dictionary',
        description: 'Given a proposed character ordering and the sorted word list, verify if the proposed ordering is consistent with the word list.',
        problem: 'Inverts from deriving the order to checking one -- simply verify that each adjacent word pair respects the proposed ordering, a much simpler task.',
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
                explanation: 'The verify alien order for this input yields [wrt, wrf, er].'
            },
            {
                input: {"words":["z","x"]},
                output: ["z","x"],
                explanation: 'The verify alien order for this input yields [z, x].'
            },
            // Edge case
            {
                input: {"words":["wrt"]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def verify_alien_order(words):
    """
    Verify Alien Order

    Given a proposed character ordering and the sorted word list, verify if the proposed ordering is consistent with the word list.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(words)):
        # Check if element meets criteria
        result.append(words[i])

    return result


# Test cases
print(verify_alien_order(["wrt","wrf","er","ett","rftt"]))  # Expected: ["wrt","wrf","er"]
print(verify_alien_order(["z","x"]))  # Expected: ["z","x"]
print(verify_alien_order(["wrt"]))  # Expected: []
`,
            go: `package main

import "fmt"

// VerifyAlienOrder solves the Verify Alien Order problem.
// Given a proposed character ordering and the sorted word list, verify if the proposed ordering is consistent with the word list.
// Time: O(?), Space: O(?)
func VerifyAlienOrder(words []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(words); i++ {
		result = append(result, words[i])
	}

	return result
}

func main() {
	fmt.Println(VerifyAlienOrder([]string{"wrt", "wrf", "er", "ett", "rftt"})) // Expected: ["wrt","wrf","er"]
	fmt.Println(VerifyAlienOrder([]string{"z", "x"})) // Expected: ["z","x"]
	fmt.Println(VerifyAlienOrder([]string{"wrt"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary/twist-01-verify-alien-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary/twist-01-verify-alien-order'] = problem;
})();
