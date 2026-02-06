/**
 * Minimum Cost to Add One More City
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm/02-connecting-cities
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Cost to Add One More City',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/02-connecting-cities',
        description: 'After connecting all cities optimally, a new city is added with given connection costs. Find the minimum additional cost to connect it to the existing network.',
        problem: 'Only needs the cheapest single edge from the new city to any existing city (since the network is already connected), but understanding why is the insight.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'After building MST for cities 1-3, city 4 arrives with connections to each. Just pick the cheapest connection to any existing city.' },
                output: 'See example',
                explanation: 'After building MST for cities 1-3, city 4 arrives with connections to each. Just pick the cheapest connection to any existing city.'
            }
        ],
        solutions: {
            python: `# Minimum Cost to Add One More City
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm/02-connecting-cities

def solve():
    """
    After connecting all cities optimally, a new city is added with given connection costs. Find the minimum additional cost to connect it to the existing network.

    Key insight: Only needs the cheapest single edge from the new city to any existing city (since the network is already connected), but understanding why is the insight.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Minimum Cost to Add One More City problem.
// After connecting all cities optimally, a new city is added with given connection costs. Find the minimum additional cost to connect it to the existing network.
// Key insight: Only needs the cheapest single edge from the new city to any existing city (since the network is already connected), but understanding why is the insight.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities/twist-02-minimum-cost-to-add-one-more-city', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities/twist-02-minimum-cost-to-add-one-more-city'] = problem;
})();
