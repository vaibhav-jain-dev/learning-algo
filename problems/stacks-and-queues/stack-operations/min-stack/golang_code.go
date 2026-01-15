package main

import (
	"fmt"
	"math"
	"strings"
)

// MinStack implements a stack with O(1) minimum retrieval using two stacks.
// The main stack stores all elements, while the min stack stores minimum values.
//
// Time Complexity: O(1) for all operations
// Space Complexity: O(n) where n is the number of elements
type MinStack struct {
	stack    []int // Main stack for all elements
	minStack []int // Stack to track minimums
}

// NewMinStack creates a new MinStack instance
func NewMinStack() *MinStack {
	return &MinStack{
		stack:    make([]int, 0),
		minStack: make([]int, 0),
	}
}

// Push adds an element to the stack
func (ms *MinStack) Push(val int) {
	ms.stack = append(ms.stack, val)

	// Push to minStack if it's empty or val is <= current min
	if len(ms.minStack) == 0 || val <= ms.minStack[len(ms.minStack)-1] {
		ms.minStack = append(ms.minStack, val)
	}
}

// Pop removes the top element from the stack
func (ms *MinStack) Pop() {
	if len(ms.stack) > 0 {
		val := ms.stack[len(ms.stack)-1]
		ms.stack = ms.stack[:len(ms.stack)-1]

		// If popped value is current min, pop from minStack too
		if val == ms.minStack[len(ms.minStack)-1] {
			ms.minStack = ms.minStack[:len(ms.minStack)-1]
		}
	}
}

// Top returns the top element of the stack
func (ms *MinStack) Top() int {
	return ms.stack[len(ms.stack)-1]
}

// GetMin retrieves the minimum element in the stack
func (ms *MinStack) GetMin() int {
	return ms.minStack[len(ms.minStack)-1]
}

// MinStackWithPairs stores (value, current_min) pairs
// Each element stores both its value and the minimum at the time it was pushed.
type MinStackWithPairs struct {
	stack []struct {
		val    int
		minVal int
	}
}

// NewMinStackWithPairs creates a new MinStackWithPairs instance
func NewMinStackWithPairs() *MinStackWithPairs {
	return &MinStackWithPairs{
		stack: make([]struct {
			val    int
			minVal int
		}, 0),
	}
}

// Push adds an element with current minimum
func (ms *MinStackWithPairs) Push(val int) {
	minVal := val
	if len(ms.stack) > 0 && ms.stack[len(ms.stack)-1].minVal < val {
		minVal = ms.stack[len(ms.stack)-1].minVal
	}
	ms.stack = append(ms.stack, struct {
		val    int
		minVal int
	}{val, minVal})
}

// Pop removes the top element
func (ms *MinStackWithPairs) Pop() {
	if len(ms.stack) > 0 {
		ms.stack = ms.stack[:len(ms.stack)-1]
	}
}

// Top returns the top element
func (ms *MinStackWithPairs) Top() int {
	return ms.stack[len(ms.stack)-1].val
}

// GetMin returns the minimum element
func (ms *MinStackWithPairs) GetMin() int {
	return ms.stack[len(ms.stack)-1].minVal
}

// MinStackOptimized uses a mathematical trick for space optimization
// Stores difference from minimum instead of actual values when a new minimum is found.
type MinStackOptimized struct {
	stack  []int64
	minVal int64
}

// NewMinStackOptimized creates a new MinStackOptimized instance
func NewMinStackOptimized() *MinStackOptimized {
	return &MinStackOptimized{
		stack:  make([]int64, 0),
		minVal: math.MaxInt64,
	}
}

// Push adds an element with encoding when new minimum is found
func (ms *MinStackOptimized) Push(val int) {
	v := int64(val)
	if len(ms.stack) == 0 {
		ms.stack = append(ms.stack, v)
		ms.minVal = v
	} else if v < ms.minVal {
		// Store encoded value: 2*val - min_val
		ms.stack = append(ms.stack, 2*v-ms.minVal)
		ms.minVal = v
	} else {
		ms.stack = append(ms.stack, v)
	}
}

// Pop removes the top element and restores previous minimum if needed
func (ms *MinStackOptimized) Pop() {
	if len(ms.stack) > 0 {
		top := ms.stack[len(ms.stack)-1]
		ms.stack = ms.stack[:len(ms.stack)-1]

		// If top < minVal, it's an encoded value
		if top < ms.minVal {
			// Restore previous minimum: 2*minVal - top
			ms.minVal = 2*ms.minVal - top
		}
	}
}

// Top returns the actual top value (decode if necessary)
func (ms *MinStackOptimized) Top() int {
	top := ms.stack[len(ms.stack)-1]
	if top < ms.minVal {
		// This is an encoded value, actual value is minVal
		return int(ms.minVal)
	}
	return int(top)
}

// GetMin returns the minimum value
func (ms *MinStackOptimized) GetMin() int {
	return int(ms.minVal)
}

// MinStackInterface defines the interface for all MinStack implementations
type MinStackInterface interface {
	Push(val int)
	Pop()
	Top() int
	GetMin() int
}

