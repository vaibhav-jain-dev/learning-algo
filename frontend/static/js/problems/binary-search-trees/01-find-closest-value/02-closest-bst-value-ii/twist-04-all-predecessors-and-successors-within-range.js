/**
 * All Predecessors and Successors Within Range
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Predecessors and Successors Within Range',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'Find all inorder predecessors within distance D below the target and all successors within distance D above the target.',
        problem: 'Instead of finding exactly one predecessor and one successor, you must collect a variable-length set. This requires continuing the search beyond the first match and knowing when to stop. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[5,3,7,2,4,6,8],"target":10},
                output: true,
                explanation: 'The all predecessors and successors within range condition is satisfied for this input.'
            },
            {
                input: {"tree":[5,3,7,2,4,6,8],"target":10},
                output: false,
                explanation: 'The all predecessors and successors within range condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"tree":[5],"target":10},
                output: false,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def all_predecessors_and_successors_within_range(tree, target):
    """
    All Predecessors and Successors Within Range

    Find all inorder predecessors within distance D below the target and all successors within distance D above the target.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(tree)):
        if j < len(target) and tree[i] == target[j]:
            j += 1

    return j == len(target)


# Test cases
print(all_predecessors_and_successors_within_range([5,3,7,2,4,6,8], 10))  # Expected: True
print(all_predecessors_and_successors_within_range([5,3,7,2,4,6,8], 10))  # Expected: False
print(all_predecessors_and_successors_within_range([5], 10))  # Expected: False
`,
            go: `package main

import "fmt"

// AllPredecessorsAndSuccessorsWithinRange solves the All Predecessors and Successors Within Range problem.
// Find all inorder predecessors within distance D below the target and all successors within distance D above the target.
// Time: O(n), Space: O(1)
func AllPredecessorsAndSuccessorsWithinRange(tree []int, target int) bool {
	j := 0

	for i := 0; i < len(tree) && j < len(target); i++ {
		if tree[i] == target[j] {
			j++
		}
	}

	return j == len(target)
}

func main() {
	fmt.Println(AllPredecessorsAndSuccessorsWithinRange([]int{5, 3, 7, 2, 4, 6, 8}, 10)) // Expected: true
	fmt.Println(AllPredecessorsAndSuccessorsWithinRange([]int{5, 3, 7, 2, 4, 6, 8}, 10)) // Expected: false
	fmt.Println(AllPredecessorsAndSuccessorsWithinRange([]int{5}, 10)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-04-all-predecessors-and-successors-within-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-04-all-predecessors-and-successors-within-range'] = problem;
})();
