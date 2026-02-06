/**
 * Minimum Nodes to Remove for Full BST
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 03-validate-bst/02-largest-bst-subtree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Nodes to Remove for Full BST',
        difficulty: 'Very Hard',
        algorithm: 'bst-validation',
        parent: '03-validate-bst/02-largest-bst-subtree',
        description: 'Find the minimum number of nodes to remove from the binary tree so that the entire remaining tree is a valid BST.',
        problem: 'This is an optimization problem over all possible subsets of nodes to remove, not just finding existing BST subtrees. Removing a node may fix one violation but create another, requiring global reasoning. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: minimum nodes to remove for full bst.",
                  "Consider how this is an optimization problem over all possible subsets of nodes to remove, not just finding existing bst subtrees affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [5,3,8,1,4,6,10,null,null,null,null,7] -> Remove node 7 (which violates right subtree of 6). Minimum removals: 1.'
            }
        ],
        solutions: {
            python: `# Minimum Nodes to Remove for Full BST
# Difficulty: Very Hard
# Parent: 03-validate-bst/02-largest-bst-subtree
#
# Find the minimum number of nodes to remove from the binary tree so that the entire remaining tree is a valid BST.

def minimumNodesToRemoveForFullBst(data):
    """
    Minimum Nodes to Remove for Full BST

    Approach: This is an optimization problem over all possible subsets of nodes to remove, not just finding existing BST subtrees.
    """
    # TODO: Implement solution
    # Key insight: This is an optimization problem over all possible subsets of nodes to remove, not just finding existing BST subtrees
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [5,3,8,1,4,6,10,null,null,null,null,7] -> Remove node 7 (which violates right subtree of 6)
    print(minimumNodesToRemoveForFullBst({}))`,
            go: `package main

import "fmt"

// Minimum Nodes to Remove for Full BST
// Difficulty: Very Hard
// Parent: 03-validate-bst/02-largest-bst-subtree
//
// Find the minimum number of nodes to remove from the binary tree so that the entire remaining tree is a valid BST.

func MinimumNodesToRemoveForFullBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: This is an optimization problem over all possible subsets of nodes to remove, not just finding existing BST subtrees
    return nil
}

func main() {
    // Example: Tree: [5,3,8,1,4,6,10,null,null,null,null,7] -> Remove node 7 (which violates right subtree of 6)
    fmt.Println(MinimumNodesToRemoveForFullBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree/twist-04-minimum-nodes-to-remove-for-full-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree/twist-04-minimum-nodes-to-remove-for-full-bst'] = problem;
})();
