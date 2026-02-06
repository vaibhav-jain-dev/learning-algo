/**
 * Move Element Preserve Order
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Element Preserve Order',
        difficulty: 'Medium',
        algorithm: 'two-pointer-move',
        parent: '09-move-element-to-end',
        description: 'Given an array of integers and a target value, move all instances of the target value to the end of the array while **preserving the relative order** of the non-target elements. The function should modify the array in place and return it.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
          "array": [
            2,
            1,
            2,
            3,
            2,
            4
          ],
          "toMove": 2
        },
        output: "[1, 3, 4, 2, 2, 2]\nExplanation: Order of 1, 3, 4 is preserved",
        explanation: 'Given the input, the algorithm processes it to produce [1, 3, 4, 2, 2, 2]\nExplanation: Order of 1, 3, 4 is preserved'
    },
    {
        input: {
          "array": [
            1,
            2,
            3,
            4,
            5
          ],
          "toMove": 3
        },
        output: "[1, 2, 4, 5, 3]",
        explanation: 'Given the input, the algorithm processes it to produce [1, 2, 4, 5, 3]'
    },
    {
        input: {
          "array": [
            2,
            2,
            2
          ],
          "toMove": 2
        },
        output: "[2, 2, 2]",
        explanation: 'Given the input, the algorithm processes it to produce [2, 2, 2]'
    }
        ],
        solutions: {
            python: `def moveElementPreserveOrder(array, toMove):
    """
    Move Element Preserve Order - Move all target values to end while preserving
    relative order of non-target elements.

    Time: O(n) - Single pass through array
    Space: O(1) - In-place modification
    """
    # writeIdx tracks where next non-target element should be placed
    writeIdx = 0

    # First pass: move all non-target elements to front, preserving order
    for readIdx in range(len(array)):
        if array[readIdx] != toMove:
            array[writeIdx] = array[readIdx]
            writeIdx += 1

    # Second pass: fill remaining positions with target value
    while writeIdx < len(array):
        array[writeIdx] = toMove
        writeIdx += 1

    return array


# Test
if __name__ == "__main__":
    print(moveElementPreserveOrder([2, 1, 2, 3, 2, 4], 2))
    # Output: [1, 3, 4, 2, 2, 2]
    print(moveElementPreserveOrder([1, 2, 3, 4, 5], 3))
    # Output: [1, 2, 4, 5, 3]
    print(moveElementPreserveOrder([2, 2, 2], 2))
    # Output: [2, 2, 2]`,
            go: `package main

import "fmt"

// MoveElementPreserveOrder moves all target values to end while preserving
// relative order of non-target elements.
// Time: O(n), Space: O(1)
func MoveElementPreserveOrder(array []int, toMove int) []int {
    // writeIdx tracks where next non-target element should be placed
    writeIdx := 0

    // First pass: move all non-target elements to front, preserving order
    for readIdx := 0; readIdx < len(array); readIdx++ {
        if array[readIdx] != toMove {
            array[writeIdx] = array[readIdx]
            writeIdx++
        }
    }

    // Second pass: fill remaining positions with target value
    for writeIdx < len(array) {
        array[writeIdx] = toMove
        writeIdx++
    }

    return array
}

func main() {
    fmt.Println(MoveElementPreserveOrder([]int{2, 1, 2, 3, 2, 4}, 2))
    // Output: [1 3 4 2 2 2]
    fmt.Println(MoveElementPreserveOrder([]int{1, 2, 3, 4, 5}, 3))
    // Output: [1 2 4 5 3]
    fmt.Println(MoveElementPreserveOrder([]int{2, 2, 2}, 2))
    // Output: [2 2 2]
}`
        },
        twists: [
            { id: '09-move-element-to-end/01-move-element-preserve-order/twist-01-preserve-order-move-to-front', name: 'Preserve Order Move to Front', difficulty: 'Medium' },
            { id: '09-move-element-to-end/01-move-element-preserve-order/twist-02-stable-partition-two-values', name: 'Stable Partition Two Values', difficulty: 'Medium' },
            { id: '09-move-element-to-end/01-move-element-preserve-order/twist-03-move-with-minimum-writes', name: 'Move with Minimum Writes', difficulty: 'Hard' },
            { id: '09-move-element-to-end/01-move-element-preserve-order/twist-04-move-in-linked-list', name: 'Move in Linked List', difficulty: 'Medium' },
            { id: '09-move-element-to-end/01-move-element-preserve-order/twist-05-move-preserving-stability-index', name: 'Move Preserving Stability Index', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 09-move-element-to-end
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order'] = problem;

})();
