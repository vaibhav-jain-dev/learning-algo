/**
 * Stack Overflow Prevention
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Stack Overflow Prevention',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Given that the naive recursive Fibonacci will overflow the call stack around n=10000 in most languages, design a solution that handles n=1,000,000 without stack overflow.',
        problem: 'Forces consideration of practical system limits. You cannot simply recurse; you must either iterate or use techniques like trampolining to avoid deep call stacks.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=1000000, an iterative or trampoline-based approach returns the result without crashing, while naive recursion would hit maximum call stack size.' },
                output: 'See example',
                explanation: 'For n=1000000, an iterative or trampoline-based approach returns the result without crashing, while naive recursion would hit maximum call stack size.'
            }
        ],
        solutions: {
            python: `# Stack Overflow Prevention
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci

def solve():
    """
    Given that the naive recursive Fibonacci will overflow the call stack around n=10000 in most languages, design a solution that handles n=1,000,000 without stack overflow.

    Key insight: Forces consideration of practical system limits. You cannot simply recurse; you must either iterate or use techniques like trampolining to avoid deep call stacks.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Stack Overflow Prevention problem.
// Given that the naive recursive Fibonacci will overflow the call stack around n=10000 in most languages, design a solution that handles n=1,000,000 without stack overflow.
// Key insight: Forces consideration of practical system limits. You cannot simply recurse; you must either iterate or use techniques like trampolining to avoid deep call stacks.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-04-stack-overflow-prevention', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-04-stack-overflow-prevention'] = problem;
})();