func testImplementation(name string, createStack func() MinStackInterface) bool {
	fmt.Printf("\nTesting %s:\n", name)
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	// Test 1: Basic operations from Example 1
	fmt.Println("\nTest 1: Basic operations")
	ms := createStack()
	ms.Push(-2)
	ms.Push(0)
	ms.Push(-3)

	result1 := ms.GetMin()
	expected1 := -3
	if result1 != expected1 {
		fmt.Printf("  FAIL: GetMin() = %d, expected %d\n", result1, expected1)
		allPassed = false
	} else {
		fmt.Printf("  PASS: GetMin() = %d\n", result1)
	}

	ms.Pop()

	result2 := ms.Top()
	expected2 := 0
	if result2 != expected2 {
		fmt.Printf("  FAIL: Top() = %d, expected %d\n", result2, expected2)
		allPassed = false
	} else {
		fmt.Printf("  PASS: Top() = %d\n", result2)
	}

	result3 := ms.GetMin()
	expected3 := -2
	if result3 != expected3 {
		fmt.Printf("  FAIL: GetMin() = %d, expected %d\n", result3, expected3)
		allPassed = false
	} else {
		fmt.Printf("  PASS: GetMin() = %d\n", result3)
	}

	// Test 2: Ascending order
	fmt.Println("\nTest 2: Ascending push order")
	ms = createStack()
	for _, i := range []int{1, 2, 3, 4, 5} {
		ms.Push(i)
	}

	if ms.GetMin() != 1 {
		fmt.Printf("  FAIL: GetMin() = %d, expected 1\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = 1 after pushing [1,2,3,4,5]")
	}

	// Test 3: Descending order
	fmt.Println("\nTest 3: Descending push order")
	ms = createStack()
	for _, i := range []int{5, 4, 3, 2, 1} {
		ms.Push(i)
	}

	if ms.GetMin() != 1 {
		fmt.Printf("  FAIL: GetMin() = %d, expected 1\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = 1 after pushing [5,4,3,2,1]")
	}

	ms.Pop() // Remove 1
	if ms.GetMin() != 2 {
		fmt.Printf("  FAIL: GetMin() = %d, expected 2 after pop\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = 2 after pop")
	}

	// Test 4: Duplicate minimums
	fmt.Println("\nTest 4: Duplicate minimum values")
	ms = createStack()
	ms.Push(2)
	ms.Push(0)
	ms.Push(3)
	ms.Push(0)

	if ms.GetMin() != 0 {
		fmt.Printf("  FAIL: GetMin() = %d, expected 0\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = 0")
	}

	ms.Pop() // Remove second 0
	if ms.GetMin() != 0 {
		fmt.Printf("  FAIL: GetMin() = %d, expected 0 (first 0 still there)\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = 0 after removing one 0")
	}

	ms.Pop() // Remove 3
	ms.Pop() // Remove first 0
	if ms.GetMin() != 2 {
		fmt.Printf("  FAIL: GetMin() = %d, expected 2\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = 2 after removing both 0s")
	}

	// Test 5: Negative numbers
	fmt.Println("\nTest 5: Negative numbers")
	ms = createStack()
	ms.Push(-1)
	ms.Push(-2)
	ms.Push(-3)

	if ms.GetMin() != -3 {
		fmt.Printf("  FAIL: GetMin() = %d, expected -3\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = -3")
	}

	ms.Pop()
	if ms.GetMin() != -2 {
		fmt.Printf("  FAIL: GetMin() = %d, expected -2\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = -2 after pop")
	}

	// Test 6: Single element
	fmt.Println("\nTest 6: Single element")
	ms = createStack()
	ms.Push(42)

	if ms.Top() != 42 {
		fmt.Printf("  FAIL: Top() = %d, expected 42\n", ms.Top())
		allPassed = false
	} else {
		fmt.Println("  PASS: Top() = 42")
	}

	if ms.GetMin() != 42 {
		fmt.Printf("  FAIL: GetMin() = %d, expected 42\n", ms.GetMin())
		allPassed = false
	} else {
		fmt.Println("  PASS: GetMin() = 42")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("All tests passed for %s: %v\n", name, allPassed)
	return allPassed
}

func runTests() {
	results := make([]bool, 0)

	// Test MinStack (Two Stacks)
	results = append(results, testImplementation("MinStack (Two Stacks)", func() MinStackInterface {
		return NewMinStack()
	}))

	// Test MinStackWithPairs
	results = append(results, testImplementation("MinStackWithPairs", func() MinStackInterface {
		return NewMinStackWithPairs()
	}))

	// Test MinStackOptimized
	results = append(results, testImplementation("MinStackOptimized", func() MinStackInterface {
		return NewMinStackOptimized()
	}))

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("SUMMARY")
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true
	for _, r := range results {
		if !r {
			allPassed = false
			break
		}
	}
	fmt.Printf("All implementations passed: %v\n", allPassed)
}

func main() {
	runTests()
}
