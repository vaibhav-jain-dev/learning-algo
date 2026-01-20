/*
Disk Stacking - Go Solution

Find the stack of disks with maximum total height where each disk
must be strictly smaller in all dimensions than the disk below it.

Time Complexity: O(n^2)
Space Complexity: O(n)
*/

package main

import (
	"fmt"
	"sort"
)

// Disk represents a disk with width, depth, and height
type Disk struct {
	Width  int
	Depth  int
	Height int
}

// DiskStacking finds the maximum height stack of disks using bottom-up DP
func DiskStacking(disks []Disk) []Disk {
	if len(disks) == 0 {
		return []Disk{}
	}

	// Sort disks by height to ensure valid ordering
	sortedDisks := make([]Disk, len(disks))
	copy(sortedDisks, disks)
	sort.Slice(sortedDisks, func(i, j int) bool {
		return sortedDisks[i].Height < sortedDisks[j].Height
	})

	n := len(sortedDisks)

	// dp[i] = maximum height achievable ending with disk i
	dp := make([]int, n)
	for i := range dp {
		dp[i] = sortedDisks[i].Height
	}

	// prev[i] = index of previous disk in the optimal stack ending at i
	prev := make([]int, n)
	for i := range prev {
		prev[i] = -1
	}

	// Fill DP table
	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			// Check if disk j can go below disk i
			if canStack(sortedDisks[j], sortedDisks[i]) {
				if dp[j]+sortedDisks[i].Height > dp[i] {
					dp[i] = dp[j] + sortedDisks[i].Height
					prev[i] = j
				}
			}
		}
	}

	// Find the disk with maximum height
	maxHeight := dp[0]
	maxIdx := 0
	for i := 1; i < n; i++ {
		if dp[i] > maxHeight {
			maxHeight = dp[i]
			maxIdx = i
		}
	}

	// Backtrack to build the stack
	stack := []Disk{}
	current := maxIdx
	for current != -1 {
		stack = append(stack, sortedDisks[current])
		current = prev[current]
	}

	// Reverse stack
	for left, right := 0, len(stack)-1; left < right; left, right = left+1, right-1 {
		stack[left], stack[right] = stack[right], stack[left]
	}

	return stack
}

// canStack checks if 'above' disk can be placed on top of 'below' disk
func canStack(below, above Disk) bool {
	return below.Width < above.Width &&
		below.Depth < above.Depth &&
		below.Height < above.Height
}

// DiskStackingMaxHeight returns only the maximum stack height
func DiskStackingMaxHeight(disks []Disk) int {
	if len(disks) == 0 {
		return 0
	}

	sortedDisks := make([]Disk, len(disks))
	copy(sortedDisks, disks)
	sort.Slice(sortedDisks, func(i, j int) bool {
		return sortedDisks[i].Height < sortedDisks[j].Height
	})

	n := len(sortedDisks)
	dp := make([]int, n)
	for i := range dp {
		dp[i] = sortedDisks[i].Height
	}

	for i := 1; i < n; i++ {
		for j := 0; j < i; j++ {
			if canStack(sortedDisks[j], sortedDisks[i]) {
				if dp[j]+sortedDisks[i].Height > dp[i] {
					dp[i] = dp[j] + sortedDisks[i].Height
				}
			}
		}
	}

	maxHeight := dp[0]
	for _, h := range dp[1:] {
		if h > maxHeight {
			maxHeight = h
		}
	}
	return maxHeight
}

// DiskStackingRecursive uses top-down approach with memoization
func DiskStackingRecursive(disks []Disk) []Disk {
	if len(disks) == 0 {
		return []Disk{}
	}

	sortedDisks := make([]Disk, len(disks))
	copy(sortedDisks, disks)
	sort.Slice(sortedDisks, func(i, j int) bool {
		return sortedDisks[i].Height < sortedDisks[j].Height
	})

	n := len(sortedDisks)
	memo := make(map[int]int)

	var dp func(i int) int
	dp = func(i int) int {
		if val, exists := memo[i]; exists {
			return val
		}

		result := sortedDisks[i].Height

		for j := 0; j < i; j++ {
			if canStack(sortedDisks[j], sortedDisks[i]) {
				if dp(j)+sortedDisks[i].Height > result {
					result = dp(j) + sortedDisks[i].Height
				}
			}
		}

		memo[i] = result
		return result
	}

	// Compute dp for all disks
	maxHeight := 0
	maxIdx := 0
	for i := 0; i < n; i++ {
		val := dp(i)
		if val > maxHeight {
			maxHeight = val
			maxIdx = i
		}
	}

	// Reconstruct stack
	stack := []Disk{}
	currentHeight := maxHeight
	currentIdx := maxIdx

	for currentIdx >= 0 {
		disk := sortedDisks[currentIdx]
		if memo[currentIdx] == currentHeight {
			stack = append(stack, disk)
			currentHeight -= disk.Height
			// Find previous disk
			found := false
			for j := currentIdx - 1; j >= 0; j-- {
				if canStack(sortedDisks[j], disk) && memo[j] == currentHeight {
					currentIdx = j
					found = true
					break
				}
			}
			if !found {
				break
			}
		} else {
			currentIdx--
		}
	}

	// Reverse stack
	for left, right := 0, len(stack)-1; left < right; left, right = left+1, right-1 {
		stack[left], stack[right] = stack[right], stack[left]
	}

	return stack
}

