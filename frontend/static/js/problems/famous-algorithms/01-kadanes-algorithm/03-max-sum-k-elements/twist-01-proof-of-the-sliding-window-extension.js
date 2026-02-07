/**
 * Proof of the Sliding Window Extension
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/03-max-sum-k-elements
 */
(function() {
    'use strict';

    const problem = {
        name: 'Proof of the Sliding Window Extension',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/03-max-sum-k-elements',
        description: 'Prove that the optimal subarray of at least k elements consists of a mandatory window of exactly k elements plus an optional positive-sum prefix extension. Why is it sufficient to only consider extending leftward from the window?',
        problem: 'Forces formal reasoning about why decomposing into "fixed k-window + optional extension" covers all possible subarrays of length >= k without missing any cases.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,-2,3,-1,5],"k":3,"window_size":3},
                output: 1,
                explanation: 'The running maximum at each index represents the best subarray ending at that position. A negative running sum is never worth carrying forward.'
            },
            {
                input: {"nums":[-1,-2,-3],"k":3,"window_size":3},
                output: 2,
                explanation: 'Compare extending the current subarray (running_sum + current) vs starting new (just current). The global best is updated whenever a new maximum is found.'
            },
            // Edge case
            {
                input: {"nums":[1],"k":3,"window_size":3},
                output: 0,
                explanation: 'Maintain a running sum as you scan. At each position, choose to either extend the current subarray or start fresh. Track the global maximum across all positions.'
            }
        ],
        solutions: {
            python: `def proof_of_the_sliding_window_extension(nums, k, window_size):
    """
    Proof of the Sliding Window Extension

    Prove that the optimal subarray of at least k elements consists of a mandatory window of exactly k elements plus an optional positive-sum prefix extension. Why is it sufficient to only consider extending leftward from the window?

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(nums)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and nums[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(proof_of_the_sliding_window_extension([1,-2,3,-1,5], 3, 3))  # Expected: 1
print(proof_of_the_sliding_window_extension([-1,-2,-3], 3, 3))  # Expected: 2
print(proof_of_the_sliding_window_extension([1], 3, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// ProofOfTheSlidingWindowExtension solves the Proof of the Sliding Window Extension problem.
// Prove that the optimal subarray of at least k elements consists of a mandatory window of exactly k elements plus an optional positive-sum prefix extension. Why is it sufficient to only consider extending leftward from the window?
// Time: O(?), Space: O(?)
func ProofOfTheSlidingWindowExtension(nums []int, k int, windowSize int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ProofOfTheSlidingWindowExtension([]int{1, -2, 3, -1, 5}, 3, 3)) // Expected: 1
	fmt.Println(ProofOfTheSlidingWindowExtension([]int{-1, -2, -3}, 3, 3)) // Expected: 2
	fmt.Println(ProofOfTheSlidingWindowExtension([]int{1}, 3, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements/twist-01-proof-of-the-sliding-window-extension', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements/twist-01-proof-of-the-sliding-window-extension'] = problem;
})();
