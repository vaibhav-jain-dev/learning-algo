/**
 * Alternative: Prefix Sum + Monotonic Deque
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 01-kadanes-algorithm/03-max-sum-k-elements
 */
(function() {
    'use strict';
    const problem = {
        name: 'Alternative: Prefix Sum + Monotonic Deque',
        difficulty: 'Hard',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/03-max-sum-k-elements',
        description: 'Solve the "at least k" problem using prefix sums and a monotonic deque. For each position i, you want the minimum prefix[j] where j <= i-k. Maintain a deque of candidate j values.',
        problem: 'Completely different data structure approach. Instead of the window+extension decomposition, directly optimizes prefix[i] - prefix[j] subject to i - j >= k using a sliding minimum on prefix sums.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Array [1, -2, 3, -1, 5], prefix = [0, 1, -1, 2, 1, 6]. For i=4 (prefix=6), find min prefix[j] for j<=2: min(0,1,-1)=-1. Sum = 6-(-1) = 7.' },
                output: 'See example',
                explanation: 'Array [1, -2, 3, -1, 5], prefix = [0, 1, -1, 2, 1, 6]. For i=4 (prefix=6), find min prefix[j] for j<=2: min(0,1,-1)=-1. Sum = 6-(-1) = 7.'
            }
        ],
        solutions: {
            python: `# Alternative: Prefix Sum + Monotonic Deque
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 01-kadanes-algorithm/03-max-sum-k-elements

def solve():
    """
    Solve the "at least k" problem using prefix sums and a monotonic deque. For each position i, you want the minimum prefix[j] where j <= i-k. Maintain a deque of candidate j values.

    Key insight: Completely different data structure approach. Instead of the window+extension decomposition, directly optimizes prefix[i] - prefix[j] subject to i - j >= k using a sliding minimum on prefix sums.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Alternative: Prefix Sum + Monotonic Deque problem.
// Solve the "at least k" problem using prefix sums and a monotonic deque. For each position i, you want the minimum prefix[j] where j <= i-k. Maintain a deque of candidate j values.
// Key insight: Completely different data structure approach. Instead of the window+extension decomposition, directly optimizes prefix[i] - prefix[j] subject to i - j >= k using a sliding minimum on prefix sums.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements/twist-03-alternative-prefix-sum-monotonic-deque', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements/twist-03-alternative-prefix-sum-monotonic-deque'] = problem;
})();
