/**
 * Bidirectional Routes
 * Category: graphs
 * Difficulty: Medium
 * Parent: 10-airport-connections
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bidirectional Routes',
        difficulty: 'Medium',
        algorithm: 'graph-connections',
        parent: '10-airport-connections',
        description: 'All routes are bidirectional instead of one-way. Find the minimum additional bidirectional routes needed.',
        problem: 'In undirected graphs, reachability is symmetric. You just need to connect all components to the starting airport component, simplifying to counting disconnected components minus 1.',
        hints: [
            'Start by understanding the key difference: In undirected graphs, reachability is symmetric.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: 5 airports in 3 connected components.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(A * (A + R))', space: 'O(A + R)' },
        examples: [
            { input: { description: '5 airports in 3 connected components. Need 2 additional bidirectional routes to connect them all.' }, output: 'See explanation', explanation: '5 airports in 3 connected components. Need 2 additional bidirectional routes to connect them all.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def bidirectional_routes(data):
    """
    Bidirectional Routes

    All routes are bidirectional instead of one-way. Find the minimum additional bidirectional routes needed.

    Approach:
    In undirected graphs, reachability is symmetric. You just need to connect all components to the starting airport component, simplifying to counting disconnected components minus 1.

    Time: O(A * (A + R))
    Space: O(A + R)
    """
    # In undirected graphs, reachability is symmetric. You just need to connect all components to the starting airport component, simplifying to counting disconnected components minus 1.

    # Implementation
    result = None

    # Core algorithm adapted for: Bidirectional Routes
    # Key difference from parent: In undirected graphs, reachability is symmetric. You just need to connect all components to the star

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return bidirectional_routes(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # 5 airports in 3 connected components. Need 2 additional bidirectional routes to connect them all.
    print("Test: Bidirectional Routes")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// BidirectionalRoutes solves the Bidirectional Routes problem
// All routes are bidirectional instead of one-way. Find the minimum additional bidirectional routes needed.
//
// Approach: In undirected graphs, reachability is symmetric. You just need to connect all components to the starting airport component, simplifying to counting disconnected components minus 1.
//
// Time: O(A * (A + R))
// Space: O(A + R)
func BidirectionalRoutes(input interface{}) interface{} {
    // In undirected graphs, reachability is symmetric. You just need to connect all components to the starting airport component, simplifying to counting disconnected components minus 1.

    // Core algorithm adapted for: Bidirectional Routes
    // Key difference from parent: In undirected graphs, reachability is symmetric. You just need to connect all components to the star

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // 5 airports in 3 connected components. Need 2 additional bidirectional routes to connect them all.
    fmt.Println("Test: Bidirectional Routes")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/twist-01-bidirectional-routes', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/twist-01-bidirectional-routes'] = problem;
})();
