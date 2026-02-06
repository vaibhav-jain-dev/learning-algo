/**
 * Iterative with Explicit Stack
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative with Explicit Stack',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'Flatten the nested list using an explicit stack instead of recursion. Process elements right-to-left so they come off the stack in the correct order.',
        problem: 'You must reverse the push order to maintain element ordering, which is a subtle detail that recursion handles naturally. The stack replaces the call stack but requires manual ordering management.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [[1,2],[3,[4,5]],6]: Push 6, [3,[4,5]], [1,2] to stack. Pop [1,2] -> push 2,1. Pop 1 -> add to result. Pop 2 -> add. Pop [3,[4,5]] -> push [4,5],3. Continue.' },
                output: 'See example',
                explanation: 'For [[1,2],[3,[4,5]],6]: Push 6, [3,[4,5]], [1,2] to stack. Pop [1,2] -> push 2,1. Pop 1 -> add to result. Pop 2 -> add. Pop [3,[4,5]] -> push [4,5],3. Continue.'
            }
        ],
        solutions: {
            python: `# Iterative with Explicit Stack
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/02-flatten-nested-list

def solve():
    """
    Flatten the nested list using an explicit stack instead of recursion. Process elements right-to-left so they come off the stack in the correct order.

    Key insight: You must reverse the push order to maintain element ordering, which is a subtle detail that recursion handles naturally. The stack replaces the call stack but requires manual ordering management.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative with Explicit Stack problem.
// Flatten the nested list using an explicit stack instead of recursion. Process elements right-to-left so they come off the stack in the correct order.
// Key insight: You must reverse the push order to maintain element ordering, which is a subtle detail that recursion handles naturally. The stack replaces the call stack but requires manual ordering management.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-01-iterative-with-explicit-stack', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-01-iterative-with-explicit-stack'] = problem;
})();
