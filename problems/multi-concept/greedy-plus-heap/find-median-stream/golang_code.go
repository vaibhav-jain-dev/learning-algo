/*
Find Median from Data Stream
Combines: Two Heaps (Max + Min) + Stream Processing
*/

package main

import (
	"container/heap"
	"fmt"
)

// Max Heap (for smaller half)
type MaxHeap []int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}
func (h MaxHeap) Peek() int { return h[0] }

// Min Heap (for larger half)
type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}
func (h MinHeap) Peek() int { return h[0] }

// MedianFinder using two heaps
type MedianFinder struct {
	maxHeap *MaxHeap // Smaller half
	minHeap *MinHeap // Larger half
}

func Constructor() MedianFinder {
	maxH := &MaxHeap{}
	minH := &MinHeap{}
	heap.Init(maxH)
	heap.Init(minH)
	return MedianFinder{maxHeap: maxH, minHeap: minH}
}

func (mf *MedianFinder) AddNum(num int) {
	// Add to max heap first
	heap.Push(mf.maxHeap, num)

	// Ensure ordering: max of smaller <= min of larger
	if mf.minHeap.Len() > 0 && mf.maxHeap.Peek() > mf.minHeap.Peek() {
		val := heap.Pop(mf.maxHeap).(int)
		heap.Push(mf.minHeap, val)
	}

	// Balance sizes
	if mf.maxHeap.Len() > mf.minHeap.Len()+1 {
		val := heap.Pop(mf.maxHeap).(int)
		heap.Push(mf.minHeap, val)
	} else if mf.minHeap.Len() > mf.maxHeap.Len() {
		val := heap.Pop(mf.minHeap).(int)
		heap.Push(mf.maxHeap, val)
	}
}

func (mf *MedianFinder) FindMedian() float64 {
	if mf.maxHeap.Len() > mf.minHeap.Len() {
		return float64(mf.maxHeap.Peek())
	}
	return float64(mf.maxHeap.Peek()+mf.minHeap.Peek()) / 2.0
}

func main() {
	fmt.Println("Find Median from Data Stream")
	fmt.Println("============================================================")

	// Test case 1
	mf := Constructor()
	mf.AddNum(1)
	mf.AddNum(2)
	fmt.Printf("After [1, 2]: median = %.1f (expected: 1.5)\n", mf.FindMedian())
	mf.AddNum(3)
	fmt.Printf("After [1, 2, 3]: median = %.1f (expected: 2.0)\n", mf.FindMedian())

	// Test case 2: Step by step
	fmt.Println("\nStep-by-step demonstration:")
	mf2 := Constructor()
	nums := []int{5, 2, 9, 1, 7, 6}

	for _, num := range nums {
		mf2.AddNum(num)
		fmt.Printf("Add %d: median = %.1f\n", num, mf2.FindMedian())
	}

	// Verify with sorted calculation
	fmt.Println("\nVerification:")
	mf3 := Constructor()
	testNums := []int{41, 35, 62, 5, 97, 108}
	all := []int{}

	for _, num := range testNums {
		mf3.AddNum(num)
		all = append(all, num)

		// Sort and calculate expected
		sorted := make([]int, len(all))
		copy(sorted, all)
		for i := 0; i < len(sorted)-1; i++ {
			for j := i + 1; j < len(sorted); j++ {
				if sorted[i] > sorted[j] {
					sorted[i], sorted[j] = sorted[j], sorted[i]
				}
			}
		}

		var expected float64
		n := len(sorted)
		if n%2 == 1 {
			expected = float64(sorted[n/2])
		} else {
			expected = float64(sorted[n/2-1]+sorted[n/2]) / 2.0
		}

		got := mf3.FindMedian()
		status := "PASS"
		if got != expected {
			status = "FAIL"
		}
		fmt.Printf("Add %3d -> sorted: %v, median: %.1f (expected: %.1f) [%s]\n",
			num, sorted, got, expected, status)
	}
}
