/**
 * Merge Two BST Iterators
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 02-bst-construction/01-bst-iterator
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge Two BST Iterators',
        difficulty: 'Hard',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction/01-bst-iterator',
        description: 'Given two BST iterators, create a merged iterator that yields all values from both trees in sorted order.',
        problem: 'This is a merge operation on two lazy streams. You must compare the peek values of both iterators and advance the appropriate one, similar to merge sort but with iterator state management. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: merge two bst iterators.",
                  "Consider how this is a merge operation on two lazy streams affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST1: [3,1,5], BST2: [4,2,6]. Merged iterator yields: 1,2,3,4,5,6.'
            }
        ],
        solutions: {
            python: `# Merge Two BST Iterators
# Difficulty: Hard
# Parent: 02-bst-construction/01-bst-iterator
#
# Given two BST iterators, create a merged iterator that yields all values from both trees in sorted order.

def mergeTwoBstIterators(data):
    """
    Merge Two BST Iterators

    Approach: This is a merge operation on two lazy streams.
    """
    # TODO: Implement solution
    # Key insight: This is a merge operation on two lazy streams
    pass


# Test
if __name__ == "__main__":
    # Example: BST1: [3,1,5], BST2: [4,2,6]
    print(mergeTwoBstIterators({}))`,
            go: `package main

import "fmt"

// Merge Two BST Iterators
// Difficulty: Hard
// Parent: 02-bst-construction/01-bst-iterator
//
// Given two BST iterators, create a merged iterator that yields all values from both trees in sorted order.

func MergeTwoBstIterators(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: This is a merge operation on two lazy streams
    return nil
}

func main() {
    // Example: BST1: [3,1,5], BST2: [4,2,6]
    fmt.Println(MergeTwoBstIterators(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator/twist-04-merge-two-bst-iterators', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator/twist-04-merge-two-bst-iterators'] = problem;
})();
