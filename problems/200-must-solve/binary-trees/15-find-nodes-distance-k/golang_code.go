/*
Find Nodes Distance K - Go Solution

Find all nodes at distance K from a target node in a binary tree.

Time Complexity: O(n)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"sort"
)

// BinaryTree represents a node in a binary tree
type BinaryTree struct {
	Value int
	Left  *BinaryTree
	Right *BinaryTree
}

// FindNodesDistanceK finds all nodes at exactly distance k from target
func FindNodesDistanceK(tree *BinaryTree, target int, k int) []int {
	// Build parent map and find target node
	parentMap := make(map[*BinaryTree]*BinaryTree)
	targetNode := buildParentMap(tree, nil, target, parentMap)

	if targetNode == nil {
		return []int{}
	}

	// BFS from target node
	return bfsFindDistanceK(targetNode, parentMap, k)
}

// buildParentMap builds node->parent mapping and finds target node
func buildParentMap(node, parent *BinaryTree, targetValue int, parentMap map[*BinaryTree]*BinaryTree) *BinaryTree {
	if node == nil {
		return nil
	}

	parentMap[node] = parent
	var targetNode *BinaryTree

	if node.Value == targetValue {
		targetNode = node
	}

	// Search in children
	leftResult := buildParentMap(node.Left, node, targetValue, parentMap)
	rightResult := buildParentMap(node.Right, node, targetValue, parentMap)

	if targetNode != nil {
		return targetNode
	}
	if leftResult != nil {
		return leftResult
	}
	return rightResult
}

// bfsFindDistanceK uses BFS to find all nodes at distance k from target
func bfsFindDistanceK(targetNode *BinaryTree, parentMap map[*BinaryTree]*BinaryTree, k int) []int {
	type queueItem struct {
		node     *BinaryTree
		distance int
	}

	queue := []queueItem{{targetNode, 0}}
	visited := make(map[*BinaryTree]bool)
	visited[targetNode] = true
	result := []int{}

	for len(queue) > 0 {
		// Dequeue
		item := queue[0]
		queue = queue[1:]

		if item.distance == k {
			result = append(result, item.node.Value)
			continue // Don't explore further from this node
		}

		// Explore neighbors: left, right, and parent
		neighbors := []*BinaryTree{
			item.node.Left,
			item.node.Right,
			parentMap[item.node],
		}

		for _, neighbor := range neighbors {
			if neighbor != nil && !visited[neighbor] {
				visited[neighbor] = true
				queue = append(queue, queueItem{neighbor, item.distance + 1})
			}
		}
	}

	return result
}

// FindNodesDistanceKDFS is an alternative DFS approach
func FindNodesDistanceKDFS(tree *BinaryTree, target int, k int) []int {
	result := []int{}

	var dfs func(node *BinaryTree, targetValue int) int
	dfs = func(node *BinaryTree, targetValue int) int {
		if node == nil {
			return -1
		}

		if node.Value == targetValue {
			// Found target, collect descendants at distance k
			addSubtreeAtDistance(node, k, &result)
			return 0
		}

		// Check left subtree
		leftDistance := dfs(node.Left, targetValue)
		if leftDistance >= 0 {
			// Target was in left subtree
			if leftDistance+1 == k {
				result = append(result, node.Value)
			}
			// Search right subtree for nodes at remaining distance
			addSubtreeAtDistance(node.Right, k-leftDistance-2, &result)
			return leftDistance + 1
		}

		// Check right subtree
		rightDistance := dfs(node.Right, targetValue)
		if rightDistance >= 0 {
			// Target was in right subtree
			if rightDistance+1 == k {
				result = append(result, node.Value)
			}
			// Search left subtree for nodes at remaining distance
			addSubtreeAtDistance(node.Left, k-rightDistance-2, &result)
			return rightDistance + 1
		}

		return -1
	}

	dfs(tree, target)
	return result
}

// addSubtreeAtDistance adds all nodes in subtree at exactly 'distance' edges away
func addSubtreeAtDistance(node *BinaryTree, distance int, result *[]int) {
	if node == nil || distance < 0 {
		return
	}

	if distance == 0 {
		*result = append(*result, node.Value)
		return
	}

	addSubtreeAtDistance(node.Left, distance-1, result)
	addSubtreeAtDistance(node.Right, distance-1, result)
}

func main() {
	// Test 1: Example from problem
	//         1
	//       /   \
	//      2     3
	//     / \     \
	//    4   5     6
	//       / \
	//      7   8
	// Target: 5, K: 2
	// Expected: [1, 7, 8] (any order)

	root1 := &BinaryTree{Value: 1}
	root1.Left = &BinaryTree{Value: 2}
	root1.Right = &BinaryTree{Value: 3}
	root1.Left.Left = &BinaryTree{Value: 4}
	root1.Left.Right = &BinaryTree{Value: 5}
	root1.Right.Right = &BinaryTree{Value: 6}
	root1.Left.Right.Left = &BinaryTree{Value: 7}
	root1.Left.Right.Right = &BinaryTree{Value: 8}

	result1 := FindNodesDistanceK(root1, 5, 2)
	sort.Ints(result1)
	fmt.Printf("Test 1: %v\n", result1)
	// Expected: [1, 7, 8]

	// Test 2: Root as target
	//         1
	//       /   \
	//      2     3
	// Target: 1, K: 1
	// Expected: [2, 3]

	root2 := &BinaryTree{Value: 1}
	root2.Left = &BinaryTree{Value: 2}
	root2.Right = &BinaryTree{Value: 3}

	result2 := FindNodesDistanceK(root2, 1, 1)
	sort.Ints(result2)
	fmt.Printf("Test 2: %v\n", result2)
	// Expected: [2, 3]

	// Test 3: Leaf target, need to go up
	//         1
	//       /   \
	//      2     3
	//     /
	//    4
	// Target: 4, K: 3
	// Expected: [3]

	root3 := &BinaryTree{Value: 1}
	root3.Left = &BinaryTree{Value: 2}
	root3.Right = &BinaryTree{Value: 3}
	root3.Left.Left = &BinaryTree{Value: 4}

	result3 := FindNodesDistanceK(root3, 4, 3)
	fmt.Printf("Test 3: %v\n", result3)
	// Expected: [3]

	// Test 4: K = 0 (return target itself)
	result4 := FindNodesDistanceK(root1, 5, 0)
	fmt.Printf("Test 4 (k=0): %v\n", result4)
	// Expected: [5]

	// Test 5: No nodes at distance k
	result5 := FindNodesDistanceK(root2, 1, 5)
	fmt.Printf("Test 5 (no nodes): %v\n", result5)
	// Expected: []

	// Test 6: Single node tree
	root6 := &BinaryTree{Value: 42}
	result6 := FindNodesDistanceK(root6, 42, 0)
	fmt.Printf("Test 6 (single node, k=0): %v\n", result6)
	// Expected: [42]

	result6b := FindNodesDistanceK(root6, 42, 1)
	fmt.Printf("Test 6b (single node, k=1): %v\n", result6b)
	// Expected: []

	// Test 7: DFS approach verification
	result7 := FindNodesDistanceKDFS(root1, 5, 2)
	sort.Ints(result7)
	fmt.Printf("Test 7 (DFS approach): %v\n", result7)
	// Expected: [1, 7, 8]

	// Test 8: Larger tree
	//              1
	//           /     \
	//          2       3
	//         / \     / \
	//        4   5   6   7
	//       /
	//      8
	// Target: 2, K: 2
	// Expected: [3, 8]

	root8 := &BinaryTree{Value: 1}
	root8.Left = &BinaryTree{Value: 2}
	root8.Right = &BinaryTree{Value: 3}
	root8.Left.Left = &BinaryTree{Value: 4}
	root8.Left.Right = &BinaryTree{Value: 5}
	root8.Right.Left = &BinaryTree{Value: 6}
	root8.Right.Right = &BinaryTree{Value: 7}
	root8.Left.Left.Left = &BinaryTree{Value: 8}

	result8 := FindNodesDistanceK(root8, 2, 2)
	sort.Ints(result8)
	fmt.Printf("Test 8: %v\n", result8)
	// Expected: [3, 8]

	// Test 9: K = 1 from middle node
	result9 := FindNodesDistanceK(root8, 2, 1)
	sort.Ints(result9)
	fmt.Printf("Test 9 (k=1 from node 2): %v\n", result9)
	// Expected: [1, 4, 5]

	fmt.Println("\nAll tests completed!")
}
