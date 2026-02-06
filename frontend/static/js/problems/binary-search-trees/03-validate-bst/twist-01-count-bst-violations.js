/**
 * Count BST Violations
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 03-validate-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count BST Violations',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'Instead of returning true/false, count the number of nodes that violate the BST property. A node violates if it is not greater than all left descendants or not less than/equal to all right descendants.',
        problem: 'You cannot short-circuit on the first violation. Every node must be checked, and you must carefully define what counts as a violation -- is it the parent that is wrong, or the child? Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: count bst violations.",
                  "Consider how you cannot short-circuit on the first violation affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,12,13,22] -> Node 12 in left subtree of 10 violates (12>10). Node 13 in right subtree of 15 violates (13<15 but is left child). Count=2.'
            }
        ],
        solutions: {
            python: `# Count BST Violations
# Difficulty: Medium
# Parent: 03-validate-bst
#
# Instead of returning true/false, count the number of nodes that violate the BST property. A node violates if it is not greater than all left descendants or not less than/equal to all right descendants.

def countBstViolations(data):
    """
    Count BST Violations

    Approach: You cannot short-circuit on the first violation.
    """
    # TODO: Implement solution
    # Key insight: You cannot short-circuit on the first violation
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,12,13,22] -> Node 12 in left subtree of 10 violates (12>10)
    print(countBstViolations({}))`,
            go: `package main

import "fmt"

// Count BST Violations
// Difficulty: Medium
// Parent: 03-validate-bst
//
// Instead of returning true/false, count the number of nodes that violate the BST property. A node violates if it is not greater than all left descendants or not less than/equal to all right descendants.

func CountBstViolations(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You cannot short-circuit on the first violation
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,12,13,22] -> Node 12 in left subtree of 10 violates (12>10)
    fmt.Println(CountBstViolations(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/twist-01-count-bst-violations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/twist-01-count-bst-violations'] = problem;
})();
