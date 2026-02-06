/**
 * A* with Terrain Costs
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 08-a-star-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'A* with Terrain Costs',
        difficulty: 'Hard',
        algorithm: 'a-star',
        parent: '08-a-star-algorithm',
        description: 'Cells have varying movement costs (e.g., grass=1, forest=3, swamp=5). Find the least-cost path using A*.',
        problem: 'Variable edge costs mean BFS no longer works. A* must account for actual movement costs in g(n), making the priority queue ordering more critical.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'A path through 5 grass cells (cost 5) may be better than 2 grass + 1 swamp (cost 7) even though it is longer in steps.' },
                output: 'See example',
                explanation: 'A path through 5 grass cells (cost 5) may be better than 2 grass + 1 swamp (cost 7) even though it is longer in steps.'
            }
        ],
        solutions: {
            python: `# A* with Terrain Costs
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 08-a-star-algorithm

def solve():
    """
    Cells have varying movement costs (e.g., grass=1, forest=3, swamp=5). Find the least-cost path using A*.

    Key insight: Variable edge costs mean BFS no longer works. A* must account for actual movement costs in g(n), making the priority queue ordering more critical.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the A* with Terrain Costs problem.
// Cells have varying movement costs (e.g., grass=1, forest=3, swamp=5). Find the least-cost path using A*.
// Key insight: Variable edge costs mean BFS no longer works. A* must account for actual movement costs in g(n), making the priority queue ordering more critical.
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
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/twist-05-a-with-terrain-costs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/twist-05-a-with-terrain-costs'] = problem;
})();
