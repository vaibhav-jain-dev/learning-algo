/**
 * Iterative DFS with Stack
 * Category: recursion
 * Difficulty: Easy
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative DFS with Stack',
        difficulty: 'Easy',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Replace the recursive DFS with an explicit stack. Each stack entry stores an element and its depth. Track the maximum depth seen.',
        problem: 'Forces you to manually manage what the call stack does automatically. You must pair each element with its depth metadata, which recursion provides implicitly through nesting.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Push (array, 1) to stack. Pop and push children: (1, 1), ([2,[3,4]], 1). Pop sub-array, push children at depth 2: (2, 2), ([3,4], 2). Continue. Max seen = 3.' },
                output: 'See example',
                explanation: 'Push (array, 1) to stack. Pop and push children: (1, 1), ([2,[3,4]], 1). Pop sub-array, push children at depth 2: (2, 2), ([3,4], 2). Continue. Max seen = 3.'
            }
        ],
        solutions: {
            python: `# Iterative DFS with Stack
# Category: recursion
# Difficulty: Easy
# Parent: 02-product-sum/01-nested-array-depth

def solve():
    """
    Replace the recursive DFS with an explicit stack. Each stack entry stores an element and its depth. Track the maximum depth seen.

    Key insight: Forces you to manually manage what the call stack does automatically. You must pair each element with its depth metadata, which recursion provides implicitly through nesting.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative DFS with Stack problem.
// Replace the recursive DFS with an explicit stack. Each stack entry stores an element and its depth. Track the maximum depth seen.
// Key insight: Forces you to manually manage what the call stack does automatically. You must pair each element with its depth metadata, which recursion provides implicitly through nesting.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-02-iterative-dfs-with-stack', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-02-iterative-dfs-with-stack'] = problem;
})();
