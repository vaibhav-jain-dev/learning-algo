/**
 * When Dijkstra Greedy Fails Here
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 02-dijkstras-algorithm/02-cheapest-flights
 */
(function() {
    'use strict';
    const problem = {
        name: 'When Dijkstra Greedy Fails Here',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/02-cheapest-flights',
        description: 'Standard Dijkstra\'s can give wrong answers for this problem. Construct an example where the cheapest path to dst has more stops than a more expensive path, and explain why the "skip if already visited" optimization must be modified.',
        problem: 'In standard Dijkstra\'s, once a node is finalized, it is never revisited. But with a stop limit, a more expensive path with fewer stops may be the only valid path. The visited check must account for stops remaining.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'n=4, flights=[[0,1,1],[0,2,5],[1,2,1],[2,3,1]], src=0, dst=3, k=1. Dijkstra finalizes node 2 via 0->1->2 (cost=2, stops=2). But k=1 means max 1 stop, so valid path is 0->2->3 (cost=6, stops=1).' },
                output: 'See example',
                explanation: 'n=4, flights=[[0,1,1],[0,2,5],[1,2,1],[2,3,1]], src=0, dst=3, k=1. Dijkstra finalizes node 2 via 0->1->2 (cost=2, stops=2). But k=1 means max 1 stop, so valid path is 0->2->3 (cost=6, stops=1).'
            }
        ],
        solutions: {
            python: `# When Dijkstra Greedy Fails Here
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm/02-cheapest-flights

def solve():
    """
    Standard Dijkstra's can give wrong answers for this problem. Construct an example where the cheapest path to dst has more stops than a more expensive path, and explain why the "skip if already visited" optimization must be modified.

    Key insight: In standard Dijkstra's, once a node is finalized, it is never revisited. But with a stop limit, a more expensive path with fewer stops may be the only valid path. The visited check must account for stops remaining.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the When Dijkstra Greedy Fails Here problem.
// Standard Dijkstra's can give wrong answers for this problem. Construct an example where the cheapest path to dst has more stops than a more expensive path, and explain why the "skip if already visited" optimization must be modified.
// Key insight: In standard Dijkstra's, once a node is finalized, it is never revisited. But with a stop limit, a more expensive path with fewer stops may be the only valid path. The visited check must account for stops remaining.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/02-cheapest-flights/twist-01-when-dijkstra-greedy-fails-here', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/02-cheapest-flights/twist-01-when-dijkstra-greedy-fails-here'] = problem;
})();
