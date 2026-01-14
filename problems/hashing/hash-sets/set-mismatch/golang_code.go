// Set Mismatch - Find duplicate and missing number
//
// This solution uses a hash set to find the duplicate and math for the missing number.
package main

import (
	"fmt"
)

// findErrorNums finds the duplicate and missing number.
// Time Complexity: O(n)
// Space Complexity: O(n)
func findErrorNums(nums []int) []int {
	n := len(nums)
	seen := make(map[int]bool)
	duplicate := -1

	// Find duplicate using set
	for _, num := range nums {
		if seen[num] {
			duplicate = num
		}
		seen[num] = true
	}

	// Find missing using math
	expectedSum := n * (n + 1) / 2
	actualSum := 0
	for _, num := range nums {
		actualSum += num
	}
	missing := expectedSum - actualSum + duplicate

	return []int{duplicate, missing}
}

// findErrorNumsFrequency uses frequency count approach
func findErrorNumsFrequency(nums []int) []int {
	n := len(nums)
	count := make([]int, n+1)

	for _, num := range nums {
		count[num]++
	}

	duplicate, missing := -1, -1
	for i := 1; i <= n; i++ {
		if count[i] == 2 {
			duplicate = i
		} else if count[i] == 0 {
			missing = i
		}
	}

	return []int{duplicate, missing}
}

// findErrorNumsMarking uses O(1) space by marking in place
func findErrorNumsMarking(nums []int) []int {
	duplicate, missing := -1, -1

	// Mark visited indices as negative
	for i := 0; i < len(nums); i++ {
		idx := abs(nums[i]) - 1
		if nums[idx] < 0 {
			duplicate = abs(nums[i])
		} else {
			nums[idx] = -nums[idx]
		}
	}

	// Find the index that's still positive (missing number)
	for i := 0; i < len(nums); i++ {
		if nums[i] > 0 {
			missing = i + 1
			break
		}
	}

	return []int{duplicate, missing}
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func runTests() {
	testCases := []struct {
		nums     []int
		expected []int
	}{
		{[]int{1, 2, 2, 4}, []int{2, 3}},
		{[]int{1, 1}, []int{1, 2}},
		{[]int{3, 2, 2}, []int{2, 1}},
		{[]int{2, 2}, []int{2, 1}},
		{[]int{1, 2, 3, 4, 4}, []int{4, 5}},
		{[]int{1, 5, 3, 2, 2, 7, 6, 4}, []int{2, 8}},
		{[]int{2, 3, 4, 5, 5}, []int{5, 1}},
		{[]int{1, 2, 3, 3}, []int{3, 4}},
	}

	fmt.Println("============================================================")
	fmt.Println("SET MISMATCH - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		// Make a copy to avoid modification
		numsCopy := make([]int, len(tc.nums))
		copy(numsCopy, tc.nums)

		result := findErrorNums(numsCopy)
		passed := result[0] == tc.expected[0] && result[1] == tc.expected[1]
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %v\n", tc.nums)
		fmt.Printf("  Output: %v\n", result)
		fmt.Printf("  Expected: %v\n", tc.expected)
		if passed {
			fmt.Printf("  Verification: duplicate=%d, missing=%d\n", result[0], result[1])
		}
	}

	fmt.Println("\n============================================================")
	if allPassed {
		fmt.Println("Overall: ALL TESTS PASSED")
	} else {
		fmt.Println("Overall: SOME TESTS FAILED")
	}
	fmt.Println("============================================================")
}

func demonstrateApproach() {
	nums := []int{1, 2, 2, 4}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")
	fmt.Printf("Input: nums = %v\n", nums)
	fmt.Printf("Expected: numbers 1 to %d\n", len(nums))

	// Step 1: Find duplicate using set
	fmt.Println("\n--- Step 1: Find Duplicate Using Set ---")
	seen := make(map[int]bool)
	duplicate := -1

	for i, num := range nums {
		fmt.Printf("  Processing nums[%d] = %d\n", i, num)
		keys := make([]int, 0, len(seen))
		for k := range seen {
			keys = append(keys, k)
		}
		fmt.Printf("    Current seen: %v\n", keys)
		if seen[num] {
			fmt.Printf("    %d already in set -> DUPLICATE FOUND!\n", num)
			duplicate = num
		} else {
			seen[num] = true
			fmt.Printf("    Added %d to seen\n", num)
		}
	}

	fmt.Printf("\nDuplicate: %d\n", duplicate)

	// Step 2: Find missing using math
	fmt.Println("\n--- Step 2: Find Missing Using Math ---")
	n := len(nums)
	expectedSum := n * (n + 1) / 2
	actualSum := 0
	for _, num := range nums {
		actualSum += num
	}

	fmt.Printf("  n = %d\n", n)
	fmt.Printf("  Expected sum (1 to %d): %d * (%d+1) / 2 = %d\n", n, n, n, expectedSum)
	fmt.Printf("  Actual sum: %d\n", actualSum)
	fmt.Printf("  Difference: %d - %d = %d\n", expectedSum, actualSum, expectedSum-actualSum)

	missing := expectedSum - actualSum + duplicate
	fmt.Printf("  Missing = expected - actual + duplicate\n")
	fmt.Printf("  Missing = %d - %d + %d = %d\n", expectedSum, actualSum, duplicate, missing)

	fmt.Printf("\nResult: [duplicate=%d, missing=%d]\n", duplicate, missing)
}

func demonstrateMarkingApproach() {
	nums := []int{1, 2, 2, 4}

	fmt.Println("\n============================================================")
	fmt.Println("MARKING APPROACH DEMONSTRATION (O(1) Space)")
	fmt.Println("============================================================")
	fmt.Printf("Input: nums = %v\n", nums)
	fmt.Println("Idea: Mark visited indices as negative")

	numsCopy := make([]int, len(nums))
	copy(numsCopy, nums)
	duplicate, missing := -1, -1

	fmt.Println("\n--- Marking Phase ---")
	for i := 0; i < len(numsCopy); i++ {
		idx := abs(numsCopy[i]) - 1
		fmt.Printf("  i=%d, value=%d, target index=%d\n", i, abs(numsCopy[i]), idx)
		fmt.Printf("    nums before: %v\n", numsCopy)

		if numsCopy[idx] < 0 {
			fmt.Printf("    nums[%d] is negative -> DUPLICATE: %d\n", idx, abs(numsCopy[i]))
			duplicate = abs(numsCopy[i])
		} else {
			numsCopy[idx] = -numsCopy[idx]
			fmt.Printf("    Marked nums[%d] as negative\n", idx)
		}
		fmt.Printf("    nums after:  %v\n", numsCopy)
	}

	fmt.Println("\n--- Finding Missing ---")
	for i := 0; i < len(numsCopy); i++ {
		fmt.Printf("  nums[%d] = %d", i, numsCopy[i])
		if numsCopy[i] > 0 {
			missing = i + 1
			fmt.Printf(" -> POSITIVE! Missing number: %d\n", missing)
			break
		} else {
			fmt.Println(" -> negative, continue")
		}
	}

	fmt.Printf("\nResult: [duplicate=%d, missing=%d]\n", duplicate, missing)
}

func main() {
	runTests()
	demonstrateApproach()
	demonstrateMarkingApproach()
}
