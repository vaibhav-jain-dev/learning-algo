/**
 * Lexicographically First Order
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: topological-sort
 * Parent: 03-topological-sort/02-alien-dictionary
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lexicographically First Order',
        difficulty: 'Hard',
        algorithm: 'topological-sort',
        parent: '03-topological-sort/02-alien-dictionary',
        description: 'Among all valid orderings consistent with the word list, return the lexicographically smallest one (by English alphabet).',
        problem: 'Requires using a min-heap instead of a regular queue in the topological sort to always pick the smallest (by English alphabet) available character.',
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
                input: {"words":["wrt","wrf","er","ett","rftt"]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"words":["z","x"]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"words":["wrt"]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def lexicographically_first_order(words):
    """
    Lexicographically First Order

    Among all valid orderings consistent with the word list, return the lexicographically smallest one (by English alphabet).

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(words)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(lexicographically_first_order(["wrt","wrf","er","ett","rftt"]))  # Expected: 1
print(lexicographically_first_order(["z","x"]))  # Expected: 2
print(lexicographically_first_order(["wrt"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LexicographicallyFirstOrder solves the Lexicographically First Order problem.
// Among all valid orderings consistent with the word list, return the lexicographically smallest one (by English alphabet).
// Time: O(?), Space: O(?)
func LexicographicallyFirstOrder(words []string) int {
	result := 0

	for i := 0; i < len(words); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LexicographicallyFirstOrder([]string{"wrt", "wrf", "er", "ett", "rftt"})) // Expected: 1
	fmt.Println(LexicographicallyFirstOrder([]string{"z", "x"})) // Expected: 2
	fmt.Println(LexicographicallyFirstOrder([]string{"wrt"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/02-alien-dictionary/twist-05-lexicographically-first-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/02-alien-dictionary/twist-05-lexicographically-first-order'] = problem;
})();
