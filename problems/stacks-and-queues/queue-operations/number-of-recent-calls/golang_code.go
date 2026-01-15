package main

import (
	"fmt"
	"sort"
	"strings"
)

// RecentCounter uses a queue (slice) to track timestamps within the time window.
// New requests are added to the back, old requests removed from the front.
//
// Time Complexity: O(n) amortized per ping (each request added/removed once)
// Space Complexity: O(W) where W is max requests within any 3000ms window
type RecentCounter struct {
	requests []int
	front    int // Index of the front of the logical queue
}

// NewRecentCounter creates a new RecentCounter
func NewRecentCounter() *RecentCounter {
	return &RecentCounter{
		requests: make([]int, 0),
		front:    0,
	}
}

// Ping adds a new request at time t and returns count of recent requests.
func (rc *RecentCounter) Ping(t int) int {
	// Add the new request
	rc.requests = append(rc.requests, t)

	// Remove requests outside the time window
	for rc.front < len(rc.requests) && rc.requests[rc.front] < t-3000 {
		rc.front++
	}

	// Periodically clean up to prevent unbounded growth
	if rc.front > 1000 {
		rc.requests = rc.requests[rc.front:]
		rc.front = 0
	}

	// Return the count of requests in the window
	return len(rc.requests) - rc.front
}

// RecentCounterSimple is a simpler implementation using slice operations
type RecentCounterSimple struct {
	requests []int
}

// NewRecentCounterSimple creates a new simple counter
func NewRecentCounterSimple() *RecentCounterSimple {
	return &RecentCounterSimple{
		requests: make([]int, 0),
	}
}

// Ping adds request and counts recent ones
func (rc *RecentCounterSimple) Ping(t int) int {
	rc.requests = append(rc.requests, t)

	// Remove old requests from front
	for len(rc.requests) > 0 && rc.requests[0] < t-3000 {
		rc.requests = rc.requests[1:]
	}

	return len(rc.requests)
}

// RecentCounterBinarySearch uses binary search for O(log n) lookup
// Keeps all requests and uses binary search to find the window.
//
// Time Complexity: O(log n) per ping
// Space Complexity: O(n) where n is total number of pings
type RecentCounterBinarySearch struct {
	requests []int
}

// NewRecentCounterBinarySearch creates a new binary search counter
func NewRecentCounterBinarySearch() *RecentCounterBinarySearch {
	return &RecentCounterBinarySearch{
		requests: make([]int, 0),
	}
}

// Ping adds request and counts using binary search
func (rc *RecentCounterBinarySearch) Ping(t int) int {
	rc.requests = append(rc.requests, t)

	// Find leftmost position where value >= t - 3000
	leftBound := sort.SearchInts(rc.requests, t-3000)

	return len(rc.requests) - leftBound
}

// CounterInterface defines the interface for counter implementations
type CounterInterface interface {
	Ping(t int) int
}

// RecentCounterWithTrace is a counter with operation tracing
type RecentCounterWithTrace struct {
	requests []int
	front    int
	trace    []string
}

// NewRecentCounterWithTrace creates a traced counter
func NewRecentCounterWithTrace() *RecentCounterWithTrace {
	return &RecentCounterWithTrace{
		requests: make([]int, 0),
		front:    0,
		trace:    []string{"RecentCounter initialized"},
	}
}

// Ping with tracing
func (rc *RecentCounterWithTrace) Ping(t int) int {
	rc.trace = append(rc.trace, fmt.Sprintf("\nping(%d):", t))
	rc.trace = append(rc.trace, fmt.Sprintf("  Queue before: %v", rc.requests[rc.front:]))
	rc.trace = append(rc.trace, fmt.Sprintf("  Time window: [%d, %d]", t-3000, t))

	rc.requests = append(rc.requests, t)
	rc.trace = append(rc.trace, fmt.Sprintf("  Added %d", t))

	removed := []int{}
	for rc.front < len(rc.requests) && rc.requests[rc.front] < t-3000 {
		removed = append(removed, rc.requests[rc.front])
		rc.front++
	}

	if len(removed) > 0 {
		rc.trace = append(rc.trace, fmt.Sprintf("  Removed (outside window): %v", removed))
	}

	rc.trace = append(rc.trace, fmt.Sprintf("  Queue after: %v", rc.requests[rc.front:]))

	count := len(rc.requests) - rc.front
	rc.trace = append(rc.trace, fmt.Sprintf("  Return: %d", count))

	return count
}

// GetTrace returns the operation trace
func (rc *RecentCounterWithTrace) GetTrace() []string {
	return rc.trace
}

