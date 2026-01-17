"""
Merge Sorted Arrays with Squares - Python Solutions

Square elements of two sorted arrays and merge them into one sorted array.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List
import heapq


# ============================================================================
# APPROACH 1: Two Pointers on Squared Arrays ⭐ RECOMMENDED
# ============================================================================
# Time Complexity:  O(m + n) - single pass through both arrays
# Space Complexity: O(m + n) - for the result array
#
# WHY THIS IS BEST:
# - Optimal time complexity
# - Uses two-pointer merge technique
# - Clean and intuitive
# ============================================================================

def merge_sorted_squares(arr1: List[int], arr2: List[int]) -> List[int]:
    """
    Merge squared arrays using two-pointer technique.

    Strategy:
    1. First, square both arrays while keeping them sorted (two-pointer)
    2. Then merge two sorted arrays

    Visual for arr1=[-3,-1,2], arr2=[-2,4]:
        Step 1: Square arrays
            arr1 squared: [1, 4, 9]
            arr2 squared: [4, 16]

        Step 2: Merge sorted arrays
            [1, 4, 4, 9, 16]
    """
    def square_sorted(arr: List[int]) -> List[int]:
        """Square a sorted array while maintaining sorted order."""
        if not arr:
            return []

        n = len(arr)
        result = [0] * n
        left, right = 0, n - 1
        pos = n - 1  # Fill from the end

        while left <= right:
            left_sq = arr[left] ** 2
            right_sq = arr[right] ** 2

            if left_sq > right_sq:
                result[pos] = left_sq
                left += 1
            else:
                result[pos] = right_sq
                right -= 1
            pos -= 1

        return result

    # Square both arrays
    sq1 = square_sorted(arr1)
    sq2 = square_sorted(arr2)

    # Merge two sorted arrays using two pointers
    result = []
    i, j = 0, 0

    while i < len(sq1) and j < len(sq2):
        if sq1[i] <= sq2[j]:
            result.append(sq1[i])
            i += 1
        else:
            result.append(sq2[j])
            j += 1

    # Add remaining elements using slicing (Pythonic)
    result.extend(sq1[i:])
    result.extend(sq2[j:])

    return result


# ============================================================================
# APPROACH 2: Four Pointers - All at Once
# ============================================================================
# Time Complexity:  O(m + n)
# Space Complexity: O(m + n)
#
# WHEN TO USE:
# - When you want to process everything in a single pass
# - Slightly more complex but efficient
# ============================================================================

def merge_sorted_squares_four_pointers(arr1: List[int], arr2: List[int]) -> List[int]:
    """
    Use four pointers to process both arrays simultaneously.

    Insight: The largest squared value comes from one of 4 positions:
    - Left or right end of arr1
    - Left or right end of arr2

    Build result from largest to smallest.
    """
    m, n = len(arr1), len(arr2)
    result = [0] * (m + n)
    pos = m + n - 1

    # Four pointers
    l1, r1 = 0, m - 1
    l2, r2 = 0, n - 1

    while l1 <= r1 or l2 <= r2:
        # Get candidates from both arrays (or -inf if exhausted)
        candidates = []

        if l1 <= r1:
            candidates.append((arr1[l1] ** 2, 'l1'))
            candidates.append((arr1[r1] ** 2, 'r1'))
        if l2 <= r2:
            candidates.append((arr2[l2] ** 2, 'l2'))
            candidates.append((arr2[r2] ** 2, 'r2'))

        # Find the maximum
        max_val, pointer = max(candidates, key=lambda x: x[0])
        result[pos] = max_val
        pos -= 1

        # Move the appropriate pointer
        if pointer == 'l1':
            l1 += 1
        elif pointer == 'r1':
            r1 -= 1
        elif pointer == 'l2':
            l2 += 1
        else:
            r2 -= 1

    return result


# ============================================================================
# APPROACH 3: Heap-Based Merge
# ============================================================================
# Time Complexity:  O((m+n) log 4) = O(m + n)
# Space Complexity: O(m + n)
#
# WHEN TO USE:
# - When you want to generalize to k arrays
# - Uses Python's heapq for efficiency
# ============================================================================

def merge_sorted_squares_heap(arr1: List[int], arr2: List[int]) -> List[int]:
    """
    Use a min-heap to merge squared arrays.

    Generalizeable to k sorted arrays.
    """
    def square_sorted(arr: List[int]) -> List[int]:
        if not arr:
            return []
        n = len(arr)
        result = [0] * n
        left, right = 0, n - 1
        pos = n - 1

        while left <= right:
            left_sq, right_sq = arr[left] ** 2, arr[right] ** 2
            if left_sq > right_sq:
                result[pos] = left_sq
                left += 1
            else:
                result[pos] = right_sq
                right -= 1
            pos -= 1
        return result

    sq1 = square_sorted(arr1)
    sq2 = square_sorted(arr2)

    # Use heap to merge (generalizable to k arrays)
    result = []
    heap = []

    # Push first element of each array (value, array_index, position)
    if sq1:
        heapq.heappush(heap, (sq1[0], 0, 0))
    if sq2:
        heapq.heappush(heap, (sq2[0], 1, 0))

    arrays = [sq1, sq2]

    while heap:
        val, arr_idx, pos = heapq.heappop(heap)
        result.append(val)

        # Push next element from same array
        if pos + 1 < len(arrays[arr_idx]):
            heapq.heappush(heap, (arrays[arr_idx][pos + 1], arr_idx, pos + 1))

    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (arr1, arr2, expected, description)
        ([-3, -1, 2], [-2, 4], [1, 4, 4, 9, 16], "Mixed signs"),
        ([-5, 0, 3], [1, 2, 6], [0, 1, 4, 9, 25, 36], "With zero"),
        ([1, 2, 3], [4, 5, 6], [1, 4, 9, 16, 25, 36], "All positive"),
        ([-3, -2, -1], [-6, -5, -4], [1, 4, 9, 16, 25, 36], "All negative"),
        ([], [1, 2, 3], [1, 4, 9], "One empty"),
        ([], [], [], "Both empty"),
    ]

    approaches = [
        ("Two Pointers (Recommended)", merge_sorted_squares),
        ("Four Pointers", merge_sorted_squares_four_pointers),
        ("Heap-Based", merge_sorted_squares_heap),
    ]

    print("=" * 70)
    print("MERGE SORTED ARRAYS WITH SQUARES - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for arr1, arr2, expected, desc in test_cases:
            result = func(arr1[:], arr2[:])
            status = "✓" if result == expected else "✗"
            if result != expected:
                all_passed = False
            print(f"  {status} {desc}: {result}")

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
    arr1 = [-3, -1, 2]
    arr2 = [-2, 4]
    print(f"\nInput: arr1 = {arr1}, arr2 = {arr2}")
    print(f"Output: {merge_sorted_squares(arr1, arr2)}")

    # Sample Input 2
    arr1 = [-5, 0, 3]
    arr2 = [1, 2, 6]
    print(f"\nInput: arr1 = {arr1}, arr2 = {arr2}")
    print(f"Output: {merge_sorted_squares(arr1, arr2)}")
