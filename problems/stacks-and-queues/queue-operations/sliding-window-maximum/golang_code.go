package main

import (
	"container/heap"
	"fmt"
	"reflect"
	"strings"
)

// maxSlidingWindow finds maximum in each sliding window using a monotonic decreasing deque.
// The deque stores indices in decreasing order of their values.
// The front of the deque is always the maximum in the current window.
//
// Time Complexity: O(n) - each element added and removed at most once
// Space Complexity: O(k) - deque contains at most k elements
func maxSlidingWindow(nums []int, k int) []int {
	if len(nums) == 0 || k == 0 {
		return []int{}
	}

	n := len(nums)
	result := make([]int, 0, n-k+1)
	deque := make([]int, 0, k) // Stores indices

	for i := 0; i < n; i++ {
		// Remove indices that are out of the current window
		for len(deque) > 0 && deque[0] < i-k+1 {
			deque = deque[1:]
		}

		// Remove indices of elements smaller than current
		for len(deque) > 0 && nums[deque[len(deque)-1]] < nums[i] {
			deque = deque[:len(deque)-1]
		}

		deque = append(deque, i)

		// Start recording results once we have a full window
		if i >= k-1 {
			result = append(result, nums[deque[0]])
		}
	}

	return result
}

// maxSlidingWindowBruteForce is the brute force approach.
// Time Complexity: O(n * k)
// Space Complexity: O(n - k + 1)
func maxSlidingWindowBruteForce(nums []int, k int) []int {
	if len(nums) == 0 || k == 0 {
		return []int{}
	}

	n := len(nums)
	result := make([]int, 0, n-k+1)

	for i := 0; i <= n-k; i++ {
		windowMax := nums[i]
		for j := i + 1; j < i+k; j++ {
			if nums[j] > windowMax {
				windowMax = nums[j]
			}
		}
		result = append(result, windowMax)
	}

	return result
}

// HeapItem represents an item in the max heap
type HeapItem struct {
	value int
	index int
}

// MaxHeap implements heap.Interface for max heap
type MaxHeap []HeapItem

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].value > h[j].value } // Max heap
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MaxHeap) Push(x interface{}) {
	*h = append(*h, x.(HeapItem))
}

func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

// maxSlidingWindowHeap is an alternative approach using a max heap.
// Time Complexity: O(n log n)
// Space Complexity: O(n)
func maxSlidingWindowHeap(nums []int, k int) []int {
	if len(nums) == 0 || k == 0 {
		return []int{}
	}

	n := len(nums)
	result := make([]int, 0, n-k+1)
	h := &MaxHeap{}
	heap.Init(h)

	for i := 0; i < n; i++ {
		heap.Push(h, HeapItem{nums[i], i})

		// Remove elements outside window
		for (*h)[0].index < i-k+1 {
			heap.Pop(h)
		}

		// Record result once window is full
		if i >= k-1 {
			result = append(result, (*h)[0].value)
		}
	}

	return result
}

// TraceResult holds the result and execution trace
type TraceResult struct {
	Result []int
	Trace  []string
}

// maxSlidingWindowWithTrace returns result with execution trace
func maxSlidingWindowWithTrace(nums []int, k int) TraceResult {
	if len(nums) == 0 || k == 0 {
		return TraceResult{[]int{}, []string{}}
	}

	n := len(nums)
	result := make([]int, 0, n-k+1)
	trace := make([]string, 0)
	deque := make([]int, 0, k)

	for i := 0; i < n; i++ {
		trace = append(trace, fmt.Sprintf("\nIndex %d: nums[%d] = %d", i, i, nums[i]))

		dequeValues := make([]int, len(deque))
		for j, idx := range deque {
			dequeValues[j] = nums[idx]
		}
		trace = append(trace, fmt.Sprintf("  Deque before: %v (values: %v)", deque, dequeValues))

		// Remove outdated indices
		removedOld := []int{}
		for len(deque) > 0 && deque[0] < i-k+1 {
			removedOld = append(removedOld, deque[0])
			deque = deque[1:]
		}
		if len(removedOld) > 0 {
			trace = append(trace, fmt.Sprintf("  Removed outdated: %v", removedOld))
		}

		// Remove smaller elements
		removedSmaller := []int{}
		for len(deque) > 0 && nums[deque[len(deque)-1]] < nums[i] {
			removedSmaller = append(removedSmaller, deque[len(deque)-1])
			deque = deque[:len(deque)-1]
		}
		if len(removedSmaller) > 0 {
			removedValues := make([]int, len(removedSmaller))
			for j, idx := range removedSmaller {
				removedValues[j] = nums[idx]
			}
			trace = append(trace, fmt.Sprintf("  Removed smaller: %v (values: %v)", removedSmaller, removedValues))
		}

		deque = append(deque, i)
		trace = append(trace, fmt.Sprintf("  Added index %d", i))

		dequeValuesAfter := make([]int, len(deque))
		for j, idx := range deque {
			dequeValuesAfter[j] = nums[idx]
		}
		trace = append(trace, fmt.Sprintf("  Deque after: %v (values: %v)", deque, dequeValuesAfter))

		if i >= k-1 {
			maxVal := nums[deque[0]]
			result = append(result, maxVal)
			windowStart := i - k + 1
			trace = append(trace, fmt.Sprintf("  Window [%d:%d] = %v, Max = %d", windowStart, i+1, nums[windowStart:i+1], maxVal))
		}
	}

	return TraceResult{result, trace}
}

