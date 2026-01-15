package main

import (
	"fmt"
	"strings"
)

// MyCircularQueue implements a circular queue using a fixed-size array.
// Uses front and rear pointers with modulo arithmetic for wraparound.
//
// Time Complexity: O(1) for all operations
// Space Complexity: O(k) where k is the capacity
type MyCircularQueue struct {
	queue    []int
	capacity int
	front    int
	rear     int
	count    int
}

// NewMyCircularQueue creates a new circular queue with capacity k
func NewMyCircularQueue(k int) *MyCircularQueue {
	return &MyCircularQueue{
		queue:    make([]int, k),
		capacity: k,
		front:    0,
		rear:     0,
		count:    0,
	}
}

// EnQueue inserts an element into the queue. Returns true if successful.
func (cq *MyCircularQueue) EnQueue(value int) bool {
	if cq.IsFull() {
		return false
	}

	cq.queue[cq.rear] = value
	cq.rear = (cq.rear + 1) % cq.capacity
	cq.count++
	return true
}

// DeQueue deletes an element from the queue. Returns true if successful.
func (cq *MyCircularQueue) DeQueue() bool {
	if cq.IsEmpty() {
		return false
	}

	cq.front = (cq.front + 1) % cq.capacity
	cq.count--
	return true
}

// Front gets the front item. Returns -1 if empty.
func (cq *MyCircularQueue) Front() int {
	if cq.IsEmpty() {
		return -1
	}
	return cq.queue[cq.front]
}

// Rear gets the last item. Returns -1 if empty.
func (cq *MyCircularQueue) Rear() int {
	if cq.IsEmpty() {
		return -1
	}
	// rear points to next empty slot, so actual rear is one position back
	return cq.queue[(cq.rear-1+cq.capacity)%cq.capacity]
}

// IsEmpty checks if the queue is empty.
func (cq *MyCircularQueue) IsEmpty() bool {
	return cq.count == 0
}

// IsFull checks if the queue is full.
func (cq *MyCircularQueue) IsFull() bool {
	return cq.count == cq.capacity
}

// MyCircularQueueNoCount is an alternative implementation without explicit count.
// Uses one extra slot to differentiate between empty and full states.
type MyCircularQueueNoCount struct {
	queue    []int
	capacity int
	front    int
	rear     int
}

// NewMyCircularQueueNoCount creates a new queue with k+1 slots
func NewMyCircularQueueNoCount(k int) *MyCircularQueueNoCount {
	return &MyCircularQueueNoCount{
		queue:    make([]int, k+1),
		capacity: k + 1, // Extra slot to differentiate empty/full
		front:    0,
		rear:     0,
	}
}

// EnQueue inserts element if not full
func (cq *MyCircularQueueNoCount) EnQueue(value int) bool {
	if cq.IsFull() {
		return false
	}

	cq.queue[cq.rear] = value
	cq.rear = (cq.rear + 1) % cq.capacity
	return true
}

// DeQueue deletes element if not empty
func (cq *MyCircularQueueNoCount) DeQueue() bool {
	if cq.IsEmpty() {
		return false
	}

	cq.front = (cq.front + 1) % cq.capacity
	return true
}

// Front gets front element
func (cq *MyCircularQueueNoCount) Front() int {
	if cq.IsEmpty() {
		return -1
	}
	return cq.queue[cq.front]
}

// Rear gets rear element
func (cq *MyCircularQueueNoCount) Rear() int {
	if cq.IsEmpty() {
		return -1
	}
	return cq.queue[(cq.rear-1+cq.capacity)%cq.capacity]
}

// IsEmpty checks if empty (front equals rear)
func (cq *MyCircularQueueNoCount) IsEmpty() bool {
	return cq.front == cq.rear
}

// IsFull checks if full (rear is one behind front with wraparound)
func (cq *MyCircularQueueNoCount) IsFull() bool {
	return (cq.rear+1)%cq.capacity == cq.front
}

// CircularQueueInterface defines the interface for circular queue implementations
type CircularQueueInterface interface {
	EnQueue(value int) bool
	DeQueue() bool
	Front() int
	Rear() int
	IsEmpty() bool
	IsFull() bool
}

