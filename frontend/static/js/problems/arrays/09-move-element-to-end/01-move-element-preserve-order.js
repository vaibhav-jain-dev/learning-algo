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
            { title: 'Preserve Order Move to Front', difficulty: 'Medium', description: 'Move all instances of the target value to the front while preserving relative order of remaining elements.', whyDifferent: 'The write pointer approach reverses direction: non-target elements shift right, targets fill from the left.', example: 'array = [2, 1, 2, 3, 2, 4], toMove = 2. Result: [2, 2, 2, 1, 3, 4].' },
            { title: 'Stable Partition Two Values', difficulty: 'Medium', description: 'Given two target values A and B, move all As to the end and all Bs to the beginning, preserving order within each group.', whyDifferent: 'Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.', example: 'array = [3, 1, 2, 1, 3, 2], A = 2, B = 1. Result: [1, 1, 3, 3, 2, 2].' },
            { title: 'Move with Minimum Writes', difficulty: 'Hard', description: 'Move targets to end preserving order, but minimize the number of array write operations (not swaps, but assignments).', whyDifferent: 'Standard approach writes every non-target element. Can you skip writes for elements already in their correct position?', example: 'array = [1, 2, 3, 2, 4], toMove = 2. Optimal: only 2 writes needed (move 3 and 4 left).' },
            { title: 'Move in Linked List', difficulty: 'Medium', description: 'Solve the same problem but on a singly linked list instead of an array. Move nodes with target value to the end.', whyDifferent: 'No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.', example: '1->2->3->2->4, toMove = 2. Result: 1->3->4->2->2.' },
            { title: 'Move Preserving Stability Index', difficulty: 'Hard', description: 'After moving targets to end (preserving order), return the new index of every element as a mapping from original to new position.', whyDifferent: 'You must track index transformations during the rearrangement, not just the final array state.', example: 'array = [2, 1, 2, 3], toMove = 2. Result: [1, 3, 2, 2]. Index map: {0->2, 1->0, 2->3, 3->1}.' }
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
