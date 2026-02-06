/**
 * All Valid Three-Node Triples
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Parent: 12-validate-three-nodes
 */
(function() {
    'use strict';
    const problem = {
        name: 'All Valid Three-Node Triples',
        difficulty: 'Very Hard',
        algorithm: 'bst-validation-nodes',
        parent: '12-validate-three-nodes',
        description: 'Count all triples (a, b, c) of distinct nodes in the BST such that a is an ancestor of b and b is an ancestor of c.',
        problem: 'Instead of validating one triple, you count all valid ones. For each node b, you need the count of its ancestors and the count of its descendants. The total is the sum of ancestors(b) * descendants(b) for all b. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: all valid three-node triples.",
                  "Consider how instead of validating one triple, you count all valid ones affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(n)","space":"O(n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'BST [5, 2, 7, 1, 4]. Node 2 has 1 ancestor (5) and 2 descendants (1, 4), contributing 1*2=2 triples. Total across all nodes gives the answer.'
            }
        ],
        solutions: {
            python: `# All Valid Three-Node Triples
# Difficulty: Very Hard
# Parent: 12-validate-three-nodes
#
# Count all triples (a, b, c) of distinct nodes in the BST such that a is an ancestor of b and b is an ancestor of c.

def allValidThreeNodeTriples(data):
    """
    All Valid Three-Node Triples

    Approach: Instead of validating one triple, you count all valid ones.
    """
    # TODO: Implement solution
    # Key insight: Instead of validating one triple, you count all valid ones
    pass


# Test
if __name__ == "__main__":
    # Example: BST [5, 2, 7, 1, 4]
    print(allValidThreeNodeTriples({}))`,
            go: `package main

import "fmt"

// All Valid Three-Node Triples
// Difficulty: Very Hard
// Parent: 12-validate-three-nodes
//
// Count all triples (a, b, c) of distinct nodes in the BST such that a is an ancestor of b and b is an ancestor of c.

func AllValidThreeNodeTriples(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: Instead of validating one triple, you count all valid ones
    return nil
}

func main() {
    // Example: BST [5, 2, 7, 1, 4]
    fmt.Println(AllValidThreeNodeTriples(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '12-validate-three-nodes/twist-05-all-valid-three-node-triples', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/12-validate-three-nodes/twist-05-all-valid-three-node-triples'] = problem;
})();
