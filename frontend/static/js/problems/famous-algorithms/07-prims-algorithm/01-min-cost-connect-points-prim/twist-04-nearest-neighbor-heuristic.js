/**
 * Nearest Neighbor Heuristic
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';
    const problem = {
        name: 'Nearest Neighbor Heuristic',
        difficulty: 'Easy',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Compare Prim\'s optimal MST with the nearest neighbor heuristic (always connect the closest unconnected point to the current component).',
        problem: 'The nearest neighbor heuristic is NOT the same as Prim\'s -- Prim picks the globally cheapest edge to any MST node, while NN always extends from the most recently added node.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'NN from [0,0] might go to [1,1] then to [2,2], while Prim might connect [0,0]-[1,1] and [0,0]-[0,2] if [0,2] is cheaper to the MST as a whole.' },
                output: 'See example',
                explanation: 'NN from [0,0] might go to [1,1] then to [2,2], while Prim might connect [0,0]-[1,1] and [0,0]-[0,2] if [0,2] is cheaper to the MST as a whole.'
            }
        ],
        solutions: {
            python: `# Nearest Neighbor Heuristic
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 07-prims-algorithm/01-min-cost-connect-points-prim

def solve():
    """
    Compare Prim's optimal MST with the nearest neighbor heuristic (always connect the closest unconnected point to the current component).

    Key insight: The nearest neighbor heuristic is NOT the same as Prim's -- Prim picks the globally cheapest edge to any MST node, while NN always extends from the most recently added node.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Nearest Neighbor Heuristic problem.
// Compare Prim's optimal MST with the nearest neighbor heuristic (always connect the closest unconnected point to the current component).
// Key insight: The nearest neighbor heuristic is NOT the same as Prim's -- Prim picks the globally cheapest edge to any MST node, while NN always extends from the most recently added node.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-04-nearest-neighbor-heuristic', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-04-nearest-neighbor-heuristic'] = problem;
})();
