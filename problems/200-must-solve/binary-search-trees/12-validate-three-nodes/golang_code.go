/*
Validate Three Nodes - Go Solution

Given three nodes in a BST, check if one of nodeOne or nodeThree is an
ancestor of nodeTwo and the other is a descendant of nodeTwo.

Time Complexity: O(h) where h is height of tree
Space Complexity: O(1)
*/

package main

import "fmt"

// BST represents a node in Binary Search Tree
type BST struct {
	Value int
	Left  *BST
	Right *BST
}

// ValidateThreeNodes checks if one of nodeOne/nodeThree is ancestor of nodeTwo
// and the other is descendant of nodeTwo.
// Uses simple two-pass approach: check both possible configurations.
func ValidateThreeNodes(nodeOne, nodeTwo, nodeThree *BST) bool {
	// Case 1: nodeOne is ancestor of nodeTwo, nodeThree is descendant of nodeTwo
	if isDescendant(nodeTwo, nodeOne) && isDescendant(nodeThree, nodeTwo) {
		return true
	}

	// Case 2: nodeThree is ancestor of nodeTwo, nodeOne is descendant of nodeTwo
	if isDescendant(nodeTwo, nodeThree) && isDescendant(nodeOne, nodeTwo) {
		return true
	}

	return false
}

// isDescendant checks if target is a descendant of node (or target == node).
// Traverses from node following BST property until we find target or reach nil.
func isDescendant(target, node *BST) bool {
	for node != nil {
		if node == target {
			return true
		}

		// Use BST property to navigate
		if target.Value < node.Value {
			node = node.Left
		} else {
			node = node.Right
		}
	}

	return false
}

// ValidateThreeNodesOptimized searches from both ends simultaneously.
// This can be faster when one of the nodes is much closer to nodeTwo than the other.
func ValidateThreeNodesOptimized(nodeOne, nodeTwo, nodeThree *BST) bool {
	searchingFromOne := nodeOne
	searchingFromThree := nodeThree

	for {
		// Check if we found nodeTwo from either direction
		foundFromOne := searchingFromOne == nodeTwo
		foundFromThree := searchingFromThree == nodeTwo

		// If nodeOne reaches nodeTwo, check if nodeThree is descendant of nodeTwo
		if foundFromOne {
			return isDescendant(nodeThree, nodeTwo)
		}

		// If nodeThree reaches nodeTwo, check if nodeOne is descendant of nodeTwo
		if foundFromThree {
			return isDescendant(nodeOne, nodeTwo)
		}

		// Check if pointers meet each other (not at nodeTwo)
		if searchingFromOne == searchingFromThree {
			return false
		}

		// Check if one pointer reaches the other
		if searchingFromOne == nodeThree {
			return isDescendant(nodeTwo, nodeOne) && isDescendant(nodeThree, nodeTwo)
		}

		if searchingFromThree == nodeOne {
			return isDescendant(nodeTwo, nodeThree) && isDescendant(nodeOne, nodeTwo)
		}

		// Move pointers towards nodeTwo
		if searchingFromOne != nil {
			if nodeTwo.Value < searchingFromOne.Value {
				searchingFromOne = searchingFromOne.Left
			} else {
				searchingFromOne = searchingFromOne.Right
			}
		}

		if searchingFromThree != nil {
			if nodeTwo.Value < searchingFromThree.Value {
				searchingFromThree = searchingFromThree.Left
			} else {
				searchingFromThree = searchingFromThree.Right
			}
		}

		// Both reached nil without finding nodeTwo
		if searchingFromOne == nil && searchingFromThree == nil {
			return false
		}
	}
}

// ValidateThreeNodesV2 is an alternative cleaner implementation of the optimized approach.
func ValidateThreeNodesV2(nodeOne, nodeTwo, nodeThree *BST) bool {
	p1, p3 := nodeOne, nodeThree

	for p1 != nodeTwo && p3 != nodeTwo {
		// Check if pointers reached each other
		if p1 == nodeThree {
			return searchTargetFromSource(nodeOne, nodeTwo, nodeThree)
		}
		if p3 == nodeOne {
			return searchTargetFromSource(nodeThree, nodeTwo, nodeOne)
		}

		// Move pointers towards nodeTwo
		p1 = getNextNode(p1, nodeTwo)
		p3 = getNextNode(p3, nodeTwo)
	}

	// One of them reached nodeTwo
	if p1 == nodeTwo {
		// nodeOne is ancestor of nodeTwo, check if nodeThree is descendant
		return isDescendant(nodeThree, nodeTwo)
	}
	// nodeThree is ancestor of nodeTwo, check if nodeOne is descendant
	return isDescendant(nodeOne, nodeTwo)
}

