/**
 * Lowest Common Ancestor of a Binary Tree
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lowest Common Ancestor of a Binary Tree',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree. According to the definition of LCA: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."',
        problem: 'Use recursion to solve the problem for each subtree, then combine results at each node. The base case handles null nodes. Each node is visited once, giving O(N) time with O(H) space for the recursion stack.',
        complexity: {
            time: 'O(N)',
            space: 'O(H)'
        },
        hints: [
            'Think about how to traverse all connected cells from a starting point.',
            'Use DFS or BFS to explore all 4-directional neighbors.',
            'Mark cells as visited to avoid counting them twice.',
            'Track the metric you need (area, count) during traversal.',
            'Consider edge cases: empty grid, all water, all land.'
        ],
        examples: [
    {
        input: {
        "root": [
                3,
                5,
                1,
                6,
                2,
                0,
                8,
                null,
                null,
                7,
                4
        ],
        "p": 5,
        "q": 1
},
        output: 3,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "root": [
                3,
                5,
                1,
                6,
                2,
                0,
                8,
                null,
                null,
                7,
                4
        ],
        "p": 5,
        "q": 4
},
        output: 5,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `def lowestCommonAncestor(root, p, q):
    """
    Lowest Common Ancestor of a Binary Tree

    Time: O(N) - visit each node at most once
    Space: O(H) - recursion stack, H is height of tree

    Approach: Recursive DFS
    - If current node is None or equals p or q, return it
    - Recursively search left and right subtrees
    - If both return non-null, current node is LCA
    - Otherwise return whichever subtree found a match
    """
    # Base case: empty tree or found target
    if root is None or root == p or root == q:
        return root

    # Search in left and right subtrees
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)

    # If both subtrees found targets, current is LCA
    if left and right:
        return root

    # Otherwise return whichever found something
    return left if left else right


# For array-based tree representation
def lowestCommonAncestorArray(data):
    """
    LCA for array-represented binary tree
    """
    arr = data.get('root', [])
    p_val = data.get('p')
    q_val = data.get('q')

    if not arr:
        return None

    # Build tree from array (level order)
    class TreeNode:
        def __init__(self, val):
            self.val = val
            self.left = None
            self.right = None

    nodes = [TreeNode(v) if v is not None else None for v in arr]

    for i, node in enumerate(nodes):
        if node:
            left_idx = 2 * i + 1
            right_idx = 2 * i + 2
            if left_idx < len(nodes):
                node.left = nodes[left_idx]
            if right_idx < len(nodes):
                node.right = nodes[right_idx]

    # Find p and q nodes
    p_node = q_node = None
    for node in nodes:
        if node:
            if node.val == p_val:
                p_node = node
            if node.val == q_val:
                q_node = node

    def lca(root, p, q):
        if root is None or root == p or root == q:
            return root
        left = lca(root.left, p, q)
        right = lca(root.right, p, q)
        if left and right:
            return root
        return left if left else right

    result = lca(nodes[0], p_node, q_node)
    return result.val if result else None


# Test
if __name__ == "__main__":
    data = {"root": [3, 5, 1, 6, 2, 0, 8, None, None, 7, 4], "p": 5, "q": 1}
    print(lowestCommonAncestorArray(data))  # Expected: 3`,
            go: `package main

import "fmt"

// TreeNode represents a binary tree node
type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

// LowestCommonAncestor finds LCA of two nodes in a binary tree
// Time: O(N) - visit each node at most once
// Space: O(H) - recursion stack, H is height of tree
func LowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    // Base case: empty tree or found target
    if root == nil || root == p || root == q {
        return root
    }

    // Search in left and right subtrees
    left := LowestCommonAncestor(root.Left, p, q)
    right := LowestCommonAncestor(root.Right, p, q)

    // If both subtrees found targets, current is LCA
    if left != nil && right != nil {
        return root
    }

    // Return whichever found something
    if left != nil {
        return left
    }
    return right
}

// LowestCommonAncestorArray solves LCA for array-based tree
func LowestCommonAncestorArray(arr []interface{}, pVal, qVal int) int {
    if len(arr) == 0 {
        return -1
    }

    // Build tree from array
    nodes := make([]*TreeNode, len(arr))
    for i, v := range arr {
        if v != nil {
            nodes[i] = &TreeNode{Val: v.(int)}
        }
    }

    for i, node := range nodes {
        if node != nil {
            leftIdx := 2*i + 1
            rightIdx := 2*i + 2
            if leftIdx < len(nodes) {
                node.Left = nodes[leftIdx]
            }
            if rightIdx < len(nodes) {
                node.Right = nodes[rightIdx]
            }
        }
    }

    // Find p and q nodes
    var pNode, qNode *TreeNode
    for _, node := range nodes {
        if node != nil {
            if node.Val == pVal {
                pNode = node
            }
            if node.Val == qVal {
                qNode = node
            }
        }
    }

    result := LowestCommonAncestor(nodes[0], pNode, qNode)
    if result != nil {
        return result.Val
    }
    return -1
}

func main() {
    arr := []interface{}{3, 5, 1, 6, 2, 0, 8, nil, nil, 7, 4}
    fmt.Println(LowestCommonAncestorArray(arr, 5, 1)) // Expected: 3
    fmt.Println(LowestCommonAncestorArray(arr, 5, 4)) // Expected: 5
}`
        },
        twists: [
            { id: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-01-lca-with-parent-pointers', name: 'LCA with Parent Pointers', difficulty: 'Easy' },
            { id: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-02-lca-of-k-nodes', name: 'LCA of K Nodes', difficulty: 'Hard' },
            { id: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-03-lca-in-bst', name: 'LCA in BST', difficulty: 'Easy' },
            { id: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-04-lca-queries-offline', name: 'LCA Queries Offline', difficulty: 'Very Hard' },
            { id: '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree/twist-05-lca-when-nodes-may-not-exist', name: 'LCA When Nodes May Not Exist', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/01-lowest-common-ancestor-binary-tree'] = problem;

})();
