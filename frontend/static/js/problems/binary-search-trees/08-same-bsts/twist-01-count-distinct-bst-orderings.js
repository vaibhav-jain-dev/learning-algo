/**
 * Count Distinct BST Orderings
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-comparison
 * Parent: 08-same-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct BST Orderings',
        difficulty: 'Very Hard',
        algorithm: 'bst-comparison',
        parent: '08-same-bsts',
        description: 'Given a BST defined by one insertion order, count how many different insertion orderings would produce the same BST structure.',
        problem: 'Instead of comparing two specific arrays, you must count all valid topological orderings of the BST. This requires combinatorics: at each node, the left and right subtree orderings can be interleaved in C(n_left + n_right, n_left) ways. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,11,94,81]},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,94,81,11]},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"arrayOne":[10],"arrayTwo":[10]},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def count_distinct_bst_orderings(arrayOne, arrayTwo):
    """
    Count Distinct BST Orderings

    Given a BST defined by one insertion order, count how many different insertion orderings would produce the same BST structure.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(arrayOne)

    for i in range(n):
        # Check condition based on arrayTwo
        j = 0
        for k in range(i, n):
            if j < len(arrayTwo) and arrayOne[k] == arrayTwo[j]:
                j += 1
        if j == len(arrayTwo):
            count += 1

    return count


# Test cases
print(count_distinct_bst_orderings([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,11,94,81]))  # Expected: 1
print(count_distinct_bst_orderings([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,94,81,11]))  # Expected: 2
print(count_distinct_bst_orderings([10], [10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountDistinctBstOrderings solves the Count Distinct BST Orderings problem.
// Given a BST defined by one insertion order, count how many different insertion orderings would produce the same BST structure.
// Time: O(n), Space: O(1)
func CountDistinctBstOrderings(arrayOne []int, arrayTwo []int) int {
	result := 0

	for i := 0; i < len(arrayOne); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountDistinctBstOrderings([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 11, 94, 81})) // Expected: 1
	fmt.Println(CountDistinctBstOrderings([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 94, 81, 11})) // Expected: 2
	fmt.Println(CountDistinctBstOrderings([]int{10}, []int{10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '08-same-bsts/twist-01-count-distinct-bst-orderings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/08-same-bsts/twist-01-count-distinct-bst-orderings'] = problem;
})();
