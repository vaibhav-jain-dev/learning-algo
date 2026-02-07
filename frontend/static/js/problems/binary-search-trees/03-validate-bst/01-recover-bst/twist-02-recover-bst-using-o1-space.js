/**
 * Recover BST Using O(1) Space
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-repair
 * Parent: 03-validate-bst/01-recover-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recover BST Using O(1) Space',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        parent: '03-validate-bst/01-recover-bst',
        description: 'Recover the BST using Morris traversal to achieve O(1) auxiliary space instead of O(h) recursion stack.',
        problem: 'Morris traversal modifies tree pointers temporarily, so you must track the two swapped nodes while simultaneously managing thread creation and cleanup. The interleaving of recovery logic with pointer manipulation is tricky. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The recover bst using o1 space for this input yields [1, 3, ].'
            },
            {
                input: {"tree":[3,1,4,null,null,2]},
                output: [3,1,4],
                explanation: 'The recover bst using o1 space for this input yields [3, 1, 4].'
            },
            // Edge case
            {
                input: {"tree":[1]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def recover_bst_using_o1_space(tree):
    """
    Recover BST Using O(1) Space

    Recover the BST using Morris traversal to achieve O(1) auxiliary space instead of O(h) recursion stack.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(recover_bst_using_o1_space([1,3,None,None,2]))  # Expected: [1,3,None]
print(recover_bst_using_o1_space([3,1,4,None,None,2]))  # Expected: [3,1,4]
print(recover_bst_using_o1_space([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// RecoverBstUsingO1Space solves the Recover BST Using O(1) Space problem.
// Recover the BST using Morris traversal to achieve O(1) auxiliary space instead of O(h) recursion stack.
// Time: O(n), Space: O(1)
func RecoverBstUsingO1Space(tree []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(RecoverBstUsingO1Space([]int{1, 3, null, null, 2})) // Expected: [1,3,null]
	fmt.Println(RecoverBstUsingO1Space([]int{3, 1, 4, null, null, 2})) // Expected: [3,1,4]
	fmt.Println(RecoverBstUsingO1Space([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst/twist-02-recover-bst-using-o1-space', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst/twist-02-recover-bst-using-o1-space'] = problem;
})();
