/**
 * Verify Recovery is Unique
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst/01-recover-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Verify Recovery is Unique',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        parent: '03-validate-bst/01-recover-bst',
        description: 'After identifying the two swapped nodes, verify that swapping them back is the ONLY way to fix the BST. If multiple valid recoveries exist, return all of them.',
        problem: 'The base problem assumes a unique recovery. This twist requires proving uniqueness or enumerating alternatives, which means checking if different swap pairs could also produce a valid BST from the same broken tree. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: verify recovery is unique.",
                  "Consider how the base problem assumes a unique recovery affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [2,3,1] -> Swap 3 and 1 gives [2,1,3] (valid). Is there another swap that also works? No, this recovery is unique.'
            }
        ],
        solutions: {
            python: `# Verify Recovery is Unique
# Difficulty: Hard
# Parent: 03-validate-bst/01-recover-bst
#
# After identifying the two swapped nodes, verify that swapping them back is the ONLY way to fix the BST. If multiple valid recoveries exist, return all of them.

def verifyRecoveryIsUnique(data):
    """
    Verify Recovery is Unique

    Approach: The base problem assumes a unique recovery.
    """
    # TODO: Implement solution
    # Key insight: The base problem assumes a unique recovery
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [2,3,1] -> Swap 3 and 1 gives [2,1,3] (valid)
    print(verifyRecoveryIsUnique({}))`,
            go: `package main

import "fmt"

// Verify Recovery is Unique
// Difficulty: Hard
// Parent: 03-validate-bst/01-recover-bst
//
// After identifying the two swapped nodes, verify that swapping them back is the ONLY way to fix the BST. If multiple valid recoveries exist, return all of them.

func VerifyRecoveryIsUnique(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The base problem assumes a unique recovery
    return nil
}

func main() {
    // Example: Tree: [2,3,1] -> Swap 3 and 1 gives [2,1,3] (valid)
    fmt.Println(VerifyRecoveryIsUnique(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst/twist-05-verify-recovery-is-unique', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst/twist-05-verify-recovery-is-unique'] = problem;
})();
