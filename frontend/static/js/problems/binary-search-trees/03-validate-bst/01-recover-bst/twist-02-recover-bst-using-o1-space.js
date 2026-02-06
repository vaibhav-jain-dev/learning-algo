/**
 * Recover BST Using O(1) Space
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst/01-recover-bst
 */
(function() {
    'use strict';
    const problem = {
        name: 'Recover BST Using O(1) Space',
        difficulty: 'Hard',
        algorithm: 'bst-repair',
        parent: '03-validate-bst/01-recover-bst',
        description: 'Recover the BST using Morris traversal to achieve O(1) auxiliary space instead of O(h) recursion stack.',
        problem: 'Morris traversal modifies tree pointers temporarily, so you must track the two swapped nodes while simultaneously managing thread creation and cleanup. The interleaving of recovery logic with pointer manipulation is tricky. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: recover bst using o(1) space.",
                  "Consider how morris traversal modifies tree pointers temporarily, so you must track the two swapped nodes while simultaneously managing thread creation and cleanup affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Same output as base problem, but implemented with Morris inorder traversal using no extra stack or recursion.'
            }
        ],
        solutions: {
            python: `# Recover BST Using O(1) Space
# Difficulty: Hard
# Parent: 03-validate-bst/01-recover-bst
#
# Recover the BST using Morris traversal to achieve O(1) auxiliary space instead of O(h) recursion stack.

def recoverBstUsingO1Space(data):
    """
    Recover BST Using O(1) Space

    Approach: Morris traversal modifies tree pointers temporarily, so you must track the two swapped nodes while simultaneously managing thread creation and cleanup.
    """
    # TODO: Implement solution
    # Key insight: Morris traversal modifies tree pointers temporarily, so you must track the two swapped nodes while simultaneously managing thread creation and cleanup
    pass


# Test
if __name__ == "__main__":
    # Example: Same output as base problem, but implemented with Morris inorder traversal using no extra stack or recursion
    print(recoverBstUsingO1Space({}))`,
            go: `package main

import "fmt"

// Recover BST Using O(1) Space
// Difficulty: Hard
// Parent: 03-validate-bst/01-recover-bst
//
// Recover the BST using Morris traversal to achieve O(1) auxiliary space instead of O(h) recursion stack.

func RecoverBstUsingO1Space(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Morris traversal modifies tree pointers temporarily, so you must track the two swapped nodes while simultaneously managing thread creation and cleanup
    return nil
}

func main() {
    // Example: Same output as base problem, but implemented with Morris inorder traversal using no extra stack or recursion
    fmt.Println(RecoverBstUsingO1Space(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst/twist-02-recover-bst-using-o1-space', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst/twist-02-recover-bst-using-o1-space'] = problem;
})();
