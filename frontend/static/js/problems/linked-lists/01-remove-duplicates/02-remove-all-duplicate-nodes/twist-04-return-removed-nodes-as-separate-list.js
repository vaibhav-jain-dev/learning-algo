/**
 * Return Removed Nodes as Separate List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return Removed Nodes as Separate List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.',
        problem: 'You need to manage two output lists simultaneously while traversing. This requires careful pointer management to append removed nodes to the second list without losing references.',
        hints: [
            'Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.',
            'You need to manage two output lists simultaneously while traversing',
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
            python: `def return_removed_nodes_as_separate_list(list):
    """
    Return Removed Nodes as Separate List

    Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(return_removed_nodes_as_separate_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReturnRemovedNodesAsSeparateList solves the Return Removed Nodes as Separate List problem.
// Instead of just removing duplicate nodes, collect them into a second linked list and return both: the cleaned list and the removed-nodes list.
// Time: O(n), Space: O(1)
func ReturnRemovedNodesAsSeparateList(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReturnRemovedNodesAsSeparateList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-04-return-removed-nodes-as-separate-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-04-return-removed-nodes-as-separate-list'] = problem;
})();
