package main

import (
	"fmt"
	"strings"
)

// MyQueue implements a FIFO queue using two stacks with amortized O(1) operations.
// Uses an input stack for pushes and an output stack for pops/peeks.
// Elements are transferred from input to output only when output is empty.
//
// Time Complexity:
//   - Push: O(1)
//   - Pop: Amortized O(1)
//   - Peek: Amortized O(1)
//   - Empty: O(1)
//
// Space Complexity: O(n)
type MyQueue struct {
	inputStack  []int // Stack for push operations
	outputStack []int // Stack for pop/peek operations
}

// NewMyQueue creates a new MyQueue instance
func NewMyQueue() *MyQueue {
	return &MyQueue{
		inputStack:  make([]int, 0),
		outputStack: make([]int, 0),
	}
}

// Push adds element x to the back of queue
func (q *MyQueue) Push(x int) {
	q.inputStack = append(q.inputStack, x)
}

// Pop removes the element from the front of queue and returns it
func (q *MyQueue) Pop() int {
	q.transferIfNeeded()
	val := q.outputStack[len(q.outputStack)-1]
	q.outputStack = q.outputStack[:len(q.outputStack)-1]
	return val
}

// Peek returns the front element without removing it
func (q *MyQueue) Peek() int {
	q.transferIfNeeded()
	return q.outputStack[len(q.outputStack)-1]
}

// Empty returns whether the queue is empty
func (q *MyQueue) Empty() bool {
	return len(q.inputStack) == 0 && len(q.outputStack) == 0
}

// transferIfNeeded moves elements from input to output stack if output is empty
func (q *MyQueue) transferIfNeeded() {
	if len(q.outputStack) == 0 {
		for len(q.inputStack) > 0 {
			val := q.inputStack[len(q.inputStack)-1]
			q.inputStack = q.inputStack[:len(q.inputStack)-1]
			q.outputStack = append(q.outputStack, val)
		}
	}
}

// MyQueueSimple is a simpler (but less efficient) implementation
// Transfers all elements on every push operation.
// Time Complexity: Push O(n), Pop O(1), Peek O(1)
type MyQueueSimple struct {
	stack1 []int
	stack2 []int
}

// NewMyQueueSimple creates a new MyQueueSimple instance
func NewMyQueueSimple() *MyQueueSimple {
	return &MyQueueSimple{
		stack1: make([]int, 0),
		stack2: make([]int, 0),
	}
}

// Push adds element by transferring all elements
func (q *MyQueueSimple) Push(x int) {
	// Move all from stack1 to stack2
	for len(q.stack1) > 0 {
		val := q.stack1[len(q.stack1)-1]
		q.stack1 = q.stack1[:len(q.stack1)-1]
		q.stack2 = append(q.stack2, val)
	}

	// Push new element
	q.stack1 = append(q.stack1, x)

	// Move all back from stack2 to stack1
	for len(q.stack2) > 0 {
		val := q.stack2[len(q.stack2)-1]
		q.stack2 = q.stack2[:len(q.stack2)-1]
		q.stack1 = append(q.stack1, val)
	}
}

// Pop removes and returns the front element
func (q *MyQueueSimple) Pop() int {
	val := q.stack1[len(q.stack1)-1]
	q.stack1 = q.stack1[:len(q.stack1)-1]
	return val
}

// Peek returns the front element
func (q *MyQueueSimple) Peek() int {
	return q.stack1[len(q.stack1)-1]
}

// Empty checks if queue is empty
func (q *MyQueueSimple) Empty() bool {
	return len(q.stack1) == 0
}

// QueueInterface defines the interface for queue implementations
type QueueInterface interface {
	Push(x int)
	Pop() int
	Peek() int
	Empty() bool
}

// MyQueueWithTrace is a queue implementation with operation tracing
type MyQueueWithTrace struct {
	inputStack  []int
	outputStack []int
	trace       []string
}

// NewMyQueueWithTrace creates a new traced queue
func NewMyQueueWithTrace() *MyQueueWithTrace {
	return &MyQueueWithTrace{
		inputStack:  make([]int, 0),
		outputStack: make([]int, 0),
		trace:       make([]string, 0),
	}
}

// Push adds element with tracing
func (q *MyQueueWithTrace) Push(x int) {
	q.inputStack = append(q.inputStack, x)
	q.trace = append(q.trace, fmt.Sprintf("push(%d): input=%v, output=%v", x, q.inputStack, q.outputStack))
}

// Pop removes element with tracing
func (q *MyQueueWithTrace) Pop() int {
	q.transferIfNeeded()
	val := q.outputStack[len(q.outputStack)-1]
	q.outputStack = q.outputStack[:len(q.outputStack)-1]
	q.trace = append(q.trace, fmt.Sprintf("pop() -> %d: input=%v, output=%v", val, q.inputStack, q.outputStack))
	return val
}

// Peek returns front element with tracing
func (q *MyQueueWithTrace) Peek() int {
	q.transferIfNeeded()
	val := q.outputStack[len(q.outputStack)-1]
	q.trace = append(q.trace, fmt.Sprintf("peek() -> %d: input=%v, output=%v", val, q.inputStack, q.outputStack))
	return val
}

// Empty checks if empty with tracing
func (q *MyQueueWithTrace) Empty() bool {
	result := len(q.inputStack) == 0 && len(q.outputStack) == 0
	q.trace = append(q.trace, fmt.Sprintf("empty() -> %v: input=%v, output=%v", result, q.inputStack, q.outputStack))
	return result
}

