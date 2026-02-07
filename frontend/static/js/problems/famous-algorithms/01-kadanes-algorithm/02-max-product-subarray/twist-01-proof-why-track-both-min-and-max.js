/**
 * Proof: Why Track Both Min and Max
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/02-max-product-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Proof: Why Track Both Min and Max',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/02-max-product-subarray',
        description: 'Prove that tracking both maxProd and minProd at each position is necessary and sufficient. Specifically, prove that the maximum product subarray ending at position i must equal either nums[i], maxProd[i-1]*nums[i], or minProd[i-1]*nums[i].',
        problem: 'Unlike sum where negative extensions are always bad, a negative product can become the maximum after multiplying by another negative. You must formally argue why two variables suffice.',
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
                input: {"nums":[2,3,-2,4]},
                output: 2,
                explanation: 'The running maximum at each index represents the best subarray ending at that position. A negative running sum is never worth carrying forward.'
            },
            {
                input: {"nums":[-2,0,-1]},
                output: 3,
                explanation: 'Compare extending the current subarray (running_sum + current) vs starting new (just current). The global best is updated whenever a new maximum is found.'
            },
            // Edge case
            {
                input: {"nums":[2]},
                output: 0,
                explanation: 'Maintain a running sum as you scan. At each position, choose to either extend the current subarray or start fresh. Track the global maximum across all positions.'
            }
        ],
        solutions: {
            python: `def proof_why_track_both_min_and_max(nums):
    """
    Proof: Why Track Both Min and Max

    Prove that tracking both maxProd and minProd at each position is necessary and sufficient. Specifically, prove that the maximum product subarray ending at position i must equal either nums[i], maxProd[i-1]*nums[i], or minProd[i-1]*nums[i].

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(proof_why_track_both_min_and_max([2,3,-2,4]))  # Expected: 2
print(proof_why_track_both_min_and_max([-2,0,-1]))  # Expected: 3
print(proof_why_track_both_min_and_max([2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ProofWhyTrackBothMinAndMax solves the Proof: Why Track Both Min and Max problem.
// Prove that tracking both maxProd and minProd at each position is necessary and sufficient. Specifically, prove that the maximum product subarray ending at position i must equal either nums[i], maxProd[i-1]*nums[i], or minProd[i-1]*nums[i].
// Time: O(?), Space: O(?)
func ProofWhyTrackBothMinAndMax(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ProofWhyTrackBothMinAndMax([]int{2, 3, -2, 4})) // Expected: 2
	fmt.Println(ProofWhyTrackBothMinAndMax([]int{-2, 0, -1})) // Expected: 3
	fmt.Println(ProofWhyTrackBothMinAndMax([]int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/02-max-product-subarray/twist-01-proof-why-track-both-min-and-max', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/02-max-product-subarray/twist-01-proof-why-track-both-min-and-max'] = problem;
})();
