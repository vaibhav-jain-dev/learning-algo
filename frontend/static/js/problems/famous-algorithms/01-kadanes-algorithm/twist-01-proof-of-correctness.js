/**
 * Proof of Correctness
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Proof of Correctness',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Prove formally that Kadane\',
        problem: 'Forces you to think inductively rather than just coding the recurrence. You must argue why the greedy choice (start fresh vs extend) is always optimal at every step.',
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
                input: {"nums":[-2,1,-3,4,-1,2,1,-5,4]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the proof of correctness criteria.'
            },
            // Edge case
            {
                input: {"nums":[-2]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def proof_of_correctness(nums):
    """
    Proof of Correctness

    Prove formally that Kadane\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(proof_of_correctness([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 1
print(proof_of_correctness([-2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ProofOfCorrectness solves the Proof of Correctness problem.
// Prove formally that Kadane\\
// Time: O(?), Space: O(?)
func ProofOfCorrectness(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ProofOfCorrectness([]int{-2, 1, -3, 4, -1, 2, 1, -5, 4})) // Expected: 1
	fmt.Println(ProofOfCorrectness([]int{-2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-01-proof-of-correctness', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-01-proof-of-correctness'] = problem;
})();
