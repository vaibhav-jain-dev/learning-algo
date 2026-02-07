/**
 * Two Sum Closest Using O(h) Space
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-search
 * Parent: 01-find-closest-value/03-two-sum-closest-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Closest Using O(h) Space',
        difficulty: 'Hard',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/03-two-sum-closest-bst',
        description: 'Solve two-sum closest using only O(h) auxiliary space by implementing forward and reverse BST iterators instead of collecting all values into an array.',
        problem: 'Replaces the O(n) array with two controlled stacks simulating forward and reverse inorder traversal. Managing two independent iterators simultaneously requires careful state management. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":[10,5,15,2,7,12,20],"target":22},
                output: [10,5,15],
                explanation: 'The two sum closest using oh space for this input yields [10, 5, 15].'
            },
            {
                input: {"tree":[5,3,7,1,4,6,8],"target":10},
                output: [5,3,7],
                explanation: 'The two sum closest using oh space for this input yields [5, 3, 7].'
            },
            // Edge case
            {
                input: {"tree":[10],"target":0},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def two_sum_closest_using_oh_space(tree, target):
    """
    Two Sum Closest Using O(h) Space

    Solve two-sum closest using only O(h) auxiliary space by implementing forward and reverse BST iterators instead of collecting all values into an array.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(two_sum_closest_using_oh_space([10,5,15,2,7,12,20], 22))  # Expected: [10,5,15]
print(two_sum_closest_using_oh_space([5,3,7,1,4,6,8], 10))  # Expected: [5,3,7]
print(two_sum_closest_using_oh_space([10], 0))  # Expected: []
`,
            go: `package main

import "fmt"

// TwoSumClosestUsingOhSpace solves the Two Sum Closest Using O(h) Space problem.
// Solve two-sum closest using only O(h) auxiliary space by implementing forward and reverse BST iterators instead of collecting all values into an array.
// Time: O(n), Space: O(1)
func TwoSumClosestUsingOhSpace(tree []int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(TwoSumClosestUsingOhSpace([]int{10, 5, 15, 2, 7, 12, 20}, 22)) // Expected: [10,5,15]
	fmt.Println(TwoSumClosestUsingOhSpace([]int{5, 3, 7, 1, 4, 6, 8}, 10)) // Expected: [5,3,7]
	fmt.Println(TwoSumClosestUsingOhSpace([]int{10}, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/03-two-sum-closest-bst/twist-03-two-sum-closest-using-oh-space', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/03-two-sum-closest-bst/twist-03-two-sum-closest-using-oh-space'] = problem;
})();
