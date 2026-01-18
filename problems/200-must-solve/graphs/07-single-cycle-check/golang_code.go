/*
Single Cycle Check - Go Solution

Determine if jumps in an array form a single cycle visiting all elements.

Time Complexity: O(n) - visit each element once
Space Complexity: O(1) - constant extra space
*/

package main

import "fmt"

// HasSingleCycle checks if the array forms a single cycle.
//
// Key Insight: Start at index 0, follow jumps.
// A valid single cycle visits exactly n elements and returns to index 0.
//
// Visual for [2, 3, 1, -4, -4, 2]:
//
//	Index: 0  1  2  3  4  5
//	Value: 2  3  1 -4 -4  2
//	Jump:  0->2->3->5->1->4->0 (back to start)
//
//	6 elements visited, returns to 0 -> true
func HasSingleCycle(array []int) bool {
	n := len(array)
	if n == 0 {
		return false
	}

	numVisited := 0
	currentIdx := 0

	for numVisited < n {
		// If we return to start before visiting all elements, not single cycle
		if numVisited > 0 && currentIdx == 0 {
			return false
		}

		numVisited++

		// Calculate next index with wrapping
		currentIdx = getNextIndex(currentIdx, array)
	}

	// Must end at starting index
	return currentIdx == 0
}

// getNextIndex calculates next index handling wraparound.
func getNextIndex(currentIdx int, array []int) int {
	jump := array[currentIdx]
	n := len(array)

	// Handle negative jumps with proper modulo
	nextIdx := (currentIdx + jump) % n
	if nextIdx < 0 {
		nextIdx += n
	}

	return nextIdx
}

// HasSingleCycleWithVisited uses visited array (alternative approach).
// Space: O(n) but can detect partial cycles.
func HasSingleCycleWithVisited(array []int) bool {
	n := len(array)
	if n == 0 {
		return false
	}

	visited := make([]bool, n)
	currentIdx := 0
	numVisited := 0

	for !visited[currentIdx] {
		visited[currentIdx] = true
		numVisited++
		currentIdx = getNextIndex(currentIdx, array)
	}

	// Must visit all elements and return to start
	return numVisited == n && currentIdx == 0
}

func main() {
	testCases := []struct {
		array    []int
		expected bool
		desc     string
	}{
		{[]int{2, 3, 1, -4, -4, 2}, true, "Standard single cycle"},
		{[]int{2, 2, -1}, true, "Small cycle"},
		{[]int{1, 1, 1, 1, 2}, false, "Multiple cycles"},
		{[]int{0, 1, 1, 1, 1}, false, "Self-loop at start"},
		{[]int{1, -1}, true, "Two element cycle"},
		{[]int{1}, true, "Single element"},
		{[]int{1, 2, 3, 4, -2, 3, 7, 8, -26}, true, "Large cycle"},
		{[]int{1, 2, 3, 4, -2, 3, 7, 8, 1}, false, "Doesn't return to start"},
	}

	fmt.Println("======================================================================")
	fmt.Println("SINGLE CYCLE CHECK - TEST RESULTS")
	fmt.Println("======================================================================")

	fmt.Println("\nApproach 1: O(1) Space")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := HasSingleCycle(tc.array)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: %v (expected %v)\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\nApproach 2: Visited Array")
	fmt.Println("--------------------------------------------------")
	for _, tc := range testCases {
		result := HasSingleCycleWithVisited(tc.array)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: %v (expected %v)\n", status, tc.desc, result, tc.expected)
	}

	fmt.Println("\n======================================================================")
	fmt.Println("DETAILED EXAMPLE")
	fmt.Println("======================================================================")

	array := []int{2, 3, 1, -4, -4, 2}
	fmt.Printf("\nArray: %v\n", array)
	fmt.Println("\nJump sequence:")
	idx := 0
	for i := 0; i <= len(array); i++ {
		fmt.Printf("  Index %d (value %d)", idx, array[idx])
		nextIdx := getNextIndex(idx, array)
		if i < len(array) {
			fmt.Printf(" -> jump to index %d\n", nextIdx)
		} else {
			fmt.Println(" -> back to start!")
		}
		idx = nextIdx
	}
	fmt.Printf("\nResult: %v\n", HasSingleCycle(array))

	fmt.Println("\nAll tests completed!")
}
