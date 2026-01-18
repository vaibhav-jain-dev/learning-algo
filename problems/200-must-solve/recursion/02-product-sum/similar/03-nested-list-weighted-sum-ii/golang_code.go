/*
Nested List Weighted Sum II - Go Solutions

Sum of all integers weighted by INVERSE depth (deeper = less weight).

This file contains MULTIPLE solution approaches with modern idiomatic Go.
*/

package main

import "fmt"

// Element represents either an int or a nested array
type Element interface{}

// ============================================================================
// APPROACH 1: BFS with Level-Sum Trick (Optimal)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// WHY THIS IS BEST:
// - Single pass through all elements
// - No need to pre-calculate max depth
// - Elegant: each element gets added once per remaining level
// ============================================================================

// DepthSumInverse computes weighted sum where deeper = less weight.
//
// The trick: Use BFS level by level. Maintain a runningSum that carries
// forward. Elements at shallower levels get added more times naturally.
func DepthSumInverse(arr []Element) int {
	if len(arr) == 0 {
		return 0
	}

	total := 0
	levelSum := 0
	queue := arr // Start with the outermost level

	for len(queue) > 0 {
		nextLevel := []Element{}

		for _, elem := range queue {
			switch v := elem.(type) {
			case int:
				levelSum += v
			case []Element:
				nextLevel = append(nextLevel, v...)
			}
		}

		// Add current running sum to total
		// (this is the key insight - each element contributes
		// once per level it's carried through)
		total += levelSum
		queue = nextLevel
	}

	return total
}

// ============================================================================
// APPROACH 2: Two-Pass DFS
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(d) where d = max depth
//
// WHEN TO USE:
// - When code clarity is more important
// - Easier to understand and debug
// ============================================================================

// DepthSumInverseTwoPass uses two passes: find max depth, then compute sum.
func DepthSumInverseTwoPass(arr []Element) int {
	// First pass: find maximum depth
	maxDepth := findMaxDepth(arr, 1)

	// Second pass: compute weighted sum
	return computeWeightedSum(arr, 1, maxDepth)
}

// findMaxDepth recursively finds the maximum depth
func findMaxDepth(arr []Element, depth int) int {
	maxD := depth

	for _, elem := range arr {
		if nested, ok := elem.([]Element); ok {
			childDepth := findMaxDepth(nested, depth+1)
			if childDepth > maxD {
				maxD = childDepth
			}
		}
	}

	return maxD
}

// computeWeightedSum computes sum with inverse depth weights
func computeWeightedSum(arr []Element, depth, maxDepth int) int {
	sum := 0
	weight := maxDepth - depth + 1

	for _, elem := range arr {
		switch v := elem.(type) {
		case int:
			sum += v * weight
		case []Element:
			sum += computeWeightedSum(v, depth+1, maxDepth)
		}
	}

	return sum
}

// ============================================================================
// APPROACH 3: DFS with Value Collection + Post-Processing
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(n)
//
// Collect (value, depth) pairs, then compute after knowing max depth.
// ============================================================================

// DepthSumInverseCollect collects values with depths, then computes.
func DepthSumInverseCollect(arr []Element) int {
	type valueDepth struct {
		value int
		depth int
	}

	pairs := []valueDepth{}
	maxDepth := 0

	var collect func(arr []Element, depth int)
	collect = func(arr []Element, depth int) {
		if depth > maxDepth {
			maxDepth = depth
		}

		for _, elem := range arr {
			switch v := elem.(type) {
			case int:
				pairs = append(pairs, valueDepth{v, depth})
			case []Element:
				collect(v, depth+1)
			}
		}
	}

	collect(arr, 1)

	// Compute weighted sum
	sum := 0
	for _, p := range pairs {
		weight := maxDepth - p.depth + 1
		sum += p.value * weight
	}

	return sum
}

// ============================================================================
// APPROACH 4: Single DFS with Unweighted Sum (Mathematical Trick)
// ============================================================================
// Time Complexity:  O(n)
// Space Complexity: O(d)
//
// Use the formula: InverseSum = (maxDepth + 1) * unweightedSum - normalSum
// where normalSum uses depth as weight (like regular product sum).
// ============================================================================

// DepthSumInverseMath uses mathematical relationship between sums.
func DepthSumInverseMath(arr []Element) int {
	// Compute both regular sum and depth-weighted sum
	unweightedSum, depthWeightedSum, maxDepth := computeSums(arr, 1)

	// InverseSum = (maxDepth + 1) * unweightedSum - depthWeightedSum
	return (maxDepth+1)*unweightedSum - depthWeightedSum
}

// computeSums returns (unweighted sum, depth-weighted sum, max depth)
func computeSums(arr []Element, depth int) (int, int, int) {
	unweighted := 0
	weighted := 0
	maxD := depth

	for _, elem := range arr {
		switch v := elem.(type) {
		case int:
			unweighted += v
			weighted += v * depth
		case []Element:
			uw, w, md := computeSums(v, depth+1)
			unweighted += uw
			weighted += w
			if md > maxD {
				maxD = md
			}
		}
	}

	return unweighted, weighted, maxD
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		input    []Element
		expected int
		desc     string
	}{
		{
			[]Element{[]Element{1, 1}, 2, []Element{1, 1}},
			8,
			"[[1, 1], 2, [1, 1]]",
		},
		{
			[]Element{1, []Element{4, []Element{6}}},
			17,
			"[1, [4, [6]]]",
		},
		{
			[]Element{1, 2, 3},
			6,
			"[1, 2, 3] - flat",
		},
		{
			[]Element{[]Element{[]Element{1}}},
			1,
			"[[[1]]] - deeply nested single",
		},
		{
			[]Element{1, []Element{-1}},
			1,
			"[1, [-1]] - with negative",
		},
	}

	approaches := []struct {
		name string
		fn   func([]Element) int
	}{
		{"BFS Level-Sum (Optimal)", DepthSumInverse},
		{"Two-Pass DFS", DepthSumInverseTwoPass},
		{"Collect + Post-Process", DepthSumInverseCollect},
		{"Mathematical Trick", DepthSumInverseMath},
	}

	fmt.Println("======================================================================")
	fmt.Println("NESTED LIST WEIGHTED SUM II - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			result := approach.fn(tc.input)
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
	}

	fmt.Println("\n======================================================================")
	fmt.Println("SAMPLE OUTPUT")
	fmt.Println("======================================================================")

	fmt.Println("\nInput: [[1, 1], 2, [1, 1]]")
	fmt.Printf("Output: %d\n", DepthSumInverse([]Element{[]Element{1, 1}, 2, []Element{1, 1}}))

	fmt.Println("\nInput: [1, [4, [6]]]")
	fmt.Printf("Output: %d\n", DepthSumInverse([]Element{1, []Element{4, []Element{6}}}))
}
