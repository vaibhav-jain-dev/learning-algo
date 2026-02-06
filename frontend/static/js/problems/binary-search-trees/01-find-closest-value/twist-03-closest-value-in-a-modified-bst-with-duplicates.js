/**
 * Closest Value in a Modified BST with Duplicates
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 01-find-closest-value
 */
(function() {
    'use strict';
    const problem = {
        name: 'Closest Value in a Modified BST with Duplicates',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'The BST may contain duplicate values (duplicates go to the right subtree). Find the closest value, and if there are ties, return the smallest one.',
        problem: 'Duplicates break the assumption of unique closest value. You must handle tie-breaking logic and cannot stop early when you find an exact match since duplicates may exist on either side. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: closest value in a modified bst with duplicates.",
                  "Consider how duplicates break the assumption of unique closest value affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,5,7,10,20], target=10 -> Return 10 (exact match exists, but you must find it among duplicates).'
            }
        ],
        solutions: {
            python: `# Closest Value in a Modified BST with Duplicates
# Difficulty: Medium
# Parent: 01-find-closest-value
#
# The BST may contain duplicate values (duplicates go to the right subtree). Find the closest value, and if there are ties, return the smallest one.

def closestValueInAModifiedBstWithDuplicates(data):
    """
    Closest Value in a Modified BST with Duplicates

    Approach: Duplicates break the assumption of unique closest value.
    """
    # TODO: Implement solution
    # Key insight: Duplicates break the assumption of unique closest value
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,5,7,10,20], target=10 -> Return 10 (exact match exists, but you must find it among duplicates)
    print(closestValueInAModifiedBstWithDuplicates({}))`,
            go: `package main

import "fmt"

// Closest Value in a Modified BST with Duplicates
// Difficulty: Medium
// Parent: 01-find-closest-value
//
// The BST may contain duplicate values (duplicates go to the right subtree). Find the closest value, and if there are ties, return the smallest one.

func ClosestValueInAModifiedBstWithDuplicates(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Duplicates break the assumption of unique closest value
    return nil
}

func main() {
    // Example: Tree: [10,5,15,5,7,10,20], target=10 -> Return 10 (exact match exists, but you must find it among duplicates)
    fmt.Println(ClosestValueInAModifiedBstWithDuplicates(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/twist-03-closest-value-in-a-modified-bst-with-duplicates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/twist-03-closest-value-in-a-modified-bst-with-duplicates'] = problem;
})();
