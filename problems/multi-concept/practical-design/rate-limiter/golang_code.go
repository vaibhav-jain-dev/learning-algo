/*
Rate Limiter - Sliding Window Log Implementation in Go

Multiple approaches demonstrated:
1. Sliding Window Log (precise)
2. Fixed Window Counter (simple)
3. Token Bucket (allows bursts)
*/

package main

import (
	"container/list"
	"fmt"
	"sync"
)

// ============================================================
// Approach 1: Sliding Window Log
// ============================================================

// RateLimiterSlidingWindow implements precise sliding window rate limiting
type RateLimiterSlidingWindow struct {
	limit    int
	window   int64
	requests map[string]*list.List
	mu       sync.Mutex
}

// NewRateLimiterSlidingWindow creates a new sliding window rate limiter
func NewRateLimiterSlidingWindow(limit int, windowSeconds int64) *RateLimiterSlidingWindow {
	return &RateLimiterSlidingWindow{
		limit:    limit,
		window:   windowSeconds,
		requests: make(map[string]*list.List),
	}
}

// AllowRequest checks if a request is allowed and records it if so
// Time: O(k) where k = requests in current window
// Space: O(n) where n = total requests in memory
func (r *RateLimiterSlidingWindow) AllowRequest(userID string, timestamp int64) bool {
	r.mu.Lock()
	defer r.mu.Unlock()

	// Initialize user's request list if needed
	if r.requests[userID] == nil {
		r.requests[userID] = list.New()
	}

	userRequests := r.requests[userID]
	windowStart := timestamp - r.window

	// Remove expired timestamps from the front
	for userRequests.Len() > 0 {
		front := userRequests.Front()
		if front.Value.(int64) <= windowStart {
			userRequests.Remove(front)
		} else {
			break
		}
	}

	// Check if under limit
	if userRequests.Len() < r.limit {
		userRequests.PushBack(timestamp)
		return true
	}

	return false
}

// GetRemaining returns the number of remaining requests allowed
func (r *RateLimiterSlidingWindow) GetRemaining(userID string, timestamp int64) int {
	r.mu.Lock()
	defer r.mu.Unlock()

	userRequests := r.requests[userID]
	if userRequests == nil {
		return r.limit
	}

	windowStart := timestamp - r.window
	validCount := 0

	for e := userRequests.Front(); e != nil; e = e.Next() {
		if e.Value.(int64) > windowStart {
			validCount++
		}
	}

	remaining := r.limit - validCount
	if remaining < 0 {
		return 0
	}
	return remaining
}

// ============================================================
// Approach 2: Fixed Window Counter
// ============================================================

type windowCounter struct {
	windowStart int64
	count       int
}

// RateLimiterFixedWindow implements simple fixed window rate limiting
type RateLimiterFixedWindow struct {
	limit    int
	window   int64
	counters map[string]*windowCounter
	mu       sync.Mutex
}

// NewRateLimiterFixedWindow creates a new fixed window rate limiter
func NewRateLimiterFixedWindow(limit int, windowSeconds int64) *RateLimiterFixedWindow {
	return &RateLimiterFixedWindow{
		limit:    limit,
		window:   windowSeconds,
		counters: make(map[string]*windowCounter),
	}
}

// AllowRequest checks if a request is allowed
// Time: O(1)
// Space: O(1) per user
func (r *RateLimiterFixedWindow) AllowRequest(userID string, timestamp int64) bool {
	r.mu.Lock()
	defer r.mu.Unlock()

	windowStart := (timestamp / r.window) * r.window

	counter, exists := r.counters[userID]

	// New user or new window? Reset counter
	if !exists || counter.windowStart != windowStart {
		r.counters[userID] = &windowCounter{
			windowStart: windowStart,
			count:       1,
		}
		return true
	}

	// Same window, check limit
	if counter.count < r.limit {
		counter.count++
		return true
	}

	return false
}

// ============================================================
// Approach 3: Token Bucket
// ============================================================

type bucket struct {
	tokens         float64
	lastRefillTime int64
}

