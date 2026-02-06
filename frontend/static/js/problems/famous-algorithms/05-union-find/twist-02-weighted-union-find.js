/**
 * Weighted Union-Find
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 05-union-find
 */
(function() {
    'use strict';
    const problem = {
        name: 'Weighted Union-Find',
        difficulty: 'Hard',
        algorithm: 'union-find',
        parent: '05-union-find',
        description: 'Each edge in the union has a weight/distance. Find(x) returns the distance from x to its root, and you can query the distance between any two elements in the same set.',
        problem: 'Path compression must propagate weights along compressed paths, requiring careful weight accumulation during the find operation.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Union(0,1,weight=3), union(1,2,weight=5). Distance from 0 to 2 is 8. Path compression must preserve these distances.' },
                output: 'See example',
                explanation: 'Union(0,1,weight=3), union(1,2,weight=5). Distance from 0 to 2 is 8. Path compression must preserve these distances.'
            }
        ],
        solutions: {
            python: `# Weighted Union-Find
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 05-union-find

def solve():
    """
    Each edge in the union has a weight/distance. Find(x) returns the distance from x to its root, and you can query the distance between any two elements in the same set.

    Key insight: Path compression must propagate weights along compressed paths, requiring careful weight accumulation during the find operation.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Weighted Union-Find problem.
// Each edge in the union has a weight/distance. Find(x) returns the distance from x to its root, and you can query the distance between any two elements in the same set.
// Key insight: Path compression must propagate weights along compressed paths, requiring careful weight accumulation during the find operation.
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
        window.ProblemRenderer.register('famous-algorithms', '05-union-find/twist-02-weighted-union-find', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/05-union-find/twist-02-weighted-union-find'] = problem;
})();
