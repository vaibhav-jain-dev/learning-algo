/**
 * Iterative with Constant Space
 * Category: recursion
 * Difficulty: Easy
 * Parent: 01-nth-fibonacci/01-tribonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative with Constant Space',
        difficulty: 'Easy',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/01-tribonacci',
        description: 'Solve Tribonacci iteratively using exactly three variables. No array or hash map allowed.',
        problem: 'While conceptually similar to iterative Fibonacci with two variables, managing three rotating variables requires more careful bookkeeping of which variable to overwrite next.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=4: start with t0=0, t1=1, t2=1. Step 3: new = 0+1+1=2, rotate to t0=1, t1=1, t2=2. Step 4: new = 1+1+2=4. Return 4.' },
                output: 'See example',
                explanation: 'For n=4: start with t0=0, t1=1, t2=1. Step 3: new = 0+1+1=2, rotate to t0=1, t1=1, t2=2. Step 4: new = 1+1+2=4. Return 4.'
            }
        ],
        solutions: {
            python: `# Iterative with Constant Space
# Category: recursion
# Difficulty: Easy
# Parent: 01-nth-fibonacci/01-tribonacci

def solve():
    """
    Solve Tribonacci iteratively using exactly three variables. No array or hash map allowed.

    Key insight: While conceptually similar to iterative Fibonacci with two variables, managing three rotating variables requires more careful bookkeeping of which variable to overwrite next.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative with Constant Space problem.
// Solve Tribonacci iteratively using exactly three variables. No array or hash map allowed.
// Key insight: While conceptually similar to iterative Fibonacci with two variables, managing three rotating variables requires more careful bookkeeping of which variable to overwrite next.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/01-tribonacci/twist-01-iterative-with-constant-space', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/01-tribonacci/twist-01-iterative-with-constant-space'] = problem;
})();
