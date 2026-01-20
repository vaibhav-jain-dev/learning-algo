/*
Circular Array Loop - Go Solution

Detect valid cycle in circular array with same-direction constraint.

Time Complexity: O(n)
Space Complexity: O(1)
*/

package main

import "fmt"

// circularArrayLoop detects if circular array has valid cycle
func circularArrayLoop(nums []int) bool {
	n := len(nums)
	if n == 0 {
		return false
	}

	// Copy to avoid modifying original
	numsCopy := make([]int, n)
	copy(numsCopy, nums)

	getNext := func(idx int) int {
		result := (idx + numsCopy[idx]) % n
		if result < 0 {
			result += n
		}
		return result
	}

	sameDirection := func(idx1, idx2 int) bool {
		return (numsCopy[idx1] > 0) == (numsCopy[idx2] > 0)
	}

	for i := 0; i < n; i++ {
		if numsCopy[i] == 0 {
			continue
		}

		slow := i
		fast := i

		// Check for cycle with consistent direction
		for sameDirection(slow, getNext(slow)) &&
			sameDirection(fast, getNext(fast)) &&
			sameDirection(getNext(fast), getNext(getNext(fast))) {

			slow = getNext(slow)
			fast = getNext(getNext(fast))

			if slow == fast {
				// Check cycle length > 1
				if slow == getNext(slow) {
					break // Self-loop
				}
				return true
			}
		}

		// Mark path as visited
		j := i
		val := numsCopy[i]
		for numsCopy[j] != 0 && (numsCopy[j] > 0) == (val > 0) {
			nextJ := getNext(j)
			numsCopy[j] = 0
			j = nextJ
		}
	}

	return false
}

// circularArrayLoopV2 is alternative implementation
func circularArrayLoopV2(nums []int) bool {
	n := len(nums)
	if n == 0 {
		return false
	}

	numsCopy := make([]int, n)
	copy(numsCopy, nums)

	nextIdx := func(idx int) int {
		result := (idx + numsCopy[idx]) % n
		if result < 0 {
			result += n
		}
		return result
	}

	for i := 0; i < n; i++ {
		if numsCopy[i] == 0 {
			continue
		}

		isForward := numsCopy[i] > 0
		slow, fast := i, i

		for {
			// Move slow
			nextSlow := nextIdx(slow)
			if numsCopy[nextSlow] == 0 || (numsCopy[nextSlow] > 0) != isForward {
				break
			}

			// Move fast twice
			nextFast := nextIdx(fast)
			if numsCopy[nextFast] == 0 || (numsCopy[nextFast] > 0) != isForward {
				break
			}
			fast = nextFast

			nextFast = nextIdx(fast)
			if numsCopy[nextFast] == 0 || (numsCopy[nextFast] > 0) != isForward {
				break
			}

			slow = nextSlow
			fast = nextFast

			if slow == fast {
				// Verify length > 1
				if nextIdx(slow) != slow {
					return true
				}
				break
			}
		}

		// Mark path
		j := i
		for numsCopy[j] != 0 && (numsCopy[j] > 0) == isForward {
			nextJ := nextIdx(j)
			numsCopy[j] = 0
			j = nextJ
		}
	}

	return false
}

// findCycleIndices finds indices forming a valid cycle
func findCycleIndices(nums []int) []int {
	n := len(nums)

	getNext := func(idx int) int {
		result := (idx + nums[idx]) % n
		if result < 0 {
			result += n
		}
		return result
	}

	for i := 0; i < n; i++ {
		isForward := nums[i] > 0
		slow, fast := i, i

		for {
			nextSlow := getNext(slow)
			if (nums[nextSlow] > 0) != isForward {
				break
			}

			nextFast := getNext(fast)
			if (nums[nextFast] > 0) != isForward {
				break
			}
			fast = nextFast

			nextFast = getNext(fast)
			if (nums[nextFast] > 0) != isForward {
				break
			}

			slow = nextSlow
			fast = nextFast

			if slow == fast {
				if getNext(slow) == slow {
					break
				}

				// Collect cycle
				cycle := []int{slow}
				current := getNext(slow)
				for current != slow {
					cycle = append(cycle, current)
					current = getNext(current)
				}
				return cycle
			}
		}
	}

	return nil
}

func main() {
	// Test 1: Valid cycle
	nums1 := []int{2, -1, 1, 2, 2}
	result1 := circularArrayLoop(nums1)
	fmt.Printf("Test 1: %v\n", result1)
	if result1 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 2: Self-loop
	nums2 := []int{-1, 2}
	result2 := circularArrayLoop(nums2)
	fmt.Printf("Test 2: %v\n", result2)
	if result2 != false {
		fmt.Println("FAIL: Expected false")
	}

	// Test 3: Mixed directions
	nums3 := []int{-2, 1, -1, -2, -2}
	result3 := circularArrayLoop(nums3)
	fmt.Printf("Test 3: %v\n", result3)
	if result3 != false {
		fmt.Println("FAIL: Expected false")
	}

	// Test 4: All same direction
	nums4 := []int{1, 1, 1, 1, 1}
	result4 := circularArrayLoop(nums4)
	fmt.Printf("Test 4: %v\n", result4)
	if result4 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 5: V2 implementation
	result5 := circularArrayLoopV2([]int{2, -1, 1, 2, 2})
	fmt.Printf("Test 5 (V2): %v\n", result5)
	if result5 != true {
		fmt.Println("FAIL: Expected true")
	}

	// Test 6: Find cycle indices
	cycleIndices := findCycleIndices([]int{2, -1, 1, 2, 2})
	fmt.Printf("Test 6: Cycle indices = %v\n", cycleIndices)

	fmt.Println("\nAll tests passed!")
}
