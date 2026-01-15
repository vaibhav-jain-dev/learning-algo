"""
Find Median from Data Stream
Combines: Two Heaps (Max + Min) + Stream Processing
"""

import heapq
from typing import List

class MedianFinder:
    """
    Two Heaps approach:
    - maxHeap (as negative values): smaller half
    - minHeap: larger half

    Invariant: maxHeap size >= minHeap size, differ by at most 1
    """

    def __init__(self):
        self.maxHeap = []  # Smaller half (negated for max behavior)
        self.minHeap = []  # Larger half

    def addNum(self, num: int) -> None:
        # Always add to maxHeap first
        heapq.heappush(self.maxHeap, -num)

        # Ensure max of smaller half <= min of larger half
        if self.minHeap and (-self.maxHeap[0] > self.minHeap[0]):
            val = -heapq.heappop(self.maxHeap)
            heapq.heappush(self.minHeap, val)

        # Balance sizes: maxHeap can have at most 1 more element
        if len(self.maxHeap) > len(self.minHeap) + 1:
            val = -heapq.heappop(self.maxHeap)
            heapq.heappush(self.minHeap, val)
        elif len(self.minHeap) > len(self.maxHeap):
            val = heapq.heappop(self.minHeap)
            heapq.heappush(self.maxHeap, -val)

    def findMedian(self) -> float:
        if len(self.maxHeap) > len(self.minHeap):
            return -self.maxHeap[0]
        else:
            return (-self.maxHeap[0] + self.minHeap[0]) / 2


class MedianFinderSortedList:
    """
    Alternative: Maintain sorted list with binary search insertion
    O(n) insert, O(1) median
    """

    def __init__(self):
        self.nums = []

    def addNum(self, num: int) -> None:
        # Binary search for insertion point
        left, right = 0, len(self.nums)
        while left < right:
            mid = (left + right) // 2
            if self.nums[mid] < num:
                left = mid + 1
            else:
                right = mid
        self.nums.insert(left, num)

    def findMedian(self) -> float:
        n = len(self.nums)
        if n % 2 == 1:
            return self.nums[n // 2]
        else:
            return (self.nums[n // 2 - 1] + self.nums[n // 2]) / 2


def demonstrate():
    """
    Step-by-step demonstration
    """
    print("\n" + "=" * 60)
    print("MedianFinder Demonstration")
    print("=" * 60)

    mf = MedianFinder()
    nums = [5, 2, 9, 1, 7, 6, 8, 3]

    print(f"\nAdding numbers: {nums}\n")

    for num in nums:
        mf.addNum(num)

        maxHeap_vals = sorted([-x for x in mf.maxHeap])
        minHeap_vals = sorted(mf.minHeap)

        print(f"Add {num}:")
        print(f"  maxHeap (smaller half): {maxHeap_vals}")
        print(f"  minHeap (larger half):  {minHeap_vals}")
        print(f"  Current median: {mf.findMedian()}")
        print()


# Test
if __name__ == "__main__":
    print("Find Median from Data Stream")
    print("=" * 60)

    # Test case 1
    mf = MedianFinder()
    mf.addNum(1)
    mf.addNum(2)
    print(f"After [1, 2]: median = {mf.findMedian()} (expected: 1.5)")
    mf.addNum(3)
    print(f"After [1, 2, 3]: median = {mf.findMedian()} (expected: 2.0)")

    # Test case 2
    mf2 = MedianFinder()
    for num in [6, 10, 2, 6, 5, 0, 6, 3, 1, 0, 0]:
        mf2.addNum(num)
    print(f"After large sequence: median = {mf2.findMedian()}")

    # Compare with sorted list approach
    print("\nComparing approaches:")
    test_nums = [5, 15, 1, 3, 2, 8, 7, 9, 10, 6, 11, 4]

    mf_heap = MedianFinder()
    mf_sorted = MedianFinderSortedList()

    for num in test_nums:
        mf_heap.addNum(num)
        mf_sorted.addNum(num)
        m1 = mf_heap.findMedian()
        m2 = mf_sorted.findMedian()
        status = "PASS" if m1 == m2 else "FAIL"
        print(f"Add {num:2d}: heap={m1:5.1f}, sorted={m2:5.1f} [{status}]")

    # Demonstration
    demonstrate()
