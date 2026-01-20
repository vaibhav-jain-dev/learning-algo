/*
Youngest Common Ancestor - Go Solution

Find the youngest (lowest) common ancestor of two descendants in an ancestral tree.

Time Complexity: O(D) where D is the depth of the deeper descendant
Space Complexity: O(1) for the optimal approach
*/

package main

import "fmt"

// AncestralTree represents a node in an ancestral tree
type AncestralTree struct {
	Name     string
	Ancestor *AncestralTree
}

// NewAncestralTree creates a new ancestral tree node
func NewAncestralTree(name string) *AncestralTree {
	return &AncestralTree{Name: name}
}

// GetYoungestCommonAncestor finds the youngest common ancestor of two descendants
// Uses the two-pointer technique: equalize depths, then move up together
func GetYoungestCommonAncestor(
	topAncestor *AncestralTree,
	descendantOne *AncestralTree,
	descendantTwo *AncestralTree,
) *AncestralTree {
	// Calculate depths of both descendants
	depthOne := getDepth(descendantOne, topAncestor)
	depthTwo := getDepth(descendantTwo, topAncestor)

	// Bring the deeper one up to the same level
	if depthOne > depthTwo {
		return backtrackToCommon(descendantOne, descendantTwo, depthOne-depthTwo)
	}
	return backtrackToCommon(descendantTwo, descendantOne, depthTwo-depthOne)
}

// getDepth calculates the depth of a node from the top ancestor
func getDepth(descendant *AncestralTree, topAncestor *AncestralTree) int {
	depth := 0
	current := descendant
	for current != topAncestor {
		depth++
		current = current.Ancestor
	}
	return depth
}

// backtrackToCommon moves lower descendant up by diff levels, then moves both up
// together until they meet
func backtrackToCommon(
	lowerDescendant *AncestralTree,
	higherDescendant *AncestralTree,
	diff int,
) *AncestralTree {
	// Bring lower descendant up to the same level
	for diff > 0 {
		lowerDescendant = lowerDescendant.Ancestor
		diff--
	}

	// Move both up simultaneously until they meet
	for lowerDescendant != higherDescendant {
		lowerDescendant = lowerDescendant.Ancestor
		higherDescendant = higherDescendant.Ancestor
	}

	return lowerDescendant
}

// GetYoungestCommonAncestorSet finds youngest common ancestor using a set
// Time: O(D), Space: O(D)
func GetYoungestCommonAncestorSet(
	topAncestor *AncestralTree,
	descendantOne *AncestralTree,
	descendantTwo *AncestralTree,
) *AncestralTree {
	// Store all ancestors of descendantOne in a set
	ancestors := make(map[*AncestralTree]bool)
	current := descendantOne
	for current != nil {
		ancestors[current] = true
		current = current.Ancestor
	}

	// Find first ancestor of descendantTwo that's in the set
	current = descendantTwo
	for !ancestors[current] {
		current = current.Ancestor
	}

	return current
}

// buildTree creates an ancestral tree from a structure map
func buildTree(structure map[string][]string) map[string]*AncestralTree {
	nodes := make(map[string]*AncestralTree)

	// Create all nodes
	for parent, children := range structure {
		if _, exists := nodes[parent]; !exists {
			nodes[parent] = NewAncestralTree(parent)
		}
		for _, child := range children {
			if _, exists := nodes[child]; !exists {
				nodes[child] = NewAncestralTree(child)
			}
			nodes[child].Ancestor = nodes[parent]
		}
	}

	return nodes
}

func main() {
	// Build the ancestral tree:
	//          A
	//        /   \
	//       B     C
	//      / \   / \
	//     D   E F   G
	//    / \
	//   H   I

	treeStructure := map[string][]string{
		"A": {"B", "C"},
		"B": {"D", "E"},
		"C": {"F", "G"},
		"D": {"H", "I"},
	}
	nodes := buildTree(treeStructure)

	// Test 1: E and I -> should be B
	result1 := GetYoungestCommonAncestor(nodes["A"], nodes["E"], nodes["I"])
	fmt.Printf("Test 1 (E, I): %s\n", result1.Name) // Expected: B

	// Test 2: H and G -> should be A
	result2 := GetYoungestCommonAncestor(nodes["A"], nodes["H"], nodes["G"])
	fmt.Printf("Test 2 (H, G): %s\n", result2.Name) // Expected: A

	// Test 3: D and E -> should be B
	result3 := GetYoungestCommonAncestor(nodes["A"], nodes["D"], nodes["E"])
	fmt.Printf("Test 3 (D, E): %s\n", result3.Name) // Expected: B

	// Test 4: H and I -> should be D
	result4 := GetYoungestCommonAncestor(nodes["A"], nodes["H"], nodes["I"])
	fmt.Printf("Test 4 (H, I): %s\n", result4.Name) // Expected: D

	// Test 5: B and H -> should be B (node is its own ancestor)
	result5 := GetYoungestCommonAncestor(nodes["A"], nodes["B"], nodes["H"])
	fmt.Printf("Test 5 (B, H): %s\n", result5.Name) // Expected: B

	// Test 6: Same node (I and I) -> should be I
	result6 := GetYoungestCommonAncestor(nodes["A"], nodes["I"], nodes["I"])
	fmt.Printf("Test 6 (I, I): %s\n", result6.Name) // Expected: I

	// Test 7: Root and any node -> should be root
	result7 := GetYoungestCommonAncestor(nodes["A"], nodes["A"], nodes["H"])
	fmt.Printf("Test 7 (A, H): %s\n", result7.Name) // Expected: A

	// Test set-based approach
	fmt.Println("\n--- Testing Set-Based Approach ---")
	resultSet1 := GetYoungestCommonAncestorSet(nodes["A"], nodes["E"], nodes["I"])
	fmt.Printf("Set Test (E, I): %s\n", resultSet1.Name) // Expected: B

	resultSet2 := GetYoungestCommonAncestorSet(nodes["A"], nodes["H"], nodes["G"])
	fmt.Printf("Set Test (H, G): %s\n", resultSet2.Name) // Expected: A

	fmt.Println("\nAll tests completed!")
}
