/**
 * When Greedy Fails: Exactly K Elements
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 01-kadanes-algorithm/03-max-sum-k-elements
 */
(function() {
    'use strict';
    const problem = {
        name: 'When Greedy Fails: Exactly K Elements',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/03-max-sum-k-elements',
        description: 'Modify the problem to find the maximum sum subarray of EXACTLY k elements (not at least k). The greedy extension no longer applies. What approach works for exactly k?',
        problem: 'The "at least k" solution extends greedily when profitable. With "exactly k", you cannot extend, making it a pure sliding window problem. The greedy extension heuristic is now wrong.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Array [1, -2, 3, -1, 5], k=3. At-least-k answer: 7 (indices 2-4). Exactly-k answer: max of [1,-2,3]=2, [-2,3,-1]=0, [3,-1,5]=7. Same here but logic differs.' },
                output: 'See example',
                explanation: 'Array [1, -2, 3, -1, 5], k=3. At-least-k answer: 7 (indices 2-4). Exactly-k answer: max of [1,-2,3]=2, [-2,3,-1]=0, [3,-1,5]=7. Same here but logic differs.'
            }
        ],
        solutions: {
            python: `# When Greedy Fails: Exactly K Elements
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 01-kadanes-algorithm/03-max-sum-k-elements

def solve():
    """
    Modify the problem to find the maximum sum subarray of EXACTLY k elements (not at least k). The greedy extension no longer applies. What approach works for exactly k?

    Key insight: The "at least k" solution extends greedily when profitable. With "exactly k", you cannot extend, making it a pure sliding window problem. The greedy extension heuristic is now wrong.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the When Greedy Fails: Exactly K Elements problem.
// Modify the problem to find the maximum sum subarray of EXACTLY k elements (not at least k). The greedy extension no longer applies. What approach works for exactly k?
// Key insight: The "at least k" solution extends greedily when profitable. With "exactly k", you cannot extend, making it a pure sliding window problem. The greedy extension heuristic is now wrong.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements/twist-02-when-greedy-fails-exactly-k-elements', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements/twist-02-when-greedy-fails-exactly-k-elements'] = problem;
})();
