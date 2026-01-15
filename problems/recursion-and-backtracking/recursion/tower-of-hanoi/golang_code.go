// Tower of Hanoi
//
// This program demonstrates the Tower of Hanoi puzzle solution using recursion.
// Includes visualization of disk movements and state tracking.

package main

import (
	"fmt"
	"strings"
)

// Move represents a single disk move
type Move struct {
	Disk        int
	Source      string
	Destination string
}

func (m Move) String() string {
	return fmt.Sprintf("Move disk %d from %s to %s", m.Disk, m.Source, m.Destination)
}

// State represents the current state of all three rods
type State struct {
	A []int
	B []int
	C []int
}

// Copy creates a deep copy of the state
func (s State) Copy() State {
	return State{
		A: append([]int{}, s.A...),
		B: append([]int{}, s.B...),
		C: append([]int{}, s.C...),
	}
}

// TowerOfHanoi solves the puzzle and returns all moves
// Time Complexity: O(2^n)
// Space Complexity: O(n) for recursion stack
func TowerOfHanoi(n int, source, destination, auxiliary string) []Move {
	moves := []Move{}
	towerOfHanoiHelper(n, source, destination, auxiliary, &moves)
	return moves
}

func towerOfHanoiHelper(n int, source, destination, auxiliary string, moves *[]Move) {
	if n == 0 {
		return
	}

	// Step 1: Move n-1 disks from source to auxiliary
	towerOfHanoiHelper(n-1, source, auxiliary, destination, moves)

	// Step 2: Move the largest disk from source to destination
	*moves = append(*moves, Move{Disk: n, Source: source, Destination: destination})

	// Step 3: Move n-1 disks from auxiliary to destination
	towerOfHanoiHelper(n-1, auxiliary, destination, source, moves)
}

// StateHistory stores a move description and the resulting state
type StateHistory struct {
	Description string
	State       State
}

// TowerOfHanoiWithState solves and tracks state after each move
func TowerOfHanoiWithState(n int) []StateHistory {
	// Initialize state: all disks on rod A
	state := State{
		A: make([]int, n),
		B: []int{},
		C: []int{},
	}
	for i := 0; i < n; i++ {
		state.A[i] = n - i // [n, n-1, ..., 2, 1]
	}

	history := []StateHistory{
		{Description: "Initial state", State: state.Copy()},
	}

	var solve func(numDisks int, source, dest, aux string)
	solve = func(numDisks int, source, dest, aux string) {
		if numDisks == 0 {
			return
		}

		// Move n-1 disks to auxiliary
		solve(numDisks-1, source, aux, dest)

		// Move largest disk to destination
		moveDisk(&state, source, dest, numDisks)
		description := fmt.Sprintf("Move disk %d from %s to %s", numDisks, source, dest)
		history = append(history, StateHistory{Description: description, State: state.Copy()})

		// Move n-1 disks from auxiliary to destination
		solve(numDisks-1, aux, dest, source)
	}

	solve(n, "A", "C", "B")
	return history
}

func moveDisk(state *State, source, dest string, disk int) {
	// Get source and destination slices
	var srcSlice, destSlice *[]int

	switch source {
	case "A":
		srcSlice = &state.A
	case "B":
		srcSlice = &state.B
	case "C":
		srcSlice = &state.C
	}

	switch dest {
	case "A":
		destSlice = &state.A
	case "B":
		destSlice = &state.B
	case "C":
		destSlice = &state.C
	}

	// Remove from source
	*srcSlice = (*srcSlice)[:len(*srcSlice)-1]
	// Add to destination
	*destSlice = append(*destSlice, disk)
}

// VisualizeState creates a visual representation of the current state
func VisualizeState(state State, n int) string {
	var lines []string
	maxHeight := n

	getRod := func(rod string) []int {
		switch rod {
		case "A":
			return state.A
		case "B":
			return state.B
		case "C":
			return state.C
		}
		return nil
	}

	for level := maxHeight; level > 0; level-- {
		var row []string
		for _, rod := range []string{"A", "B", "C"} {
			disks := getRod(rod)
			if len(disks) >= level {
				disk := disks[level-1]
				diskStr := fmt.Sprintf("[%d]", disk)
				padding := strings.Repeat(" ", n-disk)
				row = append(row, padding+diskStr+padding)
			} else {
				padding := strings.Repeat(" ", n)
				row = append(row, padding+"|"+padding)
			}
		}
		lines = append(lines, strings.Join(row, "  "))
	}

	// Add base
	base := strings.Repeat("-", 2*n+1)
	lines = append(lines, strings.Join([]string{base, base, base}, "  "))

	// Add labels
	labelPadding := strings.Repeat(" ", n)
	lines = append(lines, strings.Join([]string{
		labelPadding + "A" + labelPadding,
		labelPadding + "B" + labelPadding,
		labelPadding + "C" + labelPadding,
	}, "  "))

	return strings.Join(lines, "\n")
}

