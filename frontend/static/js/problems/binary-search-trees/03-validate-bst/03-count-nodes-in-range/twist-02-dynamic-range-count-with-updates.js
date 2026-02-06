/**
 * Dynamic Range Count with Updates
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';
    const problem = {
        name: 'Dynamic Range Count with Updates',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Support both range count queries and insert/delete operations. After each modification, range count queries must reflect the current tree state.',
        problem: 'Static range counting is a one-shot traversal. Dynamic updates require maintaining auxiliary information (subtree sizes) through insertions and deletions, adding complexity to every mutation operation. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: dynamic range count with updates.",
                  "Consider how static range counting is a one-shot traversal affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Initial tree: [10,5,15]. countInRange(5,15)=3. Insert 12. countInRange(5,15)=4. Delete 5. countInRange(5,15)=3.'
            }
        ],
        solutions: {
            python: `# Dynamic Range Count with Updates
# Difficulty: Hard
# Parent: 03-validate-bst/03-count-nodes-in-range
#
# Support both range count queries and insert/delete operations. After each modification, range count queries must reflect the current tree state.

def dynamicRangeCountWithUpdates(data):
    """
    Dynamic Range Count with Updates

    Approach: Static range counting is a one-shot traversal.
    """
    # TODO: Implement solution
    # Key insight: Static range counting is a one-shot traversal
    pass


# Test
if __name__ == "__main__":
    # Example: Initial tree: [10,5,15]
    print(dynamicRangeCountWithUpdates({}))`,
            go: `package main

import "fmt"

// Dynamic Range Count with Updates
// Difficulty: Hard
// Parent: 03-validate-bst/03-count-nodes-in-range
//
// Support both range count queries and insert/delete operations. After each modification, range count queries must reflect the current tree state.

func DynamicRangeCountWithUpdates(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Static range counting is a one-shot traversal
    return nil
}

func main() {
    // Example: Initial tree: [10,5,15]
    fmt.Println(DynamicRangeCountWithUpdates(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-02-dynamic-range-count-with-updates', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-02-dynamic-range-count-with-updates'] = problem;
})();