// MyCircularQueueWithTrace is a circular queue with operation tracing
type MyCircularQueueWithTrace struct {
	queue    []interface{} // Use interface{} to show nil for empty slots
	capacity int
	front    int
	rear     int
	count    int
	trace    []string
}

// NewMyCircularQueueWithTrace creates a traced queue
func NewMyCircularQueueWithTrace(k int) *MyCircularQueueWithTrace {
	queue := make([]interface{}, k)
	for i := range queue {
		queue[i] = nil
	}
	return &MyCircularQueueWithTrace{
		queue:    queue,
		capacity: k,
		front:    0,
		rear:     0,
		count:    0,
		trace:    []string{fmt.Sprintf("Created queue with capacity %d", k)},
	}
}

func (cq *MyCircularQueueWithTrace) stateStr() string {
	return fmt.Sprintf("queue=%v, front=%d, rear=%d, count=%d", cq.queue, cq.front, cq.rear, cq.count)
}

func (cq *MyCircularQueueWithTrace) EnQueue(value int) bool {
	if cq.IsFull() {
		cq.trace = append(cq.trace, fmt.Sprintf("EnQueue(%d) -> false (full), %s", value, cq.stateStr()))
		return false
	}

	cq.queue[cq.rear] = value
	cq.rear = (cq.rear + 1) % cq.capacity
	cq.count++
	cq.trace = append(cq.trace, fmt.Sprintf("EnQueue(%d) -> true, %s", value, cq.stateStr()))
	return true
}

func (cq *MyCircularQueueWithTrace) DeQueue() bool {
	if cq.IsEmpty() {
		cq.trace = append(cq.trace, fmt.Sprintf("DeQueue() -> false (empty), %s", cq.stateStr()))
		return false
	}

	removed := cq.queue[cq.front]
	cq.queue[cq.front] = nil
	cq.front = (cq.front + 1) % cq.capacity
	cq.count--
	cq.trace = append(cq.trace, fmt.Sprintf("DeQueue() -> true (removed %v), %s", removed, cq.stateStr()))
	return true
}

func (cq *MyCircularQueueWithTrace) Front() int {
	if cq.IsEmpty() {
		cq.trace = append(cq.trace, "Front() -> -1 (empty)")
		return -1
	}
	val := cq.queue[cq.front].(int)
	cq.trace = append(cq.trace, fmt.Sprintf("Front() -> %d", val))
	return val
}

func (cq *MyCircularQueueWithTrace) Rear() int {
	if cq.IsEmpty() {
		cq.trace = append(cq.trace, "Rear() -> -1 (empty)")
		return -1
	}
	val := cq.queue[(cq.rear-1+cq.capacity)%cq.capacity].(int)
	cq.trace = append(cq.trace, fmt.Sprintf("Rear() -> %d", val))
	return val
}

func (cq *MyCircularQueueWithTrace) IsEmpty() bool {
	return cq.count == 0
}

func (cq *MyCircularQueueWithTrace) IsFull() bool {
	return cq.count == cq.capacity
}

func (cq *MyCircularQueueWithTrace) GetTrace() []string {
	return cq.trace
}

