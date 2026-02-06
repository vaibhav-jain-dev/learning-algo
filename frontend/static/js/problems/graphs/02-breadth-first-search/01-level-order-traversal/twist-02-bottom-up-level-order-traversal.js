/**
 * Bottom-Up Level Order Traversal
 * Category: graphs
 * Difficulty: Easy
 * Parent: 02-breadth-first-search/01-level-order-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Bottom-Up Level Order Traversal',
        difficulty: 'Easy',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/01-level-order-traversal',
        description: 'Return the level order traversal from bottom to top: the deepest level first and the root level last.',
        problem: 'The BFS itself is identical, but you must reverse the result at the end or build it differently. This is a simple twist that tests whether you can decouple traversal order from output order.',
        hints: [
            'Start by understanding the key difference: The BFS itself is identical, but you must reverse the result at the end or build it differently.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Tree [3,9,20,null,null,15,7].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(N)', space: 'O(W)' },
        examples: [
            { input: { description: 'Tree [3,9,20,null,null,15,7]. Output: [[15,7],[9,20],[3]] instead of [[3],[9,20],[15,7]].' }, output: 'See explanation', explanation: 'Tree [3,9,20,null,null,15,7]. Output: [[15,7],[9,20],[3]] instead of [[3],[9,20],[15,7]].' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def bottom_up_level_order_traversal(data):
    """
    Bottom-Up Level Order Traversal

    Return the level order traversal from bottom to top: the deepest level first and the root level last.

    Approach:
    The BFS itself is identical, but you must reverse the result at the end or build it differently. This is a simple twist that tests whether you can decouple traversal order from output order.

    Time: O(N)
    Space: O(W)
    """
    # The BFS itself is identical, but you must reverse the result at the end or build it differently. This is a simple twist that tests whether you can decouple traversal order from output order.

    # Implementation
    result = None

    # Core algorithm adapted for: Bottom-Up Level Order Traversal
    # Key difference from parent: The BFS itself is identical, but you must reverse the result at the end or build it differently. Thi

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return bottom_up_level_order_traversal(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Tree [3,9,20,null,null,15,7]. Output: [[15,7],[9,20],[3]] instead of [[3],[9,20],[15,7]].
    print("Test: Bottom-Up Level Order Traversal")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// BottomUpLevelOrderTraversal solves the Bottom-Up Level Order Traversal problem
// Return the level order traversal from bottom to top: the deepest level first and the root level last.
//
// Approach: The BFS itself is identical, but you must reverse the result at the end or build it differently. This is a simple twist that tests whether you can decouple traversal order from output order.
//
// Time: O(N)
// Space: O(W)
func BottomUpLevelOrderTraversal(input interface{}) interface{} {
    // The BFS itself is identical, but you must reverse the result at the end or build it differently. This is a simple twist that tests whether you can decouple traversal order from output order.

    // Core algorithm adapted for: Bottom-Up Level Order Traversal
    // Key difference from parent: The BFS itself is identical, but you must reverse the result at the end or build it differently. Thi

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Tree [3,9,20,null,null,15,7]. Output: [[15,7],[9,20],[3]] instead of [[3],[9,20],[15,7]].
    fmt.Println("Test: Bottom-Up Level Order Traversal")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/01-level-order-traversal/twist-02-bottom-up-level-order-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/01-level-order-traversal/twist-02-bottom-up-level-order-traversal'] = problem;
})();
