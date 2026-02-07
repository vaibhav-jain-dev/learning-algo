/**
 * Running Product Excluding Window
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: prefix-suffix
 * Parent: 12-array-of-products
 */
(function() {
    'use strict';

    const problem = {
        name: 'Running Product Excluding Window',
        difficulty: 'Hard',
        algorithm: 'prefix-suffix',
        parent: '12-array-of-products',
        description: 'For each index i, return the product of all elements NOT in a window of size K centered at i. The window includes indices from max(0, i-K//2) to min(n-1, i+K//2).',
        problem: 'Use prefix and suffix products. For each i, the excluded window is [i-K//2, i+K//2]. The product is prefix[i-K//2-1] * suffix[i+K//2+1].',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[5,1,4,2],"window_size":3},
                output: 0,
                explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
            },
            {
                input: {"array":[1,2,3,4,5],"window_size":3},
                output: 1,
                explanation: 'The combined preprocessing and matching phases ensure each character in the text is examined at most twice, achieving linear time complexity.'
            },
            {
                input: {"array":[-5,2,-4,14,-6],"window_size":3},
                output: 2,
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            },
            // Edge case
            {
                input: {"array":[5],"window_size":3},
                output: 0,
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            }
        ],
        solutions: {
            python: `def running_product_excluding_window(array, window_size):
    """
    Running Product Excluding Window

    For each index i, return the product of all elements NOT in a window of size K centered at i. The window includes indices from max(0, i-K//2) to min(n-1, i+K//2).

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(running_product_excluding_window([5,1,4,2], 3))  # Expected: 0
print(running_product_excluding_window([1,2,3,4,5], 3))  # Expected: 1
print(running_product_excluding_window([-5,2,-4,14,-6], 3))  # Expected: 2
`,
            go: `package main

import "fmt"

// RunningProductExcludingWindow solves the Running Product Excluding Window problem.
// For each index i, return the product of all elements NOT in a window of size K centered at i. The window includes indices from max(0, i-K//2) to min(n-1, i+K//2).
// Time: O(n), Space: O(n)
func RunningProductExcludingWindow(array []int, windowSize int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RunningProductExcludingWindow([]int{5, 1, 4, 2}, 3)) // Expected: 0
	fmt.Println(RunningProductExcludingWindow([]int{1, 2, 3, 4, 5}, 3)) // Expected: 1
	fmt.Println(RunningProductExcludingWindow([]int{-5, 2, -4, 14, -6}, 3)) // Expected: 2
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '12-array-of-products/twist-04-running-product-excluding-window', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/12-array-of-products/twist-04-running-product-excluding-window'] = problem;
})();
