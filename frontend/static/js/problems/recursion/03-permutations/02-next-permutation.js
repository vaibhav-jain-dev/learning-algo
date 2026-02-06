/**
 * Next Permutation
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Next Permutation',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'A permutation of an array of integers is an arrangement of its members into a sequence or linear order. The **next permutation** of an array of integers is the next lexicographically greater permutation of its integer. If the array is already at its largest permutation, rearrange it to the smallest permutation (sorted in ascending order). The replacement must be in place and use only constant extra memory.',
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
        "nums": [
                1,
                2,
                3
        ]
},
        output: [1, 3, 2],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input nums=[1, 2, 3], the result is [1, 3, 2].'
    }
        ],
        solutions: {
            python: `def nextPermutation(data):
    """
    Next Permutation

    Find the next lexicographically greater permutation.
    Algorithm:
    1. Find the largest index i such that nums[i] < nums[i + 1]
    2. Find the largest index j greater than i such that nums[i] < nums[j]
    3. Swap nums[i] and nums[j]
    4. Reverse the suffix starting at nums[i + 1]

    Time: O(n)
    Space: O(1) - in-place modification
    """
    nums = data.get("nums", data) if isinstance(data, dict) else data
    nums = list(nums)  # Make a copy to avoid modifying input
    n = len(nums)

    # Step 1: Find the first decreasing element from the right
    i = n - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1

    if i >= 0:
        # Step 2: Find the smallest element greater than nums[i] to its right
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1

        # Step 3: Swap
        nums[i], nums[j] = nums[j], nums[i]

    # Step 4: Reverse the suffix
    left, right = i + 1, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1

    return nums


# Test
if __name__ == "__main__":
    print(nextPermutation({"nums": [1, 2, 3]}))  # Output: [1, 3, 2]
    print(nextPermutation({"nums": [3, 2, 1]}))  # Output: [1, 2, 3]
    print(nextPermutation({"nums": [1, 1, 5]}))  # Output: [1, 5, 1]`,
            go: `package main

import "fmt"

// NextPermutation finds the next lexicographically greater permutation.
// Algorithm: Find pivot, find swap target, swap, reverse suffix.
// Time: O(n), Space: O(1)
func NextPermutation(data interface{}) interface{} {
    var nums []int
    switch v := data.(type) {
    case map[string]interface{}:
        arr := v["nums"].([]interface{})
        nums = make([]int, len(arr))
        for i, n := range arr {
            nums[i] = int(n.(float64))
        }
    case []int:
        nums = make([]int, len(v))
        copy(nums, v)
    }

    n := len(nums)

    // Step 1: Find the first decreasing element from the right
    i := n - 2
    for i >= 0 && nums[i] >= nums[i+1] {
        i--
    }

    if i >= 0 {
        // Step 2: Find the smallest element greater than nums[i] to its right
        j := n - 1
        for nums[j] <= nums[i] {
            j--
        }

        // Step 3: Swap
        nums[i], nums[j] = nums[j], nums[i]
    }

    // Step 4: Reverse the suffix
    left, right := i+1, n-1
    for left < right {
        nums[left], nums[right] = nums[right], nums[left]
        left++
        right--
    }

    return nums
}

func main() {
    nums1 := []interface{}{float64(1), float64(2), float64(3)}
    fmt.Println(NextPermutation(map[string]interface{}{"nums": nums1})) // Output: [1 3 2]

    nums2 := []interface{}{float64(3), float64(2), float64(1)}
    fmt.Println(NextPermutation(map[string]interface{}{"nums": nums2})) // Output: [1 2 3]
}`
        },
        twists: [
            { title: 'Previous Permutation', difficulty: 'Medium', description: 'Instead of finding the next lexicographically greater permutation, find the previous lexicographically smaller permutation.', whyDifferent: 'Reverses the scanning direction logic -- you must find the first increasing pair from the right and swap with the largest smaller element, then reverse.', example: 'For [1,3,2], the previous permutation is [1,2,3]. For [3,2,1] (smallest), wrap to [3,2,1] -> already smallest, so no change or wrap to largest.' },
            { title: 'Kth Next Permutation', difficulty: 'Hard', description: 'Given an array and an integer k, find the permutation that is exactly k steps ahead in lexicographic order, without generating all intermediate permutations.', whyDifferent: 'Requires factoradic number system thinking to jump directly to the target permutation instead of iterating one step at a time.', example: 'For [1,2,3] with k=3, jump directly to [2,3,1] without computing [1,3,2] and [2,1,3] in between.' },
            { title: 'Next Permutation with Constraints', difficulty: 'Hard', description: 'Find the next permutation where certain positions are fixed and cannot be swapped.', whyDifferent: 'The standard pivot-and-swap approach breaks when some indices are immovable, requiring a constrained search that respects fixed positions.', example: 'For [1,2,3,4] with position 1 fixed (value 2 stays), next permutation is [1,2,4,3] not [1,3,2,4].' },
            { title: 'Next Permutation of a String', difficulty: 'Easy', description: 'Apply the next permutation algorithm to a string of characters instead of numbers, returning the next lexicographic string.', whyDifferent: 'While algorithmically similar, working with characters introduces considerations around character encoding, case sensitivity, and string immutability.', example: 'For "abdc", the next permutation string is "acbd". For "dcba", wrap around to "abcd".' },
            { title: 'Rank of Permutation', difficulty: 'Very Hard', description: 'Given a permutation, determine its rank (1-indexed position) among all permutations of its elements in lexicographic order.', whyDifferent: 'Inverts the problem from generating to counting. Requires computing how many permutations come before the given one using factorial arithmetic.', example: 'For [2,1,3], rank is 3 because the order is: [1,2,3]=1, [1,3,2]=2, [2,1,3]=3.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/02-next-permutation', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/02-next-permutation'] = problem;

})();
