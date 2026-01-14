// Happy Number
//
// This solution uses a hash set to detect cycles.
package main

import (
	"fmt"
	"strconv"
)

// isHappy determines if n is a happy number.
// Time Complexity: O(log n)
// Space Complexity: O(log n)
func isHappy(n int) bool {
	seen := make(map[int]bool)

	for n != 1 && !seen[n] {
		seen[n] = true
		n = sumOfSquares(n)
	}

	return n == 1
}

// sumOfSquares calculates the sum of squares of digits
func sumOfSquares(n int) int {
	total := 0
	for n > 0 {
		digit := n % 10
		total += digit * digit
		n /= 10
	}
	return total
}

// isHappyFloyd uses Floyd's cycle detection - O(1) space
func isHappyFloyd(n int) bool {
	slow := n
	fast := sumOfSquares(n)

	for fast != 1 && slow != fast {
		slow = sumOfSquares(slow)
		fast = sumOfSquares(sumOfSquares(fast))
	}

	return fast == 1
}

func runTests() {
	testCases := []struct {
		n        int
		expected bool
	}{
		{19, true},
		{2, false},
		{7, true},
		{1, true},
		{10, true},      // 1 + 0 = 1
		{100, true},     // 1 + 0 + 0 = 1
		{13, true},      // 1 + 9 = 10 -> 1
		{4, false},      // Enters cycle
		{89, false},     // Part of the unhappy cycle
		{82, true},      // Part of 19's path
		{1111111, true}, // 7 * 1 = 7 -> happy
	}

	fmt.Println("============================================================")
	fmt.Println("HAPPY NUMBER - Test Results")
	fmt.Println("============================================================")

	allPassed := true

	for i, tc := range testCases {
		result := isHappy(tc.n)
		passed := result == tc.expected
		status := "PASS"
		if !passed {
			status = "FAIL"
			allPassed = false
		}

		fmt.Printf("\nTest %d: %s\n", i+1, status)
		fmt.Printf("  Input: n = %d\n", tc.n)
		fmt.Printf("  Output: %v\n", result)
		fmt.Printf("  Expected: %v\n", tc.expected)
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
	examples := []int{19, 2}

	fmt.Println("\n============================================================")
	fmt.Println("STEP-BY-STEP DEMONSTRATION")
	fmt.Println("============================================================")

	for _, n := range examples {
		fmt.Printf("\nChecking if %d is happy:\n", n)
		fmt.Println("----------------------------------------")

		seen := make(map[int]bool)
		current := n
		step := 0

		for current != 1 && !seen[current] {
			step++
			seen[current] = true

			// Show calculation
			str := strconv.Itoa(current)
			var calcParts []string
			var sumParts []string
			nextVal := 0

			for _, ch := range str {
				d := int(ch - '0')
				calcParts = append(calcParts, fmt.Sprintf("%d^2", d))
				sumParts = append(sumParts, fmt.Sprintf("%d", d*d))
				nextVal += d * d
			}

			calc := ""
			sumCalc := ""
			for i := range calcParts {
				if i > 0 {
					calc += " + "
					sumCalc += " + "
				}
				calc += calcParts[i]
				sumCalc += sumParts[i]
			}

			fmt.Printf("Step %d: %d\n", step, current)
			fmt.Printf("  %s = %s = %d\n", calc, sumCalc, nextVal)

			current = nextVal

			if len(seen) > 20 {
				fmt.Println("  ... (continuing)")
				break
			}
		}

		if current == 1 {
			fmt.Printf("\nReached 1! %d is HAPPY\n", n)
		} else {
			fmt.Printf("\nCycle detected at %d! %d is NOT HAPPY\n", current, n)
		}
	}
}

func demonstrateFloyd() {
	fmt.Println("\n============================================================")
	fmt.Println("FLOYD'S CYCLE DETECTION DEMONSTRATION")
	fmt.Println("============================================================")

	n := 2 // Not happy, will cycle

	fmt.Printf("\nChecking n = %d using Floyd's algorithm:\n", n)
	fmt.Println("----------------------------------------")

	slow := n
	fast := sumOfSquares(n)
	step := 0

	fmt.Printf("Initial: slow = %d, fast = %d\n", slow, fast)

	for fast != 1 && slow != fast {
		step++
		slow = sumOfSquares(slow)
		fast = sumOfSquares(sumOfSquares(fast))
		fmt.Printf("Step %d: slow = %d, fast = %d\n", step, slow, fast)

		if step > 20 {
			fmt.Println("... (continuing)")
			break
		}
	}

	if fast == 1 {
		fmt.Printf("\nfast reached 1! %d is HAPPY\n", n)
	} else {
		fmt.Printf("\nslow == fast at %d! Cycle detected, %d is NOT HAPPY\n", slow, n)
	}
}

func main() {
	runTests()
	demonstrateApproach()
	demonstrateFloyd()
}
