/**
 * Kth Ancestor of a Tree Node
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-ancestor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Ancestor of a Tree Node',
        difficulty: 'Hard',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor',
        description: 'You are given a tree with n nodes numbered from 0 to n - 1 in the form of a parent array parent where parent[i] is the parent of ith node. The root of the tree is node 0. Find the kth ancestor of a given node. The kth ancestor of a tree node is the kth node in the path from that node to the root node. Implement the TreeAncestor class: - TreeAncestor(int n, int[] parent) Initializes the object with the number of nodes in the tree and the parent array. - int getKthAncestor(int node, int k) Return ',
        problem: 'Use flood fill (DFS/BFS) to explore connected components. Start from each unvisited cell, mark visited cells, and track the property you need (size, count, etc.). The key insight is that connected cells form a single component.',
        complexity: {
            time: 'O(N log N) preprocessing, O(log K) query',
            space: 'O(N log N)'
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
        "n": 7,
        "parent": [
                -1,
                0,
                0,
                1,
                1,
                2,
                2
        ],
        "queries": [
                [
                        3,
                        1
                ],
                [
                        5,
                        2
                ],
                [
                        6,
                        3
                ]
        ]
},
        output: [1, 0, -1],
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=7, parent=[-1, 0, ..., 2] (length 7), queries=[[3, 1], [5, 2], [6, 3]], the result is [1, 0, -1].'
    }
        ],
        solutions: {
            python: `class TreeAncestor:
    """
    Kth Ancestor of a Tree Node using Binary Lifting

    Time: O(N log N) preprocessing, O(log K) per query
    Space: O(N log N) for the jump table

    Approach: Binary Lifting
    - Precompute 2^j-th ancestor for each node
    - To find k-th ancestor, decompose k into binary
    - Jump using precomputed ancestors
    """

    def __init__(self, n, parent):
        # Maximum power of 2 needed (log2(n) + 1)
        self.LOG = 20  # Handles up to 2^20 nodes

        # jump[i][j] = 2^j-th ancestor of node i
        self.jump = [[-1] * self.LOG for _ in range(n)]

        # Base case: 2^0 = 1st ancestor is direct parent
        for i in range(n):
            self.jump[i][0] = parent[i]

        # Build sparse table using DP
        # 2^j-th ancestor = 2^(j-1)-th ancestor of 2^(j-1)-th ancestor
        for j in range(1, self.LOG):
            for i in range(n):
                if self.jump[i][j-1] != -1:
                    self.jump[i][j] = self.jump[self.jump[i][j-1]][j-1]

    def getKthAncestor(self, node, k):
        # Jump through binary representation of k
        for j in range(self.LOG):
            if k & (1 << j):  # If j-th bit is set
                node = self.jump[node][j]
                if node == -1:
                    return -1
        return node


def kthAncestorOfATreeNode(data):
    """
    Process queries for k-th ancestor
    """
    n = data.get('n')
    parent = data.get('parent', [])
    queries = data.get('queries', [])

    tree = TreeAncestor(n, parent)
    results = []

    for node, k in queries:
        results.append(tree.getKthAncestor(node, k))

    return results


# Test
if __name__ == "__main__":
    data = {
        "n": 7,
        "parent": [-1, 0, 0, 1, 1, 2, 2],
        "queries": [[3, 1], [5, 2], [6, 3]]
    }
    print(kthAncestorOfATreeNode(data))  # Expected: [1, 0, -1]`,
            go: `package main

import "fmt"

// TreeAncestor supports efficient k-th ancestor queries using binary lifting
type TreeAncestor struct {
    LOG  int
    jump [][]int
}

// NewTreeAncestor initializes the data structure
// Time: O(N log N), Space: O(N log N)
func NewTreeAncestor(n int, parent []int) *TreeAncestor {
    LOG := 20 // Handles up to 2^20 nodes

    // Initialize jump table with -1
    jump := make([][]int, n)
    for i := range jump {
        jump[i] = make([]int, LOG)
        for j := range jump[i] {
            jump[i][j] = -1
        }
    }

    // Base case: 2^0 = 1st ancestor is direct parent
    for i := 0; i < n; i++ {
        jump[i][0] = parent[i]
    }

    // Build sparse table using DP
    for j := 1; j < LOG; j++ {
        for i := 0; i < n; i++ {
            if jump[i][j-1] != -1 {
                jump[i][j] = jump[jump[i][j-1]][j-1]
            }
        }
    }

    return &TreeAncestor{LOG: LOG, jump: jump}
}

// GetKthAncestor returns k-th ancestor of node, or -1 if not exists
// Time: O(log K)
func (t *TreeAncestor) GetKthAncestor(node, k int) int {
    for j := 0; j < t.LOG; j++ {
        if k&(1<<j) != 0 { // If j-th bit is set
            node = t.jump[node][j]
            if node == -1 {
                return -1
            }
        }
    }
    return node
}

// KthAncestorOfATreeNode processes multiple queries
func KthAncestorOfATreeNode(n int, parent []int, queries [][]int) []int {
    tree := NewTreeAncestor(n, parent)
    results := make([]int, len(queries))

    for i, q := range queries {
        results[i] = tree.GetKthAncestor(q[0], q[1])
    }

    return results
}

func main() {
    n := 7
    parent := []int{-1, 0, 0, 1, 1, 2, 2}
    queries := [][]int{{3, 1}, {5, 2}, {6, 3}}

    result := KthAncestorOfATreeNode(n, parent, queries)
    fmt.Println(result) // Expected: [1, 0, -1]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/02-kth-ancestor-of-tree-node'] = problem;

})();
