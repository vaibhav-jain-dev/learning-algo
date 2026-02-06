/**
 * BST Iterator Resilient to Modifications
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'BST Iterator Resilient to Modifications',
        difficulty: 'Very Hard',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'The BST may have nodes inserted or deleted between iterator calls. The iterator should still yield all remaining values in sorted order, including newly inserted ones and excluding deleted ones.',
        problem: 'Standard iterators assume a static tree. Handling concurrent modifications requires either snapshotting, versioning, or re-validating the stack state before each next() call -- a fundamentally different design. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: bst iterator resilient to modifications.",
                  "Consider how standard iterators assume a static tree affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [5,3,7]. next()=3. Insert 4. next()=4 (newly inserted). next()=5. Delete 7. hasNext()=false.'
            }
        ],
        solutions: {
            python: `# BST Iterator Resilient to Modifications
# Difficulty: Very Hard
# Parent: 02-bst-construction/01-bst-iterator
#
# The BST may have nodes inserted or deleted between iterator calls. The iterator should still yield all remaining values in sorted order, including newly inserted ones and excluding deleted ones.

def bstIteratorResilientToModifications(data):
    """
    BST Iterator Resilient to Modifications

    Approach: Standard iterators assume a static tree.
    """
    # TODO: Implement solution
    # Key insight: Standard iterators assume a static tree
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [5,3,7]
    print(bstIteratorResilientToModifications({}))`,
            go: `package main

import "fmt"

// BST Iterator Resilient to Modifications
// Difficulty: Very Hard
// Parent: 02-bst-construction/01-bst-iterator
//
// The BST may have nodes inserted or deleted between iterator calls. The iterator should still yield all remaining values in sorted order, including newly inserted ones and excluding deleted ones.

func BstIteratorResilientToModifications(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Standard iterators assume a static tree
    return nil
}

func main() {
    // Example: Tree: [5,3,7]
    fmt.Println(BstIteratorResilientToModifications(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-05-bst-iterator-resilient-to-modifications', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-05-bst-iterator-resilient-to-modifications'] = problem;
})();
