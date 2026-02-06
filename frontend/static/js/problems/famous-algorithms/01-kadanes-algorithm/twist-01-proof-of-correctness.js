/**
 * Proof of Correctness
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Proof of Correctness',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Prove formally that Kadane\'s algorithm always produces the correct answer. Specifically, prove the invariant: after processing index i, maxEndingHere equals the maximum sum of any subarray ending at i, and maxSoFar equals the maximum sum of any subarray in nums[0..i].',
        problem: 'Forces you to think inductively rather than just coding the recurrence. You must argue why the greedy choice (start fresh vs extend) is always optimal at every step.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Base case: maxEndingHere = nums[0], maxSoFar = nums[0]. Inductive step: if maxEndingHere correctly holds the max subarray sum ending at i-1, then max(nums[i], maxEndingHere + nums[i]) correctly computes it for i.' },
                output: 'See example',
                explanation: 'Base case: maxEndingHere = nums[0], maxSoFar = nums[0]. Inductive step: if maxEndingHere correctly holds the max subarray sum ending at i-1, then max(nums[i], maxEndingHere + nums[i]) correctly computes it for i.'
            }
        ],
        solutions: {
            python: `# Proof of Correctness
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 01-kadanes-algorithm

def solve():
    """
    Prove formally that Kadane's algorithm always produces the correct answer. Specifically, prove the invariant: after processing index i, maxEndingHere equals the maximum sum of any subarray ending at i, and maxSoFar equals the maximum sum of any subarray in nums[0..i].

    Key insight: Forces you to think inductively rather than just coding the recurrence. You must argue why the greedy choice (start fresh vs extend) is always optimal at every step.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Proof of Correctness problem.
// Prove formally that Kadane's algorithm always produces the correct answer. Specifically, prove the invariant: after processing index i, maxEndingHere equals the maximum sum of any subarray ending at i, and maxSoFar equals the maximum sum of any subarray in nums[0..i].
// Key insight: Forces you to think inductively rather than just coding the recurrence. You must argue why the greedy choice (start fresh vs extend) is always optimal at every step.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
}
`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-01-proof-of-correctness', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-01-proof-of-correctness'] = problem;
})();
