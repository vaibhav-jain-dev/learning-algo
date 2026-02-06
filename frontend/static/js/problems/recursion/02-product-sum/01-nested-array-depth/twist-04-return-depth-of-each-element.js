/**
 * Return Depth of Each Element
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/01-nested-array-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return Depth of Each Element',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/01-nested-array-depth',
        description: 'Instead of just returning the max depth, return a flat list of (value, depth) pairs for every integer in the nested array.',
        problem: 'Shifts from aggregation (max) to enumeration. You must carry the depth through the recursion and collect results, turning a reduce operation into a map-like traversal.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [1, [2, [3, 4]]]: output is [(1, 1), (2, 2), (3, 3), (4, 3)]. Each integer is tagged with the depth at which it was found.' },
                output: 'See example',
                explanation: 'For [1, [2, [3, 4]]]: output is [(1, 1), (2, 2), (3, 3), (4, 3)]. Each integer is tagged with the depth at which it was found.'
            }
        ],
        solutions: {
            python: `# Return Depth of Each Element
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/01-nested-array-depth

def solve():
    """
    Instead of just returning the max depth, return a flat list of (value, depth) pairs for every integer in the nested array.

    Key insight: Shifts from aggregation (max) to enumeration. You must carry the depth through the recursion and collect results, turning a reduce operation into a map-like traversal.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Return Depth of Each Element problem.
// Instead of just returning the max depth, return a flat list of (value, depth) pairs for every integer in the nested array.
// Key insight: Shifts from aggregation (max) to enumeration. You must carry the depth through the recursion and collect results, turning a reduce operation into a map-like traversal.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/01-nested-array-depth/twist-04-return-depth-of-each-element', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/01-nested-array-depth/twist-04-return-depth-of-each-element'] = problem;
})();
