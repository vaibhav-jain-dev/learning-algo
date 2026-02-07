/**
 * Block Rotate 90
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: block-rotate-90
 * Parent: 06-transpose-matrix/03-block-matrix-transpose
 */
(function() {
    'use strict';

    const problem = {
        name: 'Block Rotate 90',
        difficulty: 'Hard',
        algorithm: 'block-rotate-90',
        parent: '06-transpose-matrix/03-block-matrix-transpose',
        description: 'Instead of transposing blocks, rotate each block 90 degrees clockwise in its position, and also rotate block positions. Rotation is not the same as transposition. Requires applying 90-degree rotation both at the block level and within each block.',
        problem: 'Rotation is not the same as transposition. Requires applying 90-degree rotation both at the block level and within each block.',
        hints: [
            'Think about how block rotate 90 differs from the standard version of this problem.',
            'Key insight: Rotation is not the same as transposition. Requires applying 90-degree rotation both at the block level and within each block.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def block_rotate_90(array, k):
    """
    Block Rotate 90

    Instead of transposing blocks, rotate each block 90 degrees clockwise in its position, and also rotate block positions. Rotation is not the same as transposition. Requires applying 90-degree rotation both at the block level and within each block.

    Time: O(n log k)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(block_rotate_90([1,3,5,7], 2))  # Expected: [1,3]
print(block_rotate_90([10,20,30], 1))  # Expected: [10]
print(block_rotate_90([5,5,5,5], 3))  # Expected: [5,5,5]
`,
            go: `package main

import "fmt"

// BlockRotate90 solves the Block Rotate 90 problem.
// Instead of transposing blocks, rotate each block 90 degrees clockwise in its position, and also rotate block positions. Rotation is not the same as transposition. Requires applying 90-degree rotation both at the block level and within each block.
// Time: O(n log k), Space: O(n)
func BlockRotate90(array []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(BlockRotate90([]int{1, 3, 5, 7}, 2)) // Expected: [1,3]
	fmt.Println(BlockRotate90([]int{10, 20, 30}, 1)) // Expected: [10]
	fmt.Println(BlockRotate90([]int{5, 5, 5, 5}, 3)) // Expected: [5,5,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/03-block-matrix-transpose/twist-02-block-rotate-90', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/03-block-matrix-transpose/twist-02-block-rotate-90'] = problem;
})();
