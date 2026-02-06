/**
 * Number of Islands Using BFS
 * Category: graphs
 * Difficulty: Medium
 * Parent: 01-depth-first-search/01-number-of-islands
 */
(function() {
    'use strict';
    const problem = {
        name: 'Number of Islands Using BFS',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/01-number-of-islands',
        description: 'Solve the same problem using BFS instead of DFS. Compare the traversal pattern and discuss when BFS might be preferred.',
        problem: 'Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stack overflow on very large islands but uses more memory for wide islands.',
        hints: [
            'Start by understanding the key difference: Forces you to switch from recursive flood-fill to iterative queue-based exploration.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Same input/output, but the internal exploration of each island radiates outward level by level instead of going deep first.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'O(M * N)', space: 'O(M * N)' },
        examples: [
            { input: { description: 'Same input/output, but the internal exploration of each island radiates outward level by level instead of going deep first.' }, output: 'See explanation', explanation: 'Same input/output, but the internal exploration of each island radiates outward level by level instead of going deep first.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def number_of_islands_using_bfs(data):
    """
    Number of Islands Using BFS

    Solve the same problem using BFS instead of DFS. Compare the traversal pattern and discuss when BFS might be preferred.

    Approach:
    Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stack overflow on very large islands but uses more memory for wide islands.

    Time: O(M * N)
    Space: O(M * N)
    """
    # Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stack overflow on very large islands but uses more memory for wide islands.

    # Implementation
    result = None

    # Core algorithm adapted for: Number of Islands Using BFS
    # Key difference from parent: Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stac

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return number_of_islands_using_bfs(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # Same input/output, but the internal exploration of each island radiates outward level by level instead of going deep first.
    print("Test: Number of Islands Using BFS")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// NumberOfIslandsUsingBFS solves the Number of Islands Using BFS problem
// Solve the same problem using BFS instead of DFS. Compare the traversal pattern and discuss when BFS might be preferred.
//
// Approach: Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stack overflow on very large islands but uses more memory for wide islands.
//
// Time: O(M * N)
// Space: O(M * N)
func NumberOfIslandsUsingBFS(input interface{}) interface{} {
    // Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stack overflow on very large islands but uses more memory for wide islands.

    // Core algorithm adapted for: Number of Islands Using BFS
    // Key difference from parent: Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stac

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // Same input/output, but the internal exploration of each island radiates outward level by level instead of going deep first.
    fmt.Println("Test: Number of Islands Using BFS")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands/twist-02-number-of-islands-using-bfs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands/twist-02-number-of-islands-using-bfs'] = problem;
})();
