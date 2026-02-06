/**
 * Zigzag with Column Index
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 04-bst-traversal/03-level-order-zigzag
 */
(function() {
    'use strict';
    const problem = {
        name: 'Zigzag with Column Index',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/03-level-order-zigzag',
        description: 'Perform zigzag level order traversal but additionally return the column index of each node. Column index follows vertical order conventions (root=0, left child=parent-1, right child=parent+1).',
        problem: 'Tracking column indices through the zigzag complicates the bookkeeping significantly. The visual position of a node in the zigzag output does not correspond to its column index, requiring dual tracking of BFS level and vertical position. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: zigzag with column index.",
                  "Consider how tracking column indices through the zigzag complicates the bookkeeping significantly affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [3,9,20,null,null,15,7]. Zigzag: [[3@col0], [20@col1, 9@col-1], [15@col0, 7@col2]].'
            }
        ],
        solutions: {
            python: `# Zigzag with Column Index
# Difficulty: Hard
# Parent: 04-bst-traversal/03-level-order-zigzag
#
# Perform zigzag level order traversal but additionally return the column index of each node. Column index follows vertical order conventions (root=0, left child=parent-1, right child=parent+1).

def zigzagWithColumnIndex(data):
    """
    Zigzag with Column Index

    Approach: Tracking column indices through the zigzag complicates the bookkeeping significantly.
    """
    # TODO: Implement solution
    # Key insight: Tracking column indices through the zigzag complicates the bookkeeping significantly
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [3,9,20,null,null,15,7]
    print(zigzagWithColumnIndex({}))`,
            go: `package main

import "fmt"

// Zigzag with Column Index
// Difficulty: Hard
// Parent: 04-bst-traversal/03-level-order-zigzag
//
// Perform zigzag level order traversal but additionally return the column index of each node. Column index follows vertical order conventions (root=0, left child=parent-1, right child=parent+1).

func ZigzagWithColumnIndex(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Tracking column indices through the zigzag complicates the bookkeeping significantly
    return nil
}

func main() {
    // Example: Tree: [3,9,20,null,null,15,7]
    fmt.Println(ZigzagWithColumnIndex(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/03-level-order-zigzag/twist-03-zigzag-with-column-index', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/03-level-order-zigzag/twist-03-zigzag-with-column-index'] = problem;
})();
