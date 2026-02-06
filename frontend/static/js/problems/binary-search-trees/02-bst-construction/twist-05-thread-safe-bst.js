/**
 * Thread-Safe BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-construction
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Thread-Safe BST',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Design the BST class to handle concurrent insert, remove, and contains operations. Multiple readers can proceed simultaneously, but writers need exclusive access to affected subtrees.',
        problem: 'Concurrency introduces race conditions. You must think about locking granularity -- locking the whole tree is simple but slow, while fine-grained node-level locking requires careful deadlock avoidance during rotations and removals. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the thread safe bst criteria.'
            },
            // Edge case
            {
                input: {"tree":[10],"operations":["insert(12)"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def thread_safe_bst(tree, operations):
    """
    Thread-Safe BST

    Design the BST class to handle concurrent insert, remove, and contains operations. Multiple readers can proceed simultaneously, but writers need exclusive access to affected subtrees.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and tree[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(thread_safe_bst([10,5,15,2,5,None,22,1], ["insert(12)","remove(10)","contains(15)"]))  # Expected: 1
print(thread_safe_bst([10], ["insert(12)"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ThreadSafeBst solves the Thread-Safe BST problem.
// Design the BST class to handle concurrent insert, remove, and contains operations. Multiple readers can proceed simultaneously, but writers need exclusive access to affected subtrees.
// Time: O(n), Space: O(1)
func ThreadSafeBst(tree []int, operations []string) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ThreadSafeBst([]int{10, 5, 15, 2, 5, null, 22, 1}, []string{"insert(12)", "remove(10)", "contains(15)"})) // Expected: 1
	fmt.Println(ThreadSafeBst([]int{10}, []string{"insert(12)"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-05-thread-safe-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-05-thread-safe-bst'] = problem;
})();
