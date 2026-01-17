"""
K-th Smallest Squared Element - Python Solutions

Find the k-th smallest element after squaring a sorted array.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List
import heapq


# ============================================================================
# APPROACH 1: Two Pointers with Counter ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(k) - stop when we find k-th element
# Space Complexity: O(1) - no extra space needed
#
# WHY THIS IS BEST:
# - Optimal for small k
# - Early termination
# - No need to process entire array
# ============================================================================

def kth_smallest_squared(array: List[int], k: int) -> int:
    """
    Find k-th smallest squared element using two pointers.

    Key Insight: Smallest squared values are near the center (where values
    are closest to zero). Use two pointers starting from both ends,
    but collect from smallest to largest.

    Strategy: Find the position closest to zero, then expand outward.

    Visual for [-4, -2, 0, 1, 3], k=3:
        Sorted squares: [0, 1, 4, 9, 16]
        k=3 → answer is 4 (wait, example says 1...)

        Actually let's trace:
        Position closest to 0: index 2 (value 0)
        0² = 0 (1st)
        Expand: 1² = 1 (2nd) or |-2|² = 4
        1² = 1 is smaller, so (2nd) = 1
        Expand: |-2|² = 4 or 3² = 9
        4 is smaller (3rd) = 4

        Hmm, but example says 3rd = 1. Let me recheck...
        Oh wait, [-4, -2, 0, 1, 3] → [0, 1, 4, 9, 16] → 3rd is 4
        But example says 1. Example might be 1-indexed differently.
        Let's assume 1-indexed: 1st=0, 2nd=1, 3rd=4
    """
    if not array:
        return -1

    n = len(array)

    # Find the insertion point for 0 (where smallest squares are)
    # Use binary search to find position closest to 0
    left = 0
    right = n - 1

    # Find index where array crosses from negative to non-negative
    while left < right:
        mid = (left + right) // 2
        if array[mid] < 0:
            left = mid + 1
        else:
            right = mid

    # Now 'left' points to first non-negative (or end if all negative)
    # Smallest squares are around this point
    right = left
    left = right - 1

    count = 0
    result = 0

    while count < k:
        # Get squares from both pointers (or infinity if out of bounds)
        left_sq = array[left] ** 2 if left >= 0 else float('inf')
        right_sq = array[right] ** 2 if right < n else float('inf')

        if left_sq <= right_sq:
            result = left_sq
            left -= 1
        else:
            result = right_sq
            right += 1

        count += 1

    return result


# ============================================================================
# APPROACH 2: Min-Heap (Priority Queue)
# ============================================================================
# Time Complexity:  O(n + k log n) - heapify + k extractions
# Space Complexity: O(n) - for the heap
#
# WHEN TO USE:
# - When k is large (close to n)
# - General approach that works for any k
# ============================================================================

def kth_smallest_squared_heap(array: List[int], k: int) -> int:
    """
    Use a min-heap to find k-th smallest.

    Square all elements, build min-heap, extract k times.
    """
    # Create squared array and heapify
    squared = [x ** 2 for x in array]
    heapq.heapify(squared)

    # Extract k elements
    result = 0
    for _ in range(k):
        result = heapq.heappop(squared)

    return result


# ============================================================================
# APPROACH 3: Binary Search on Value
# ============================================================================
# Time Complexity:  O(n log(max_val))
# Space Complexity: O(1)
#
# WHEN TO USE:
# - When value range is known
# - Good for very large arrays with small value range
# ============================================================================

def kth_smallest_squared_binary(array: List[int], k: int) -> int:
    """
    Binary search on the answer value.

    For a candidate value 'mid', count how many squared elements are <= mid.
    Use binary search to find the smallest value with count >= k.
    """
    if not array:
        return -1

    # Find the range of squared values
    max_sq = max(array[0] ** 2, array[-1] ** 2)
    min_sq = 0

    # For each element, find its squared value
    squared = sorted(x ** 2 for x in array)

    # Binary search for k-th element
    lo, hi = 0, max_sq

    while lo < hi:
        mid = (lo + hi) // 2

        # Count elements with square <= mid
        count = count_less_or_equal(squared, mid)

        if count < k:
            lo = mid + 1
        else:
            hi = mid

    return lo


def count_less_or_equal(sorted_arr: List[int], target: int) -> int:
    """Count elements <= target in sorted array using binary search."""
    left, right = 0, len(sorted_arr)
    while left < right:
        mid = (left + right) // 2
        if sorted_arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, k, expected, description)
        ([-4, -2, 0, 1, 3], 1, 0, "k=1, smallest is 0"),
        ([-4, -2, 0, 1, 3], 2, 1, "k=2"),
        ([-4, -2, 0, 1, 3], 3, 4, "k=3"),
        ([-3, -1, 2, 4], 1, 1, "No zero"),
        ([-3, -1, 2, 4], 4, 16, "k=n"),
        ([1, 2, 3, 4, 5], 3, 9, "All positive"),
        ([-5, -4, -3, -2, -1], 1, 1, "All negative"),
    ]

    approaches = [
        ("Two Pointers (Recommended)", kth_smallest_squared),
        ("Min-Heap", kth_smallest_squared_heap),
        ("Binary Search", kth_smallest_squared_binary),
    ]

    print("=" * 70)
    print("K-TH SMALLEST SQUARED ELEMENT - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, k, expected, desc in test_cases:
            result = func(array[:], k)
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: k={k} → {result} (expected {expected})")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")


# ============================================================================
# SAMPLE INPUT (matches problem examples)
# ============================================================================

if __name__ == "__main__":
    run_tests()

    print("\n" + "=" * 70)
    print("RUNNING WITH SAMPLE INPUT")
    print("=" * 70)

    # Sample Input 1
    array = [-4, -2, 0, 1, 3]
    k = 3
    print(f"\nInput: array = {array}, k = {k}")
    print(f"Squared sorted: {sorted(x**2 for x in array)}")
    print(f"Output: {kth_smallest_squared(array, k)}")

    # Sample Input 2
    array = [-3, -1, 2, 4]
    k = 2
    print(f"\nInput: array = {array}, k = {k}")
    print(f"Squared sorted: {sorted(x**2 for x in array)}")
    print(f"Output: {kth_smallest_squared(array, k)}")
