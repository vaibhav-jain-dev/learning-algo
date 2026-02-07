/**
 * Persistent BST
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-construction
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Persistent BST',
        difficulty: 'Very Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Implement insert and remove so that previous versions of the tree are preserved. Each mutation returns a new root while keeping the old tree intact via path copying.',
        problem: 'Instead of mutating nodes in place, you create new nodes along the insertion/deletion path, sharing unchanged subtrees. This is a fundamentally different memory and pointer management pattern. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,5,null,22,1],"operations":["insert(12)","remove(10)","contains(15)"]},
                output: [10,5,15,2],
                explanation: 'The persistent bst for this input yields [10, 5, 15, 2].'
            },
            // Edge case
            {
                input: {"tree":[10],"operations":["insert(12)"]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def persistent_bst(tree, operations):
    """
    Persistent BST

    Implement insert and remove so that previous versions of the tree are preserved. Each mutation returns a new root while keeping the old tree intact via path copying.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(persistent_bst([10,5,15,2,5,None,22,1], ["insert(12)","remove(10)","contains(15)"]))  # Expected: [10,5,15,2]
print(persistent_bst([10], ["insert(12)"]))  # Expected: []
`,
            go: `package main

import "fmt"

// PersistentBst solves the Persistent BST problem.
// Implement insert and remove so that previous versions of the tree are preserved. Each mutation returns a new root while keeping the old tree intact via path copying.
// Time: O(n), Space: O(1)
func PersistentBst(tree []int, operations []string) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(PersistentBst([]int{10, 5, 15, 2, 5, null, 22, 1}, []string{"insert(12)", "remove(10)", "contains(15)"})) // Expected: [10,5,15,2]
	fmt.Println(PersistentBst([]int{10}, []string{"insert(12)"})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-03-persistent-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-03-persistent-bst'] = problem;
})();
