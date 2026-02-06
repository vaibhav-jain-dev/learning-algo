/**
 * Dynamic Connectivity
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 05-union-find
 */
(function() {
    'use strict';
    const problem = {
        name: 'Dynamic Connectivity',
        difficulty: 'Hard',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'Support both union and disconnect operations in a graph, answering connectivity queries online.',
        problem: 'Standard Union-Find only supports unions (monotonically joining). Supporting disconnects requires entirely different data structures like link-cut trees or offline algorithms.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Add edge (0,1), add edge (1,2), query connected(0,2)=true, remove edge (1,2), query connected(0,2)=false.' },
                output: 'See example',
                explanation: 'Add edge (0,1), add edge (1,2), query connected(0,2)=true, remove edge (1,2), query connected(0,2)=false.'
            }
        ],
        solutions: {
            python: `# Dynamic Connectivity
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 05-union-find

def solve():
    """
    Support both union and disconnect operations in a graph, answering connectivity queries online.

    Key insight: Standard Union-Find only supports unions (monotonically joining). Supporting disconnects requires entirely different data structures like link-cut trees or offline algorithms.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Dynamic Connectivity problem.
// Support both union and disconnect operations in a graph, answering connectivity queries online.
// Key insight: Standard Union-Find only supports unions (monotonically joining). Supporting disconnects requires entirely different data structures like link-cut trees or offline algorithms.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/twist-04-dynamic-connectivity', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/twist-04-dynamic-connectivity'] = problem;
})();
