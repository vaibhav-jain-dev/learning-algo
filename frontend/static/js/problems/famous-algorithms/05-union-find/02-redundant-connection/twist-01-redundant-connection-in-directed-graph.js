/**
 * Redundant Connection in Directed Graph
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 05-union-find/02-redundant-connection
 */
(function() {
    'use strict';
    const problem = {
        name: 'Redundant Connection in Directed Graph',
        difficulty: 'Hard',
        algorithm: 'union-find',
        parent: '05-union-find/02-redundant-connection',
        description: 'In a directed graph that started as a rooted tree with one extra edge, find the edge that can be removed to restore the tree.',
        problem: 'Directed edges create two possible cases: a node with two parents, or a cycle. Requires handling both scenarios with different logic.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For edges [[1,2],[1,3],[2,3]], node 3 has two parents (1 and 2). Removing [2,3] restores the tree.' },
                output: 'See example',
                explanation: 'For edges [[1,2],[1,3],[2,3]], node 3 has two parents (1 and 2). Removing [2,3] restores the tree.'
            }
        ],
        solutions: {
            python: `# Redundant Connection in Directed Graph
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 05-union-find/02-redundant-connection

def solve():
    """
    In a directed graph that started as a rooted tree with one extra edge, find the edge that can be removed to restore the tree.

    Key insight: Directed edges create two possible cases: a node with two parents, or a cycle. Requires handling both scenarios with different logic.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Redundant Connection in Directed Graph problem.
// In a directed graph that started as a rooted tree with one extra edge, find the edge that can be removed to restore the tree.
// Key insight: Directed edges create two possible cases: a node with two parents, or a cycle. Requires handling both scenarios with different logic.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/02-redundant-connection/twist-01-redundant-connection-in-directed-graph', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/02-redundant-connection/twist-01-redundant-connection-in-directed-graph'] = problem;
})();
