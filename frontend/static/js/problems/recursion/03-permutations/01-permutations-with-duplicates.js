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
            { title: 'Count Only', difficulty: 'Medium', description: 'Instead of generating all unique permutations, return only the count of unique permutations without building them.', whyDifferent: 'Shifts from backtracking enumeration to a mathematical/combinatorial counting approach using factorial division by duplicate counts.', example: 'For [1,1,2], return 3 instead of [[1,1,2],[1,2,1],[2,1,1]]. Use formula n!/(k1!*k2!*...) = 3!/(2!*1!) = 3.' },
            { title: 'Lexicographic Order', difficulty: 'Hard', description: 'Generate all unique permutations in strict lexicographic (sorted) order, but without sorting the final result.', whyDifferent: 'Requires building permutations in order during generation rather than sorting afterward, demanding careful control of the recursion tree traversal.', example: 'For [2,1,1], output must be [[1,1,2],[1,2,1],[2,1,1]] generated in this exact order without a post-sort step.' },
            { title: 'Streaming Permutations', difficulty: 'Hard', description: 'Generate permutations one at a time using an iterator/generator pattern, yielding each unique permutation without storing all of them in memory.', whyDifferent: 'Forces lazy evaluation thinking instead of collecting all results into a list, which is critical for very large inputs where memory is constrained.', example: 'For [1,1,2,2,3], yield permutations one by one so at any point only O(n) extra space is used, not O(n! * n).' },
            { title: 'Circular Permutations', difficulty: 'Hard', description: 'Generate unique circular permutations where rotations of the same arrangement are considered identical.', whyDifferent: 'Adds equivalence class reasoning on top of duplicate handling. You must fix one element to break rotational symmetry while still skipping duplicates.', example: 'For [1,1,2], circular permutations are [1,1,2] and [1,2,1] only (since [2,1,1] is a rotation of [1,1,2]).' },
            { title: 'Partial Permutations', difficulty: 'Medium', description: 'Given an array with duplicates and an integer k, generate all unique permutations of length k (not necessarily using all elements).', whyDifferent: 'Changes the base case from full-length to partial-length, requiring different termination logic while still handling duplicates correctly.', example: 'For [1,1,2] with k=2, return [[1,1],[1,2],[2,1]] -- all unique 2-length arrangements.' }
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
