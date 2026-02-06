/**
 * Minimum Spanning Forest
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 07-prims-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Spanning Forest',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'If the graph is disconnected, find the minimum spanning forest (MST for each connected component).',
        problem: 'Prim\'s naturally handles one component. For disconnected graphs, you must detect when the heap is empty but nodes remain, then restart from an unvisited node.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Graph has components {0,1,2} and {3,4}. Run Prim from 0 for first component, then from 3 for second. Return total forest weight.' },
                output: 'See example',
                explanation: 'Graph has components {0,1,2} and {3,4}. Run Prim from 0 for first component, then from 3 for second. Return total forest weight.'
            }
        ],
        solutions: {
            python: `# Minimum Spanning Forest
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 07-prims-algorithm

def solve():
    """
    If the graph is disconnected, find the minimum spanning forest (MST for each connected component).

    Key insight: Prim's naturally handles one component. For disconnected graphs, you must detect when the heap is empty but nodes remain, then restart from an unvisited node.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Minimum Spanning Forest problem.
// If the graph is disconnected, find the minimum spanning forest (MST for each connected component).
// Key insight: Prim's naturally handles one component. For disconnected graphs, you must detect when the heap is empty but nodes remain, then restart from an unvisited node.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/twist-05-minimum-spanning-forest', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/twist-05-minimum-spanning-forest'] = problem;
})();
