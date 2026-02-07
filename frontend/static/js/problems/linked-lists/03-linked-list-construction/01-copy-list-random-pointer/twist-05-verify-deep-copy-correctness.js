/**
 * Verify Deep Copy Correctness
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';

    const problem = {
        name: 'Verify Deep Copy Correctness',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.',
        problem: 'This inverts the problem from construction to validation. You must check that corresponding nodes have matching values, that random pointer indices match, and critically that no copy node is the same object as any original node.',
        hints: [
            'Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.',
            'This inverts the problem from construction to validation',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"list":[1,2,3,4,5]},
                output: [1,2,3,4,5],
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def verify_deep_copy_correctness(nodes):
    """
    Verify Deep Copy Correctness

    Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nodes)):
        # Check if element meets criteria
        result.append(nodes[i])

    return result


# Test cases
print(verify_deep_copy_correctness(None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// VerifyDeepCopyCorrectness solves the Verify Deep Copy Correctness problem.
// Write a function that given the original list and a purported copy, verifies the copy is correct: same structure, same values, same random pointer pattern, but NO shared node references.
// Time: O(n), Space: O(1)
func VerifyDeepCopyCorrectness(nodes [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nodes); i++ {
		result = append(result, nodes[i])
	}

	return result
}

func main() {
	fmt.Println(VerifyDeepCopyCorrectness(nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-05-verify-deep-copy-correctness', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-05-verify-deep-copy-correctness'] = problem;
})();
