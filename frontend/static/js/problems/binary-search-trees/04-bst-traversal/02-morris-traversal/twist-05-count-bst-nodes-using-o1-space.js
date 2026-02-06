/**
 * Count BST Nodes Using O(1) Space
 * Category: binary-search-trees
 * Difficulty: Medium
 * Parent: 04-bst-traversal/02-morris-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count BST Nodes Using O(1) Space',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal/02-morris-traversal',
        description: 'Count the total number of nodes in a BST using Morris traversal, achieving O(1) space. Also compute the sum and average of all node values in the same pass.',
        problem: 'While the traversal mechanism is the same, aggregating statistics requires careful counting. The key challenge is that Morris visits some nodes twice (once when creating the thread, once when removing it), so you must only count on the correct visit. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: count bst nodes using o(1) space.",
                  "Consider how while the traversal mechanism is the same, aggregating statistics requires careful counting affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(1)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Tree: [10,5,15,2,7]. Morris traversal visits 5 twice (thread creation and removal). Count on thread-removal visit only. Result: count=5, sum=39, avg=7.8.'
            }
        ],
        solutions: {
            python: `# Count BST Nodes Using O(1) Space
# Difficulty: Medium
# Parent: 04-bst-traversal/02-morris-traversal
#
# Count the total number of nodes in a BST using Morris traversal, achieving O(1) space. Also compute the sum and average of all node values in the same pass.

def countBstNodesUsingO1Space(data):
    """
    Count BST Nodes Using O(1) Space

    Approach: While the traversal mechanism is the same, aggregating statistics requires careful counting.
    """
    # TODO: Implement solution
    # Key insight: While the traversal mechanism is the same, aggregating statistics requires careful counting
    pass


# Test
if __name__ == "__main__":
    # Example: Tree: [10,5,15,2,7]
    print(countBstNodesUsingO1Space({}))`,
            go: `package main

import "fmt"

// Count BST Nodes Using O(1) Space
// Difficulty: Medium
// Parent: 04-bst-traversal/02-morris-traversal
//
// Count the total number of nodes in a BST using Morris traversal, achieving O(1) space. Also compute the sum and average of all node values in the same pass.

func CountBstNodesUsingO1Space(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: While the traversal mechanism is the same, aggregating statistics requires careful counting
    return nil
}

func main() {
    // Example: Tree: [10,5,15,2,7]
    fmt.Println(CountBstNodesUsingO1Space(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal/twist-05-count-bst-nodes-using-o1-space', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal/twist-05-count-bst-nodes-using-o1-space'] = problem;
})();
