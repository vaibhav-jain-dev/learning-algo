/**
 * All Pairs Distance K
 * Category: binary-trees
 * Difficulty: Very Hard
 * Algorithm: tree-distance
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Pairs Distance K',
        difficulty: 'Very Hard',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k. Return the count of such pairs. This generalizes from one target to all possible targets. A naive approach runs BFS from each node (O(n^2)). An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.',
        problem: 'This generalizes from one target to all possible targets. A naive approach runs BFS from each node (O(n^2)). An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.',
        hints: [
            'Consider: Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k.',
            'Return the count of such pairs.',
            'Key insight: This generalizes from one target to all possible targets.',
            'An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":5,"k":2},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":1,"k":1},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}},"target":0,"k":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def all_pairs_distance_k(tree, target, k):
    """
    All Pairs Distance K

    Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k. Return the count of such pairs. This generalizes from one target to all possible targets. A naive approach runs BFS from each node (O(n^2)). An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(all_pairs_distance_k({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 5, 2))  # Expected: 1
print(all_pairs_distance_k({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 1, 1))  # Expected: 2
print(all_pairs_distance_k({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}, 0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// AllPairsDistanceK solves the All Pairs Distance K problem.
// Find all pairs of nodes (a, b) in the tree such that the distance between a and b is exactly k. Return the count of such pairs. This generalizes from one target to all possible targets. A naive approach runs BFS from each node (O(n^2)). An optimized approach uses the Euler tour or centroid decomposition for O(n log n) complexity.
// Time: O(n), Space: O(n)
func AllPairsDistanceK(tree *TreeNode, target int, k int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AllPairsDistanceK({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 5, 2)) // Expected: 1
	fmt.Println(AllPairsDistanceK({"value":1,"left":{"value":2},"right":{"value":3}}, 1, 1)) // Expected: 2
	fmt.Println(AllPairsDistanceK({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}, 0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-05-all-pairs-distance-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-05-all-pairs-distance-k'] = problem;
})();
