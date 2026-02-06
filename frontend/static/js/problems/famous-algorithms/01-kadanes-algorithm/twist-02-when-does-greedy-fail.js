/**
 * When Does Greedy Fail?
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 01-kadanes-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'When Does Greedy Fail?',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Kadane\'s is greedy in choosing to extend or restart. Construct a variation where this greedy approach fails: find the maximum subarray sum where you must skip exactly one element from the subarray.',
        problem: 'The greedy "extend or restart" logic no longer works because skipping an element creates a non-contiguous dependency. You need to track two states: best with no skip yet, and best with one skip used.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Input: [1, -5, 3, 2]. Without skip constraint, answer is [3,2]=5. With exactly one skip allowed, answer is [1, _, 3, 2] = 6 by skipping -5.' },
                output: 'See example',
                explanation: 'Input: [1, -5, 3, 2]. Without skip constraint, answer is [3,2]=5. With exactly one skip allowed, answer is [1, _, 3, 2] = 6 by skipping -5.'
            }
        ],
        solutions: {
            python: `# When Does Greedy Fail?
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 01-kadanes-algorithm

def solve():
    """
    Kadane's is greedy in choosing to extend or restart. Construct a variation where this greedy approach fails: find the maximum subarray sum where you must skip exactly one element from the subarray.

    Key insight: The greedy "extend or restart" logic no longer works because skipping an element creates a non-contiguous dependency. You need to track two states: best with no skip yet, and best with one skip used.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the When Does Greedy Fail? problem.
// Kadane's is greedy in choosing to extend or restart. Construct a variation where this greedy approach fails: find the maximum subarray sum where you must skip exactly one element from the subarray.
// Key insight: The greedy "extend or restart" logic no longer works because skipping an element creates a non-contiguous dependency. You need to track two states: best with no skip yet, and best with one skip used.
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
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/twist-02-when-does-greedy-fail', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/twist-02-when-does-greedy-fail'] = problem;
})();
