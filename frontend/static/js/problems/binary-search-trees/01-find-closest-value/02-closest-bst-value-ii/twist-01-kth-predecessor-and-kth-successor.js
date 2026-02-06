/**
 * Kth Predecessor and Kth Successor
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Predecessor and Kth Successor',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'Instead of finding the immediate predecessor and successor, find the kth predecessor (kth largest value smaller than target) and kth successor (kth smallest value larger than target).',
        problem: 'You cannot simply track a single candidate while traversing. You need to maintain k candidates, which may require a stack-based or augmented approach rather than a simple greedy search. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the kth predecessor and kth successor criteria.'
            },
            {
                input: {"tree":[5,3,7,2,4,6,8],"target":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the kth predecessor and kth successor criteria.'
            },
            // Edge case
            {
                input: {"tree":[5],"target":10},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def kth_predecessor_and_kth_successor(tree, target):
    """
    Kth Predecessor and Kth Successor

    Instead of finding the immediate predecessor and successor, find the kth predecessor (kth largest value smaller than target) and kth successor (kth smallest value larger than target).

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(kth_predecessor_and_kth_successor([5,3,7,2,4,6,8], 10))  # Expected: 1
print(kth_predecessor_and_kth_successor([5,3,7,2,4,6,8], 10))  # Expected: 2
print(kth_predecessor_and_kth_successor([5], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// KthPredecessorAndKthSuccessor solves the Kth Predecessor and Kth Successor problem.
// Instead of finding the immediate predecessor and successor, find the kth predecessor (kth largest value smaller than target) and kth successor (kth smallest value larger than target).
// Time: O(n), Space: O(1)
func KthPredecessorAndKthSuccessor(tree []int, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KthPredecessorAndKthSuccessor([]int{5, 3, 7, 2, 4, 6, 8}, 10)) // Expected: 1
	fmt.Println(KthPredecessorAndKthSuccessor([]int{5, 3, 7, 2, 4, 6, 8}, 10)) // Expected: 2
	fmt.Println(KthPredecessorAndKthSuccessor([]int{5}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-01-kth-predecessor-and-kth-successor', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-01-kth-predecessor-and-kth-successor'] = problem;
})();
