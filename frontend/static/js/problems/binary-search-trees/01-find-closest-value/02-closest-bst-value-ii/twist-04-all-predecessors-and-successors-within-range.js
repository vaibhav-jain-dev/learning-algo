/**
 * All Predecessors and Successors Within Range
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 01-find-closest-value/02-closest-bst-value-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Predecessors and Successors Within Range',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value/02-closest-bst-value-ii',
        description: 'Find all inorder predecessors within distance D below the target and all successors within distance D above the target.',
        problem: 'Instead of finding exactly one predecessor and one successor, you must collect a variable-length set. This requires continuing the search beyond the first match and knowing when to stop. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: all predecessors and successors within range.",
                  "Consider how instead of finding exactly one predecessor and one successor, you must collect a variable-length set affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,7,12,20], target=10, D=5 -> predecessors=[7,5], successors=[12,15]. All values within 5 of target on each side.'
            }
        ],
        solutions: {
            python: `# All Predecessors and Successors Within Range
# Difficulty: Medium
# Parent: 01-find-closest-value/02-closest-bst-value-ii
#
# Find all inorder predecessors within distance D below the target and all successors within distance D above the target.

def allPredecessorsAndSuccessorsWithinRange(data):
    """
    All Predecessors and Successors Within Range

    Approach: Instead of finding exactly one predecessor and one successor, you must collect a variable-length set.
    """
    # TODO: Implement solution
    # Key insight: Instead of finding exactly one predecessor and one successor, you must collect a variable-length set
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,7,12,20], target=10, D=5 -> predecessors=[7,5], successors=[12,15]
    print(allPredecessorsAndSuccessorsWithinRange({}))`,
            go: `package main

import "fmt"

// All Predecessors and Successors Within Range
// Difficulty: Medium
// Parent: 01-find-closest-value/02-closest-bst-value-ii
//
// Find all inorder predecessors within distance D below the target and all successors within distance D above the target.

func AllPredecessorsAndSuccessorsWithinRange(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of finding exactly one predecessor and one successor, you must collect a variable-length set
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,7,12,20], target=10, D=5 -> predecessors=[7,5], successors=[12,15]
    fmt.Println(AllPredecessorsAndSuccessorsWithinRange(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii/twist-04-all-predecessors-and-successors-within-range', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii/twist-04-all-predecessors-and-successors-within-range'] = problem;
})();
