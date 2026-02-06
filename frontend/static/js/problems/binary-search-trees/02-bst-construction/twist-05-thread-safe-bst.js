/**
 * Thread-Safe BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 02-bst-construction
 */
(function() {
    'use strict';
    const problem = {
        name: 'Thread-Safe BST',
        difficulty: 'Hard',
        algorithm: 'bst-construction',
        parent: '02-bst-construction',
        description: 'Design the BST class to handle concurrent insert, remove, and contains operations. Multiple readers can proceed simultaneously, but writers need exclusive access to affected subtrees.',
        problem: 'Concurrency introduces race conditions. You must think about locking granularity -- locking the whole tree is simple but slow, while fine-grained node-level locking requires careful deadlock avoidance during rotations and removals. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: thread-safe bst.",
                  "Consider how concurrency introduces race conditions affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Thread A inserts 5, Thread B inserts 3 simultaneously. Both must complete correctly without corrupting the tree structure.'
            }
        ],
        solutions: {
            python: `# Thread-Safe BST
# Difficulty: Hard
# Parent: 02-bst-construction
#
# Design the BST class to handle concurrent insert, remove, and contains operations. Multiple readers can proceed simultaneously, but writers need exclusive access to affected subtrees.

def threadSafeBst(data):
    """
    Thread-Safe BST

    Approach: Concurrency introduces race conditions.
    """
    # TODO: Implement solution
    # Key insight: Concurrency introduces race conditions
    pass


# Test
if __name__ == "__main__":
    # Example: Thread A inserts 5, Thread B inserts 3 simultaneously
    print(threadSafeBst({}))`,
            go: `package main

import "fmt"

// Thread-Safe BST
// Difficulty: Hard
// Parent: 02-bst-construction
//
// Design the BST class to handle concurrent insert, remove, and contains operations. Multiple readers can proceed simultaneously, but writers need exclusive access to affected subtrees.

func ThreadSafeBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Concurrency introduces race conditions
    return nil
}

func main() {
    // Example: Thread A inserts 5, Thread B inserts 3 simultaneously
    fmt.Println(ThreadSafeBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/twist-05-thread-safe-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/twist-05-thread-safe-bst'] = problem;
})();