// RateLimiterTokenBucket implements token bucket rate limiting
type RateLimiterTokenBucket struct {
	capacity   float64
	refillRate float64 // tokens per second
	buckets    map[string]*bucket
	mu         sync.Mutex
}

// NewRateLimiterTokenBucket creates a new token bucket rate limiter
func NewRateLimiterTokenBucket(capacity int, refillRate float64) *RateLimiterTokenBucket {
	return &RateLimiterTokenBucket{
		capacity:   float64(capacity),
		refillRate: refillRate,
		buckets:    make(map[string]*bucket),
	}
}

// AllowRequest checks if a request is allowed
// Time: O(1)
// Space: O(1) per user
func (r *RateLimiterTokenBucket) AllowRequest(userID string, timestamp int64) bool {
	r.mu.Lock()
	defer r.mu.Unlock()

	b, exists := r.buckets[userID]

	// New user? Initialize with full bucket
	if !exists {
		r.buckets[userID] = &bucket{
			tokens:         r.capacity - 1, // Consume one token
			lastRefillTime: timestamp,
		}
		return true
	}

	// Refill tokens based on time passed
	timePassed := timestamp - b.lastRefillTime
	tokensToAdd := float64(timePassed) * r.refillRate
	b.tokens = min(r.capacity, b.tokens+tokensToAdd)
	b.lastRefillTime = timestamp

	// Try to consume a token
	if b.tokens >= 1 {
		b.tokens--
		return true
	}

	return false
}

func min(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}

// ============================================================
// Tests
// ============================================================

func testSlidingWindow() {
	fmt.Println("Testing Sliding Window Rate Limiter")
	fmt.Println("==================================================")

	limiter := NewRateLimiterSlidingWindow(3, 10)

	testCases := []struct {
		userID      string
		timestamp   int64
		expected    bool
		description string
	}{
		{"user1", 1, true, "1st request"},
		{"user1", 2, true, "2nd request"},
		{"user1", 3, true, "3rd request"},
		{"user1", 4, false, "4th request - should be blocked"},
		{"user1", 11, true, "After window slides"},
		{"user2", 5, true, "Different user"},
	}

	for _, tc := range testCases {
		result := limiter.AllowRequest(tc.userID, tc.timestamp)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: %v\n", status, tc.description, result)
	}
	fmt.Println()
}

func testFixedWindow() {
	fmt.Println("Testing Fixed Window Rate Limiter")
	fmt.Println("==================================================")

	limiter := NewRateLimiterFixedWindow(3, 10)

	testCases := []struct {
		userID      string
		timestamp   int64
		expected    bool
		description string
	}{
		{"user1", 1, true, "1st request"},
		{"user1", 5, true, "2nd request"},
		{"user1", 9, true, "3rd request"},
		{"user1", 9, false, "4th request - blocked"},
		{"user1", 10, true, "New window starts"},
	}

	for _, tc := range testCases {
		result := limiter.AllowRequest(tc.userID, tc.timestamp)
		status := "PASS"
		if result != tc.expected {
			status = "FAIL"
		}
		fmt.Printf("  [%s] %s: %v\n", status, tc.description, result)
	}
	fmt.Println()
}

func testTokenBucket() {
	fmt.Println("Testing Token Bucket Rate Limiter")
	fmt.Println("==================================================")

	// 5 tokens max, refills 1 token per second
	limiter := NewRateLimiterTokenBucket(5, 1.0)

	// Burst test - should allow 5 rapid requests
	fmt.Println("  Burst test (7 rapid requests at t=0):")
	for i := 0; i < 7; i++ {
		result := limiter.AllowRequest("user1", 0)
		status := "Allowed"
		if !result {
			status = "Blocked"
		}
		fmt.Printf("    Request %d: %s\n", i+1, status)
	}

	// After waiting, tokens refill
	fmt.Println("  After waiting 3 seconds (t=3):")
	result := limiter.AllowRequest("user1", 3)
	status := "Allowed"
	if !result {
		status = "Blocked"
	}
	fmt.Printf("    Request: %s\n", status)
	fmt.Println()
}

func main() {
	testSlidingWindow()
	testFixedWindow()
	testTokenBucket()

	fmt.Println("All tests completed!")
}
