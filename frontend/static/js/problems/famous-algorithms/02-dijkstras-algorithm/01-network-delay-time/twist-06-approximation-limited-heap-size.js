/**
 * Approximation: Limited Heap Size
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: dijkstras-algorithm
 * Parent: 02-dijkstras-algorithm/01-network-delay-time
 */
(function() {
    'use strict';

    const problem = {
        name: 'Approximation: Limited Heap Size',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/01-network-delay-time',
        description: 'What if memory is limited and you can only keep K entries in the priority queue? Design an approximation that gives correct answers when possible and bounded error otherwise. When does this limitation cause incorrect results?',
        problem: 'Standard Dijkstra.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"times":[[2,1,1],[2,3,1],[3,4,1]],"n":4,"k":2},
                output: true,
                explanation: 'The approximation limited heap size condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"times":[[2,1,1]],"n":0,"k":0},
                output: false,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def approximation_limited_heap_size(times, n, k):
    """
    Approximation: Limited Heap Size

    What if memory is limited and you can only keep K entries in the priority queue? Design an approximation that gives correct answers when possible and bounded error otherwise. When does this limitation cause incorrect results?

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(times)):
        if j < len(n) and times[i] == n[j]:
            j += 1

    return j == len(n)


# Test cases
print(approximation_limited_heap_size([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: True
print(approximation_limited_heap_size([[2,1,1]], 0, 0))  # Expected: False
`,
            go: `package main

import "fmt"

// ApproximationLimitedHeapSize solves the Approximation: Limited Heap Size problem.
// What if memory is limited and you can only keep K entries in the priority queue? Design an approximation that gives correct answers when possible and bounded error otherwise. When does this limitation cause incorrect results?
// Time: O(?), Space: O(?)
func ApproximationLimitedHeapSize(times [][]int, n int, k int) bool {
	j := 0

	for i := 0; i < len(times) && j < len(n); i++ {
		if times[i] == n[j] {
			j++
		}
	}

	return j == len(n)
}

func main() {
	fmt.Println(ApproximationLimitedHeapSize([][]int{{2, 1, 1}, {2, 3, 1}, {3, 4, 1}}, 4, 2)) // Expected: true
	fmt.Println(ApproximationLimitedHeapSize([][]int{{2, 1, 1}}, 0, 0)) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time/twist-06-approximation-limited-heap-size', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time/twist-06-approximation-limited-heap-size'] = problem;
})();
