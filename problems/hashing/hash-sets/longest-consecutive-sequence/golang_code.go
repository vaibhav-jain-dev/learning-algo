// Longest Consecutive Sequence
//
// This solution uses a hash set to achieve O(n) time complexity.
package main

import (
	"fmt"
	"sort"
)

// longestConsecutive finds the length of the longest consecutive sequence.
// Time Complexity: O(n)
// Space Complexity: O(n)
func longestConsecutive(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	// Convert to set for O(1) lookup
	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	maxLength := 0

	for num := range numSet {
		// Only start counting if this is the beginning of a sequence
		if !numSet[num-1] {
			currentNum := num
			currentLength := 1

			// Count consecutive numbers
			for numSet[currentNum+1] {
				currentNum++
				currentLength++
			}

			if currentLength > maxLength {
				maxLength = currentLength
			}
		}
	}

	return maxLength
}

// longestConsecutiveSorting uses sorting approach - O(n log n) time
func longestConsecutiveSorting(nums []int) int {
	if len(nums) == 0 {
		return 0
	}

	// Remove duplicates and sort
	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	sorted := make([]int, 0, len(numSet))
	for num := range numSet {
		sorted = append(sorted, num)
	}
	sort.Ints(sorted)

	maxLength := 1
	currentLength := 1

	for i := 1; i < len(sorted); i++ {
		if sorted[i] == sorted[i-1]+1 {
			currentLength++
			if currentLength > maxLength {
				maxLength = currentLength
			}
		} else {
			currentLength = 1
		}
	}

	return maxLength
}

func runTests() {
	testCases := []struct {
		nums     []int
		expected int
	}{
		{[]int{100, 4, 200, 1, 3, 2}, 4},
		{[]int{0, 3, 7, 2, 5, 8, 4, 6, 0, 1}, 9},
		{[]int{1, 2, 0, 1}, 3},
		{[]int{}, 0},
		{[]int{1}, 1},
		{[]int{1, 3, 5, 7}, 1},              // No consecutive
		{[]int{1, 2, 3, 4, 5}, 5},           // All consecutive
		{[]int{-1, 0, 1, 2}, 4},             // Negative numbers
		{[]int{9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6}, 7},  // 3,4,5,6,7,8,9
		{[]int{1, 1, 1, 1}, 1},              // All duplicates
	}

	fmt.Println("============================================================")
	fmt.Println("LONGEST CONSECUTIVE SEQUENCE - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := longestConsecutive(tc.nums)
		passed := result == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		displayNums := fmt.Sprintf("%v", tc.nums)
		if len(tc.nums) > 10 {
			displayNums = fmt.Sprintf("%v...(%d elements)", tc.nums[:5], len(tc.nums))
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: nums = %s\n", displayNums)
		fmt.Printf("  Output: %d\n", result)
		fmt.Printf("  Expected: %d\n", tc.expected)
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
	nums := []int{100, 4, 200, 1, 3, 2}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")
	fmt.Printf("Input: nums = %v\n", nums)

	// Convert to set
	numSet := make(map[int]bool)
	for _, num := range nums {
		numSet[num] = true
	}

	// Get sorted keys for demonstration
	sortedNums := make([]int, 0, len(numSet))
	for num := range numSet {
		sortedNums = append(sortedNums, num)
	}
	sort.Ints(sortedNums)

	fmt.Printf("\nStep 1: Convert to set -> %v\n", sortedNums)

	fmt.Println("\nStep 2: Find sequence starts and count lengths")
	maxLength := 0

	for _, num := range sortedNums {
		isStart := !numSet[num-1]
		fmt.Printf("\n  Number: %d\n", num)
		fmt.Printf("    %d in set? %v\n", num-1, numSet[num-1])
		fmt.Printf("    Is sequence start? %v\n", isStart)

		if isStart {
			currentNum := num
			currentLength := 1
			sequence := []int{num}

			for numSet[currentNum+1] {
				currentNum++
				currentLength++
				sequence = append(sequence, currentNum)
			}

			fmt.Printf("    Sequence: %v\n", sequence)
			fmt.Printf("    Length: %d\n", currentLength)

			if currentLength > maxLength {
				maxLength = currentLength
			}
		} else {
			fmt.Println("    Skipping (not a sequence start)")
		}
	}

	fmt.Printf("\nMax consecutive sequence length: %d\n", maxLength)
}

func explainTimeComplexity() {
	fmt.Println("\n============================================================")
	fmt.Println("TIME COMPLEXITY EXPLANATION")
	fmt.Println("============================================================")

	explanation := `
    Why is this O(n) and not O(n^2)?

    At first glance, we have:
    - Outer loop: iterates through all n elements
    - Inner while loop: could potentially iterate many times

    However, the key insight is:

    1. Each number is only counted ONCE as part of a sequence
       - We only start counting from sequence beginnings (num-1 not in set)
       - A number can only be the start of one sequence

    2. Example with [100, 4, 200, 1, 3, 2]:
       - 100: Is start (99 not in set), sequence [100], count 1 number
       - 200: Is start (199 not in set), sequence [200], count 1 number
       - 1:   Is start (0 not in set), sequence [1,2,3,4], count 4 numbers
       - 2:   Not start (1 is in set), skip
       - 3:   Not start (2 is in set), skip
       - 4:   Not start (3 is in set), skip

    Total numbers counted: 1 + 1 + 4 = 6 = n

    The while loop in total across ALL iterations of the outer loop
    visits each element at most once!
    `
	fmt.Println(explanation)
}

func main() {
	runTests()
	demonstrateApproach()
	explainTimeComplexity()
}
