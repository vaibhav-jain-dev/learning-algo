/**
 * Detect All Cycles
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';
    const problem = {
        name: 'Detect All Cycles',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'If the graph contains cycles, identify and return all nodes that participate in at least one cycle.',
        problem: 'Goes beyond simple cycle detection to cycle characterization, requiring SCC (Strongly Connected Components) or iterative peeling of zero in-degree nodes.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For edges [[0,1],[1,2],[2,0],[2,3]], nodes 0,1,2 are in a cycle but node 3 is not. Return [0,1,2].' },
                output: 'See example',
                explanation: 'For edges [[0,1],[1,2],[2,0],[2,3]], nodes 0,1,2 are in a cycle but node 3 is not. Return [0,1,2].'
            }
        ],
        solutions: {
            python: `# Detect All Cycles
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 03-topological-sort

def solve():
    """
    If the graph contains cycles, identify and return all nodes that participate in at least one cycle.

    Key insight: Goes beyond simple cycle detection to cycle characterization, requiring SCC (Strongly Connected Components) or iterative peeling of zero in-degree nodes.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Detect All Cycles problem.
// If the graph contains cycles, identify and return all nodes that participate in at least one cycle.
// Key insight: Goes beyond simple cycle detection to cycle characterization, requiring SCC (Strongly Connected Components) or iterative peeling of zero in-degree nodes.
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
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-02-detect-all-cycles', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-02-detect-all-cycles'] = problem;
})();
