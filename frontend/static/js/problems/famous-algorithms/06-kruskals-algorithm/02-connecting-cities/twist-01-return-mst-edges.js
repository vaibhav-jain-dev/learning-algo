/**
 * Return MST Edges
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 06-kruskals-algorithm/02-connecting-cities
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return MST Edges',
        difficulty: 'Easy',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/02-connecting-cities',
        description: 'Instead of returning just the total cost, return the list of edges that form the minimum spanning tree.',
        problem: 'Requires storing which edges were accepted during Kruskal\'s algorithm, not just accumulating the cost, adding bookkeeping to the union-find process.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For connections [[1,2,5],[1,3,6],[2,3,1]], return [[2,3,1],[1,2,5]] as the MST edges with total cost 6.' },
                output: 'See example',
                explanation: 'For connections [[1,2,5],[1,3,6],[2,3,1]], return [[2,3,1],[1,2,5]] as the MST edges with total cost 6.'
            }
        ],
        solutions: {
            python: `# Return MST Edges
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 06-kruskals-algorithm/02-connecting-cities

def solve():
    """
    Instead of returning just the total cost, return the list of edges that form the minimum spanning tree.

    Key insight: Requires storing which edges were accepted during Kruskal's algorithm, not just accumulating the cost, adding bookkeeping to the union-find process.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Return MST Edges problem.
// Instead of returning just the total cost, return the list of edges that form the minimum spanning tree.
// Key insight: Requires storing which edges were accepted during Kruskal's algorithm, not just accumulating the cost, adding bookkeeping to the union-find process.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities/twist-01-return-mst-edges', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities/twist-01-return-mst-edges'] = problem;
})();
