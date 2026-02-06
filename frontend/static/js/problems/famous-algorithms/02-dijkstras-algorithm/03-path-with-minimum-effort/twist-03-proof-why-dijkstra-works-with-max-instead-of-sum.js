/**
 * Proof: Why Dijkstra Works With Max Instead of Sum
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 02-dijkstras-algorithm/03-path-with-minimum-effort
 */
(function() {
    'use strict';
    const problem = {
        name: 'Proof: Why Dijkstra Works With Max Instead of Sum',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/03-path-with-minimum-effort',
        description: 'Standard Dijkstra minimizes sum of edge weights. Here we minimize the maximum edge weight on the path. Prove that Dijkstra\'s greedy property still holds: when a cell is extracted from the min-heap, its effort value is optimal.',
        problem: 'The max operation is not the same as sum. You must prove that the "bottleneck shortest path" variant preserves the key property: any alternative path through unvisited nodes has effort >= current effort.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'If cell (r,c) is extracted with effort E, any other path to (r,c) goes through some unvisited cell with effort >= E. Since max(E, anything) >= E, no alternative can be better.' },
                output: 'See example',
                explanation: 'If cell (r,c) is extracted with effort E, any other path to (r,c) goes through some unvisited cell with effort >= E. Since max(E, anything) >= E, no alternative can be better.'
            }
        ],
        solutions: {
            python: `# Proof: Why Dijkstra Works With Max Instead of Sum
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm/03-path-with-minimum-effort

def solve():
    """
    Standard Dijkstra minimizes sum of edge weights. Here we minimize the maximum edge weight on the path. Prove that Dijkstra's greedy property still holds: when a cell is extracted from the min-heap, its effort value is optimal.

    Key insight: The max operation is not the same as sum. You must prove that the "bottleneck shortest path" variant preserves the key property: any alternative path through unvisited nodes has effort >= current effort.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Proof: Why Dijkstra Works With Max Instead of Sum problem.
// Standard Dijkstra minimizes sum of edge weights. Here we minimize the maximum edge weight on the path. Prove that Dijkstra's greedy property still holds: when a cell is extracted from the min-heap, its effort value is optimal.
// Key insight: The max operation is not the same as sum. You must prove that the "bottleneck shortest path" variant preserves the key property: any alternative path through unvisited nodes has effort >= current effort.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/03-path-with-minimum-effort/twist-03-proof-why-dijkstra-works-with-max-instead-of-sum', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/03-path-with-minimum-effort/twist-03-proof-why-dijkstra-works-with-max-instead-of-sum'] = problem;
})();
