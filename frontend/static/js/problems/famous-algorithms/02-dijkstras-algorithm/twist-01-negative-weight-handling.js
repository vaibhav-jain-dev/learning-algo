/**
 * Negative Weight Handling
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 02-dijkstras-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'Negative Weight Handling',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'Dijkstra\'s assumes non-negative edge weights. Construct a graph where adding a single negative edge causes Dijkstra\'s to produce incorrect results. Then explain what algorithm you would use instead and why.',
        problem: 'Forces understanding of WHY the greedy choice works: once a node is finalized, no future path can improve it (only if edges are non-negative). A negative edge violates this invariant.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Graph: A->B (1), A->C (5), B->C (-10). Dijkstra finalizes B with dist=1, then C with dist=5. But path A->B->C has dist=1+(-10)=-9. Bellman-Ford would find this.' },
                output: 'See example',
                explanation: 'Graph: A->B (1), A->C (5), B->C (-10). Dijkstra finalizes B with dist=1, then C with dist=5. But path A->B->C has dist=1+(-10)=-9. Bellman-Ford would find this.'
            }
        ],
        solutions: {
            python: `# Negative Weight Handling
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm

def solve():
    """
    Dijkstra's assumes non-negative edge weights. Construct a graph where adding a single negative edge causes Dijkstra's to produce incorrect results. Then explain what algorithm you would use instead and why.

    Key insight: Forces understanding of WHY the greedy choice works: once a node is finalized, no future path can improve it (only if edges are non-negative). A negative edge violates this invariant.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Negative Weight Handling problem.
// Dijkstra's assumes non-negative edge weights. Construct a graph where adding a single negative edge causes Dijkstra's to produce incorrect results. Then explain what algorithm you would use instead and why.
// Key insight: Forces understanding of WHY the greedy choice works: once a node is finalized, no future path can improve it (only if edges are non-negative). A negative edge violates this invariant.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/twist-01-negative-weight-handling', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/twist-01-negative-weight-handling'] = problem;
})();
