/*
Ambiguous Measurements - Go Solution

Determine if a target volume can be measured using cups with ambiguous markings.
*/

package main

import "fmt"

// Cup represents a measuring cup with a range [Low, High]
type Cup struct {
	Low  int
	High int
}

// AmbiguousMeasurements determines if target can be measured using cups with ranges.
// Uses memoized recursion.
func AmbiguousMeasurements(cups []Cup, target int) bool {
	// Memoization: map from state to result
	memo := make(map[[2]int]bool)

	var canMeasure func(currentLow, currentHigh int) bool
	canMeasure = func(currentLow, currentHigh int) bool {
		// Success: target is within achievable range
		if currentLow <= target && target <= currentHigh {
			return true
		}

		// Pruning: overshot, can't go back down
		if currentLow > target {
			return false
		}

		// Check memo
		state := [2]int{currentLow, currentHigh}
		if result, exists := memo[state]; exists {
			return result
		}

		// Try adding each cup
		for _, cup := range cups {
			if canMeasure(currentLow+cup.Low, currentHigh+cup.High) {
				memo[state] = true
				return true
			}
		}

		memo[state] = false
		return false
	}

	return canMeasure(0, 0)
}

// AmbiguousMeasurementsIterative uses BFS to find if target is achievable.
func AmbiguousMeasurementsIterative(cups []Cup, target int) bool {
	type state struct {
		low  int
		high int
	}

	visited := make(map[state]bool)
	queue := []state{{0, 0}}
	visited[state{0, 0}] = true

	for len(queue) > 0 {
		// Dequeue
		current := queue[0]
		queue = queue[1:]

		// Success check
		if current.low <= target && target <= current.high {
			return true
		}

		// Skip if overshot
		if current.low > target {
			continue
		}

		// Try adding each cup
		for _, cup := range cups {
			newState := state{current.low + cup.Low, current.high + cup.High}
			if !visited[newState] && newState.low <= target {
				visited[newState] = true
				queue = append(queue, newState)
			}
		}
	}

	return false
}

// AmbiguousMeasurementsDP uses dynamic programming with achievable ranges.
func AmbiguousMeasurementsDP(cups []Cup, target int) bool {
	type rangeState struct {
		low  int
		high int
	}

	// Set of achievable ranges
	achievable := make(map[rangeState]bool)
	achievable[rangeState{0, 0}] = true

	// Keep expanding until no new ranges are found
	changed := true
	for changed {
		changed = false
		newRanges := []rangeState{}

		for r := range achievable {
			// Check if we've found the target
			if r.low <= target && target <= r.high {
				return true
			}

			// Skip if already overshot
			if r.low > target {
				continue
			}

			// Try adding each cup
			for _, cup := range cups {
				newRange := rangeState{r.low + cup.Low, r.high + cup.High}
				if !achievable[newRange] && newRange.low <= target {
					newRanges = append(newRanges, newRange)
					changed = true
				}
			}
		}

		for _, r := range newRanges {
			achievable[r] = true
		}
	}

	// Final check
	for r := range achievable {
		if r.low <= target && target <= r.high {
			return true
		}
	}

	return false
}

func main() {
	// Test case 1
	cups1 := []Cup{{200, 210}, {450, 465}, {800, 850}}
	target1 := 2100
	fmt.Printf("Cups: %v\n", cups1)
	fmt.Printf("Target: %d\n", target1)
	fmt.Printf("Recursive: %v\n", AmbiguousMeasurements(cups1, target1))
	fmt.Printf("Iterative: %v\n", AmbiguousMeasurementsIterative(cups1, target1))

	// Test case 2
	cups2 := []Cup{{100, 150}}
	target2 := 200
	fmt.Printf("\nCups: %v\n", cups2)
	fmt.Printf("Target: %d\n", target2)
	fmt.Printf("Result: %v\n", AmbiguousMeasurements(cups2, target2))

	// Test case 3
	cups3 := []Cup{{50, 60}}
	target3 := 75
	fmt.Printf("\nCups: %v\n", cups3)
	fmt.Printf("Target: %d\n", target3)
	fmt.Printf("Result: %v\n", AmbiguousMeasurements(cups3, target3))

	// Test case 4
	cups4 := []Cup{{1, 2}, {3, 5}}
	target4 := 10
	fmt.Printf("\nCups: %v\n", cups4)
	fmt.Printf("Target: %d\n", target4)
	fmt.Printf("Result: %v\n", AmbiguousMeasurements(cups4, target4))
}