// getNextNode returns next node on path from current towards target using BST property
func getNextNode(current, target *BST) *BST {
	if current == nil {
		return nil
	}
	if target.Value < current.Value {
		return current.Left
	}
	return current.Right
}

// searchTargetFromSource searches for target starting from source, stopping at stop node
func searchTargetFromSource(source, target, stop *BST) bool {
	current := source
	for current != nil && current != stop {
		if current == target {
			return true
		}
		current = getNextNode(current, target)
	}
	return current == target
}

// buildTree creates the test tree and returns root and map of nodes
func buildTree() (*BST, map[int]*BST) {
	/*
	   Build the test tree:
	          5
	        /   \
	       2     7
	     /   \  /  \
	    1    4 6    8
	   /   /
	  0   3
	*/
	node0 := &BST{Value: 0}
	node1 := &BST{Value: 1}
	node2 := &BST{Value: 2}
	node3 := &BST{Value: 3}
	node4 := &BST{Value: 4}
	node5 := &BST{Value: 5}
	node6 := &BST{Value: 6}
	node7 := &BST{Value: 7}
	node8 := &BST{Value: 8}

	node5.Left = node2
	node5.Right = node7
	node2.Left = node1
	node2.Right = node4
	node1.Left = node0
	node4.Left = node3
	node7.Left = node6
	node7.Right = node8

	nodes := map[int]*BST{
		0: node0, 1: node1, 2: node2, 3: node3, 4: node4,
		5: node5, 6: node6, 7: node7, 8: node8,
	}

	return node5, nodes
}

func main() {
	_, nodes := buildTree()

	fmt.Println("=== Validate Three Nodes Tests ===")
	fmt.Println()

	// Test cases: (nodeOne, nodeTwo, nodeThree, expected)
	testCases := []struct {
		n1, n2, n3 int
		expected   bool
	}{
		{5, 2, 3, true},   // 5 is ancestor of 2, 3 is descendant of 2
		{5, 3, 2, false},  // 5 is ancestor of 3, but 2 is NOT descendant of 3
		{0, 1, 2, true},   // 2 is ancestor of 1, 0 is descendant of 1
		{1, 2, 4, false},  // Neither 1 nor 4 is ancestor of 2
		{5, 7, 8, true},   // 5 is ancestor of 7, 8 is descendant of 7
		{8, 7, 5, true},   // 5 is ancestor of 7, 8 is descendant of 7
		{2, 5, 7, false},  // Neither 2 nor 7 is ancestor of 5
	}

	fmt.Println("Testing Basic Version:")
	for i, tc := range testCases {
		result := ValidateThreeNodes(nodes[tc.n1], nodes[tc.n2], nodes[tc.n3])
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  Test %d: (%d, %d, %d) -> %v (expected %v) [%s]\n",
			i+1, tc.n1, tc.n2, tc.n3, result, tc.expected, status)
	}

	fmt.Println()
	fmt.Println("Testing Optimized Version:")
	for i, tc := range testCases {
		result := ValidateThreeNodesOptimized(nodes[tc.n1], nodes[tc.n2], nodes[tc.n3])
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  Test %d: (%d, %d, %d) -> %v (expected %v) [%s]\n",
			i+1, tc.n1, tc.n2, tc.n3, result, tc.expected, status)
	}

	fmt.Println()
	fmt.Println("Testing V2 Version:")
	for i, tc := range testCases {
		result := ValidateThreeNodesV2(nodes[tc.n1], nodes[tc.n2], nodes[tc.n3])
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  Test %d: (%d, %d, %d) -> %v (expected %v) [%s]\n",
			i+1, tc.n1, tc.n2, tc.n3, result, tc.expected, status)
	}

	fmt.Println()
	fmt.Println("All tests completed!")
}
