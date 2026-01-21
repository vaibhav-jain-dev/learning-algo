/**
 * Dutch National Flag
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dutch National Flag',
        difficulty: 'Hard',
        algorithm: 'two-pointer-move',
        parent: '09-move-element-to-end',
        description: 'Given an array of integers and a pivot value, partition the array into three sections: 1. All elements **less than** the pivot 2. All elements **equal to** the pivot 3. All elements **greater than** the pivot This is known as the "Dutch National Flag" problem, named after the Dutch flag which has three horizontal stripes.',
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
            0,
            1,
            2,
            1,
            0
          ],
          "pivot": 1
        },
        output: "[0, 0, 1, 1, 2, 2]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 0, 1, 1, 2, 2]'
    },
    {
        input: {
          "array": [
            1,
            4,
            2,
            5,
            3,
            6
          ],
          "pivot": 3
        },
        output: "[1, 2, 3, 4, 5, 6] (or [2, 1, 3, 6, 5, 4])",
        explanation: 'Given the input, the algorithm processes it to produce [1, 2, 3, 4, 5, 6] (or [2, 1, 3, 6, 5, 4])'
    },
    {
        input: {
          "array": [
            3,
            3,
            3,
            3
          ],
          "pivot": 3
        },
        output: "[3, 3, 3, 3]",
        explanation: 'Given the input, the algorithm processes it to produce [3, 3, 3, 3]'
    }
        ],
        solutions: {
            python: `def dutchNationalFlag(array, pivot):
    """
    Dutch National Flag - Three-way partition around pivot value.
    All elements < pivot come first, then elements == pivot, then > pivot.

    Time: O(n) - Single pass through array
    Space: O(1) - In-place modification using three pointers
    """
    # Three pointers: low, mid, high
    # Elements [0, low) are < pivot
    # Elements [low, mid) are == pivot
    # Elements (high, end] are > pivot
    # Elements [mid, high] are unprocessed

    low = 0
    mid = 0
    high = len(array) - 1

    while mid <= high:
        if array[mid] < pivot:
            # Swap with low section, move both pointers
            array[low], array[mid] = array[mid], array[low]
            low += 1
            mid += 1
        elif array[mid] > pivot:
            # Swap with high section, only move high pointer
            array[mid], array[high] = array[high], array[mid]
            high -= 1
        else:
            # Equal to pivot, just move mid
            mid += 1

    return array


# Test
if __name__ == "__main__":
    print(dutchNationalFlag([2, 0, 1, 2, 1, 0], 1))
    # Output: [0, 0, 1, 1, 2, 2]
    print(dutchNationalFlag([1, 4, 2, 5, 3, 6], 3))
    # Output: [1, 2, 3, 5, 4, 6] (< 3, == 3, > 3)
    print(dutchNationalFlag([3, 3, 3, 3], 3))
    # Output: [3, 3, 3, 3]`,
            go: `package main

import "fmt"

// DutchNationalFlag performs three-way partition around pivot value.
// All elements < pivot come first, then == pivot, then > pivot.
// Time: O(n), Space: O(1)
func DutchNationalFlag(array []int, pivot int) []int {
    // Three pointers: low, mid, high
    // Elements [0, low) are < pivot
    // Elements [low, mid) are == pivot
    // Elements (high, end] are > pivot
    // Elements [mid, high] are unprocessed

    low := 0
    mid := 0
    high := len(array) - 1

    for mid <= high {
        if array[mid] < pivot {
            // Swap with low section, move both pointers
            array[low], array[mid] = array[mid], array[low]
            low++
            mid++
        } else if array[mid] > pivot {
            // Swap with high section, only move high pointer
            array[mid], array[high] = array[high], array[mid]
            high--
        } else {
            // Equal to pivot, just move mid
            mid++
        }
    }

    return array
}

func main() {
    fmt.Println(DutchNationalFlag([]int{2, 0, 1, 2, 1, 0}, 1))
    // Output: [0 0 1 1 2 2]
    fmt.Println(DutchNationalFlag([]int{1, 4, 2, 5, 3, 6}, 3))
    // Output: [1 2 3 5 4 6]
    fmt.Println(DutchNationalFlag([]int{3, 3, 3, 3}, 3))
    // Output: [3 3 3 3]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 09-move-element-to-end
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag'] = problem;

})();
