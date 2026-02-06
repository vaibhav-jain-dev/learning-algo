/**
 * Maintenance Cost Over Time
 * Category: famous-algorithms
 * Difficulty: Hard
 * Parent: 06-kruskals-algorithm/03-optimize-water-distribution
 */
(function() {
    'use strict';
    const problem = {
        name: 'Maintenance Cost Over Time',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/03-optimize-water-distribution',
        description: 'Wells have annual maintenance costs, while pipes have one-time installation costs. Minimize total cost over T years.',
        problem: 'The well cost is now wells[i]*T (recurring) while pipe costs are one-time, changing the tradeoff and potentially different optimal solutions for different time horizons.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'A cheap well ($1/year) for 100 years costs $100 vs a one-time pipe cost of $50. Over 10 years the well is better ($10), over 100 years the pipe is better.' },
                output: 'See example',
                explanation: 'A cheap well ($1/year) for 100 years costs $100 vs a one-time pipe cost of $50. Over 10 years the well is better ($10), over 100 years the pipe is better.'
            }
        ],
        solutions: {
            python: `# Maintenance Cost Over Time
# Category: famous-algorithms
# Difficulty: Hard
# Parent: 06-kruskals-algorithm/03-optimize-water-distribution

def solve():
    """
    Wells have annual maintenance costs, while pipes have one-time installation costs. Minimize total cost over T years.

    Key insight: The well cost is now wells[i]*T (recurring) while pipe costs are one-time, changing the tradeoff and potentially different optimal solutions for different time horizons.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Maintenance Cost Over Time problem.
// Wells have annual maintenance costs, while pipes have one-time installation costs. Minimize total cost over T years.
// Key insight: The well cost is now wells[i]*T (recurring) while pipe costs are one-time, changing the tradeoff and potentially different optimal solutions for different time horizons.
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
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution/twist-03-maintenance-cost-over-time', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution/twist-03-maintenance-cost-over-time'] = problem;
})();
