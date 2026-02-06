/**
 * Flatten with Path Tracking
 * Category: recursion
 * Difficulty: Medium
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten with Path Tracking',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'While flattening, also record the index path to each element. Return pairs of (value, path) where path is an array of indices.',
        problem: 'Requires maintaining additional state through the recursion: the current index path. This transforms a simple traversal into one that tracks positional context, useful for debugging or reconstructing the original structure.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For [[1,2],[3,[4,5]]]: output is [(1,[0,0]), (2,[0,1]), (3,[1,0]), (4,[1,1,0]), (5,[1,1,1])]. Each path shows how to navigate from root to that element.' },
                output: 'See example',
                explanation: 'For [[1,2],[3,[4,5]]]: output is [(1,[0,0]), (2,[0,1]), (3,[1,0]), (4,[1,1,0]), (5,[1,1,1])]. Each path shows how to navigate from root to that element.'
            }
        ],
        solutions: {
            python: `# Flatten with Path Tracking
# Category: recursion
# Difficulty: Medium
# Parent: 02-product-sum/02-flatten-nested-list

def solve():
    """
    While flattening, also record the index path to each element. Return pairs of (value, path) where path is an array of indices.

    Key insight: Requires maintaining additional state through the recursion: the current index path. This transforms a simple traversal into one that tracks positional context, useful for debugging or reconstructing the original structure.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Flatten with Path Tracking problem.
// While flattening, also record the index path to each element. Return pairs of (value, path) where path is an array of indices.
// Key insight: Requires maintaining additional state through the recursion: the current index path. This transforms a simple traversal into one that tracks positional context, useful for debugging or reconstructing the original structure.
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
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-05-flatten-with-path-tracking', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-05-flatten-with-path-tracking'] = problem;
})();
