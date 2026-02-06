/**
 * Flatten to Specific Depth
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten to Specific Depth',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'Modify flatten to accept a depth parameter. Only flatten arrays up to the specified depth, leaving deeper arrays intact. This matches JavaScript\'s Array.flat(depth) behavior.',
        problem: 'Adds a depth constraint to the recursion, requiring you to track and decrement the allowed depth. When depth reaches 0, you stop flattening and include sub-arrays as-is.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'flatten([[1,[2]],[3,[4,[5]]]], depth=1) -> [1,[2],3,[4,[5]]]. Only one level is flattened; deeper nesting is preserved.' },
                output: 'See example',
                explanation: 'flatten([[1,[2]],[3,[4,[5]]]], depth=1) -> [1,[2],3,[4,[5]]]. Only one level is flattened; deeper nesting is preserved.'
            }
        ],
        solutions: {
            python: `# Flatten to Specific Depth
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/02-flatten-nested-list

def solve():
    """
    Modify flatten to accept a depth parameter. Only flatten arrays up to the specified depth, leaving deeper arrays intact. This matches JavaScript's Array.flat(depth) behavior.

    Key insight: Adds a depth constraint to the recursion, requiring you to track and decrement the allowed depth. When depth reaches 0, you stop flattening and include sub-arrays as-is.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Flatten to Specific Depth problem.
// Modify flatten to accept a depth parameter. Only flatten arrays up to the specified depth, leaving deeper arrays intact. This matches JavaScript's Array.flat(depth) behavior.
// Key insight: Adds a depth constraint to the recursion, requiring you to track and decrement the allowed depth. When depth reaches 0, you stop flattening and include sub-arrays as-is.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-03-flatten-to-specific-depth', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-03-flatten-to-specific-depth'] = problem;
})();
