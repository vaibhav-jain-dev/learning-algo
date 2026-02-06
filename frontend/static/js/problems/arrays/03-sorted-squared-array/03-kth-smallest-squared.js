/**
 * Kth Smallest Squared
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Smallest Squared',
        difficulty: 'Hard',
        algorithm: 'two-pointer-sorted-squared',
        parent: '03-sorted-squared-array',
        description: 'Given a sorted array of integers and an integer k, find the k-th smallest element after squaring all elements, without fully sorting the squared array.',
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
            -4,
            -2,
            0,
            1,
            3
          ],
          "k": 3
        },
        output: "1\nExplanation: Squared array sorted: [0, 1, 4, 9, 16], 3rd element is 1",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Squared array sorted: [0, 1, 4, 9, 16], 3rd element is 1'
    },
    {
        input: {
          "array": [
            -3,
            -1,
            2,
            4
          ],
          "k": 2
        },
        output: "1\nExplanation: Squared array sorted: [1, 4, 9, 16], 2nd element is 1",
        explanation: 'Given the input, the algorithm processes it to produce 1\nExplanation: Squared array sorted: [1, 4, 9, 16], 2nd element is 1'
    }
        ],
        solutions: {
            python: `def kthSmallestSquared(array, k):
    """
    Kth Smallest Squared - Find k-th smallest in squared array using two pointers.

    Time: O(k) - we only need to find k elements, not sort entire array
    Space: O(1) - not counting output, just pointers
    """
    if not array or k <= 0 or k > len(array):
        return None

    n = len(array)

    # Find the split point where values change from negative to non-negative
    # This is where smallest squares will be found
    neg_ptr = -1  # Points to last negative number
    for i in range(n):
        if array[i] < 0:
            neg_ptr = i
        else:
            break

    pos_ptr = neg_ptr + 1  # Points to first non-negative number

    # Use two pointers moving outward to find k-th smallest square
    count = 0
    result = 0

    while count < k:
        # Get squared values at both pointers (or infinity if out of bounds)
        neg_sq = array[neg_ptr] ** 2 if neg_ptr >= 0 else float('inf')
        pos_sq = array[pos_ptr] ** 2 if pos_ptr < n else float('inf')

        if neg_sq <= pos_sq:
            result = neg_sq
            neg_ptr -= 1  # Move left in negative portion
        else:
            result = pos_sq
            pos_ptr += 1  # Move right in positive portion

        count += 1

    return result


# Test
if __name__ == "__main__":
    print(kthSmallestSquared([-4, -2, 0, 1, 3], 3))  # 1 (sorted: [0, 1, 4, 9, 16])
    print(kthSmallestSquared([-3, -1, 2, 4], 2))  # 1 (sorted: [1, 4, 9, 16])
    print(kthSmallestSquared([-4, -2, 0, 1, 3], 1))  # 0`,
            go: `package main

import (
    "fmt"
    "math"
)

// KthSmallestSquared finds k-th smallest in squared array using two pointers.
// Time: O(k), Space: O(1)
func KthSmallestSquared(array []int, k int) int {
    n := len(array)
    if n == 0 || k <= 0 || k > n {
        return -1
    }

    // Find the split point where values change from negative to non-negative
    negPtr := -1 // Points to last negative number
    for i := 0; i < n; i++ {
        if array[i] < 0 {
            negPtr = i
        } else {
            break
        }
    }

    posPtr := negPtr + 1 // Points to first non-negative number

    // Use two pointers moving outward to find k-th smallest square
    count := 0
    result := 0

    for count < k {
        // Get squared values at both pointers (or max int if out of bounds)
        var negSq, posSq int
        if negPtr >= 0 {
            negSq = array[negPtr] * array[negPtr]
        } else {
            negSq = math.MaxInt64
        }
        if posPtr < n {
            posSq = array[posPtr] * array[posPtr]
        } else {
            posSq = math.MaxInt64
        }

        if negSq <= posSq {
            result = negSq
            negPtr-- // Move left in negative portion
        } else {
            result = posSq
            posPtr++ // Move right in positive portion
        }

        count++
    }

    return result
}

func main() {
    fmt.Println(KthSmallestSquared([]int{-4, -2, 0, 1, 3}, 3))  // 1
    fmt.Println(KthSmallestSquared([]int{-3, -1, 2, 4}, 2))     // 1
    fmt.Println(KthSmallestSquared([]int{-4, -2, 0, 1, 3}, 1))  // 0
}`
        },
        twists: [
            {
                title: 'Kth Smallest Squared Across Multiple Arrays',
                difficulty: 'Hard',
                description: 'Given multiple sorted arrays, find the kth smallest squared value across all of them.',
                whyDifferent: 'Requires a min-heap with multiple two-pointer pairs, or merging multiple squared streams simultaneously.',
                example: 'arrays=[[-3,1,4],[-2,0,5]], k=3 → 1 (squares: [0,1,4,9,16,25], 3rd is 4... wait, sorted: 0,1,4,4,9,16,25 → 3rd is 4)'
            },
            {
                title: 'Kth Smallest Unique Squared',
                difficulty: 'Medium',
                description: 'Find the kth smallest squared value, but skip duplicate squares (e.g., -3 and 3 both give 9, count it only once).',
                whyDifferent: 'Adds deduplication to the progressive search, requiring you to detect when both pointers yield the same squared value.',
                example: 'array=[-3,-1,0,1,3], k=2 → 1 (unique squares sorted: 0,1,9 → 2nd is 1)'
            },
            {
                title: 'Median of Squared Array',
                difficulty: 'Medium',
                description: 'Find the median of the squared array without fully sorting it.',
                whyDifferent: 'The kth-smallest approach works, but you need to determine k=n/2 first, and for even-length arrays, average two middle elements.',
                example: 'array=[-4,-2,0,1,3] → median of [0,1,4,9,16] is 4'
            },
            {
                title: 'Kth Smallest with Range Query',
                difficulty: 'Very Hard',
                description: 'Support range queries: given indices l and r, find the kth smallest squared value from array[l..r] only.',
                whyDifferent: 'The subarray may not have a clean negative/positive split, requiring segment tree or persistent data structure approaches.',
                example: 'array=[-4,-2,0,1,3], query(l=1,r=3,k=2) → from [-2,0,1], squares [0,1,4], 2nd is 1'
            },
            {
                title: 'Kth Smallest Squared Sum of Pairs',
                difficulty: 'Very Hard',
                description: 'Instead of squaring individual elements, find the kth smallest value of a[i]^2 + a[j]^2 for all pairs i<j.',
                whyDifferent: 'Completely changes the problem from single-element to pair-based, requiring a heap-based enumeration of sorted pair sums.',
                example: 'array=[-2,0,1], pairs: (0+4)=4, (0+1)=1, (4+1)=5 → sorted: 1,4,5 → k=1 gives 1'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 03-sorted-squared-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/03-kth-smallest-squared', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/03-kth-smallest-squared'] = problem;

})();