func testImplementation(name string, createQueue func(int) CircularQueueInterface) bool {
	fmt.Printf("\nTesting %s:\n", name)
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	// Test 1: Basic operations
	fmt.Println("\nTest 1: Basic operations")
	queue := createQueue(3)

	type testOp struct {
		name     string
		result   interface{}
		expected interface{}
	}

	results := []testOp{
		{"EnQueue(1)", queue.EnQueue(1), true},
		{"EnQueue(2)", queue.EnQueue(2), true},
		{"EnQueue(3)", queue.EnQueue(3), true},
		{"EnQueue(4)", queue.EnQueue(4), false}, // Full
		{"Rear()", queue.Rear(), 3},
		{"IsFull()", queue.IsFull(), true},
		{"DeQueue()", queue.DeQueue(), true},
		{"EnQueue(4)", queue.EnQueue(4), true}, // Wraparound
		{"Rear()", queue.Rear(), 4},
	}

	for _, op := range results {
		if op.result != op.expected {
			fmt.Printf("  FAIL: %s = %v, expected %v\n", op.name, op.result, op.expected)
			allPassed = false
		} else {
			fmt.Printf("  PASS: %s = %v\n", op.name, op.result)
		}
	}

	// Test 2: Empty queue operations
	fmt.Println("\nTest 2: Empty queue operations")
	queue = createQueue(2)

	if queue.IsEmpty() != true {
		fmt.Println("  FAIL: IsEmpty() on new queue should be true")
		allPassed = false
	} else {
		fmt.Println("  PASS: IsEmpty() = true for new queue")
	}

	if queue.Front() != -1 {
		fmt.Println("  FAIL: Front() on empty queue should be -1")
		allPassed = false
	} else {
		fmt.Println("  PASS: Front() = -1 for empty queue")
	}

	if queue.Rear() != -1 {
		fmt.Println("  FAIL: Rear() on empty queue should be -1")
		allPassed = false
	} else {
		fmt.Println("  PASS: Rear() = -1 for empty queue")
	}

	if queue.DeQueue() != false {
		fmt.Println("  FAIL: DeQueue() on empty queue should be false")
		allPassed = false
	} else {
		fmt.Println("  PASS: DeQueue() = false for empty queue")
	}

	// Test 3: Fill and empty cycle
	fmt.Println("\nTest 3: Fill and empty cycle")
	queue = createQueue(3)

	for i := 0; i < 3; i++ {
		queue.EnQueue(i)
	}

	dequeued := []int{}
	for !queue.IsEmpty() {
		front := queue.Front()
		queue.DeQueue()
		dequeued = append(dequeued, front)
	}

	expected := []int{0, 1, 2}
	match := len(dequeued) == len(expected)
	if match {
		for i := range dequeued {
			if dequeued[i] != expected[i] {
				match = false
				break
			}
		}
	}

	if !match {
		fmt.Printf("  FAIL: Dequeued order %v, expected %v\n", dequeued, expected)
		allPassed = false
	} else {
		fmt.Println("  PASS: FIFO order maintained")
	}

	// Test 4: Multiple wraparounds
	fmt.Println("\nTest 4: Multiple wraparounds")
	queue = createQueue(3)

	queue.EnQueue(1)
	queue.EnQueue(2)
	queue.DeQueue() // Remove 1
	queue.EnQueue(3)
	queue.DeQueue() // Remove 2
	queue.EnQueue(4)

	if queue.Front() != 3 {
		fmt.Printf("  FAIL: Front() = %d, expected 3\n", queue.Front())
		allPassed = false
	} else {
		fmt.Println("  PASS: Front() = 3 after wraparound")
	}

	if queue.Rear() != 4 {
		fmt.Printf("  FAIL: Rear() = %d, expected 4\n", queue.Rear())
		allPassed = false
	} else {
		fmt.Println("  PASS: Rear() = 4 after wraparound")
	}

	// Test 5: Capacity 1
	fmt.Println("\nTest 5: Capacity 1")
	queue = createQueue(1)

	queue.EnQueue(5)
	if queue.IsFull() != true {
		fmt.Println("  FAIL: IsFull() should be true after 1 enqueue")
		allPassed = false
	} else {
		fmt.Println("  PASS: IsFull() = true for capacity 1")
	}

	if queue.EnQueue(6) != false {
		fmt.Println("  FAIL: EnQueue should fail when full")
		allPassed = false
	} else {
		fmt.Println("  PASS: EnQueue fails when full")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("All tests passed for %s: %v\n", name, allPassed)
	return allPassed
}

func runTests() {
	results := make([]bool, 0)

	// Test MyCircularQueue
	results = append(results, testImplementation("MyCircularQueue (with count)", func(k int) CircularQueueInterface {
		return NewMyCircularQueue(k)
	}))

	// Test MyCircularQueueNoCount
	results = append(results, testImplementation("MyCircularQueueNoCount (extra slot)", func(k int) CircularQueueInterface {
		return NewMyCircularQueueNoCount(k)
	}))

	// Demonstrate trace functionality
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("Demonstrating operation trace:")
	fmt.Println(strings.Repeat("=", 60))

	queue := NewMyCircularQueueWithTrace(3)
	queue.EnQueue(1)
	queue.EnQueue(2)
	queue.EnQueue(3)
	queue.EnQueue(4) // Should fail
	queue.Rear()
	queue.DeQueue()
	queue.EnQueue(4) // Should succeed (wraparound)
	queue.Front()
	queue.Rear()

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
