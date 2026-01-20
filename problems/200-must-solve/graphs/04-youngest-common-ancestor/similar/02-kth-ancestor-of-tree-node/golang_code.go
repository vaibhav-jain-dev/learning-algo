/*
Kth Ancestor of a Tree Node - Go Solutions

Find the kth ancestor of a node efficiently using Binary Lifting.
Precompute 2^j-th ancestors for efficient query answering.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
)

// ============================================================================
// APPROACH 1: Binary Lifting (Optimal)
// ============================================================================
// Time Complexity:  O(n log n) preprocessing, O(log k) per query
// Space Complexity: O(n log n) for ancestor table
//
// WHY THIS IS BEST:
// - Handles large k efficiently
// - Uses binary decomposition of k
// - Precomputation amortizes over many queries
// ============================================================================

// TreeAncestor implements binary lifting for kth ancestor queries.
type TreeAncestor struct {
	log      int
	ancestor [][]int // ancestor[node][j] = 2^j-th ancestor
}

// NewTreeAncestor initializes the binary lifting table.
func NewTreeAncestor(n int, parent []int) *TreeAncestor {
	// Number of bits needed
	log := int(math.Ceil(math.Log2(float64(n + 1))))
	if log < 1 {
		log = 1
	}

	// Initialize ancestor table
	ancestor := make([][]int, n)
	for i := range ancestor {
		ancestor[i] = make([]int, log)
		for j := range ancestor[i] {
			ancestor[i][j] = -1
		}
	}

	// Base case: 2^0 = 1st ancestor = parent
	for node := 0; node < n; node++ {
		ancestor[node][0] = parent[node]
	}

	// Fill table: ancestor[node][j] = ancestor[ancestor[node][j-1]][j-1]
	for j := 1; j < log; j++ {
		for node := 0; node < n; node++ {
			prevAncestor := ancestor[node][j-1]
			if prevAncestor != -1 {
				ancestor[node][j] = ancestor[prevAncestor][j-1]
			}
		}
	}

	return &TreeAncestor{log: log, ancestor: ancestor}
}

// GetKthAncestor finds the kth ancestor by binary decomposition.
func (ta *TreeAncestor) GetKthAncestor(node, k int) int {
	for j := 0; j < ta.log; j++ {
		if k&(1<<j) != 0 { // If j-th bit is set
			node = ta.ancestor[node][j]
			if node == -1 {
				return -1
			}
		}
	}
	return node
}

// ============================================================================
// APPROACH 2: Naive Parent Walking (Simple but Slow)
// ============================================================================
// Time Complexity:  O(k) per query
// Space Complexity: O(n) for parent array
//
// EDUCATIONAL VALUE:
// - Shows basic approach
// - Good for understanding problem
// ============================================================================

// TreeAncestorNaive implements simple parent walking.
type TreeAncestorNaive struct {
	parent []int
}

// NewTreeAncestorNaive creates naive ancestor finder.
func NewTreeAncestorNaive(n int, parent []int) *TreeAncestorNaive {
	return &TreeAncestorNaive{parent: parent}
}

// GetKthAncestor walks up k times.
func (ta *TreeAncestorNaive) GetKthAncestor(node, k int) int {
	current := node
	for i := 0; i < k; i++ {
		if current == -1 {
			return -1
		}
		current = ta.parent[current]
	}
	return current
}

// ============================================================================
// APPROACH 3: Binary Lifting with Map (Memory Efficient for Sparse)
// ============================================================================
// Time Complexity:  O(n log n) preprocessing, O(log k) per query
// Space Complexity: O(n log n) but sparse
//
// VARIANT:
// - Uses map for sparse trees
// - Better when many nodes don't have deep ancestors
// ============================================================================

// TreeAncestorSparse uses map for sparse storage.
type TreeAncestorSparse struct {
	log      int
	ancestor map[int]map[int]int // ancestor[node][j] = 2^j-th ancestor
}

// NewTreeAncestorSparse creates sparse ancestor finder.
func NewTreeAncestorSparse(n int, parent []int) *TreeAncestorSparse {
	log := 1
	for (1 << log) < n {
		log++
	}

	ancestor := make(map[int]map[int]int)

	// Initialize
	for node := 0; node < n; node++ {
		ancestor[node] = make(map[int]int)
		if parent[node] != -1 {
			ancestor[node][0] = parent[node]
		}
	}

	// Build table
	for j := 1; j < log; j++ {
		for node := 0; node < n; node++ {
			if prev, ok := ancestor[node][j-1]; ok {
				if next, ok := ancestor[prev][j-1]; ok {
					ancestor[node][j] = next
				}
			}
		}
	}

	return &TreeAncestorSparse{log: log, ancestor: ancestor}
}

// GetKthAncestor finds kth ancestor using sparse table.
func (ta *TreeAncestorSparse) GetKthAncestor(node, k int) int {
	for j := 0; j < ta.log; j++ {
		if k&(1<<j) != 0 {
			if anc, ok := ta.ancestor[node][j]; ok {
				node = anc
			} else {
				return -1
			}
		}
	}
	return node
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("KTH ANCESTOR OF TREE NODE - TEST RESULTS")
	fmt.Println("======================================================================")

	// Test case: Tree from example
	//       0
	//      / \
	//     1   2
	//    / \ / \
	//   3  4 5  6
	n := 7
	parent := []int{-1, 0, 0, 1, 1, 2, 2}

	testQueries := []struct {
		node, k, expected int
		desc              string
	}{
		{3, 1, 1, "1st ancestor of 3"},
		{5, 2, 0, "2nd ancestor of 5 (grandparent)"},
		{6, 3, -1, "3rd ancestor of 6 (doesn't exist)"},
		{3, 2, 0, "2nd ancestor of 3"},
		{4, 1, 1, "1st ancestor of 4"},
		{0, 1, -1, "1st ancestor of root"},
	}

	// Test Binary Lifting
	fmt.Println("\nApproach 1: Binary Lifting")
	fmt.Println("--------------------------------------------------")
	ta := NewTreeAncestor(n, parent)
	allPassed := true
	for _, tc := range testQueries {
		result := ta.GetKthAncestor(tc.node, tc.k)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}
	if allPassed {
		fmt.Println("  All tests passed!")
	}

	// Test Naive
	fmt.Println("\nApproach 2: Naive Walking")
	fmt.Println("--------------------------------------------------")
	taNaive := NewTreeAncestorNaive(n, parent)
	allPassed = true
	for _, tc := range testQueries {
		result := taNaive.GetKthAncestor(tc.node, tc.k)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}
	if allPassed {
		fmt.Println("  All tests passed!")
	}

	// Test Sparse
	fmt.Println("\nApproach 3: Sparse Storage")
	fmt.Println("--------------------------------------------------")
	taSparse := NewTreeAncestorSparse(n, parent)
	allPassed = true
	for _, tc := range testQueries {
		result := taSparse.GetKthAncestor(tc.node, tc.k)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
			allPassed = false
		}
		fmt.Printf("  [%s] %s: got %d, expected %d\n", status, tc.desc, result, tc.expected)
	}
	if allPassed {
		fmt.Println("  All tests passed!")
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE INPUT EXAMPLES")
	fmt.Println("======================================================================")

	fmt.Println("\nExample:")
	fmt.Println("  Tree: parent = [-1, 0, 0, 1, 1, 2, 2]")
	fmt.Println("  Structure:")
	fmt.Println("        0")
	fmt.Println("       / \\")
	fmt.Println("      1   2")
	fmt.Println("     / \\ / \\")
	fmt.Println("    3  4 5  6")

	ancestor := NewTreeAncestor(7, []int{-1, 0, 0, 1, 1, 2, 2})

	fmt.Printf("\n  getKthAncestor(3, 1) = %d\n", ancestor.GetKthAncestor(3, 1))
	fmt.Println("    (parent of 3 is 1)")

	fmt.Printf("\n  getKthAncestor(5, 2) = %d\n", ancestor.GetKthAncestor(5, 2))
	fmt.Println("    (grandparent of 5 is 0)")

	fmt.Printf("\n  getKthAncestor(6, 3) = %d\n", ancestor.GetKthAncestor(6, 3))
	fmt.Println("    (6 only has 2 ancestors, so -1)")

	fmt.Println("\nAll examples completed!")
}
