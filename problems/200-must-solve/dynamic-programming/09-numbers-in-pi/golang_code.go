/*
Numbers in Pi - Go Solution

Find the minimum number of spaces needed to split Pi string into numbers
that all exist in the given list.

Time Complexity: O(n^2 * m) where n is length of pi, m is max number length
Space Complexity: O(n + k) where k is total characters in numbers list
*/

package main

import (
	"fmt"
	"math"
)

// NumbersInPi finds minimum spaces to split pi into valid numbers using bottom-up DP
func NumbersInPi(pi string, numbers []string) int {
	if len(pi) == 0 {
		return 0
	}

	// Create a set for O(1) lookup
	numberSet := make(map[string]bool)
	for _, num := range numbers {
		numberSet[num] = true
	}

	n := len(pi)

	// dp[i] = minimum numbers needed to split pi[i:]
	// We use math.MaxInt to indicate impossible
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = math.MaxInt
	}
	dp[n] = 0 // Base case: empty string needs 0 numbers

	// Fill DP table from right to left
	for i := n - 1; i >= 0; i-- {
		// Try all possible prefixes starting at i
		for j := i; j < n; j++ {
			prefix := pi[i : j+1]

			if numberSet[prefix] {
				// If this prefix is valid and rest can be split
				if dp[j+1] != math.MaxInt {
					if dp[j+1]+1 < dp[i] {
						dp[i] = dp[j+1] + 1
					}
				}
			}
		}
	}

	// dp[0] is the number of segments; spaces = segments - 1
	if dp[0] == math.MaxInt {
		return -1
	}

	return dp[0] - 1
}

// NumbersInPiRecursive uses top-down approach with memoization
func NumbersInPiRecursive(pi string, numbers []string) int {
	if len(pi) == 0 {
		return 0
	}

	numberSet := make(map[string]bool)
	for _, num := range numbers {
		numberSet[num] = true
	}

	n := len(pi)
	memo := make(map[int]int)

	var dp func(i int) int
	dp = func(i int) int {
		if i == n {
			return 0
		}

		if val, exists := memo[i]; exists {
			return val
		}

		result := math.MaxInt

		for j := i; j < n; j++ {
			prefix := pi[i : j+1]

			if numberSet[prefix] {
				rest := dp(j + 1)
				if rest != math.MaxInt {
					if rest+1 < result {
						result = rest + 1
					}
				}
			}
		}

		memo[i] = result
		return result
	}

	result := dp(0)

	if result == math.MaxInt {
		return -1
	}

	return result - 1
}

// NumbersInPiWithSplits returns both the minimum spaces and one valid split
func NumbersInPiWithSplits(pi string, numbers []string) (int, []string) {
	if len(pi) == 0 {
		return 0, []string{}
	}

	numberSet := make(map[string]bool)
	for _, num := range numbers {
		numberSet[num] = true
	}

	n := len(pi)

	// dp[i] = (min_numbers, next_split_end) for pi[i:]
	type dpEntry struct {
		count int
		next  int
	}
	dp := make([]*dpEntry, n+1)
	dp[n] = &dpEntry{0, -1}

	for i := n - 1; i >= 0; i-- {
		best := math.MaxInt
		bestJ := -1

		for j := i; j < n; j++ {
			prefix := pi[i : j+1]

			if numberSet[prefix] {
				if dp[j+1] != nil && dp[j+1].count != math.MaxInt {
					if dp[j+1].count+1 < best {
						best = dp[j+1].count + 1
						bestJ = j + 1
					}
				}
			}
		}

		if best != math.MaxInt {
			dp[i] = &dpEntry{best, bestJ}
		}
	}

	if dp[0] == nil {
		return -1, []string{}
	}

	// Reconstruct the split
	splits := []string{}
	i := 0
	for i < n {
		nextI := dp[i].next
		splits = append(splits, pi[i:nextI])
		i = nextI
	}

	return dp[0].count - 1, splits
}

