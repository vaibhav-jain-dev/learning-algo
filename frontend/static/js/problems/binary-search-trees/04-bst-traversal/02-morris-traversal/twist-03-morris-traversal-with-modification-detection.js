/**
 * Morris Traversal with Modification Detection
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Morris Traversal with Modification Detection',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'Another thread is concurrently reading the tree. Implement Morris traversal that detects if the tree was modified by another reader during traversal (since Morris temporarily modifies the tree).',
        problem: 'Morris traversal creates temporary modifications that could confuse concurrent readers. You need a mechanism to detect conflicts -- perhaps using version numbers or checksums -- and either retry or abort gracefully. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: morris traversal with modification detection.",
                  "Consider how morris traversal creates temporary modifications that could confuse concurrent readers affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Thread A does Morris traversal. Thread B reads node.right and sees a thread pointer instead of null. Detection mechanism should flag this conflict.'
            }
        ],
        solutions: {
            python: `# Morris Traversal with Modification Detection
# Difficulty: Hard
# Parent: 04-bst-traversal/02-morris-traversal
#
# Another thread is concurrently reading the tree. Implement Morris traversal that detects if the tree was modified by another reader during traversal (since Morris temporarily modifies the tree).

def morrisTraversalWithModificationDetection(data):
    """
    Morris Traversal with Modification Detection

    Approach: Morris traversal creates temporary modifications that could confuse concurrent readers.
    """
    # TODO: Implement solution
    # Key insight: Morris traversal creates temporary modifications that could confuse concurrent readers
    pass


# Test
if __name__ == "__main__":
    # Example: Thread A does Morris traversal
    print(morrisTraversalWithModificationDetection({}))`,
            go: `package main

import "fmt"

// Morris Traversal with Modification Detection
// Difficulty: Hard
// Parent: 04-bst-traversal/02-morris-traversal
//
// Another thread is concurrently reading the tree. Implement Morris traversal that detects if the tree was modified by another reader during traversal (since Morris temporarily modifies the tree).

func MorrisTraversalWithModificationDetection(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Morris traversal creates temporary modifications that could confuse concurrent readers
    return nil
}

func main() {
    // Example: Thread A does Morris traversal
    fmt.Println(MorrisTraversalWithModificationDetection(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-03-morris-traversal-with-modification-detection', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-03-morris-traversal-with-modification-detection'] = problem;
})();