// DiskStackingWithArrayInput accepts disks as [][]int for convenience
func DiskStackingWithArrayInput(disks [][]int) [][]int {
	converted := make([]Disk, len(disks))
	for i, d := range disks {
		converted[i] = Disk{d[0], d[1], d[2]}
	}

	result := DiskStacking(converted)

	output := make([][]int, len(result))
	for i, d := range result {
		output[i] = []int{d.Width, d.Depth, d.Height}
	}
	return output
}

// StackHeight calculates total height of a disk stack
func StackHeight(stack []Disk) int {
	total := 0
	for _, d := range stack {
		total += d.Height
	}
	return total
}

func main() {
	// Test 1: Standard case
	disks1 := []Disk{{2, 1, 2}, {3, 2, 3}, {2, 2, 8}, {2, 3, 4}, {1, 3, 1}, {4, 4, 5}}
	result1 := DiskStacking(disks1)
	fmt.Printf("Test 1: disks = %v\n", disks1)
	fmt.Printf("  Stack: %v\n", result1)
	fmt.Printf("  Height: %d\n", StackHeight(result1))
	// Expected: [{2 1 2} {3 2 3} {4 4 5}], height = 10

	// Test 2: Single disk
	disks2 := []Disk{{2, 1, 2}}
	result2 := DiskStacking(disks2)
	fmt.Printf("\nTest 2: disks = %v\n", disks2)
	fmt.Printf("  Stack: %v\n", result2)

	// Test 3: All stackable
	disks3 := []Disk{{1, 1, 1}, {2, 2, 2}, {3, 3, 3}}
	result3 := DiskStacking(disks3)
	fmt.Printf("\nTest 3: disks = %v\n", disks3)
	fmt.Printf("  Stack: %v\n", result3)
	fmt.Printf("  Height: %d\n", StackHeight(result3))
	// Expected: all 3 disks, height = 6

	// Test 4: No stacking possible
	disks4 := []Disk{{2, 2, 2}, {2, 2, 2}, {2, 2, 2}}
	result4 := DiskStacking(disks4)
	fmt.Printf("\nTest 4: disks = %v\n", disks4)
	fmt.Printf("  Stack: %v\n", result4)

	// Test 5: Empty input
	disks5 := []Disk{}
	result5 := DiskStacking(disks5)
	fmt.Printf("\nTest 5: disks = %v\n", disks5)
	fmt.Printf("  Stack: %v\n", result5)

	// Test 6: Compare methods
	disks6 := []Disk{{2, 1, 2}, {3, 2, 3}, {2, 2, 8}, {2, 3, 4}, {1, 3, 1}, {4, 4, 5}}
	fmt.Printf("\nTest 6 - Method comparison:\n")
	fmt.Printf("  Bottom-up: %v\n", DiskStacking(disks6))
	fmt.Printf("  Recursive: %v\n", DiskStackingRecursive(disks6))
	fmt.Printf("  Max height only: %d\n", DiskStackingMaxHeight(disks6))

	// Test 7: Using array input
	disks7 := [][]int{{2, 1, 2}, {3, 2, 3}, {2, 2, 8}, {2, 3, 4}, {1, 3, 1}, {4, 4, 5}}
	result7 := DiskStackingWithArrayInput(disks7)
	fmt.Printf("\nTest 7 - Array input:\n")
	fmt.Printf("  Result: %v\n", result7)

	// Test 8: More complex case
	disks8 := []Disk{{3, 3, 4}, {2, 2, 3}, {1, 1, 2}, {4, 4, 5}, {5, 5, 6}}
	result8 := DiskStacking(disks8)
	fmt.Printf("\nTest 8: disks = %v\n", disks8)
	fmt.Printf("  Stack: %v\n", result8)
	fmt.Printf("  Height: %d\n", StackHeight(result8))
	// Expected: all 5 disks stacked, height = 20

	fmt.Println("\nAll tests completed!")
}
