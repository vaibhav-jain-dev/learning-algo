/*
Count Nodes in Range (Range Sum BST Variant) - Go Solutions

Count nodes and sum values within a given range in a BST.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// TreeNode represents a node in a binary search tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Recursive DFS with Pruning
// ============================================================================
// Time Complexity:  O(n) worst case, O(log n + k) average where k = nodes in range
// Space Complexity: O(h) - recursion stack depth
//
// WHY THIS WORKS:
// - Uses BST property to prune unnecessary subtrees
// - If node < low: skip left subtree (all values < low)
// - If node > high: skip right subtree (all values > high)
// ============================================================================

// CountNodesInRange counts nodes with values in [low, high] range
func CountNodesInRange(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	count := 0

	// Count current node if in range
	if root.Val >= low && root.Val <= high {
		count = 1
	}

	// Only explore left if there could be values >= low
	if root.Val > low {
		count += CountNodesInRange(root.Left, low, high)
	}

	// Only explore right if there could be values <= high
	if root.Val < high {
		count += CountNodesInRange(root.Right, low, high)
	}

	return count
}

// RangeSumBST returns sum of values in [low, high] range
func RangeSumBST(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	total := 0

	// Add current value if in range
	if root.Val >= low && root.Val <= high {
		total = root.Val
	}

	// Only explore left if there could be values >= low
	if root.Val > low {
		total += RangeSumBST(root.Left, low, high)
	}

	// Only explore right if there could be values <= high
	if root.Val < high {
		total += RangeSumBST(root.Right, low, high)
	}

	return total
}

// ============================================================================
// APPROACH 2: Combined Count and Sum in One Pass
// ============================================================================
// Time Complexity:  O(n) worst case, O(log n + k) average
// Space Complexity: O(h)
//
// WHY COMBINE:
// - Often need both count and sum
// - Single traversal is more efficient
// ============================================================================

// RangeResult holds both count and sum
type RangeResult struct {
	Count int
	Sum   int
}

// CountAndSumInRange returns both count and sum in one traversal
func CountAndSumInRange(root *TreeNode, low, high int) RangeResult {
	if root == nil {
		return RangeResult{}
	}

	result := RangeResult{}

	// Include current node if in range
	if root.Val >= low && root.Val <= high {
		result.Count = 1
		result.Sum = root.Val
	}

	// Explore left subtree if needed
	if root.Val > low {
		left := CountAndSumInRange(root.Left, low, high)
		result.Count += left.Count
		result.Sum += left.Sum
	}

	// Explore right subtree if needed
	if root.Val < high {
		right := CountAndSumInRange(root.Right, low, high)
		result.Count += right.Count
		result.Sum += right.Sum
	}

	return result
}

// ============================================================================
// APPROACH 3: Iterative with Stack (No Recursion)
// ============================================================================
// Time Complexity:  O(n) worst case, O(log n + k) average
// Space Complexity: O(h) - explicit stack
//
// WHY ITERATIVE:
// - Avoids recursion limit for very deep trees
// - More explicit control over traversal
// ============================================================================

// CountNodesInRangeIterative counts nodes using iterative approach
func CountNodesInRangeIterative(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	count := 0
	stack := []*TreeNode{root}

	for len(stack) > 0 {
		// Pop from stack
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node == nil {
			continue
		}

		// Count if in range
		if node.Val >= low && node.Val <= high {
			count++
		}

		// Add children with pruning
		if node.Val > low && node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Val < high && node.Right != nil {
			stack = append(stack, node.Right)
		}
	}

	return count
}

// RangeSumIterative returns sum using iterative approach
func RangeSumIterative(root *TreeNode, low, high int) int {
	if root == nil {
		return 0
	}

	total := 0
	stack := []*TreeNode{root}

	for len(stack) > 0 {
		node := stack[len(stack)-1]
		stack = stack[:len(stack)-1]

		if node == nil {
			continue
		}

		// Add value if in range
		if node.Val >= low && node.Val <= high {
			total += node.Val
		}

		// Add children with pruning
		if node.Val > low && node.Left != nil {
			stack = append(stack, node.Left)
		}
		if node.Val < high && node.Right != nil {
			stack = append(stack, node.Right)
		}
	}

	return total
}

// ============================================================================
// APPROACH 4: Collect Nodes in Range (Extended Problem)
// ============================================================================
// Time Complexity:  O(n) worst case, O(log n + k) average
// Space Complexity: O(k) for result slice + O(h) for recursion
//
// WHY THIS VARIATION:
// - Sometimes need the actual values, not just count
// - Returns sorted slice (inorder traversal)
// ============================================================================

// GetNodesInRange returns all values in [low, high] range, sorted
func GetNodesInRange(root *TreeNode, low, high int) []int {
	var result []int

	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}

		// Visit left if there could be values >= low
		if node.Val > low {
			inorder(node.Left)
		}

		// Add current if in range
		if node.Val >= low && node.Val <= high {
			result = append(result, node.Val)
		}

		// Visit right if there could be values <= high
		if node.Val < high {
			inorder(node.Right)
		}
	}

	inorder(root)
	return result
}

// ============================================================================
// APPROACH 5: Channel-based Iterator (Go Idiomatic)
// ============================================================================
// Time Complexity:  O(n) worst case
// Space Complexity: O(h) for goroutine stack
//
// WHY CHANNELS:
// - Go-idiomatic way to yield values
// - Can be consumed lazily
// - Good for streaming large results
// ============================================================================

// NodesInRangeChannel returns a channel yielding values in range
func NodesInRangeChannel(root *TreeNode, low, high int) <-chan int {
	ch := make(chan int)

	go func() {
		defer close(ch)
		nodesInRangeHelper(root, low, high, ch)
	}()

	return ch
}

func nodesInRangeHelper(node *TreeNode, low, high int, ch chan<- int) {
	if node == nil {
		return
	}

	// Process left if there could be values >= low
	if node.Val > low {
		nodesInRangeHelper(node.Left, low, high, ch)
	}

	// Send current if in range
	if node.Val >= low && node.Val <= high {
		ch <- node.Val
	}

	// Process right if there could be values <= high
	if node.Val < high {
		nodesInRangeHelper(node.Right, low, high, ch)
	}
}

// ============================================================================
// HELPER: Build BST from slice for testing
// ============================================================================

func buildTree(values []interface{}) *TreeNode {
	if len(values) == 0 || values[0] == nil {
		return nil
	}

	root := &TreeNode{Val: values[0].(int)}
	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(values) {
		node := queue[0]
		queue = queue[1:]

		if i < len(values) && values[i] != nil {
			node.Left = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Left)
		}
		i++

		if i < len(values) && values[i] != nil {
			node.Right = &TreeNode{Val: values[i].(int)}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("COUNT NODES IN RANGE - TEST RESULTS")
	fmt.Println("======================================================================")

	testCases := []struct {
		values      []interface{}
		low         int
		high        int
		expCount    int
		expSum      int
		description string
	}{
		{[]interface{}{10, 5, 15, 3, 7, nil, 18}, 7, 15, 3, 32, "Example 1"},
		{[]interface{}{10, 5, 15, 3, 7, 13, 18, 1, nil, 6}, 6, 10, 3, 23, "Example 2"},
		{[]interface{}{10, 5, 15, 3, 7, nil, 18}, 1, 20, 6, 58, "Full tree range"},
		{[]interface{}{10, 5, 15, 3, 7, nil, 18}, 10, 10, 1, 10, "Single value range"},
		{[]interface{}{10, 5, 15, 3, 7, nil, 18}, 100, 200, 0, 0, "Range outside tree"},
		{[]interface{}{10}, 5, 15, 1, 10, "Single node in range"},
		{[]interface{}{10}, 15, 20, 0, 0, "Single node out of range"},
	}

	for _, tc := range testCases {
		fmt.Printf("\n%s\n", tc.description)
		fmt.Printf("Tree: %v, Range: [%d, %d]\n", tc.values, tc.low, tc.high)
		fmt.Printf("Expected: Count=%d, Sum=%d\n", tc.expCount, tc.expSum)

		root := buildTree(tc.values)

		// Test recursive count
		count := CountNodesInRange(root, tc.low, tc.high)
		countStatus := "PASS"
		if count != tc.expCount {
			countStatus = "FAIL"
		}
		fmt.Printf("  Recursive count:    %d %s\n", count, countStatus)

		// Test recursive sum
		sum := RangeSumBST(root, tc.low, tc.high)
		sumStatus := "PASS"
		if sum != tc.expSum {
			sumStatus = "FAIL"
		}
		fmt.Printf("  Recursive sum:      %d %s\n", sum, sumStatus)

		// Test combined
		result := CountAndSumInRange(root, tc.low, tc.high)
		fmt.Printf("  Combined (c, s):    (%d, %d)\n", result.Count, result.Sum)

		// Test iterative count
		countIter := CountNodesInRangeIterative(root, tc.low, tc.high)
		fmt.Printf("  Iterative count:    %d\n", countIter)

		// Test iterative sum
		sumIter := RangeSumIterative(root, tc.low, tc.high)
		fmt.Printf("  Iterative sum:      %d\n", sumIter)

		// Test get nodes
		nodes := GetNodesInRange(root, tc.low, tc.high)
		fmt.Printf("  Nodes in range:     %v\n", nodes)

		// Test channel-based
		var chanResult []int
		for val := range NodesInRangeChannel(root, tc.low, tc.high) {
			chanResult = append(chanResult, val)
		}
		fmt.Printf("  Channel result:     %v\n", chanResult)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
