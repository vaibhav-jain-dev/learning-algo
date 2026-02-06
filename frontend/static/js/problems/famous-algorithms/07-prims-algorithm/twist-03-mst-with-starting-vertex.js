/**
 * MST with Starting Vertex
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 07-prims-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'MST with Starting Vertex',
        difficulty: 'Easy',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Run Prim\'s from different starting vertices and verify that all produce MSTs with the same total weight.',
        problem: 'Tests understanding that MST weight is invariant to the starting vertex (though the actual edges may differ), which is a key property to prove.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Start Prim from vertex 0: weight 16. Start from vertex 3: weight 16. Same total, possibly different edges.' },
                output: 'See example',
                explanation: 'Start Prim from vertex 0: weight 16. Start from vertex 3: weight 16. Same total, possibly different edges.'
            }
        ],
        solutions: {
            python: `# MST with Starting Vertex
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 07-prims-algorithm

def solve():
    """
    Run Prim's from different starting vertices and verify that all produce MSTs with the same total weight.

    Key insight: Tests understanding that MST weight is invariant to the starting vertex (though the actual edges may differ), which is a key property to prove.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the MST with Starting Vertex problem.
// Run Prim's from different starting vertices and verify that all produce MSTs with the same total weight.
// Key insight: Tests understanding that MST weight is invariant to the starting vertex (though the actual edges may differ), which is a key property to prove.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/twist-03-mst-with-starting-vertex', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/twist-03-mst-with-starting-vertex'] = problem;
})();
