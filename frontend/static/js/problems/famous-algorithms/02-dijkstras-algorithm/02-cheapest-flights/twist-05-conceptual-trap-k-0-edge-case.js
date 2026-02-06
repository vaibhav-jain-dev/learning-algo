/**
 * Conceptual Trap: K=0 Edge Case
 * Category: famous-algorithms
 * Difficulty: Easy
 * Parent: 02-dijkstras-algorithm/02-cheapest-flights
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: K=0 Edge Case',
        difficulty: 'Easy',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm/02-cheapest-flights',
        description: 'What happens when k=0? You can take at most 0 stops, meaning only direct flights from src to dst are valid. Trace through the algorithm with k=0 and verify it handles this correctly.',
        problem: 'With k=0, the priority queue immediately limits exploration depth. Many implementations have off-by-one errors here: is k the number of stops (intermediate nodes) or the number of flights?',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=0. Only direct flight 0->2 is valid. Answer: 500, not 200 (which would need 1 stop).' },
                output: 'See example',
                explanation: 'n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=0. Only direct flight 0->2 is valid. Answer: 500, not 200 (which would need 1 stop).'
            }
        ],
        solutions: {
            python: `# Conceptual Trap: K=0 Edge Case
# Category: famous-algorithms
# Difficulty: Easy
# Parent: 02-dijkstras-algorithm/02-cheapest-flights

def solve():
    """
    What happens when k=0? You can take at most 0 stops, meaning only direct flights from src to dst are valid. Trace through the algorithm with k=0 and verify it handles this correctly.

    Key insight: With k=0, the priority queue immediately limits exploration depth. Many implementations have off-by-one errors here: is k the number of stops (intermediate nodes) or the number of flights?
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Conceptual Trap: K=0 Edge Case problem.
// What happens when k=0? You can take at most 0 stops, meaning only direct flights from src to dst are valid. Trace through the algorithm with k=0 and verify it handles this correctly.
// Key insight: With k=0, the priority queue immediately limits exploration depth. Many implementations have off-by-one errors here: is k the number of stops (intermediate nodes) or the number of flights?
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/02-cheapest-flights/twist-05-conceptual-trap-k-0-edge-case', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/02-cheapest-flights/twist-05-conceptual-trap-k-0-edge-case'] = problem;
})();