// transferIfNeeded with tracing
func (q *MyQueueWithTrace) transferIfNeeded() {
	if len(q.outputStack) == 0 {
		q.trace = append(q.trace, fmt.Sprintf("  [Transfer] input=%v -> output", q.inputStack))
		for len(q.inputStack) > 0 {
			val := q.inputStack[len(q.inputStack)-1]
			q.inputStack = q.inputStack[:len(q.inputStack)-1]
			q.outputStack = append(q.outputStack, val)
		}
		q.trace = append(q.trace, fmt.Sprintf("  [After transfer] input=%v, output=%v", q.inputStack, q.outputStack))
	}
}

// GetTrace returns the operation trace
func (q *MyQueueWithTrace) GetTrace() []string {
	return q.trace
}

func testImplementation(name string, createQueue func() QueueInterface) bool {
	fmt.Printf("\nTesting %s:\n", name)
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	// Test 1: Basic operations
	fmt.Println("\nTest 1: Basic operations")
	queue := createQueue()
	queue.Push(1)
	queue.Push(2)

	result := queue.Peek()
	if result != 1 {
		fmt.Printf("  FAIL: Peek() = %d, expected 1\n", result)
		allPassed = false
	} else {
		fmt.Println("  PASS: Peek() = 1")
	}

	result = queue.Pop()
	if result != 1 {
		fmt.Printf("  FAIL: Pop() = %d, expected 1\n", result)
		allPassed = false
	} else {
		fmt.Println("  PASS: Pop() = 1")
	}

	empty := queue.Empty()
	if empty != false {
		fmt.Printf("  FAIL: Empty() = %v, expected false\n", empty)
		allPassed = false
	} else {
		fmt.Println("  PASS: Empty() = false")
	}

	// Test 2: Multiple pushes then pops
	fmt.Println("\nTest 2: Multiple pushes then pops")
	queue = createQueue()
	for i := 1; i <= 5; i++ {
		queue.Push(i)
	}

	for i := 1; i <= 5; i++ {
		result = queue.Pop()
		if result != i {
			fmt.Printf("  FAIL: Pop() = %d, expected %d\n", result, i)
			allPassed = false
		} else {
			fmt.Printf("  PASS: Pop() = %d\n", i)
		}
	}

	// Test 3: Interleaved push and pop
	fmt.Println("\nTest 3: Interleaved push and pop")
	queue = createQueue()
	queue.Push(1)
	queue.Push(2)
	result1 := queue.Pop() // Should be 1
	queue.Push(3)
	result2 := queue.Pop() // Should be 2
	result3 := queue.Pop() // Should be 3

	if result1 != 1 || result2 != 2 || result3 != 3 {
		fmt.Printf("  FAIL: Got %d, %d, %d, expected 1, 2, 3\n", result1, result2, result3)
		allPassed = false
	} else {
		fmt.Println("  PASS: Interleaved operations correct (1, 2, 3)")
	}

	// Test 4: Empty queue
	fmt.Println("\nTest 4: Empty queue")
	queue = createQueue()
	if queue.Empty() != true {
		fmt.Println("  FAIL: Empty() on new queue should be true")
		allPassed = false
	} else {
		fmt.Println("  PASS: Empty() = true for new queue")
	}

	queue.Push(42)
	if queue.Empty() != false {
		fmt.Println("  FAIL: Empty() after push should be false")
		allPassed = false
	} else {
		fmt.Println("  PASS: Empty() = false after push")
	}

	queue.Pop()
	if queue.Empty() != true {
		fmt.Println("  FAIL: Empty() after pop should be true")
		allPassed = false
	} else {
		fmt.Println("  PASS: Empty() = true after popping all")
	}

	// Test 5: Peek doesn't remove
	fmt.Println("\nTest 5: Peek doesn't remove element")
	queue = createQueue()
	queue.Push(100)
	peek1 := queue.Peek()
	peek2 := queue.Peek()
	pop1 := queue.Pop()

	if peek1 != 100 || peek2 != 100 || pop1 != 100 {
		fmt.Println("  FAIL: Peek should not remove element")
		allPassed = false
	} else {
		fmt.Println("  PASS: Multiple peeks return same value")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("All tests passed for %s: %v\n", name, allPassed)
	return allPassed
}

func runTests() {
	results := make([]bool, 0)

	// Test MyQueue (Amortized O(1))
	results = append(results, testImplementation("MyQueue (Amortized O(1))", func() QueueInterface {
		return NewMyQueue()
	}))

	// Test MyQueueSimple (O(n) push)
	results = append(results, testImplementation("MyQueueSimple (O(n) push)", func() QueueInterface {
		return NewMyQueueSimple()
	}))

	// Demonstrate trace functionality
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("Demonstrating operation trace:")
	fmt.Println(strings.Repeat("=", 60))

	queue := NewMyQueueWithTrace()
	queue.Push(1)
	queue.Push(2)
	queue.Push(3)
	queue.Peek()
	queue.Pop()
	queue.Push(4)
	queue.Pop()
	queue.Pop()
	queue.Empty()

	fmt.Println("\nOperation trace:")
	for _, line := range queue.GetTrace() {
		fmt.Printf("  %s\n", line)
	}

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
