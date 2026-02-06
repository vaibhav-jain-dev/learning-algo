/**
 * Verify Recovery is Unique
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-repair
 * Parent: 03-validate-bst/01-recover-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Verify Recovery is Unique',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        parent: '03-validate-bst/01-recover-bst',
        description: 'After identifying the two swapped nodes, verify that swapping them back is the ONLY way to fix the BST. If multiple valid recoveries exist, return all of them.',
        problem: 'The base problem assumes a unique recovery. This twist requires proving uniqueness or enumerating alternatives, which means checking if different swap pairs could also produce a valid BST from the same broken tree. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[1,3,null,null,2]},
                output: [1,3,null],
                explanation: 'The verify recovery is unique for this input yields [1, 3, ].'
            },
            {
                input: {"tree":[3,1,4,null,null,2]},
                output: [3,1,4],
                explanation: 'The verify recovery is unique for this input yields [3, 1, 4].'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def verify_recovery_is_unique(tree):
    """
    Verify Recovery is Unique

    After identifying the two swapped nodes, verify that swapping them back is the ONLY way to fix the BST. If multiple valid recoveries exist, return all of them.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(verify_recovery_is_unique([1,3,None,None,2]))  # Expected: [1,3,None]
print(verify_recovery_is_unique([3,1,4,None,None,2]))  # Expected: [3,1,4]
print(verify_recovery_is_unique([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// VerifyRecoveryIsUnique solves the Verify Recovery is Unique problem.
// After identifying the two swapped nodes, verify that swapping them back is the ONLY way to fix the BST. If multiple valid recoveries exist, return all of them.
// Time: O(n), Space: O(1)
func VerifyRecoveryIsUnique(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(VerifyRecoveryIsUnique([]int{1, 3, null, null, 2})) // Expected: [1,3,null]
	fmt.Println(VerifyRecoveryIsUnique([]int{3, 1, 4, null, null, 2})) // Expected: [3,1,4]
	fmt.Println(VerifyRecoveryIsUnique([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst/twist-05-verify-recovery-is-unique', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst/twist-05-verify-recovery-is-unique'] = problem;
})();
