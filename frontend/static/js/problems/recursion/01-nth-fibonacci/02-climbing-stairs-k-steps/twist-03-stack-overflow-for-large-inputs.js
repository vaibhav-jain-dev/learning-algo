/**
 * Stack Overflow for Large Inputs
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps
 */
(function() {
    'use strict';
    const problem = {
        name: 'Stack Overflow for Large Inputs',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '01-nth-fibonacci/02-climbing-stairs-k-steps',
        description: 'The naive recursive solution fails for n=100000. Design an iterative solution using the sliding window technique that handles arbitrarily large n with O(k) space.',
        problem: 'Forces the transition from recursive thinking to iterative sliding window. You must maintain a running sum and efficiently remove the element leaving the window, which is a different mental model than recursion.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=100000, k=3: maintain a circular buffer of size 4, updating the window sum as you advance. No recursion, no stack overflow.' },
                output: 'See example',
                explanation: 'For n=100000, k=3: maintain a circular buffer of size 4, updating the window sum as you advance. No recursion, no stack overflow.'
            }
        ],
        solutions: {
            python: `# Stack Overflow for Large Inputs
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps

def solve():
    """
    The naive recursive solution fails for n=100000. Design an iterative solution using the sliding window technique that handles arbitrarily large n with O(k) space.

    Key insight: Forces the transition from recursive thinking to iterative sliding window. You must maintain a running sum and efficiently remove the element leaving the window, which is a different mental model than recursion.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Stack Overflow for Large Inputs problem.
// The naive recursive solution fails for n=100000. Design an iterative solution using the sliding window technique that handles arbitrarily large n with O(k) space.
// Key insight: Forces the transition from recursive thinking to iterative sliding window. You must maintain a running sum and efficiently remove the element leaving the window, which is a different mental model than recursion.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/02-climbing-stairs-k-steps/twist-03-stack-overflow-for-large-inputs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/02-climbing-stairs-k-steps/twist-03-stack-overflow-for-large-inputs'] = problem;
})();
