/**
 * Circular Array Loop
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: fast-slow-pointer
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Array Loop',
        difficulty: 'Medium',
        algorithm: 'fast-slow-pointer',
        parent: '07-single-cycle-check',
        description: 'You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i: - If nums[i] is positive, move nums[i] steps forward - If nums[i] is negative, move |nums[i]| steps backward Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element. A cycle in the arr',
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
                2,
                -1,
                1,
                2,
                2
        ]
},
        output: true,
        explanation: 'Processing the input data produces the output. For input nums=[2, -1, 1, 2, 2], the result is true.'
    }
        ],
        solutions: {
            python: `def circularArrayLoop(nums):
    """
    Circular Array Loop - Fast/Slow Pointer

    A valid cycle must:
    1. Have length > 1 (no single element cycles)
    2. All movements in same direction (all positive or all negative)

    Time: O(n)
    Space: O(1)
    """
    n = len(nums)
    if n == 0:
        return False

    def next_index(i):
        """Get next index with wraparound."""
        return (i + nums[i]) % n

    for i in range(n):
        if nums[i] == 0:
            continue

        # Determine direction for this starting point
        is_forward = nums[i] > 0
        slow = i
        fast = i

        while True:
            # Move slow one step
            next_slow = next_index(slow)

            # Check direction consistency and self-loop
            if (nums[next_slow] > 0) != is_forward or next_slow == slow:
                break

            # Move fast two steps
            next_fast = next_index(fast)
            if (nums[next_fast] > 0) != is_forward or next_fast == fast:
                break

            next_fast = next_index(next_fast)
            if (nums[next_fast] > 0) != is_forward or next_fast == next_index(fast):
                break

            slow = next_slow
            fast = next_fast

            if slow == fast:
                return True

        # Mark visited nodes in this path as 0 (optimization)
        j = i
        while nums[j] != 0 and (nums[j] > 0) == is_forward:
            next_j = next_index(j)
            nums[j] = 0
            j = next_j

    return False


# Test
if __name__ == "__main__":
    print(circularArrayLoop([2, -1, 1, 2, 2]))   # True
    print(circularArrayLoop([-1, -2, -3, -4, -5]))  # False
    print(circularArrayLoop([-2, 1, -1, -2, -2]))  # False`,
            go: `package main

import "fmt"

// CircularArrayLoop detects valid cycles in circular array
// Time: O(n), Space: O(1)
func CircularArrayLoop(nums []int) bool {
    n := len(nums)
    if n == 0 {
        return false
    }

    nextIndex := func(i int) int {
        next := (i + nums[i]) % n
        if next < 0 {
            next += n
        }
        return next
    }

    for i := 0; i < n; i++ {
        if nums[i] == 0 {
            continue
        }

        isForward := nums[i] > 0
        slow, fast := i, i

        for {
            // Move slow one step
            nextSlow := nextIndex(slow)
            if (nums[nextSlow] > 0) != isForward || nextSlow == slow {
                break
            }

            // Move fast two steps
            nextFast := nextIndex(fast)
            if (nums[nextFast] > 0) != isForward || nextFast == fast {
                break
            }

            nextFast2 := nextIndex(nextFast)
            if (nums[nextFast2] > 0) != isForward || nextFast2 == nextFast {
                break
            }

            slow = nextSlow
            fast = nextFast2

            if slow == fast {
                return true
            }
        }

        // Mark visited nodes as 0 (optimization)
        j := i
        for nums[j] != 0 && (nums[j] > 0) == isForward {
            nextJ := nextIndex(j)
            nums[j] = 0
            j = nextJ
        }
    }

    return false
}

func main() {
    fmt.Println(CircularArrayLoop([]int{2, -1, 1, 2, 2}))     // true
    fmt.Println(CircularArrayLoop([]int{-1, -2, -3, -4, -5})) // false
    fmt.Println(CircularArrayLoop([]int{-2, 1, -1, -2, -2}))  // false
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '07-single-cycle-check/03-circular-array-loop', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/07-single-cycle-check/03-circular-array-loop'] = problem;

})();
