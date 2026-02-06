/**
 * Dijkstra vs MST Approach
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 07-prims-algorithm/02-network-delay-mst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Dijkstra vs MST Approach',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/02-network-delay-mst',
        description: 'Compare solving network delay using Dijkstra\'s shortest paths vs the MST approach. When do they give different answers?',
        problem: 'MST minimizes total edge weight but does not minimize path lengths. Dijkstra minimizes path from source to each node. The two approaches solve fundamentally different problems.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'MST might route through a long single-edge path while Dijkstra would find a shorter multi-hop path. Network delay interpretation affects which is correct.' },
                output: 'See example',
                explanation: 'MST might route through a long single-edge path while Dijkstra would find a shorter multi-hop path. Network delay interpretation affects which is correct.'
            }
        ],
        solutions: {
            python: `# Dijkstra vs MST Approach
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 07-prims-algorithm/02-network-delay-mst

def solve():
    """
    Compare solving network delay using Dijkstra's shortest paths vs the MST approach. When do they give different answers?

    Key insight: MST minimizes total edge weight but does not minimize path lengths. Dijkstra minimizes path from source to each node. The two approaches solve fundamentally different problems.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Dijkstra vs MST Approach problem.
// Compare solving network delay using Dijkstra's shortest paths vs the MST approach. When do they give different answers?
// Key insight: MST minimizes total edge weight but does not minimize path lengths. Dijkstra minimizes path from source to each node. The two approaches solve fundamentally different problems.
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
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/02-network-delay-mst/twist-01-dijkstra-vs-mst-approach', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/02-network-delay-mst/twist-01-dijkstra-vs-mst-approach'] = problem;
})();
