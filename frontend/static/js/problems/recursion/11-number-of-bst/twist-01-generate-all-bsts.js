/**
 * Generate All BSTs
 * Category: recursion
 * Difficulty: Hard
 * Parent: 11-number-of-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Generate All BSTs',
        difficulty: 'Hard',
        algorithm: 'recursion-count-bst',
        parent: '11-number-of-bst',
        description: 'Instead of counting the number of structurally unique BSTs, actually generate and return all of them as tree structures.',
        problem: 'Shifts from counting (Catalan number computation) to constructing every tree, requiring recursive tree building with node allocation and list management.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For n=3, return all 5 trees: root=1 with right subtree variations, root=2 balanced, root=3 with left subtree variations.' },
                output: 'See example',
                explanation: 'For n=3, return all 5 trees: root=1 with right subtree variations, root=2 balanced, root=3 with left subtree variations.'
            }
        ],
        solutions: {
            python: `# Generate All BSTs
# Category: recursion
# Difficulty: Hard
# Parent: 11-number-of-bst

def solve():
    """
    Instead of counting the number of structurally unique BSTs, actually generate and return all of them as tree structures.

    Key insight: Shifts from counting (Catalan number computation) to constructing every tree, requiring recursive tree building with node allocation and list management.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Generate All BSTs problem.
// Instead of counting the number of structurally unique BSTs, actually generate and return all of them as tree structures.
// Key insight: Shifts from counting (Catalan number computation) to constructing every tree, requiring recursive tree building with node allocation and list management.
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
        window.ProblemRenderer.register('recursion', '11-number-of-bst/twist-01-generate-all-bsts', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/11-number-of-bst/twist-01-generate-all-bsts'] = problem;
})();
