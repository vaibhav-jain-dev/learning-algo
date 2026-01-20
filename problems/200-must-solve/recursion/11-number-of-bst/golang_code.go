/*
Number of Binary Search Trees - Go Solution

Count structurally unique BSTs that can store values 1 to n.
*/

package main

import "fmt"

// NumberOfBST counts unique BSTs using dynamic programming.
func NumberOfBST(n int) int {
	// dp[i] = number of unique BSTs with i nodes
	dp := make([]int, n+1)

	// Base cases
	dp[0] = 1 // Empty tree
	if n >= 1 {
		dp[1] = 1 // Single node
	}

	// Fill for each number of nodes
	for nodes := 2; nodes <= n; nodes++ {
		// Try each node as root
		for root := 1; root <= nodes; root++ {
			leftNodes := root - 1
			rightNodes := nodes - root
			dp[nodes] += dp[leftNodes] * dp[rightNodes]
		}
	}

	return dp[n]
}

// NumberOfBSTRecursive uses memoized recursion.
func NumberOfBSTRecursive(n int) int {
	memo := map[int]int{0: 1, 1: 1}

	var countTrees func(numNodes int) int
	countTrees = func(numNodes int) int {
		if val, exists := memo[numNodes]; exists {
			return val
		}

		total := 0
		for root := 1; root <= numNodes; root++ {
			left := countTrees(root - 1)
			right := countTrees(numNodes - root)
			total += left * right
		}

		memo[numNodes] = total
		return total
	}

	return countTrees(n)
}

// NumberOfBSTCatalan calculates using Catalan number formula.
// C(n) = (2n)! / ((n+1)! * n!)
// Using iterative formula: C(n) = C(n-1) * 2(2n-1) / (n+1)
func NumberOfBSTCatalan(n int) int {
	if n <= 1 {
		return 1
	}

	catalan := 1
	for i := 1; i <= n; i++ {
		catalan = catalan * 2 * (2*i - 1) / (i + 1)
	}

	return catalan
}

// NumberOfBSTCatalanBigInt handles larger values using recursion.
// For production, use math/big for very large n.
func NumberOfBSTCatalanBigInt(n int) int64 {
	if n <= 1 {
		return 1
	}

	var catalan int64 = 1
	for i := 1; i <= n; i++ {
		catalan = catalan * int64(2*(2*i-1)) / int64(i+1)
	}

	return catalan
}

// GenerateCatalanSequence generates first 'limit' Catalan numbers.
func GenerateCatalanSequence(limit int) []int {
	sequence := make([]int, limit)
	for i := 0; i < limit; i++ {
		sequence[i] = NumberOfBST(i)
	}
	return sequence
}

func main() {
	// Test case 1
	n1 := 3
	fmt.Printf("n = %d\n", n1)
	fmt.Printf("DP:        %d\n", NumberOfBST(n1))
	fmt.Printf("Recursive: %d\n", NumberOfBSTRecursive(n1))
	fmt.Printf("Catalan:   %d\n", NumberOfBSTCatalan(n1))

	// Test case 2
	n2 := 5
	fmt.Printf("\nn = %d\n", n2)
	fmt.Printf("Result: %d\n", NumberOfBST(n2))

	// Test case 3
	n3 := 10
	fmt.Printf("\nn = %d\n", n3)
	fmt.Printf("Result: %d\n", NumberOfBST(n3))

	// Display Catalan sequence
	fmt.Println("\nCatalan number sequence (number of unique BSTs):")
	sequence := GenerateCatalanSequence(11)
	for i, count := range sequence {
		fmt.Printf("  n=%d: %d unique BSTs\n", i, count)
	}

	// Verify all methods give same result
	fmt.Println("\nVerification (all methods should match):")
	for n := 1; n < 10; n++ {
		dp := NumberOfBST(n)
		rec := NumberOfBSTRecursive(n)
		cat := NumberOfBSTCatalan(n)
		match := "OK"
		if dp != rec || rec != cat {
			match = "MISMATCH"
		}
		fmt.Printf("  n=%d: %d [%s]\n", n, dp, match)
	}

	// Test with larger value
	n4 := 19
	fmt.Printf("\nn = %d (max constraint)\n", n4)
	fmt.Printf("Result: %d\n", NumberOfBSTCatalanBigInt(n4))
}
