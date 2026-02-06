/**
 * Permutations with Duplicates
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Permutations with Duplicates',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Given an array of numbers that may contain duplicates, return all possible unique permutations in any order. Unlike the basic permutations problem where all elements are unique, this problem requires handling duplicate elements to avoid generating duplicate permutations.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n! * n)',
            space: 'O(n)'
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
        "nums": [
                1,
                1,
                2
        ]
},
        output: [[1, 1, 2], [1, 2, 1], [2, 1, 1]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input nums=[1, 1, 2], the result is [[1, 1, 2], [1, 2, 1], [2, 1, 1]].'
    }
        ],
        solutions: {
            python: `def permutationsWithDuplicates(data):
    """
    Permutations with Duplicates

    Generate all unique permutations of an array that may contain duplicates.
    Key insight: Sort the array first, then skip duplicates during backtracking.

    Time: O(n! * n) for generating permutations
    Space: O(n) for recursion stack
    """
    nums = data.get("nums", data) if isinstance(data, dict) else data

    result = []
    nums = sorted(nums)  # Sort to handle duplicates
    used = [False] * len(nums)

    def backtrack(current):
        if len(current) == len(nums):
            result.append(current[:])
            return

        for i in range(len(nums)):
            # Skip if already used
            if used[i]:
                continue

            # Skip duplicates: if current element equals previous element
            # and previous wasn't used in this branch, skip to avoid duplicates
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue

            used[i] = True
            current.append(nums[i])
            backtrack(current)
            current.pop()
            used[i] = False

    backtrack([])
    return result


# Test
if __name__ == "__main__":
    print(permutationsWithDuplicates({"nums": [1, 1, 2]}))
    # Output: [[1, 1, 2], [1, 2, 1], [2, 1, 1]]`,
            go: `package main

import (
    "fmt"
    "sort"
)

// PermutationsWithDuplicates generates all unique permutations.
// Sort array first, then skip duplicates during backtracking.
// Time: O(n! * n), Space: O(n)
func PermutationsWithDuplicates(data interface{}) interface{} {
    var nums []int
    switch v := data.(type) {
    case map[string]interface{}:
        arr := v["nums"].([]interface{})
        nums = make([]int, len(arr))
        for i, n := range arr {
            nums[i] = int(n.(float64))
        }
    case []int:
        nums = v
    }

    sort.Ints(nums)
    result := [][]int{}
    used := make([]bool, len(nums))

    var backtrack func(current []int)
    backtrack = func(current []int) {
        if len(current) == len(nums) {
            perm := make([]int, len(current))
            copy(perm, current)
            result = append(result, perm)
            return
        }

        for i := 0; i < len(nums); i++ {
            if used[i] {
                continue
            }

            // Skip duplicates
            if i > 0 && nums[i] == nums[i-1] && !used[i-1] {
                continue
            }

            used[i] = true
            current = append(current, nums[i])
            backtrack(current)
            current = current[:len(current)-1]
            used[i] = false
        }
    }

    backtrack([]int{})
    return result
}

func main() {
    nums := []interface{}{float64(1), float64(1), float64(2)}
    fmt.Println(PermutationsWithDuplicates(map[string]interface{}{"nums": nums}))
    // Output: [[1 1 2] [1 2 1] [2 1 1]]
}`
        },
        twists: [
            { id: '03-permutations/01-permutations-with-duplicates/twist-01-count-only', name: 'Count Only', difficulty: 'Medium' },
            { id: '03-permutations/01-permutations-with-duplicates/twist-02-lexicographic-order', name: 'Lexicographic Order', difficulty: 'Hard' },
            { id: '03-permutations/01-permutations-with-duplicates/twist-03-streaming-permutations', name: 'Streaming Permutations', difficulty: 'Hard' },
            { id: '03-permutations/01-permutations-with-duplicates/twist-04-circular-permutations', name: 'Circular Permutations', difficulty: 'Hard' },
            { id: '03-permutations/01-permutations-with-duplicates/twist-05-partial-permutations', name: 'Partial Permutations', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/01-permutations-with-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/01-permutations-with-duplicates'] = problem;

})();