func testImplementation(name string, createCounter func() CounterInterface) bool {
	fmt.Printf("\nTesting %s:\n", name)
	fmt.Println(strings.Repeat("=", 60))

	allPassed := true

	// Test 1: Example 1
	fmt.Println("\nTest 1: Example 1")
	counter := createCounter()

	testCases := []struct {
		t        int
		expected int
		desc     string
	}{
		{1, 1, "ping(1)"},
		{100, 2, "ping(100)"},
		{3001, 3, "ping(3001)"},
		{3002, 3, "ping(3002)"},
	}

	for _, tc := range testCases {
		result := counter.Ping(tc.t)
		if result != tc.expected {
			fmt.Printf("  FAIL: %s = %d, expected %d\n", tc.desc, result, tc.expected)
			allPassed = false
		} else {
			fmt.Printf("  PASS: %s = %d\n", tc.desc, result)
		}
	}

	// Test 2: All within window
	fmt.Println("\nTest 2: All requests within 3000ms window")
	counter = createCounter()

	times := []int{100, 200, 300, 400, 500}
	for i, t := range times {
		expected := i + 1
		result := counter.Ping(t)
		if result != expected {
			fmt.Printf("  FAIL: ping(%d) = %d, expected %d\n", t, result, expected)
			allPassed = false
		} else {
			fmt.Printf("  PASS: ping(%d) = %d\n", t, expected)
		}
	}

	// Test 3: Gradual expiration
	fmt.Println("\nTest 3: Gradual expiration")
	counter = createCounter()

	gradualTests := []struct {
		t        int
		expected int
	}{
		{1, 1},
		{1000, 2},
		{2000, 3},
		{3000, 4},
		{4000, 4}, // 1 expires
		{5000, 4}, // 1000 expires
		{6000, 4}, // 2000 expires
		{7000, 4}, // 3000 expires
	}

	for _, tc := range gradualTests {
		result := counter.Ping(tc.t)
		if result != tc.expected {
			fmt.Printf("  FAIL: ping(%d) = %d, expected %d\n", tc.t, result, tc.expected)
			allPassed = false
		} else {
			fmt.Printf("  PASS: ping(%d) = %d\n", tc.t, result)
		}
	}

	// Test 4: Large gap
	fmt.Println("\nTest 4: Large gap between requests")
	counter = createCounter()

	counter.Ping(1)
	result := counter.Ping(10000) // Way beyond 3000ms window
	if result != 1 {
		fmt.Printf("  FAIL: ping(10000) = %d, expected 1\n", result)
		allPassed = false
	} else {
		fmt.Println("  PASS: Large gap handled correctly")
	}

	// Test 5: Single request
	fmt.Println("\nTest 5: Single request")
	counter = createCounter()

	result = counter.Ping(1000)
	if result != 1 {
		fmt.Printf("  FAIL: Single ping = %d, expected 1\n", result)
		allPassed = false
	} else {
		fmt.Println("  PASS: Single request returns 1")
	}

	// Test 6: Exact boundary
	fmt.Println("\nTest 6: Exact boundary (t - 3000)")
	counter = createCounter()

	counter.Ping(1000)
	result = counter.Ping(4000) // Request at 1000 is exactly at boundary
	if result != 2 {
		fmt.Printf("  FAIL: Boundary ping = %d, expected 2 (inclusive)\n", result)
		allPassed = false
	} else {
		fmt.Println("  PASS: Boundary is inclusive")
	}

	result = counter.Ping(4001) // Now 1000 is outside
	if result != 2 {
		fmt.Printf("  FAIL: After boundary ping = %d, expected 2\n", result)
		allPassed = false
	} else {
		fmt.Println("  PASS: Element expires after boundary")
	}

	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Printf("All tests passed for %s: %v\n", name, allPassed)
	return allPassed
}

func runTests() {
	results := make([]bool, 0)

	// Test RecentCounter
	results = append(results, testImplementation("RecentCounter (Queue)", func() CounterInterface {
		return NewRecentCounter()
	}))

	// Test RecentCounterSimple
	results = append(results, testImplementation("RecentCounterSimple", func() CounterInterface {
		return NewRecentCounterSimple()
	}))

	// Test RecentCounterBinarySearch
	results = append(results, testImplementation("RecentCounterBinarySearch", func() CounterInterface {
		return NewRecentCounterBinarySearch()
	}))

	// Demonstrate trace functionality
	fmt.Println()
	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("Demonstrating operation trace:")
	fmt.Println(strings.Repeat("=", 60))

	counter := NewRecentCounterWithTrace()
	counter.Ping(1)
	counter.Ping(100)
	counter.Ping(3001)
	counter.Ping(3002)

	fmt.Println("\nOperation trace:")
	for _, line := range counter.GetTrace() {
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