// TestCase represents a single test case
type TestCase struct {
	nums        []int
	k           int
	expected    []int
	description string
}

func runTests() {
	testCases := []TestCase{
		{[]int{1, 3, -1, -3, 5, 3, 6, 7}, 3, []int{3, 3, 5, 5, 6, 7}, "Example 1"},
		{[]int{1}, 1, []int{1}, "Single element"},
		{[]int{1, -1}, 1, []int{1, -1}, "Window size 1"},
		{[]int{9, 11}, 2, []int{11}, "Two elements"},
		{[]int{4, 3, 2, 1}, 2, []int{4, 3, 2}, "Decreasing array"},
		{[]int{1, 2, 3, 4}, 2, []int{2, 3, 4}, "Increasing array"},
		{[]int{1, 3, 1, 2, 0, 5}, 3, []int{3, 3, 2, 5}, "Mixed values"},
		{[]int{7, 2, 4}, 2, []int{7, 4}, "Simple case"},
		{[]int{1, 1, 1, 1, 1}, 3, []int{1, 1, 1}, "All same values"},
		{[]int{5, 3, 4}, 1, []int{5, 3, 4}, "k = 1"},
		{[]int{5, 3, 4}, 3, []int{5}, "k = n"},
		{[]int{-7, -8, 7, 5, 7, 1, 6, 0}, 4, []int{7, 7, 7, 7, 7}, "With negatives"},
	}

	fmt.Println("Testing maxSlidingWindow function:")
	fmt.Println(strings.Repeat("=", 70))

	allPassed := true
	for i, tc := range testCases {
		result := maxSlidingWindow(tc.nums, tc.k)
		status := "PASS"
		if !reflect.DeepEqual(result, tc.expected) {
			status = "FAIL"
			allPassed = false
		}

		numsStr := fmt.Sprintf("%v", tc.nums)
		if len(numsStr) > 30 {
			numsStr = numsStr[:27] + "..."
		}
		fmt.Printf("Test %2d: %s\n", i+1, tc.description)
		fmt.Printf("         Input: nums=%s, k=%d\n", numsStr, tc.k)
		fmt.Printf("         Result: %v\n", result)
		fmt.Printf("         Expected: %v [%s]\n\n", tc.expected, status)
	}

	fmt.Println(strings.Repeat("=", 70))
	fmt.Printf("All tests passed: %v\n\n", allPassed)

	// Compare implementations
	fmt.Println("Comparing all implementations:")
	fmt.Println(strings.Repeat("=", 70))

	allMatch := true
	for _, tc := range testCases {
		result1 := maxSlidingWindow(tc.nums, tc.k)
		result2 := maxSlidingWindowBruteForce(tc.nums, tc.k)
		result3 := maxSlidingWindowHeap(tc.nums, tc.k)

		if !reflect.DeepEqual(result1, result2) || !reflect.DeepEqual(result2, result3) || !reflect.DeepEqual(result1, tc.expected) {
			allMatch = false
			fmt.Printf("MISMATCH for %s:\n", tc.description)
			fmt.Printf("  Deque: %v, Brute: %v, Heap: %v\n", result1, result2, result3)
		}
	}

	if allMatch {
		fmt.Println("All implementations produce identical correct results!")
	}
	fmt.Println()

	// Demonstrate trace
	fmt.Println("Demonstrating algorithm trace:")
	fmt.Println(strings.Repeat("=", 70))

	demoNums := []int{1, 3, -1, -3, 5, 3, 6, 7}
	demoK := 3
	traceResult := maxSlidingWindowWithTrace(demoNums, demoK)

	fmt.Printf("Input: nums=%v, k=%d\n", demoNums, demoK)
	fmt.Println("\nExecution trace:")
	for _, line := range traceResult.Trace {
		fmt.Println(line)
	}

	fmt.Printf("\nFinal result: %v\n", traceResult.Result)
}

func main() {
	runTests()
}
