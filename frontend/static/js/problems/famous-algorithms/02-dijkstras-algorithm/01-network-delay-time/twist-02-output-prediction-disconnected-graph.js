/**
 * Output Prediction: Disconnected Graph
 * Category: famous-algorithms
 * Difficulty: Medium
 * Parent: 02-dijkstras-algorithm/01-network-delay-time
 */
(function() {
    'use strict';
    const problem = {
        name: 'Output Prediction: Disconnected Graph',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/01-network-delay-time',
        description: 'Predict the output when the graph is disconnected: times=[[1,2,1],[3,4,1]], n=4, k=1. Trace through Dijkstra\'s and explain why the answer is -1. What is the minimum number of edges to add to make all nodes reachable?',
        problem: 'Forces thinking about graph connectivity, not just shortest paths. The algorithm\'s termination condition and how unreachable nodes manifest as infinity in the distance array.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'From node 1: dist[1]=0, dist[2]=1, dist[3]=inf, dist[4]=inf. Max dist = inf, so return -1. Adding edge [2,3,x] would connect the components.' },
                output: 'See example',
                explanation: 'From node 1: dist[1]=0, dist[2]=1, dist[3]=inf, dist[4]=inf. Max dist = inf, so return -1. Adding edge [2,3,x] would connect the components.'
            }
        ],
        solutions: {
            python: `# Output Prediction: Disconnected Graph
# Category: famous-algorithms
# Difficulty: Medium
# Parent: 02-dijkstras-algorithm/01-network-delay-time

def solve():
    """
    Predict the output when the graph is disconnected: times=[[1,2,1],[3,4,1]], n=4, k=1. Trace through Dijkstra's and explain why the answer is -1. What is the minimum number of edges to add to make all nodes reachable?

    Key insight: Forces thinking about graph connectivity, not just shortest paths. The algorithm's termination condition and how unreachable nodes manifest as infinity in the distance array.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Output Prediction: Disconnected Graph problem.
// Predict the output when the graph is disconnected: times=[[1,2,1],[3,4,1]], n=4, k=1. Trace through Dijkstra's and explain why the answer is -1. What is the minimum number of edges to add to make all nodes reachable?
// Key insight: Forces thinking about graph connectivity, not just shortest paths. The algorithm's termination condition and how unreachable nodes manifest as infinity in the distance array.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time/twist-02-output-prediction-disconnected-graph', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time/twist-02-output-prediction-disconnected-graph'] = problem;
})();
