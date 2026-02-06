/**
 * Persistent BST
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'Persistent BST',
        difficulty: 'Very Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Implement insert and remove so that previous versions of the tree are preserved. Each mutation returns a new root while keeping the old tree intact via path copying.',
        problem: 'Instead of mutating nodes in place, you create new nodes along the insertion/deletion path, sharing unchanged subtrees. This is a fundamentally different memory and pointer management pattern. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: persistent bst.",
                  "Consider how instead of mutating nodes in place, you create new nodes along the insertion/deletion path, sharing unchanged subtrees affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'v1 = insert(null, 5), v2 = insert(v1, 3). v1 still has only node 5. v2 has nodes 5 and 3.'
            }
        ],
        solutions: {
            python: `# Persistent BST
# Difficulty: Very Hard
# Parent: 02-bst-construction
#
# Implement insert and remove so that previous versions of the tree are preserved. Each mutation returns a new root while keeping the old tree intact via path copying.

def persistentBst(data):
    """
    Persistent BST

    Approach: Instead of mutating nodes in place, you create new nodes along the insertion/deletion path, sharing unchanged subtrees.
    """
    # TODO: Implement solution
    # Key insight: Instead of mutating nodes in place, you create new nodes along the insertion/deletion path, sharing unchanged subtrees
    pass


# Test
if __name__ == "__main__":
    # Example: v1 = insert(null, 5), v2 = insert(v1, 3)
    print(persistentBst({}))`,
            go: `package main

import "fmt"

// Persistent BST
// Difficulty: Very Hard
// Parent: 02-bst-construction
//
// Implement insert and remove so that previous versions of the tree are preserved. Each mutation returns a new root while keeping the old tree intact via path copying.

func PersistentBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of mutating nodes in place, you create new nodes along the insertion/deletion path, sharing unchanged subtrees
    return nil
}

func main() {
    // Example: v1 = insert(null, 5), v2 = insert(v1, 3)
    fmt.Println(PersistentBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-03-persistent-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-03-persistent-bst'] = problem;
})();
