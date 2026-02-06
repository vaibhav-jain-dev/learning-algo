/**
 * Range Count Excluding Subtree
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';
    const problem = {
        name: 'Range Count Excluding Subtree',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Count nodes in range [low, high] but exclude all nodes in the subtree of a given node X. Essentially count nodes in range that are NOT descendants of X.',
        problem: 'You must compute two things: total range count and range count within X\'s subtree, then subtract. Identifying which nodes are in X\'s subtree while also checking range boundaries requires careful traversal control. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: range count excluding subtree.",
                  "Consider how you must compute two things: total range count and range count within x's subtree, then subtract affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,3,7,12,20], range=[3,15], exclude subtree of node 5. Total in range: 6. In node 5\'s subtree and in range: [3,5,7] = 3. Answer: 6-3=3.'
            }
        ],
        solutions: {
            python: `# Range Count Excluding Subtree
# Difficulty: Hard
# Parent: 03-validate-bst/03-count-nodes-in-range
#
# Count nodes in range [low, high] but exclude all nodes in the subtree of a given node X. Essentially count nodes in range that are NOT descendants of X.

def rangeCountExcludingSubtree(data):
    """
    Range Count Excluding Subtree

    Approach: You must compute two things: total range count and range count within X's subtree, then subtract.
    """
    # TODO: Implement solution
    # Key insight: You must compute two things: total range count and range count within X's subtree, then subtract
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,3,7,12,20], range=[3,15], exclude subtree of node 5
    print(rangeCountExcludingSubtree({}))`,
            go: `package main

import "fmt"

// Range Count Excluding Subtree
// Difficulty: Hard
// Parent: 03-validate-bst/03-count-nodes-in-range
//
// Count nodes in range [low, high] but exclude all nodes in the subtree of a given node X. Essentially count nodes in range that are NOT descendants of X.

func RangeCountExcludingSubtree(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: You must compute two things: total range count and range count within X's subtree, then subtract
    return nil
}

func main() {
    // Example: Tree: [10,5,15,3,7,12,20], range=[3,15], exclude subtree of node 5
    fmt.Println(RangeCountExcludingSubtree(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-05-range-count-excluding-subtree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-05-range-count-excluding-subtree'] = problem;
})();
