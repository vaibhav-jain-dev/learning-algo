/**
 * Vertical Order Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Vertical Order Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Traverse the BST in vertical order: group nodes by their horizontal distance from the root, then within each group order by level (top to bottom).',
        problem: 'None of the three standard traversals produce vertical ordering. You must track horizontal distance during traversal using BFS or DFS, then group and sort the results by column index. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: vertical order traversal.",
                  "Consider how none of the three standard traversals produce vertical ordering affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,7,null,20] -> Columns: {-2:[2], -1:[5], 0:[10,7], 1:[15], 2:[20]}.'
            }
        ],
        solutions: {
            python: `# Vertical Order Traversal
# Difficulty: Medium
# Parent: 04-bst-traversal
#
# Traverse the BST in vertical order: group nodes by their horizontal distance from the root, then within each group order by level (top to bottom).

def verticalOrderTraversal(data):
    """
    Vertical Order Traversal

    Approach: None of the three standard traversals produce vertical ordering.
    """
    # TODO: Implement solution
    # Key insight: None of the three standard traversals produce vertical ordering
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,7,null,20] -> Columns: {-2:[2], -1:[5], 0:[10,7], 1:[15], 2:[20]}
    print(verticalOrderTraversal({}))`,
            go: `package main

import "fmt"

// Vertical Order Traversal
// Difficulty: Medium
// Parent: 04-bst-traversal
//
// Traverse the BST in vertical order: group nodes by their horizontal distance from the root, then within each group order by level (top to bottom).

func VerticalOrderTraversal(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: None of the three standard traversals produce vertical ordering
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,7,null,20] -> Columns: {-2:[2], -1:[5], 0:[10,7], 1:[15], 2:[20]}
    fmt.Println(VerticalOrderTraversal(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/twist-02-vertical-order-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/twist-02-vertical-order-traversal'] = problem;
})();
