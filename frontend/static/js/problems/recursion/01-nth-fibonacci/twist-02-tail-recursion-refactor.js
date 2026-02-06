/**
 * Tail Recursion Refactor
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Tail Recursion Refactor',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Convert the recursive Fibonacci into a tail-recursive version by passing accumulator parameters. The recursive call must be the very last operation.',
        problem: 'Requires rethinking the function signature to carry forward partial results, turning tree recursion into linear recursion that compilers can optimize into a loop.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'fibTail(n, prev=0, curr=1) where fibTail(6, 0, 1) chains through fibTail(5, 1, 1) -> fibTail(4, 1, 2) -> ... -> 5.' },
                output: 'See example',
                explanation: 'fibTail(n, prev=0, curr=1) where fibTail(6, 0, 1) chains through fibTail(5, 1, 1) -> fibTail(4, 1, 2) -> ... -> 5.'
            }
        ],
        solutions: {
            python: `# Tail Recursion Refactor
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci

def solve():
    """
    Convert the recursive Fibonacci into a tail-recursive version by passing accumulator parameters. The recursive call must be the very last operation.

    Key insight: Requires rethinking the function signature to carry forward partial results, turning tree recursion into linear recursion that compilers can optimize into a loop.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Tail Recursion Refactor problem.
// Convert the recursive Fibonacci into a tail-recursive version by passing accumulator parameters. The recursive call must be the very last operation.
// Key insight: Requires rethinking the function signature to carry forward partial results, turning tree recursion into linear recursion that compilers can optimize into a loop.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-02-tail-recursion-refactor', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-02-tail-recursion-refactor'] = problem;
})();