// NumbersInPiAllSolutions returns all valid ways to split pi with minimum spaces
func NumbersInPiAllSolutions(pi string, numbers []string) [][]string {
	if len(pi) == 0 {
		return [][]string{{}}
	}

	numberSet := make(map[string]bool)
	for _, num := range numbers {
		numberSet[num] = true
	}

	n := len(pi)

	// First pass: compute minimum numbers needed
	dp := make([]int, n+1)
	for i := range dp {
		dp[i] = math.MaxInt
	}
	dp[n] = 0

	for i := n - 1; i >= 0; i-- {
		for j := i; j < n; j++ {
			prefix := pi[i : j+1]
			if numberSet[prefix] && dp[j+1] != math.MaxInt {
				if dp[j+1]+1 < dp[i] {
					dp[i] = dp[j+1] + 1
				}
			}
		}
	}

	if dp[0] == math.MaxInt {
		return [][]string{}
	}

	// Second pass: collect all solutions with minimum splits
	var collect func(i int, current []string) [][]string
	collect = func(i int, current []string) [][]string {
		if i == n {
			result := make([]string, len(current))
			copy(result, current)
			return [][]string{result}
		}

		var results [][]string
		for j := i; j < n; j++ {
			prefix := pi[i : j+1]
			if numberSet[prefix] {
				expected := dp[i] - 1
				if dp[j+1] == expected {
					results = append(results, collect(j+1, append(current, prefix))...)
				}
			}
		}

		return results
	}

	return collect(0, []string{})
}

func main() {
	// Test 1: Standard case
	pi1 := "3141592653589793238462643383279"
	nums1 := []string{"314159265358979323846", "26433", "8", "3279",
		"314159265", "35897932384626433832", "79"}
	result1 := NumbersInPi(pi1, nums1)
	fmt.Printf("Test 1: pi = '%s...'\n", pi1[:20])
	fmt.Printf("  Result: %d\n", result1)
	// Expected: 2

	// Test 2: Simple case
	pi2 := "314159"
	nums2 := []string{"314", "159", "3141", "59"}
	result2 := NumbersInPi(pi2, nums2)
	fmt.Printf("\nTest 2: pi = '%s'\n", pi2)
	fmt.Printf("  Numbers: %v\n", nums2)
	fmt.Printf("  Result: %d\n", result2)
	// Expected: 1

	// Test 3: Sequential split
	pi3 := "123456"
	nums3 := []string{"12", "34", "56"}
	result3 := NumbersInPi(pi3, nums3)
	fmt.Printf("\nTest 3: pi = '%s'\n", pi3)
	fmt.Printf("  Numbers: %v\n", nums3)
	fmt.Printf("  Result: %d\n", result3)
	// Expected: 2

	// Test 4: Impossible
	pi4 := "12345"
	nums4 := []string{"12", "56"}
	result4 := NumbersInPi(pi4, nums4)
	fmt.Printf("\nTest 4: pi = '%s'\n", pi4)
	fmt.Printf("  Numbers: %v\n", nums4)
	fmt.Printf("  Result: %d\n", result4)
	// Expected: -1

	// Test 5: Single number
	pi5 := "12345"
	nums5 := []string{"12345"}
	result5 := NumbersInPi(pi5, nums5)
	fmt.Printf("\nTest 5: pi = '%s'\n", pi5)
	fmt.Printf("  Numbers: %v\n", nums5)
	fmt.Printf("  Result: %d\n", result5)
	// Expected: 0

	// Test 6: Compare methods
	pi6 := "314159"
	nums6 := []string{"314", "159", "3141", "59"}
	fmt.Printf("\nTest 6 - Method comparison for '%s':\n", pi6)
	fmt.Printf("  Bottom-up: %d\n", NumbersInPi(pi6, nums6))
	fmt.Printf("  Recursive: %d\n", NumbersInPiRecursive(pi6, nums6))

	// Test 7: Get actual splits
	pi7 := "314159"
	nums7 := []string{"314", "159", "3141", "59"}
	spaces, splits := NumbersInPiWithSplits(pi7, nums7)
	fmt.Printf("\nTest 7 - With splits for '%s':\n", pi7)
	fmt.Printf("  Min spaces: %d\n", spaces)
	fmt.Printf("  Split: %v\n", splits)

	// Test 8: All solutions
	pi8 := "314159"
	nums8 := []string{"314", "159", "3141", "59"}
	allSols := NumbersInPiAllSolutions(pi8, nums8)
	fmt.Printf("\nTest 8 - All solutions for '%s':\n", pi8)
	for _, sol := range allSols {
		fmt.Printf("  %v\n", sol)
	}

	// Test 9: Empty input
	pi9 := ""
	nums9 := []string{"12"}
	result9 := NumbersInPi(pi9, nums9)
	fmt.Printf("\nTest 9: pi = '' (empty)\n")
	fmt.Printf("  Result: %d\n", result9)
	// Expected: 0

	fmt.Println("\nAll tests completed!")
}
