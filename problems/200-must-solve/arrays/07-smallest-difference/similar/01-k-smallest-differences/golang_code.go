/*
K Smallest Differences - Go Solutions

Find K pairs with smallest absolute differences between two arrays.

This file contains MULTIPLE solution approaches with explanations.
*/

package main

import (
	"container/heap"
	"fmt"
	"sort"
)

// ============================================================================
// HELPER: PairHeap for min-heap operations
// ============================================================================

// Pair represents a pair with its difference and indices
type Pair struct {
	diff int
	i    int // index in arr1
	j    int // index in arr2
	val1 int // value from arr1
	val2 int // value from arr2
}

// PairHeap implements heap.Interface for min-heap of Pairs
type PairHeap []Pair

func (h PairHeap) Len() int           { return len(h) }
func (h PairHeap) Less(i, j int) bool { return h[i].diff < h[j].diff }
func (h PairHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *PairHeap) Push(x interface{}) {
	*h = append(*h, x.(Pair))
}

func (h *PairHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// ============================================================================
// APPROACH 1: Min-Heap (Priority Queue) - RECOMMENDED
// ============================================================================
// Time Complexity:  O((n + m + k) * log(n + m))
// Space Complexity: O(n + m) for the heap
//
// WHY THIS IS BEST:
// - Only explores necessary pairs
// - Efficient for small k relative to n*m
// - Natural fit for "K smallest" problems
// ============================================================================

// KSmallestDifferences finds K pairs with smallest absolute differences using min-heap.
//
// Key Insight: Use a min-heap to explore pairs in order of increasing
// difference. Since arrays are sorted, we can start with promising pairs
// and expand to neighbors.
func KSmallestDifferences(arr1, arr2 []int, k int) [][]int {
	if len(arr1) == 0 || len(arr2) == 0 || k <= 0 {
		return [][]int{}
	}

	// Sort both arrays
	sort.Ints(arr1)
	sort.Ints(arr2)

	result := [][]int{}
	h := &PairHeap{}
	heap.Init(h)
	visited := make(map[[2]int]bool)

	// Initialize heap with starting positions for each element in arr1
	for i, val := range arr1 {
		// Binary search for closest position in arr2
		j := sort.SearchInts(arr2, val)

		// Check position j and j-1 (neighbors of insertion point)
		for _, jj := range []int{j, j - 1} {
			if jj >= 0 && jj < len(arr2) {
				key := [2]int{i, jj}
				if !visited[key] {
					diff := abs(val - arr2[jj])
					heap.Push(h, Pair{diff, i, jj, val, arr2[jj]})
					visited[key] = true
				}
			}
		}
	}

	// Extract k smallest pairs
	for h.Len() > 0 && len(result) < k {
		p := heap.Pop(h).(Pair)
		result = append(result, []int{p.val1, p.val2})

		// Add neighbors: (i, j+1) and (i, j-1) if not visited
		for _, nj := range []int{p.j + 1, p.j - 1} {
			if nj >= 0 && nj < len(arr2) {
				key := [2]int{p.i, nj}
				if !visited[key] {
					newDiff := abs(arr1[p.i] - arr2[nj])
					heap.Push(h, Pair{newDiff, p.i, nj, arr1[p.i], arr2[nj]})
					visited[key] = true
				}
			}
		}
	}

	return result
}

// ============================================================================
// APPROACH 2: Brute Force with Sorting
// ============================================================================
// Time Complexity:  O(nm log(nm)) - sorting all pairs
// Space Complexity: O(nm)
//
// WHEN TO USE:
// - Arrays are small
// - Need simple, understandable solution
// - k is close to n*m
// ============================================================================

// KSmallestDifferencesBrute generates all pairs, sorts by difference, returns first k.
func KSmallestDifferencesBrute(arr1, arr2 []int, k int) [][]int {
	if len(arr1) == 0 || len(arr2) == 0 || k <= 0 {
		return [][]int{}
	}

	// Generate all pairs with their differences
	type pairDiff struct {
		diff int
		num1 int
		num2 int
	}

	pairs := []pairDiff{}
	for _, num1 := range arr1 {
		for _, num2 := range arr2 {
			diff := abs(num1 - num2)
			pairs = append(pairs, pairDiff{diff, num1, num2})
		}
	}

	// Sort by difference
	sort.Slice(pairs, func(i, j int) bool {
		return pairs[i].diff < pairs[j].diff
	})

	// Return first k pairs
	result := [][]int{}
	for i := 0; i < k && i < len(pairs); i++ {
		result = append(result, []int{pairs[i].num1, pairs[i].num2})
	}

	return result
}

// ============================================================================
// APPROACH 3: Two-Pointer with Expansion
// ============================================================================
// Time Complexity:  O(k * (n + m)) in worst case
// Space Complexity: O(k)
//
// WHEN TO USE:
// - k is very small
// - Need space-efficient solution
// ============================================================================

// KSmallestDifferencesTwoPointer uses modified two-pointer with heap expansion.
func KSmallestDifferencesTwoPointer(arr1, arr2 []int, k int) [][]int {
	if len(arr1) == 0 || len(arr2) == 0 || k <= 0 {
		return [][]int{}
	}

	// Sort both arrays
	arr1Sorted := make([]int, len(arr1))
	arr2Sorted := make([]int, len(arr2))
	copy(arr1Sorted, arr1)
	copy(arr2Sorted, arr2)
	sort.Ints(arr1Sorted)
	sort.Ints(arr2Sorted)

	h := &PairHeap{}
	heap.Init(h)
	visited := make(map[[2]int]bool)

	// Start with (0, 0)
	diff := abs(arr1Sorted[0] - arr2Sorted[0])
	heap.Push(h, Pair{diff, 0, 0, arr1Sorted[0], arr2Sorted[0]})
	visited[[2]int{0, 0}] = true

	result := [][]int{}

	for h.Len() > 0 && len(result) < k {
		p := heap.Pop(h).(Pair)
		result = append(result, []int{p.val1, p.val2})

		// Expand to neighbors: (i+1, j), (i, j+1)
		neighbors := [][2]int{{p.i + 1, p.j}, {p.i, p.j + 1}}

		for _, n := range neighbors {
			ni, nj := n[0], n[1]
			if ni < len(arr1Sorted) && nj < len(arr2Sorted) {
				key := [2]int{ni, nj}
				if !visited[key] {
					newDiff := abs(arr1Sorted[ni] - arr2Sorted[nj])
					heap.Push(h, Pair{newDiff, ni, nj, arr1Sorted[ni], arr2Sorted[nj]})
					visited[key] = true
				}
			}
		}
	}

	return result
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// ============================================================================
// EDUCATIONAL: Detailed Walkthrough
// ============================================================================

// KSmallestDifferencesExplained shows step-by-step solution process.
func KSmallestDifferencesExplained(arr1, arr2 []int, k int) [][]int {
	fmt.Printf("Input:\n")
	fmt.Printf("  arr1 = %v\n", arr1)
	fmt.Printf("  arr2 = %v\n", arr2)
	fmt.Printf("  k = %d\n", k)

	sort.Ints(arr1)
	sort.Ints(arr2)

	fmt.Printf("\nAfter sorting:\n")
	fmt.Printf("  arr1 = %v\n", arr1)
	fmt.Printf("  arr2 = %v\n", arr2)

	result := [][]int{}
	h := &PairHeap{}
	heap.Init(h)
	visited := make(map[[2]int]bool)

	fmt.Printf("\nInitializing heap with starting pairs:\n")
	for i, val := range arr1 {
		j := sort.SearchInts(arr2, val)

		for _, jj := range []int{j, j - 1} {
			if jj >= 0 && jj < len(arr2) {
				key := [2]int{i, jj}
				if !visited[key] {
					diff := abs(val - arr2[jj])
					heap.Push(h, Pair{diff, i, jj, val, arr2[jj]})
					visited[key] = true
					fmt.Printf("  Added: (%d, %d) with diff=%d\n", val, arr2[jj], diff)
				}
			}
		}
	}

	fmt.Printf("\nExtracting %d smallest pairs:\n", k)

	step := 1
	for h.Len() > 0 && len(result) < k {
		p := heap.Pop(h).(Pair)
		result = append(result, []int{p.val1, p.val2})
		fmt.Printf("\n  Step %d: Pop (%d, %d) with diff=%d\n", step, p.val1, p.val2, p.diff)
		fmt.Printf("    Result so far: %v\n", result)

		for _, nj := range []int{p.j + 1, p.j - 1} {
			if nj >= 0 && nj < len(arr2) {
				key := [2]int{p.i, nj}
				if !visited[key] {
					newDiff := abs(arr1[p.i] - arr2[nj])
					heap.Push(h, Pair{newDiff, p.i, nj, arr1[p.i], arr2[nj]})
					visited[key] = true
					fmt.Printf("    Added neighbor: (%d, %d) with diff=%d\n", arr1[p.i], arr2[nj], newDiff)
				}
			}
		}

		step++
	}

	fmt.Printf("\nFinal result: %v\n", result)
	return result
}

// ============================================================================
// TEST CASES
// ============================================================================

func main() {
	testCases := []struct {
		arr1 []int
		arr2 []int
		k    int
		desc string
	}{
		{[]int{1, 3, 5}, []int{2, 4}, 3, "Basic example"},
		{[]int{1, 7, 11}, []int{2, 4, 6}, 4, "Medium example"},
		{[]int{1, 2}, []int{3}, 2, "Single element in arr2"},
		{[]int{1, 1, 2}, []int{1, 2, 3}, 4, "Duplicates in arrays"},
		{[]int{1, 5, 9}, []int{2, 6, 10}, 3, "Evenly spaced"},
		{[]int{-5, -1, 3}, []int{0, 2, 4}, 4, "Negative numbers"},
		{[]int{1}, []int{1}, 1, "Single elements, exact match"},
		{[]int{10, 20, 30}, []int{15, 25}, 5, "k equals total pairs"},
	}

	approaches := []struct {
		name string
		fn   func([]int, []int, int) [][]int
	}{
		{"Min-Heap (Recommended)", KSmallestDifferences},
		{"Brute Force + Sort", KSmallestDifferencesBrute},
		{"Two-Pointer Expansion", KSmallestDifferencesTwoPointer},
	}

	fmt.Println("======================================================================")
	fmt.Println("K SMALLEST DIFFERENCES - TEST RESULTS")
	fmt.Println("======================================================================")

	for _, approach := range approaches {
		fmt.Printf("\n%s:\n", approach.name)
		fmt.Println("--------------------------------------------------")
		allPassed := true

		for _, tc := range testCases {
			// Copy slices to avoid modification
			arr1 := make([]int, len(tc.arr1))
			arr2 := make([]int, len(tc.arr2))
			copy(arr1, tc.arr1)
			copy(arr2, tc.arr2)

			result := approach.fn(arr1, arr2, tc.k)

			// Verify result length
			expectedLen := tc.k
			if len(tc.arr1)*len(tc.arr2) < tc.k {
				expectedLen = len(tc.arr1) * len(tc.arr2)
			}

			status := "PASS"
			if len(result) != expectedLen {
				status = "FAIL"
				allPassed = false
			}

			// Show first 3 results
			display := result
			suffix := ""
			if len(result) > 3 {
				display = result[:3]
				suffix = "..."
			}
			fmt.Printf("  %s %s: %v%s\n", status, tc.desc, display, suffix)
		}

		if allPassed {
			fmt.Println("  All tests passed!")
		} else {
			fmt.Println("  Some tests failed!")
		}
	}

	fmt.Println("\n======================================================================")
	fmt.Println("DETAILED WALKTHROUGH")
	fmt.Println("======================================================================")
	fmt.Println()
	KSmallestDifferencesExplained([]int{1, 3, 5}, []int{2, 4}, 3)

	fmt.Println("\n======================================================================")
	fmt.Println("COMPLEXITY COMPARISON")
	fmt.Println("======================================================================")
	fmt.Println(`
    +---------------------------+--------------------+----------+------------------+
    |         Approach          |        Time        |  Space   |  Recommendation  |
    +---------------------------+--------------------+----------+------------------+
    | 1. Min-Heap               | O((n+m+k)log(n+m)) |  O(n+m)  |  BEST CHOICE     |
    | 2. Brute Force + Sort     | O(nm log(nm))      |  O(nm)   |  Slow            |
    | 3. Two-Pointer Expansion  | O(k * (n + m))     |  O(k)    |  When k small    |
    +---------------------------+--------------------+----------+------------------+

    Where: n = len(arr1), m = len(arr2)
    `)
}

/*
Sample Test Inputs:

Test 1: Basic example
arr1 = [1, 3, 5]
arr2 = [2, 4]
k = 3
Expected: [[1, 2], [3, 2], [3, 4]] or similar (all diff=1)

Test 2: Medium example
arr1 = [1, 7, 11]
arr2 = [2, 4, 6]
k = 4
Expected: Pairs sorted by difference

Test 3: With negative numbers
arr1 = [-5, -1, 3, 7]
arr2 = [-2, 0, 5]
k = 5
Expected: Pairs with smallest differences

To run: go run golang_code.go
*/
