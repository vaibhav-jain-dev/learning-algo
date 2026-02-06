/**
 * Can Become Monotonic
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Can Become Monotonic',
        difficulty: 'Medium',
        algorithm: 'linear-scan',
        parent: '10-monotonic-array',
        description: 'Given an array of integers, determine if it can become monotonic by changing **at most one** element to any value. An array is monotonic if it is either entirely non-increasing or entirely non-decreasing.',
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
            1,
            5,
            3,
            4,
            5
          ]
        },
        output: "true\nExplanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]",
        explanation: 'Given the input, the algorithm processes it to produce true\nExplanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]'
    },
    {
        input: {
          "array": [
            1,
            2,
            3,
            4,
            5
          ]
        },
        output: "true\nExplanation: Already monotonic",
        explanation: 'Given the input, the algorithm processes it to produce true\nExplanation: Already monotonic'
    },
    {
        input: {
          "array": [
            4,
            2,
            3,
            1
          ]
        },
        output: "false\nExplanation: Need to change more than one element",
        explanation: 'Given the input, the algorithm processes it to produce false\nExplanation: Need to change more than one element'
    },
    {
        input: {
          "array": [
            3,
            4,
            2,
            3
          ]
        },
        output: "false\nExplanation: Even changing one element can't make it monotonic",
        explanation: 'Given the input, the algorithm processes it to produce false\nExplanation: Even changing one element can\'t make it monotonic'
    }
        ],
        solutions: {
            python: `def canBecomeMonotonic(array):
    """
    Can Become Monotonic - Check if array can become monotonic by changing
    at most one element to any value.

    Time: O(n) - Single pass counting violations
    Space: O(1) - Only store counters
    """
    if len(array) <= 2:
        return True

    def canBecomeNonDecreasing(arr):
        # Count violations where arr[i] > arr[i+1]
        violations = 0
        for i in range(len(arr) - 1):
            if arr[i] > arr[i + 1]:
                violations += 1
                if violations > 1:
                    return False
                # Check if we can fix by modifying arr[i] or arr[i+1]
                # Option 1: Change arr[i] to arr[i+1] (valid if i==0 or arr[i-1] <= arr[i+1])
                # Option 2: Change arr[i+1] to arr[i] (valid if i+2==len or arr[i] <= arr[i+2])
                canFixLeft = (i == 0 or arr[i - 1] <= arr[i + 1])
                canFixRight = (i + 2 >= len(arr) or arr[i] <= arr[i + 2])
                if not canFixLeft and not canFixRight:
                    return False
        return True

    def canBecomeNonIncreasing(arr):
        # Reverse the check
        violations = 0
        for i in range(len(arr) - 1):
            if arr[i] < arr[i + 1]:
                violations += 1
                if violations > 1:
                    return False
                canFixLeft = (i == 0 or arr[i - 1] >= arr[i + 1])
                canFixRight = (i + 2 >= len(arr) or arr[i] >= arr[i + 2])
                if not canFixLeft and not canFixRight:
                    return False
        return True

    return canBecomeNonDecreasing(array) or canBecomeNonIncreasing(array)


# Test
if __name__ == "__main__":
    print(canBecomeMonotonic([1, 5, 3, 4, 5]))  # True
    print(canBecomeMonotonic([1, 2, 3, 4, 5]))  # True (already monotonic)
    print(canBecomeMonotonic([4, 2, 3, 1]))     # False
    print(canBecomeMonotonic([3, 4, 2, 3]))     # False`,
            go: `package main

import "fmt"

// CanBecomeMonotonic checks if array can become monotonic by changing
// at most one element to any value.
// Time: O(n), Space: O(1)
func CanBecomeMonotonic(array []int) bool {
    if len(array) <= 2 {
        return true
    }

    canBecomeNonDecreasing := func(arr []int) bool {
        violations := 0
        for i := 0; i < len(arr)-1; i++ {
            if arr[i] > arr[i+1] {
                violations++
                if violations > 1 {
                    return false
                }
                // Check if we can fix by modifying arr[i] or arr[i+1]
                canFixLeft := (i == 0 || arr[i-1] <= arr[i+1])
                canFixRight := (i+2 >= len(arr) || arr[i] <= arr[i+2])
                if !canFixLeft && !canFixRight {
                    return false
                }
            }
        }
        return true
    }

    canBecomeNonIncreasing := func(arr []int) bool {
        violations := 0
        for i := 0; i < len(arr)-1; i++ {
            if arr[i] < arr[i+1] {
                violations++
                if violations > 1 {
                    return false
                }
                canFixLeft := (i == 0 || arr[i-1] >= arr[i+1])
                canFixRight := (i+2 >= len(arr) || arr[i] >= arr[i+2])
                if !canFixLeft && !canFixRight {
                    return false
                }
            }
        }
        return true
    }

    return canBecomeNonDecreasing(array) || canBecomeNonIncreasing(array)
}

func main() {
    fmt.Println(CanBecomeMonotonic([]int{1, 5, 3, 4, 5})) // true
    fmt.Println(CanBecomeMonotonic([]int{1, 2, 3, 4, 5})) // true
    fmt.Println(CanBecomeMonotonic([]int{4, 2, 3, 1}))    // false
    fmt.Println(CanBecomeMonotonic([]int{3, 4, 2, 3}))    // false
}`
        },
        twists: [
            { title: 'Can Become Monotonic with K Changes', difficulty: 'Hard', description: 'Determine if the array can become monotonic by changing at most K elements (generalized from K=1).', whyDifferent: 'Multiple allowed changes require a different approach: finding the longest monotonic subsequence and checking if n - LMS <= K.', example: 'array = [4, 2, 3, 1], K = 2. Change 4 and 1: [2, 2, 3, 3]. Return true.' },
            { title: 'Can Become Monotonic by Swapping', difficulty: 'Hard', description: 'Instead of changing elements to any value, determine if the array can become monotonic with at most one swap of two elements.', whyDifferent: 'Swapping is more restrictive than changing: both positions must benefit from the swap simultaneously.', example: 'array = [1, 5, 3, 4, 2]. Swap 5 and 2: [1, 2, 3, 4, 5]. Return true.' },
            { title: 'Which Element to Change', difficulty: 'Medium', description: 'If the array can become monotonic by changing one element, return the index of the element to change and its new value.', whyDifferent: 'Not just a yes/no answer: must identify the problematic element and compute the optimal replacement value.', example: 'array = [1, 5, 3, 4, 5]. Change index 1 from 5 to 2. Return {index: 1, newValue: 2}.' },
            { title: 'Can Become Strictly Monotonic', difficulty: 'Medium', description: 'Determine if the array can become strictly monotonic (no equal neighbors) by changing at most one element.', whyDifferent: 'Stricter constraint eliminates solutions where the changed value equals a neighbor, adding boundary conditions.', example: 'array = [1, 3, 3, 4]. Change second 3 to 2 or first 3 to 2: [1, 2, 3, 4]. Return true.' },
            { title: 'Can Become Monotonic by Removing', difficulty: 'Medium', description: 'Instead of changing, can you make it monotonic by removing at most one element?', whyDifferent: 'Removal shifts all subsequent indices, creating a gap. Must check if removing either endpoint of a violation fixes the entire array.', example: 'array = [1, 4, 2, 3]. Remove 4: [1, 2, 3]. Return true.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 10-monotonic-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/03-can-become-monotonic', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/03-can-become-monotonic'] = problem;

})();
