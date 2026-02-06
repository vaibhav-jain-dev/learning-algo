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
            { title: 'Multiple Duplicates', difficulty: 'Hard', description: 'The array can have multiple different duplicated numbers. Find all of them in O(n) time and O(1) space.', whyDifferent: 'Floyd cycle detection finds one duplicate. With multiple duplicates, you need a different approach like index-marking (negating values) to find all duplicates.', example: 'Array [4,3,2,7,8,2,3,1]. Duplicates are 2 and 3. Return [2, 3].' },
            { title: 'Count of Duplicate', difficulty: 'Medium', description: 'Find the duplicate number and also return how many times it appears in the array.', whyDifferent: 'Floyd finds the duplicate but not its frequency. After finding it, you need a linear scan to count occurrences, combining two techniques.', example: 'Array [1,3,4,2,2]. Duplicate is 2, appears 2 times. Return (2, 2).' },
            { title: 'Binary Search Approach', difficulty: 'Medium', description: 'Solve using binary search on the value range [1, n] instead of Floyd cycle detection.', whyDifferent: 'Binary search on the answer space counts how many numbers are <= mid. If count > mid, the duplicate is in [1, mid]. A completely different paradigm.', example: 'Array [1,3,4,2,2], n=4. Count nums <= 2 is 3 > 2, so duplicate is in [1,2]. Count nums <= 1 is 1, so duplicate is 2.' },
            { title: 'Modify Array Allowed', difficulty: 'Easy', description: 'You are allowed to modify the array. Find the duplicate using index marking (negation technique).', whyDifferent: 'When modification is allowed, negate nums[abs(nums[i])] as you traverse. If you find a negative value, that index is the duplicate. Simpler than Floyd.', example: 'Array [1,3,4,2,2]. Visit 1: negate index 1. Visit 3: negate index 3. Visit 4: negate index 4. Visit 2: negate index 2. Visit 2: index 2 already negative -> duplicate is 2.' },
            { title: 'Duplicate in Sorted Array', difficulty: 'Easy', description: 'The array is sorted. Find the duplicate in O(log n) time.', whyDifferent: 'Sorting changes the problem entirely. Binary search comparing nums[mid] with mid directly reveals where the duplicate must be, making Floyd unnecessary.', example: 'Sorted array [1,2,2,3,4]. nums[2]=2 and nums[3]=3, but nums[1]=2 and nums[2]=2 differ by 0 -> duplicate at value 2.' }
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
