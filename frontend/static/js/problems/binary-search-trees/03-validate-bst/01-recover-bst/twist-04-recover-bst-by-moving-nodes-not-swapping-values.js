/**
 * Recover BST by Moving Nodes (Not Swapping Values)
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 03-validate-bst/01-recover-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Recover BST by Moving Nodes (Not Swapping Values)',
        difficulty: 'Very Hard',
        algorithm: 'bst-repair',
        parent: '03-validate-bst/01-recover-bst',
        description: 'Instead of swapping values, physically detach the two misplaced nodes and reinsert them into their correct positions in the tree structure.',
        problem: 'Moving nodes requires relinking parent pointers, handling cases where one misplaced node is an ancestor of the other, and reattaching subtrees of the moved nodes. This is a structural modification, not just a value swap. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: recover bst by moving nodes (not swapping values).",
                  "Consider how moving nodes requires relinking parent pointers, handling cases where one misplaced node is an ancestor of the other, and reattaching subtrees of the moved nodes affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [3,1,4,null,null,2] with nodes 2 and 3 swapped. Must physically move node 2 to root position and node 3 to leaf, relinking all parent/child pointers.'
            }
        ],
        solutions: {
            python: `# Recover BST by Moving Nodes (Not Swapping Values)
# Difficulty: Very Hard
# Parent: 03-validate-bst/01-recover-bst
#
# Instead of swapping values, physically detach the two misplaced nodes and reinsert them into their correct positions in the tree structure.

def recoverBstByMovingNodesNotSwappingValues(data):
    """
    Recover BST by Moving Nodes (Not Swapping Values)

    Approach: Moving nodes requires relinking parent pointers, handling cases where one misplaced node is an ancestor of the other, and reattaching subtrees of the moved nodes.
    """
    # TODO: Implement solution
    # Key insight: Moving nodes requires relinking parent pointers, handling cases where one misplaced node is an ancestor of the other, and reattaching subtrees of the moved nodes
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [3,1,4,null,null,2] with nodes 2 and 3 swapped
    print(recoverBstByMovingNodesNotSwappingValues({}))`,
            go: `package main

import "fmt"

// Recover BST by Moving Nodes (Not Swapping Values)
// Difficulty: Very Hard
// Parent: 03-validate-bst/01-recover-bst
//
// Instead of swapping values, physically detach the two misplaced nodes and reinsert them into their correct positions in the tree structure.

func RecoverBstByMovingNodesNotSwappingValues(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Moving nodes requires relinking parent pointers, handling cases where one misplaced node is an ancestor of the other, and reattaching subtrees of the moved nodes
    return nil
}

func main() {
    // Example: Tree: [3,1,4,null,null,2] with nodes 2 and 3 swapped
    fmt.Println(RecoverBstByMovingNodesNotSwappingValues(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst/twist-04-recover-bst-by-moving-nodes-not-swapping-values', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst/twist-04-recover-bst-by-moving-nodes-not-swapping-values'] = problem;
})();
