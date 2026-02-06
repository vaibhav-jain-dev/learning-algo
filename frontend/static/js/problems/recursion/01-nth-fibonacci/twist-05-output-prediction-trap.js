/**
 * Output Prediction Trap
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Output Prediction Trap',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Without running code, predict the exact number of function calls made by the naive recursive fib(10). Then explain why fib(n) itself appears in the count formula.',
        problem: 'This is a conceptual analysis twist. You must understand that the number of calls to compute fib(n) is 2*fib(n+1)-1, connecting the recursion structure to the Fibonacci sequence itself.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'fib(10)=55, and the total number of calls is 2*fib(11)-1 = 2*89-1 = 177. The call tree has a self-similar structure matching the Fibonacci recurrence.' },
                output: 'See example',
                explanation: 'fib(10)=55, and the total number of calls is 2*fib(11)-1 = 2*89-1 = 177. The call tree has a self-similar structure matching the Fibonacci recurrence.'
            }
        ],
        solutions: {
            python: `# Output Prediction Trap
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci

def solve():
    """
    Without running code, predict the exact number of function calls made by the naive recursive fib(10). Then explain why fib(n) itself appears in the count formula.

    Key insight: This is a conceptual analysis twist. You must understand that the number of calls to compute fib(n) is 2*fib(n+1)-1, connecting the recursion structure to the Fibonacci sequence itself.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Output Prediction Trap problem.
// Without running code, predict the exact number of function calls made by the naive recursive fib(10). Then explain why fib(n) itself appears in the count formula.
// Key insight: This is a conceptual analysis twist. You must understand that the number of calls to compute fib(n) is 2*fib(n+1)-1, connecting the recursion structure to the Fibonacci sequence itself.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-05-output-prediction-trap', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-05-output-prediction-trap'] = problem;
})();
