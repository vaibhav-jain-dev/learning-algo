/**
 * Product Sum with Negative Depths
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Product Sum with Negative Depths',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Modify the problem so that odd-depth arrays multiply by their depth but even-depth arrays divide by their depth (integer division). How does this change the recursive structure?',
        problem: 'The depth-dependent operation introduces conditional logic within the recursion. You must carefully track depth parity and apply the correct operation, testing your ability to modify recursive patterns.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [5, [7, -1], 3] with modified rules: depth 1 (odd) multiplies: (5 + [7,-1]*depth2 + 3)*1. Depth 2 (even) divides: (7 + -1)/2 = 3. Result: (5 + 3 + 3)*1 = 11.' },
                output: 'See example',
                explanation: 'For [5, [7, -1], 3] with modified rules: depth 1 (odd) multiplies: (5 + [7,-1]*depth2 + 3)*1. Depth 2 (even) divides: (7 + -1)/2 = 3. Result: (5 + 3 + 3)*1 = 11.'
            }
        ],
        solutions: {
            python: `# Product Sum with Negative Depths
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum

def solve():
    """
    Modify the problem so that odd-depth arrays multiply by their depth but even-depth arrays divide by their depth (integer division). How does this change the recursive structure?

    Key insight: The depth-dependent operation introduces conditional logic within the recursion. You must carefully track depth parity and apply the correct operation, testing your ability to modify recursive patterns.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Product Sum with Negative Depths problem.
// Modify the problem so that odd-depth arrays multiply by their depth but even-depth arrays divide by their depth (integer division). How does this change the recursive structure?
// Key insight: The depth-dependent operation introduces conditional logic within the recursion. You must carefully track depth parity and apply the correct operation, testing your ability to modify recursive patterns.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/twist-05-product-sum-with-negative-depths', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/twist-05-product-sum-with-negative-depths'] = problem;
})();
