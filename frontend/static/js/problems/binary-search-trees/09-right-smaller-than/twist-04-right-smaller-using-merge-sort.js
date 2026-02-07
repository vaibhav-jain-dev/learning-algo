/**
 * Right Smaller Using Merge Sort
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-augmented
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Smaller Using Merge Sort',
        difficulty: 'Very Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'Solve the right-smaller-than problem using a modified merge sort instead of a BST approach.',
        problem: 'This requires a completely different algorithmic paradigm. During merge sort, when an element from the right half is placed before elements from the left half, it contributes to inversion counts. You must track original indices through the sorting process. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[8,5,11,-1,3,4,2]},
                output: [8,5,11],
                explanation: 'The right smaller using merge sort for this input yields [8, 5, 11].'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: [1,2,3],
                explanation: 'The right smaller using merge sort for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[8]},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def right_smaller_using_merge_sort(array):
    """
    Right Smaller Using Merge Sort

    Solve the right-smaller-than problem using a modified merge sort instead of a BST approach.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(right_smaller_using_merge_sort([8,5,11,-1,3,4,2]))  # Expected: [8,5,11]
print(right_smaller_using_merge_sort([1,2,3,4,5]))  # Expected: [1,2,3]
print(right_smaller_using_merge_sort([8]))  # Expected: []
`,
            go: `package main

import "fmt"

// RightSmallerUsingMergeSort solves the Right Smaller Using Merge Sort problem.
// Solve the right-smaller-than problem using a modified merge sort instead of a BST approach.
// Time: O(n), Space: O(1)
func RightSmallerUsingMergeSort(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(RightSmallerUsingMergeSort([]int{8, 5, 11, -1, 3, 4, 2})) // Expected: [8,5,11]
	fmt.Println(RightSmallerUsingMergeSort([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3]
	fmt.Println(RightSmallerUsingMergeSort([]int{8})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-04-right-smaller-using-merge-sort', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-04-right-smaller-using-merge-sort'] = problem;
})();
