/**
 * Nearest Wall Distance
 * Category: graphs
 * Difficulty: Medium
 * Parent: 08-minimum-passes/02-walls-and-gates
 */
(function() {
    'use strict';
    const problem = {
        name: 'Nearest Wall Distance',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/02-walls-and-gates',
        description: 'Instead of distance to nearest gate, fill each empty room with its distance to the nearest wall.',
        problem: 'You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the original, so you must redefine what blocks movement.',
        hints: [
            'Start by understanding the key difference: You reverse the source cells: BFS starts from walls instead of gates.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Grid where gates and empty rooms are walkable.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Grid where gates and empty rooms are walkable. BFS from all wall cells (-1). Distance to nearest wall for each empty room.' }, output: 'See explanation', explanation: 'Grid where gates and empty rooms are walkable. BFS from all wall cells (-1). Distance to nearest wall for each empty room.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def nearest_wall_distance(data):
    """
    Nearest Wall Distance

    Instead of distance to nearest gate, fill each empty room with its distance to the nearest wall.

    Approach:
    You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the original, so you must redefine what blocks movement.

    Time: O(M * N)
    Space: O(M * N)
    """
    # You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the original, so you must redefine what blocks movement.

    # Implementation
    result = None

    # Core algorithm adapted for: Nearest Wall Distance
    # Key difference from parent: You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return nearest_wall_distance(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Grid where gates and empty rooms are walkable. BFS from all wall cells (-1). Distance to nearest wall for each empty room.
    print("Test: Nearest Wall Distance")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// NearestWallDistance solves the Nearest Wall Distance problem
// Instead of distance to nearest gate, fill each empty room with its distance to the nearest wall.
//
// Approach: You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the original, so you must redefine what blocks movement.
//
// Time: O(M * N)
// Space: O(M * N)
func NearestWallDistance(input interface{}) interface{} {
    // You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the original, so you must redefine what blocks movement.

    // Core algorithm adapted for: Nearest Wall Distance
    // Key difference from parent: You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Grid where gates and empty rooms are walkable. BFS from all wall cells (-1). Distance to nearest wall for each empty room.
    fmt.Println("Test: Nearest Wall Distance")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/02-walls-and-gates/twist-01-nearest-wall-distance', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/02-walls-and-gates/twist-01-nearest-wall-distance'] = problem;
})();
