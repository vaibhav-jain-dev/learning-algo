/*
Serialize and Deserialize BST - Go Solutions

Design an algorithm to serialize and deserialize a BST.

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

// TreeNode represents a node in a binary search tree
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

// ============================================================================
// APPROACH 1: Preorder + Bounds (Optimal for BST)
// ============================================================================
// Time Complexity:  O(n) for both serialize and deserialize
// Space Complexity: O(n) for string, O(h) for recursion
//
// WHY THIS IS OPTIMAL:
// - Most compact representation (no null markers)
// - Uses BST property to reconstruct structure
// - Each node value appears exactly once
// ============================================================================

// Codec handles serialization and deserialization
type Codec struct{}

// Constructor creates a new Codec
func CodecConstructor() Codec {
	return Codec{}
}

// Serialize encodes a BST to a string using preorder traversal.
func (c *Codec) Serialize(root *TreeNode) string {
	if root == nil {
		return ""
	}

	var result []string
	var preorder func(node *TreeNode)
	preorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		result = append(result, strconv.Itoa(node.Val))
		preorder(node.Left)
		preorder(node.Right)
	}

	preorder(root)
	return strings.Join(result, ",")
}

// Deserialize decodes string to BST using bounds validation.
func (c *Codec) Deserialize(data string) *TreeNode {
	if data == "" {
		return nil
	}

	parts := strings.Split(data, ",")
	values := make([]int, len(parts))
	for i, part := range parts {
		values[i], _ = strconv.Atoi(part)
	}

	idx := 0

	var build func(minVal, maxVal int) *TreeNode
	build = func(minVal, maxVal int) *TreeNode {
		if idx >= len(values) {
			return nil
		}

		val := values[idx]
		// Check if current value is within valid bounds
		if val < minVal || val > maxVal {
			return nil
		}

		idx++
		node := &TreeNode{Val: val}
		node.Left = build(minVal, val)    // Left subtree: values < val
		node.Right = build(val, maxVal)   // Right subtree: values > val

		return node
	}

	return build(math.MinInt, math.MaxInt)
}

// ============================================================================
// APPROACH 2: Postorder Serialization (Alternative)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHY DIFFERENT:
// - Processes values from end to beginning
// - Root is last in postorder, first when reversing
// ============================================================================

// CodecPostorder uses postorder traversal
type CodecPostorder struct{}

// Serialize using postorder traversal
func (c *CodecPostorder) Serialize(root *TreeNode) string {
	if root == nil {
		return ""
	}

	var result []string
	var postorder func(node *TreeNode)
	postorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		postorder(node.Left)
		postorder(node.Right)
		result = append(result, strconv.Itoa(node.Val))
	}

	postorder(root)
	return strings.Join(result, ",")
}

// Deserialize using postorder (process from end)
func (c *CodecPostorder) Deserialize(data string) *TreeNode {
	if data == "" {
		return nil
	}

	parts := strings.Split(data, ",")
	values := make([]int, len(parts))
	for i, part := range parts {
		values[i], _ = strconv.Atoi(part)
	}

	idx := len(values) - 1

	var build func(minVal, maxVal int) *TreeNode
	build = func(minVal, maxVal int) *TreeNode {
		if idx < 0 {
			return nil
		}

		val := values[idx]
		if val < minVal || val > maxVal {
			return nil
		}

		idx--
		node := &TreeNode{Val: val}
		// Build right subtree first (reverse of preorder)
		node.Right = build(val, maxVal)
		node.Left = build(minVal, val)

		return node
	}

	return build(math.MinInt, math.MaxInt)
}

// ============================================================================
// APPROACH 3: Level Order (BFS) - Works for General Trees Too
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// NOTE: Less compact for BST (may include "null" markers)
// but useful for general binary trees
// ============================================================================

// CodecLevelOrder uses level order traversal
type CodecLevelOrder struct{}

// Serialize using level order (BFS)
func (c *CodecLevelOrder) Serialize(root *TreeNode) string {
	if root == nil {
		return ""
	}

	var result []string
	queue := []*TreeNode{root}

	for len(queue) > 0 {
		node := queue[0]
		queue = queue[1:]

		if node == nil {
			result = append(result, "null")
			continue
		}

		result = append(result, strconv.Itoa(node.Val))
		queue = append(queue, node.Left)
		queue = append(queue, node.Right)
	}

	// Trim trailing nulls
	for len(result) > 0 && result[len(result)-1] == "null" {
		result = result[:len(result)-1]
	}

	return strings.Join(result, ",")
}

// Deserialize using level order
func (c *CodecLevelOrder) Deserialize(data string) *TreeNode {
	if data == "" {
		return nil
	}

	parts := strings.Split(data, ",")
	if len(parts) == 0 || parts[0] == "null" {
		return nil
	}

	rootVal, _ := strconv.Atoi(parts[0])
	root := &TreeNode{Val: rootVal}

	queue := []*TreeNode{root}
	i := 1

	for len(queue) > 0 && i < len(parts) {
		node := queue[0]
		queue = queue[1:]

		// Left child
		if i < len(parts) && parts[i] != "null" {
			val, _ := strconv.Atoi(parts[i])
			node.Left = &TreeNode{Val: val}
			queue = append(queue, node.Left)
		}
		i++

		// Right child
		if i < len(parts) && parts[i] != "null" {
			val, _ := strconv.Atoi(parts[i])
			node.Right = &TreeNode{Val: val}
			queue = append(queue, node.Right)
		}
		i++
	}

	return root
}

// ============================================================================
// APPROACH 4: Binary Format (Compact Storage)
// ============================================================================
// Uses byte encoding for more compact storage
// Good for network transmission or disk storage
// ============================================================================

// CodecBinary uses binary encoding for compactness
type CodecBinary struct{}

// SerializeBinary encodes to byte slice
func (c *CodecBinary) SerializeBinary(root *TreeNode) []byte {
	var result []byte

	var preorder func(node *TreeNode)
	preorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		// Store value as 4 bytes (int32)
		val := int32(node.Val)
		result = append(result,
			byte(val>>24), byte(val>>16), byte(val>>8), byte(val))
		preorder(node.Left)
		preorder(node.Right)
	}

	preorder(root)
	return result
}

// DeserializeBinary decodes from byte slice
func (c *CodecBinary) DeserializeBinary(data []byte) *TreeNode {
	if len(data) == 0 {
		return nil
	}

	values := make([]int, len(data)/4)
	for i := 0; i < len(data); i += 4 {
		values[i/4] = int(int32(data[i])<<24 | int32(data[i+1])<<16 |
			int32(data[i+2])<<8 | int32(data[i+3]))
	}

	idx := 0
	var build func(minVal, maxVal int) *TreeNode
	build = func(minVal, maxVal int) *TreeNode {
		if idx >= len(values) || values[idx] < minVal || values[idx] > maxVal {
			return nil
		}
		val := values[idx]
		idx++
		node := &TreeNode{Val: val}
		node.Left = build(minVal, val)
		node.Right = build(val, maxVal)
		return node
	}

	return build(math.MinInt, math.MaxInt)
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// buildBST creates a BST from a slice of values
func buildBST(values []int) *TreeNode {
	if len(values) == 0 {
		return nil
	}

	root := &TreeNode{Val: values[0]}
	for i := 1; i < len(values); i++ {
		insertBST(root, values[i])
	}
	return root
}

func insertBST(root *TreeNode, val int) {
	current := root
	for {
		if val < current.Val {
			if current.Left == nil {
				current.Left = &TreeNode{Val: val}
				return
			}
			current = current.Left
		} else {
			if current.Right == nil {
				current.Right = &TreeNode{Val: val}
				return
			}
			current = current.Right
		}
	}
}

// treesEqual checks if two trees are structurally identical
func treesEqual(t1, t2 *TreeNode) bool {
	if t1 == nil && t2 == nil {
		return true
	}
	if t1 == nil || t2 == nil {
		return false
	}
	return t1.Val == t2.Val &&
		treesEqual(t1.Left, t2.Left) &&
		treesEqual(t1.Right, t2.Right)
}

// inorderTraversal returns values in sorted order
func inorderTraversal(root *TreeNode) []int {
	var result []int
	var inorder func(node *TreeNode)
	inorder = func(node *TreeNode) {
		if node == nil {
			return
		}
		inorder(node.Left)
		result = append(result, node.Val)
		inorder(node.Right)
	}
	inorder(root)
	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	fmt.Println("======================================================================")
	fmt.Println("SERIALIZE AND DESERIALIZE BST - TEST RESULTS")
	fmt.Println("======================================================================")

	// Build test tree
	//          5
	//         / \
	//        3   7
	//       / \ / \
	//      2  4 6  8
	original := buildBST([]int{5, 3, 7, 2, 4, 6, 8})

	fmt.Println("\nOriginal BST:")
	fmt.Println("          5")
	fmt.Println("         / \\")
	fmt.Println("        3   7")
	fmt.Println("       / \\ / \\")
	fmt.Println("      2  4 6  8")
	fmt.Println("\nInorder:", inorderTraversal(original))

	// Test Approach 1: Preorder + Bounds
	fmt.Println("\n--- Approach 1: Preorder + Bounds (Optimal) ---")
	codec1 := CodecConstructor()
	serialized1 := codec1.Serialize(original)
	fmt.Printf("Serialized: \"%s\"\n", serialized1)
	deserialized1 := codec1.Deserialize(serialized1)
	fmt.Printf("Inorder after deserialize: %v\n", inorderTraversal(deserialized1))
	fmt.Printf("Trees equal: %v\n", treesEqual(original, deserialized1))

	// Test Approach 2: Postorder
	fmt.Println("\n--- Approach 2: Postorder ---")
	codec2 := &CodecPostorder{}
	serialized2 := codec2.Serialize(original)
	fmt.Printf("Serialized: \"%s\"\n", serialized2)
	deserialized2 := codec2.Deserialize(serialized2)
	fmt.Printf("Inorder after deserialize: %v\n", inorderTraversal(deserialized2))
	fmt.Printf("Trees equal: %v\n", treesEqual(original, deserialized2))

	// Test Approach 3: Level Order
	fmt.Println("\n--- Approach 3: Level Order ---")
	codec3 := &CodecLevelOrder{}
	serialized3 := codec3.Serialize(original)
	fmt.Printf("Serialized: \"%s\"\n", serialized3)
	deserialized3 := codec3.Deserialize(serialized3)
	fmt.Printf("Inorder after deserialize: %v\n", inorderTraversal(deserialized3))
	fmt.Printf("Trees equal: %v\n", treesEqual(original, deserialized3))

	// Test Approach 4: Binary
	fmt.Println("\n--- Approach 4: Binary Format ---")
	codec4 := &CodecBinary{}
	serialized4 := codec4.SerializeBinary(original)
	fmt.Printf("Serialized bytes: %d bytes\n", len(serialized4))
	deserialized4 := codec4.DeserializeBinary(serialized4)
	fmt.Printf("Inorder after deserialize: %v\n", inorderTraversal(deserialized4))
	fmt.Printf("Trees equal: %v\n", treesEqual(original, deserialized4))

	// Compare string lengths
	fmt.Println("\n--- Serialization Size Comparison ---")
	fmt.Printf("Preorder (BST-optimal): %d chars\n", len(serialized1))
	fmt.Printf("Postorder:              %d chars\n", len(serialized2))
	fmt.Printf("Level Order:            %d chars\n", len(serialized3))
	fmt.Printf("Binary:                 %d bytes\n", len(serialized4))

	// Test edge cases
	fmt.Println("\n--- Edge Cases ---")

	// Empty tree
	var emptyTree *TreeNode
	serializedEmpty := codec1.Serialize(emptyTree)
	deserializedEmpty := codec1.Deserialize(serializedEmpty)
	fmt.Printf("Empty tree: serialized=\"%s\", deserialized=%v\n",
		serializedEmpty, deserializedEmpty)

	// Single node
	singleNode := &TreeNode{Val: 42}
	serializedSingle := codec1.Serialize(singleNode)
	deserializedSingle := codec1.Deserialize(serializedSingle)
	fmt.Printf("Single node: serialized=\"%s\", value=%d\n",
		serializedSingle, deserializedSingle.Val)

	fmt.Println("\n======================================================================")
	fmt.Println("All tests completed!")
	fmt.Println("======================================================================")
}
