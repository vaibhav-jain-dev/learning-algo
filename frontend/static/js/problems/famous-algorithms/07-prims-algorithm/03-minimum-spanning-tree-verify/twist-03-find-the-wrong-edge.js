/**
 * Find the Wrong Edge
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 07-prims-algorithm/03-minimum-spanning-tree-verify
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find the Wrong Edge',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/03-minimum-spanning-tree-verify',
        description: 'If the proposed tree is NOT a valid MST, identify which specific edge should be swapped and with which non-tree edge.',
        problem: 'Goes beyond boolean verification to diagnostic output -- find the tree edge that violates the cut property and the non-tree edge that should replace it.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Proposed tree uses edge (1,3,8) but non-tree edge (1,3,5) exists. Swapping reduces total weight, proving the proposal was not optimal.' },
                output: 'See example',
                explanation: 'Proposed tree uses edge (1,3,8) but non-tree edge (1,3,5) exists. Swapping reduces total weight, proving the proposal was not optimal.'
            }
        ],
        solutions: {
            python: `# Find the Wrong Edge
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 07-prims-algorithm/03-minimum-spanning-tree-verify

def solve():
    """
    If the proposed tree is NOT a valid MST, identify which specific edge should be swapped and with which non-tree edge.

    Key insight: Goes beyond boolean verification to diagnostic output -- find the tree edge that violates the cut property and the non-tree edge that should replace it.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Find the Wrong Edge problem.
// If the proposed tree is NOT a valid MST, identify which specific edge should be swapped and with which non-tree edge.
// Key insight: Goes beyond boolean verification to diagnostic output -- find the tree edge that violates the cut property and the non-tree edge that should replace it.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/03-minimum-spanning-tree-verify/twist-03-find-the-wrong-edge', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/03-minimum-spanning-tree-verify/twist-03-find-the-wrong-edge'] = problem;
})();
