/**
 * Approximation: Limited Heap Size
 * Category: famous-algorithms
 * Difficulty: Hard
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
        problem: 'Standard Dijkstra\'s may push O(E) entries to the heap. With limited heap size, you must decide which entries to discard, potentially losing optimal paths. Forces thinking about which approximation guarantees are achievable.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'Dense graph with 1M edges but heap limited to 1000 entries. Must prioritize which candidates to keep. Evicting the highest-distance entry is a reasonable heuristic but may miss paths through high-intermediate-cost nodes.' },
                output: 'See example',
                explanation: 'Dense graph with 1M edges but heap limited to 1000 entries. Must prioritize which candidates to keep. Evicting the highest-distance entry is a reasonable heuristic but may miss paths through high-intermediate-cost nodes.'
            }
        ],
        solutions: {
            python: `# Approximation: Limited Heap Size
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 02-dijkstras-algorithm/01-network-delay-time

def solve():
    """
    What if memory is limited and you can only keep K entries in the priority queue? Design an approximation that gives correct answers when possible and bounded error otherwise. When does this limitation cause incorrect results?

    Key insight: Standard Dijkstra's may push O(E) entries to the heap. With limited heap size, you must decide which entries to discard, potentially losing optimal paths. Forces thinking about which approximation guarantees are achievable.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Approximation: Limited Heap Size problem.
// What if memory is limited and you can only keep K entries in the priority queue? Design an approximation that gives correct answers when possible and bounded error otherwise. When does this limitation cause incorrect results?
// Key insight: Standard Dijkstra's may push O(E) entries to the heap. With limited heap size, you must decide which entries to discard, potentially losing optimal paths. Forces thinking about which approximation guarantees are achievable.
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
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/01-network-delay-time/twist-06-approximation-limited-heap-size', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/01-network-delay-time/twist-06-approximation-limited-heap-size'] = problem;
})();
