/**
 * Find Duplicate Number
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: floyd-cycle-detection
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Duplicate Number',
        difficulty: 'Medium',
        algorithm: 'floyd-cycle-detection',
        parent: '07-single-cycle-check',
        description: 'Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array and using only constant extra space.',
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
                3,
                4,
                2,
                2
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input nums=[1, 3, 4, 2, 2], the result is 2.'
    }
        ],
        solutions: {
            python: `def findDuplicate(nums):
    """
    Find Duplicate Number using Floyd's Cycle Detection

    Treat the array as a linked list where index i points to nums[i].
    Since there's a duplicate, there must be a cycle.

    Time: O(n)
    Space: O(1)
    """
    # Phase 1: Find intersection point in cycle
    slow = nums[0]
    fast = nums[0]

    while True:
        slow = nums[slow]           # Move 1 step
        fast = nums[nums[fast]]     # Move 2 steps
        if slow == fast:
            break

    # Phase 2: Find cycle entrance (the duplicate)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow


# Test
if __name__ == "__main__":
    # Test case 1
    print(findDuplicate([1, 3, 4, 2, 2]))  # 2

    # Test case 2
    print(findDuplicate([3, 1, 3, 4, 2]))  # 3

    # Test case 3
    print(findDuplicate([1, 1]))  # 1`,
            go: `package main

import "fmt"

// FindDuplicate finds the duplicate number using Floyd's Cycle Detection
// Treats array as linked list: index i -> nums[i]
// Time: O(n), Space: O(1)
func FindDuplicate(nums []int) int {
    // Phase 1: Find intersection point in cycle
    slow := nums[0]
    fast := nums[0]

    for {
        slow = nums[slow]       // Move 1 step
        fast = nums[nums[fast]] // Move 2 steps
        if slow == fast {
            break
        }
    }

    // Phase 2: Find cycle entrance (the duplicate)
    slow = nums[0]
    for slow != fast {
        slow = nums[slow]
        fast = nums[fast]
    }

    return slow
}

func main() {
    // Test case 1
    fmt.Println(FindDuplicate([]int{1, 3, 4, 2, 2})) // 2

    // Test case 2
    fmt.Println(FindDuplicate([]int{3, 1, 3, 4, 2})) // 3

    // Test case 3
    fmt.Println(FindDuplicate([]int{1, 1})) // 1
}`
        },
        twists: [
            { id: '07-single-cycle-check/02-find-duplicate-number/twist-01-multiple-duplicates', name: 'Multiple Duplicates', difficulty: 'Hard' },
            { id: '07-single-cycle-check/02-find-duplicate-number/twist-02-count-of-duplicate', name: 'Count of Duplicate', difficulty: 'Medium' },
            { id: '07-single-cycle-check/02-find-duplicate-number/twist-03-binary-search-approach', name: 'Binary Search Approach', difficulty: 'Medium' },
            { id: '07-single-cycle-check/02-find-duplicate-number/twist-04-modify-array-allowed', name: 'Modify Array Allowed', difficulty: 'Easy' },
            { id: '07-single-cycle-check/02-find-duplicate-number/twist-05-duplicate-in-sorted-array', name: 'Duplicate in Sorted Array', difficulty: 'Easy' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/02-find-duplicate-number', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/02-find-duplicate-number'] = problem;

})();
