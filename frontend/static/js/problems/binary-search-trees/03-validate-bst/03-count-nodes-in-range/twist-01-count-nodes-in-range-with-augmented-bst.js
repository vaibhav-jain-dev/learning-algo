/**
 * Count Nodes in Range with Augmented BST
 * Category: binary-search-trees
 * Difficulty: Hard
 * Parent: 03-validate-bst/03-count-nodes-in-range
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Nodes in Range with Augmented BST',
        difficulty: 'Hard',
        algorithm: 'bst-range',
        parent: '03-validate-bst/03-count-nodes-in-range',
        description: 'Augment the BST so that each node stores the size of its subtree. Use this to answer range count queries in O(log n) time without visiting every node in the range.',
        problem: 'The base approach visits all nodes in range (O(k)). With subtree sizes, you can compute the count using rank queries: count = rank(high) - rank(low-1). This requires order-statistic tree thinking instead of range traversal. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [
                  "Start with the base problem solution and identify what changes: count nodes in range with augmented bst.",
                  "Consider how the base approach visits all nodes in range (o(k)) affects your approach.",
                  "Think about edge cases specific to this variant.",
                  "Verify your solution handles the modified constraints correctly."
        ],
        complexity: {"time":"O(log n)","space":"O(log n)"},
        examples: [
            {
                input: '(see description)',
                output: '(computed result)',
                explanation: 'Augmented Tree: [10(7),5(3),15(3),3(1),7(1),null,18(1)], range [5,15] -> rank(15)=6, rank(4)=2, count=6-2=4.'
            }
        ],
        solutions: {
            python: `# Count Nodes in Range with Augmented BST
# Difficulty: Hard
# Parent: 03-validate-bst/03-count-nodes-in-range
#
# Augment the BST so that each node stores the size of its subtree. Use this to answer range count queries in O(log n) time without visiting every node in the range.

def countNodesInRangeWithAugmentedBst(data):
    """
    Count Nodes in Range with Augmented BST

    Approach: The base approach visits all nodes in range (O(k)).
    """
    # TODO: Implement solution
    # Key insight: The base approach visits all nodes in range (O(k))
    pass


# Test
if __name__ == "__main__":
    # Example: Augmented Tree: [10(7),5(3),15(3),3(1),7(1),null,18(1)], range [5,15] -> rank(15)=6, rank(4)=2, count=6-2=4
    print(countNodesInRangeWithAugmentedBst({}))`,
            go: `package main

import "fmt"

// Count Nodes in Range with Augmented BST
// Difficulty: Hard
// Parent: 03-validate-bst/03-count-nodes-in-range
//
// Augment the BST so that each node stores the size of its subtree. Use this to answer range count queries in O(log n) time without visiting every node in the range.

func CountNodesInRangeWithAugmentedBst(data map[string]interface{}) interface{} {
    // TODO: Implement solution
    // Key insight: The base approach visits all nodes in range (O(k))
    return nil
}

func main() {
    // Example: Augmented Tree: [10(7),5(3),15(3),3(1),7(1),null,18(1)], range [5,15] -> rank(15)=6, rank(4)=2, count=6-2=4
    fmt.Println(CountNodesInRangeWithAugmentedBst(map[string]interface{}{}))
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range/twist-01-count-nodes-in-range-with-augmented-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range/twist-01-count-nodes-in-range-with-augmented-bst'] = problem;
})();
