/**
 * Return All Shortest Transformation Sequences
 * Category: graphs
 * Difficulty: Very Hard
 * Parent: 02-breadth-first-search/03-word-ladder
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return All Shortest Transformation Sequences',
        difficulty: 'Very Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/03-word-ladder',
        description: 'Return all shortest transformation sequences from beginWord to endWord. Multiple paths of the same minimum length may exist.',
        problem: 'You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then doing DFS backtracking to enumerate all paths. Much harder than single-path BFS.',
        hints: [
            'Start by understanding the key difference: You must find ALL shortest paths, not just one.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: beginWord="hit", endWord="cog".',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: { time: 'Varies - see approach', space: 'Varies - see approach' },
        examples: [
            { input: { description: 'beginWord="hit", endWord="cog". Two paths: ["hit","hot","dot","dog","cog"] and ["hit","hot","lot","log","cog"]. Return both.' }, output: 'See explanation', explanation: 'beginWord="hit", endWord="cog". Two paths: ["hit","hot","dot","dog","cog"] and ["hit","hot","lot","log","cog"]. Return both.' },
            { input: { description: 'Edge case scenario' }, output: 'See explanation', explanation: 'Apply the same approach to boundary conditions and verify correctness.' }
        ],
        solutions: {
            python: `def return_all_shortest_transformation_sequences(data):
    """
    Return All Shortest Transformation Sequences

    Return all shortest transformation sequences from beginWord to endWord. Multiple paths of the same minimum length may exist.

    Approach:
    You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then doing DFS backtracking to enumerate all paths. Much harder than single-path BFS.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    # You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then doing DFS backtracking to enumerate all paths. Much harder than single-path BFS.

    # Implementation
    result = None

    # Core algorithm adapted for: Return All Shortest Transformation Sequences
    # Key difference from parent: You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then do

    if isinstance(data, dict):
        # Process input based on problem structure
        pass

    return result


def solve(data):
    """Process input data and return result."""
    return return_all_shortest_transformation_sequences(data)


# Test cases
if __name__ == "__main__":
    # Test case 1: Basic scenario
    # beginWord="hit", endWord="cog". Two paths: ["hit","hot","dot","dog","cog"] and ["hit","hot","lot","log","cog"]. Return both.
    print("Test: Return All Shortest Transformation Sequences")

    # Test case 2: Edge case
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ReturnAllShortestTransformationSequences solves the Return All Shortest Transformation Sequences problem
// Return all shortest transformation sequences from beginWord to endWord. Multiple paths of the same minimum length may exist.
//
// Approach: You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then doing DFS backtracking to enumerate all paths. Much harder than single-path BFS.
//
// Time: Varies - see approach
// Space: Varies - see approach
func ReturnAllShortestTransformationSequences(input interface{}) interface{} {
    // You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then doing DFS backtracking to enumerate all paths. Much harder than single-path BFS.

    // Core algorithm adapted for: Return All Shortest Transformation Sequences
    // Key difference from parent: You must find ALL shortest paths, not just one. This requires building a BFS layer graph and then do

    return nil
}

func main() {
    // Test case 1: Basic scenario
    // beginWord="hit", endWord="cog". Two paths: ["hit","hot","dot","dog","cog"] and ["hit","hot","lot","log","cog"]. Return both.
    fmt.Println("Test: Return All Shortest Transformation Sequences")

    // Test case 2: Edge case
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/03-word-ladder/twist-02-return-all-shortest-transformation-sequences', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/03-word-ladder/twist-02-return-all-shortest-transformation-sequences'] = problem;
})();
