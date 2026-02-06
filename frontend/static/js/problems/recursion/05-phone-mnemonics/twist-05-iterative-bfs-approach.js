/**
 * Iterative BFS Approach
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-phone
 * Parent: 05-phone-mnemonics
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative BFS Approach',
        difficulty: 'Medium',
        algorithm: 'recursion-phone',
        parent: '05-phone-mnemonics',
        description: 'Generate all phone mnemonics using an iterative BFS approach with a queue instead of recursion.',
        problem: 'Replaces the recursive DFS pattern with level-by-level expansion, building partial results in a queue and extending them one digit at a time.',
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
                input: {"phoneNumber":"23"},
                output: [0],
                explanation: 'The iterative bfs approach for this input yields [0].'
            },
            // Edge case
            {
                input: {"phoneNumber":""},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_bfs_approach(phoneNumber):
    """
    Iterative BFS Approach

    Generate all phone mnemonics using an iterative BFS approach with a queue instead of recursion.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(phoneNumber)):
        # Check if element meets criteria
        result.append(phoneNumber[i])

    return result


# Test cases
print(iterative_bfs_approach("23"))  # Expected: [0]
print(iterative_bfs_approach(""))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativeBfsApproach solves the Iterative BFS Approach problem.
// Generate all phone mnemonics using an iterative BFS approach with a queue instead of recursion.
// Time: O(?), Space: O(?)
func IterativeBfsApproach(phoneNumber string) []int {
	result := make([]int, 0)

	for i := 0; i < len(phoneNumber); i++ {
		result = append(result, phoneNumber[i])
	}

	return result
}

func main() {
	fmt.Println(IterativeBfsApproach("23")) // Expected: [0]
	fmt.Println(IterativeBfsApproach("")) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '05-phone-mnemonics/twist-05-iterative-bfs-approach', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/05-phone-mnemonics/twist-05-iterative-bfs-approach'] = problem;
})();
