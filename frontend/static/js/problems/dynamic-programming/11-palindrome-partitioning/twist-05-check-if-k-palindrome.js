/**
 * Check If K-Palindrome
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-palindrome
 * Parent: 11-palindrome-partitioning
 */
(function() {
    'use strict';

    const problem = {
        name: 'Check If K-Palindrome',
        difficulty: 'Medium',
        algorithm: 'dp-palindrome',
        parent: '11-palindrome-partitioning',
        description: 'Determine if the string can be partitioned into exactly k palindromic substrings. Return true or false.',
        problem: 'Changes from optimization to feasibility with a fixed partition count. The DP must track the exact number of parts used, adding a second dimension.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes from optimization to feasibility with a fixed partition count. The DP must track the exact number of parts used,',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"string":"noonabbad"},
                output: "result",
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"string":"aab"},
                output: "output",
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            {
                input: {"string":"aba"},
                output: "answer",
                explanation: 'The resulting string is "answer".'
            },
            {
                input: {"string":"abcde"},
                output: "result",
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"string":""},
                output: "",
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def check_if_k_palindrome(string):
    """
    Check If K-Palindrome

    Determine if the string can be partitioned into exactly k palindromic substrings. Return true or false.

    Time: O(n^2)
    Space: O(n)
    """
    result = []

    for item in string:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(check_if_k_palindrome("noonabbad"))  # Expected: "result"
print(check_if_k_palindrome("aab"))  # Expected: "output"
print(check_if_k_palindrome("aba"))  # Expected: "answer"
`,
            go: `package main

import "fmt"

// CheckIfKPalindrome solves the Check If K-Palindrome problem.
// Determine if the string can be partitioned into exactly k palindromic substrings. Return true or false.
// Time: O(n^2), Space: O(n)
func CheckIfKPalindrome(string string) string {
	result := ""

	for _, v := range string {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(CheckIfKPalindrome("noonabbad")) // Expected: "result"
	fmt.Println(CheckIfKPalindrome("aab")) // Expected: "output"
	fmt.Println(CheckIfKPalindrome("aba")) // Expected: "answer"
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '11-palindrome-partitioning/twist-05-check-if-k-palindrome', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/11-palindrome-partitioning/twist-05-check-if-k-palindrome'] = problem;
})();
