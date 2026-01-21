/**
 * K Sum Generalized
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Sum Generalized',
        difficulty: 'Hard',
        algorithm: 'sort-three-sum',
        parent: '17-four-number-sum',
        description: 'Given an array of integers and integers k and target, find all unique combinations of k numbers that sum to target.',
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
            2,
            3,
            4,
            5
          ],
          "k": 3,
          "target": 9
        },
        output: "[[1, 3, 5], [2, 3, 4]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1, 3, 5], [2, 3, 4]]'
    },
    {
        input: {
          "array": [
            1,
            0,
            -1,
            0,
            -2,
            2
          ],
          "k": 4,
          "target": 0
        },
        output: "[[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]",
        explanation: 'Given the input, the algorithm processes it to produce [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]'
    }
        ],
        solutions: {
            python: `def kSumGeneralized(array, k, target):
    """
    K Sum Generalized

    Find all unique combinations of k numbers that sum to target.
    Uses recursive approach reducing to 2-sum base case.

    Time: O(n^(k-1)) for k >= 2
    Space: O(k) for recursion stack
    """
    array.sort()
    result = []

    def kSum(start, k, target, current):
        if k == 2:
            # Two pointer approach for 2-sum
            left, right = start, len(array) - 1
            while left < right:
                total = array[left] + array[right]
                if total == target:
                    result.append(current + [array[left], array[right]])
                    left += 1
                    right -= 1
                    # Skip duplicates
                    while left < right and array[left] == array[left - 1]:
                        left += 1
                    while left < right and array[right] == array[right + 1]:
                        right -= 1
                elif total < target:
                    left += 1
                else:
                    right -= 1
        else:
            for i in range(start, len(array) - k + 1):
                # Skip duplicates
                if i > start and array[i] == array[i - 1]:
                    continue
                # Early termination if smallest k elements exceed target
                if array[i] * k > target:
                    break
                # Early termination if largest k elements are less than target
                if array[-1] * k < target:
                    break
                kSum(i + 1, k - 1, target - array[i], current + [array[i]])

    kSum(0, k, target, [])
    return result


# Test
if __name__ == "__main__":
    print(kSumGeneralized([1, 2, 3, 4, 5], 3, 9))  # [[1, 3, 5], [2, 3, 4]]
    print(kSumGeneralized([1, 0, -1, 0, -2, 2], 4, 0))  # [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]]`,
            go: `package main

import (
    "fmt"
    "sort"
)

// KSumGeneralized finds all unique k-tuples that sum to target.
// Time: O(n^(k-1)), Space: O(k)
func KSumGeneralized(array []int, k int, target int) [][]int {
    sort.Ints(array)
    result := [][]int{}

    var kSum func(start, k, target int, current []int)
    kSum = func(start, k, target int, current []int) {
        if k == 2 {
            left, right := start, len(array)-1
            for left < right {
                total := array[left] + array[right]
                if total == target {
                    combo := make([]int, len(current)+2)
                    copy(combo, current)
                    combo[len(current)] = array[left]
                    combo[len(current)+1] = array[right]
                    result = append(result, combo)
                    left++
                    right--
                    for left < right && array[left] == array[left-1] {
                        left++
                    }
                    for left < right && array[right] == array[right+1] {
                        right--
                    }
                } else if total < target {
                    left++
                } else {
                    right--
                }
            }
        } else {
            for i := start; i <= len(array)-k; i++ {
                if i > start && array[i] == array[i-1] {
                    continue
                }
                if array[i]*k > target {
                    break
                }
                if array[len(array)-1]*k < target {
                    break
                }
                newCurrent := make([]int, len(current)+1)
                copy(newCurrent, current)
                newCurrent[len(current)] = array[i]
                kSum(i+1, k-1, target-array[i], newCurrent)
            }
        }
    }

    kSum(0, k, target, []int{})
    return result
}

func main() {
    fmt.Println(KSumGeneralized([]int{1, 2, 3, 4, 5}, 3, 9))
    fmt.Println(KSumGeneralized([]int{1, 0, -1, 0, -2, 2}, 4, 0))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 17-four-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '17-four-number-sum/01-k-sum-generalized', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/17-four-number-sum/01-k-sum-generalized'] = problem;

})();
