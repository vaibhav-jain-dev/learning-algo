/*
Koko Eating Bananas
Combines: Binary Search + Greedy Validation
*/

package main

import "fmt"

func minEatingSpeed(piles []int, h int) int {
	// Helper: check if speed k allows finishing in h hours
	canFinish := func(k int) bool {
		hours := 0
		for _, pile := range piles {
			hours += (pile + k - 1) / k // ceil(pile/k)
		}
		return hours <= h
	}

	// Find max pile
	maxPile := 0
	for _, pile := range piles {
		if pile > maxPile {
			maxPile = pile
		}
	}

	// Binary search
	left, right := 1, maxPile

	for left < right {
		mid := (left + right) / 2

		if canFinish(mid) {
			right = mid
		} else {
			left = mid + 1
		}
	}

	return left
}

func minEatingSpeedVerbose(piles []int, h int) int {
	hoursNeeded := func(k int) int {
		hours := 0
		for _, pile := range piles {
			hours += (pile + k - 1) / k
		}
		return hours
	}

	maxPile := 0
	for _, pile := range piles {
		if pile > maxPile {
			maxPile = pile
		}
	}

	fmt.Printf("\nPiles: %v\n", piles)
	fmt.Printf("Hours available: %d\n", h)
	fmt.Printf("Search range: [1, %d]\n", maxPile)
	fmt.Println("--------------------------------------------------")

	left, right := 1, maxPile
	iteration := 0

	for left < right {
		iteration++
		mid := (left + right) / 2
		hours := hoursNeeded(mid)

		result := "CAN"
		if hours > h {
			result = "CANNOT"
		}

		fmt.Printf("Iteration %d: speed=%d, hours_needed=%d (%s finish)\n",
			iteration, mid, hours, result)

		if hours <= h {
			right = mid
			fmt.Printf("  -> Try slower: [%d, %d]\n", left, mid)
		} else {
			left = mid + 1
			fmt.Printf("  -> Need faster: [%d, %d]\n", mid+1, right)
		}
	}

	fmt.Printf("\nMinimum speed: %d\n", left)
	fmt.Printf("Total hours: %d\n", hoursNeeded(left))

	return left
}

func main() {
	testCases := []struct {
		piles    []int
		h        int
		expected int
	}{
		{[]int{3, 6, 7, 11}, 8, 4},
		{[]int{30, 11, 23, 4, 20}, 5, 30},
		{[]int{30, 11, 23, 4, 20}, 6, 23},
		{[]int{312884470}, 312884469, 2},
	}

	fmt.Println("Koko Eating Bananas")
	fmt.Println("============================================================")

	for i, tc := range testCases {
		result := minEatingSpeed(tc.piles, tc.h)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("\nTest %d: piles=%v, h=%d\n", i+1, tc.piles, tc.h)
		fmt.Printf("  Result: %d (expected: %d) [%s]\n", result, tc.expected, status)
	}

	// Detailed example
	fmt.Println("\n============================================================")
	fmt.Println("Detailed execution:")
	fmt.Println("============================================================")
	minEatingSpeedVerbose([]int{3, 6, 7, 11}, 8)
}