// TowerOfHanoiWithTrace solves with detailed trace output
func TowerOfHanoiWithTrace(n int, source, destination, auxiliary string, depth int) int {
	indent := strings.Repeat("  ", depth)

	if n == 0 {
		return 0
	}

	fmt.Printf("%shanoi(%d, %s->%s, aux=%s)\n", indent, n, source, destination, auxiliary)

	// Step 1: Move n-1 disks to auxiliary
	moves1 := TowerOfHanoiWithTrace(n-1, source, auxiliary, destination, depth+1)

	// Step 2: Move largest disk
	fmt.Printf("%s  >> MOVE disk %d: %s -> %s\n", indent, n, source, destination)

	// Step 3: Move n-1 disks from auxiliary to destination
	moves2 := TowerOfHanoiWithTrace(n-1, auxiliary, destination, source, depth+1)

	return moves1 + 1 + moves2
}

// CountMoves calculates the number of moves required for n disks
func CountMoves(n int) int {
	return (1 << n) - 1 // 2^n - 1
}

func main() {
	fmt.Println(strings.Repeat("=", 70))
	fmt.Println("TOWER OF HANOI")
	fmt.Println(strings.Repeat("=", 70))

	// Test basic solution
	fmt.Println("\n1. Solution for n=3 disks:")
	fmt.Println(strings.Repeat("-", 50))
	moves := TowerOfHanoi(3, "A", "C", "B")
	for i, move := range moves {
		fmt.Printf("   Step %d: %s\n", i+1, move)
	}
	fmt.Printf("\n   Total moves: %d (expected: %d)\n", len(moves), CountMoves(3))

	// Test with state tracking
	fmt.Println("\n2. Visual Solution for n=3 disks:")
	fmt.Println(strings.Repeat("-", 50))
	history := TowerOfHanoiWithState(3)

	// Show first 4 states
	for i := 0; i < 4 && i < len(history); i++ {
		h := history[i]
		fmt.Printf("\n   %s:\n", h.Description)
		fmt.Println(VisualizeState(h.State, 3))
	}

	fmt.Println("\n   ... (showing final state)")
	lastH := history[len(history)-1]
	fmt.Printf("\n   After Step %d: %s\n", len(history)-1, lastH.Description)
	fmt.Println(VisualizeState(lastH.State, 3))

	// Trace output
	fmt.Println("\n3. Recursive Trace for n=3:")
	fmt.Println(strings.Repeat("-", 50))
	total := TowerOfHanoiWithTrace(3, "A", "C", "B", 0)
	fmt.Printf("\n   Total moves: %d\n", total)

	// Test move counts
	fmt.Println("\n4. Move Count Formula (2^n - 1):")
	fmt.Println(strings.Repeat("-", 50))
	for n := 1; n <= 10; n++ {
		moves := TowerOfHanoi(n, "A", "C", "B")
		expected := CountMoves(n)
		status := "PASS"
		if len(moves) != expected {
			status = "FAIL"
		}
		fmt.Printf("   n=%2d: moves=%4d, expected=%4d [%s]\n", n, len(moves), expected, status)
	}

	// Small example with full visualization
	fmt.Println("\n5. Complete Visualization for n=2:")
	fmt.Println(strings.Repeat("-", 50))
	history2 := TowerOfHanoiWithState(2)

	for i, h := range history2 {
		if i == 0 {
			fmt.Printf("\n   %s:\n", h.Description)
		} else {
			fmt.Printf("\n   Step %d: %s\n", i, h.Description)
		}
		fmt.Println(VisualizeState(h.State, 2))
	}

	// Verification tests
	fmt.Println("\n6. Verification Tests:")
	fmt.Println(strings.Repeat("-", 50))
	testCases := []int{1, 2, 3, 4, 5}

	for _, n := range testCases {
		history := TowerOfHanoiWithState(n)
		finalState := history[len(history)-1].State

		// Check all disks are on rod C
		allOnC := len(finalState.A) == 0 && len(finalState.B) == 0 && len(finalState.C) == n

		// Check correct number of moves
		correctMoves := len(history)-1 == CountMoves(n)

		status := "PASS"
		if !allOnC || !correctMoves {
			status = "FAIL"
		}
		fmt.Printf("   n=%d: All disks on C=%v, Moves correct=%v [%s]\n",
			n, allOnC, correctMoves, status)
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 70))
	fmt.Println("ALL TESTS COMPLETED!")
	fmt.Println(strings.Repeat("=", 70))
}
