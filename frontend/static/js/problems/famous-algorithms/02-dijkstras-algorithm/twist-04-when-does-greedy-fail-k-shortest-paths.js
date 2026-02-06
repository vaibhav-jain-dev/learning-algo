/**
 * When Does Greedy Fail: K Shortest Paths
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 02-dijkstras-algorithm
 */
(function() {
    'use strict';
    const problem = {
        name: 'When Does Greedy Fail: K Shortest Paths',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'Modify Dijkstra\'s to find not just the shortest path, but the K shortest paths from source to destination. The standard greedy approach of finalizing nodes fails because you may need to revisit nodes.',
        problem: 'In standard Dijkstra\'s, each node is processed once. For K shortest paths, a node may appear on multiple shortest paths, so the "skip if already visited" optimization breaks the algorithm.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Graph: A->B (1), A->C (2), B->C (1), C->D (1). K=2 shortest paths from A to D: [A->C->D]=3 and [A->B->C->D]=3. Node C is used in both paths with different arrival distances.' },
                output: 'See example',
                explanation: 'Graph: A->B (1), A->C (2), B->C (1), C->D (1). K=2 shortest paths from A to D: [A->C->D]=3 and [A->B->C->D]=3. Node C is used in both paths with different arrival distances.'
            }
        ],
        solutions: {
            python: `# When Does Greedy Fail: K Shortest Paths
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm

def solve():
    """
    Modify Dijkstra's to find not just the shortest path, but the K shortest paths from source to destination. The standard greedy approach of finalizing nodes fails because you may need to revisit nodes.

    Key insight: In standard Dijkstra's, each node is processed once. For K shortest paths, a node may appear on multiple shortest paths, so the "skip if already visited" optimization breaks the algorithm.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the When Does Greedy Fail: K Shortest Paths problem.
// Modify Dijkstra's to find not just the shortest path, but the K shortest paths from source to destination. The standard greedy approach of finalizing nodes fails because you may need to revisit nodes.
// Key insight: In standard Dijkstra's, each node is processed once. For K shortest paths, a node may appear on multiple shortest paths, so the "skip if already visited" optimization breaks the algorithm.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/twist-04-when-does-greedy-fail-k-shortest-paths', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/twist-04-when-does-greedy-fail-k-shortest-paths'] = problem;
})();
