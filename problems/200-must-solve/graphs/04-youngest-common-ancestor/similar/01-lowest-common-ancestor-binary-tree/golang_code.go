/*
Lowest Common Ancestor of a Binary Tree - Go Solutions

Find the lowest common ancestor of two nodes in a binary tree.
LCA is the deepest node that has both p and q as descendants.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// TreeNode represents a binary tree node
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Recursive DFS
// ============================================================================
// Time Complexity:  O(n) - visit each node once
// Space Complexity: O(h) - recursion stack, h is tree height
//
// WHY THIS IS BEST:
// - Elegant single-pass solution
// - Returns as soon as LCA is found
// - Easy to understand and implement
// ============================================================================

// LowestCommonAncestorRecursive finds LCA using recursive DFS.
//
// Key insight: The LCA is the node where:
// 1. p and q are in different subtrees, OR
// 2. The node itself is p or q and the other is in a subtree
func LowestCommonAncestorRecursive(root, p, q *TreeNode) *TreeNode {
	if root == nil || root == p || root == q {
		return root
	}

	// Search both subtrees
	left := LowestCommonAncestorRecursive(root.Left, p, q)
	right := LowestCommonAncestorRecursive(root.Right, p, q)

	// If both subtrees return non-null, this node is LCA
	if left != nil && right != nil {
		return root
	}

	// Return whichever is non-null
	if left != nil {
		return left
	}
	return right
}

// ============================================================================
// APPROACH 2: Iterative with Parent Pointers
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n) for parent map
//
// WHEN TO USE:
// - Need to handle multiple LCA queries
// - Prefer iterative over recursive
// ============================================================================

// LowestCommonAncestorParent finds LCA using parent pointers.
func LowestCommonAncestorParent(root, p, q *TreeNode) *TreeNode {
	if root == nil {
		return nil
	}

	// Build parent pointers using stack (DFS)
	parent := make(map[*TreeNode]*TreeNode)
	parent[root] = nil
	stack := []*TreeNode{root}

	// Find both p and q
	for _, existsP := parent[p]; !existsP; _, existsP = parent[p] {
		if _, existsQ := parent[q]; existsQ {
			if existsP {
				break
			}
		}
		if len(stack) == 0 {
			break
		}
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node.Left != nil {
			parent[node.Left] = node
			stack = append(stack, node.Left)
		}
		if node.Right != nil {
			parent[node.Right] = node
			stack = append(stack, node.Right)
		}
	}

	// Build ancestor set for p
	ancestors := make(map[*TreeNode]bool)
	for p != nil {
		ancestors[p] = true
		p = parent[p]
	}

	// Walk up from q until hitting p's ancestor
	for !ancestors[q] {
		q = parent[q]
	}

	return q
}

// ============================================================================
// APPROACH 3: Path Comparison
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(h) for paths
//
// MORE INTUITIVE:
// - Find path from root to each node
// - Compare paths to find divergence point
// ============================================================================

// LowestCommonAncestorPath finds LCA by comparing paths.
func LowestCommonAncestorPath(root, p, q *TreeNode) *TreeNode {
	var findPath func(node, target *TreeNode, path []*TreeNode) []*TreeNode
	findPath = func(node, target *TreeNode, path []*TreeNode) []*TreeNode {
		if node == nil {
			return nil
		}

		path = append(path, node)

		if node == target {
			return path
		}

		// Try left subtree
		if result := findPath(node.Left, target, path); result != nil {
			return result
		}

		// Try right subtree
		return findPath(node.Right, target, path)
	}

	pathP := findPath(root, p, []*TreeNode{})
	pathQ := findPath(root, q, []*TreeNode{})

	// Find last common node in paths
	var lca *TreeNode
	for i := 0; i < len(pathP) && i < len(pathQ); i++ {
		if pathP[i] == pathQ[i] {
			lca = pathP[i]
		} else {
			break
		}
	}

	return lca
}

// ============================================================================
// HELPER: Build tree from slice
// ============================================================================

func buildTree(values []*int) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: *values[0]}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: *values[i]}
			queue = append(queue, node.Left)
		}
		i++

		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: *values[i]}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

func findNode(root *TreeNode, val int) *TreeNode {
	if root == nil {
		return nil
	}
	if root.Val == val {
		return root
	}
	if left := findNode(root.Left, val); left != nil {
		return left
	}
	return findNode(root.Right, val)
}

func intPtr(v int) *int {
	return &v
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		treeVals    []*int
		pVal, qVal  int
		expectedVal int
		desc        string
	}{
		{
			[]*int{intPtr(3), intPtr(5), intPtr(1), intPtr(6), intPtr(2), intPtr(0), intPtr(8), nil, nil, intPtr(7), intPtr(4)},
			5, 1, 3, "Different subtrees",
		},
		{
			[]*int{intPtr(3), intPtr(5), intPtr(1), intPtr(6), intPtr(2), intPtr(0), intPtr(8), nil, nil, intPtr(7), intPtr(4)},
			5, 4, 5, "One is ancestor",
		},
		{
			[]*int{intPtr(1), intPtr(2)},
			1, 2, 1, "Root is ancestor",
		},
		{
			[]*int{intPtr(1), intPtr(2), intPtr(3)},
			2, 3, 1, "Siblings",
		},
		{
			[]*int{intPtr(1), intPtr(2), intPtr(3), intPtr(4), intPtr(5)},
			4, 5, 2, "Children of same parent",
		},
	}

	fmt.Println("======================================================================")
	fmt.Println("LOWEST COMMON ANCESTOR - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test Recursive approach
	fmt.Println("\nApproach 1: Recursive DFS")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		root := buildTree(tc.treeVals)
		p := findNode(root, tc.pVal)
		q := findNode(root, tc.qVal)
		result := LowestCommonAncestorRecursive(root, p, q)
		resultVal := -1
		if result != nil {
			resultVal = result.Val
		}
		status := "PASS"
		if resultVal != tc.expectedVal {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, resultVal, tc.expectedVal)
	}

	// Test Parent Pointers approach
	fmt.Println("\nApproach 2: Parent Pointers")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		root := buildTree(tc.treeVals)
		p := findNode(root, tc.pVal)
		q := findNode(root, tc.qVal)
		result := LowestCommonAncestorParent(root, p, q)
		resultVal := -1
		if result != nil {
			resultVal = result.Val
		}
		status := "PASS"
		if resultVal != tc.expectedVal {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, resultVal, tc.expectedVal)
	}

	// Test Path approach
	fmt.Println("\nApproach 3: Path Comparison")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		root := buildTree(tc.treeVals)
		p := findNode(root, tc.pVal)
		q := findNode(root, tc.qVal)
		result := LowestCommonAncestorPath(root, p, q)
		resultVal := -1
		if result != nil {
			resultVal = result.Val
		}
		status := "PASS"
		if resultVal != tc.expectedVal {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, resultVal, tc.expectedVal)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	// Example 1
	fmt.Println("\nExample 1:")
	tree := buildTree([]*int{intPtr(3), intPtr(5), intPtr(1), intPtr(6), intPtr(2), intPtr(0), intPtr(8), nil, nil, intPtr(7), intPtr(4)})
	p := findNode(tree, 5)
	q := findNode(tree, 1)
	fmt.Println("  Tree: [3,5,1,6,2,0,8,null,null,7,4]")
	fmt.Println("  p = 5, q = 1")
	result := LowestCommonAncestorRecursive(tree, p, q)
	fmt.Printf("  Output: %d\n", result.Val)
	fmt.Println("  Explanation: LCA of 5 and 1 is 3")

	// Example 2
	fmt.Println("\nExample 2:")
	p = findNode(tree, 5)
	q = findNode(tree, 4)
	fmt.Println("  Tree: [3,5,1,6,2,0,8,null,null,7,4]")
	fmt.Println("  p = 5, q = 4")
	result = LowestCommonAncestorRecursive(tree, p, q)
	fmt.Printf("  Output: %d\n", result.Val)
	fmt.Println("  Explanation: 5 is ancestor of 4, so LCA is 5")

	fmt.Println("\nAll tests completed!")
}
