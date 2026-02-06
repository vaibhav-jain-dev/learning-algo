/**
 * Proof of the Sliding Window Extension
 * Category: famous-algorithms
 * Difficulty: Hard
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
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1, -2, 3, -1, 5] with k=2: window [3,-1]=2, extend left with max(0, 1+(-2))=0, so just window. Window [-1,5]=4, extend left with max(0, 3)=3, total=7.' },
                output: 'See example',
                explanation: 'For [1, -2, 3, -1, 5] with k=2: window [3,-1]=2, extend left with max(0, 1+(-2))=0, so just window. Window [-1,5]=4, extend left with max(0, 3)=3, total=7.'
            }
        ],
        solutions: {
            python: `# Proof of the Sliding Window Extension
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 01-kadanes-algorithm/03-max-sum-k-elements

def solve():
    """
    Prove that the optimal subarray of at least k elements consists of a mandatory window of exactly k elements plus an optional positive-sum prefix extension. Why is it sufficient to only consider extending leftward from the window?

    Key insight: Forces formal reasoning about why decomposing into "fixed k-window + optional extension" covers all possible subarrays of length >= k without missing any cases.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Proof of the Sliding Window Extension problem.
// Prove that the optimal subarray of at least k elements consists of a mandatory window of exactly k elements plus an optional positive-sum prefix extension. Why is it sufficient to only consider extending leftward from the window?
// Key insight: Forces formal reasoning about why decomposing into "fixed k-window + optional extension" covers all possible subarrays of length >= k without missing any cases.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements/twist-01-proof-of-the-sliding-window-extension', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements/twist-01-proof-of-the-sliding-window-extension'] = problem;
})();
