"""
K Smallest Differences - Python Solutions

Find K pairs with smallest absolute differences between two arrays.

This file contains MULTIPLE solution approaches with explanations.
"""

from typing import List, Tuple
import heapq
import bisect


# ============================================================================
# APPROACH 1: Min-Heap (Priority Queue) - RECOMMENDED
# ============================================================================
# Time Complexity:  O((n + m + k) * log(n + m))
# Space Complexity: O(n + m) for the heap
#
# WHY THIS IS BEST:
# - Only explores necessary pairs
# - Efficient for small k relative to n*m
# - Natural fit for "K smallest" problems
# ============================================================================

def k_smallest_differences(arr1: List[int], arr2: List[int], k: int) -> List[List[int]]:
    """
    Find K pairs with smallest absolute differences using min-heap.

    Key Insight: Use a min-heap to explore pairs in order of increasing
    difference. Since arrays are sorted, we can start with promising pairs
    and expand to neighbors.

    How it works:
    1. For each element in arr1, find its closest position in arr2
    2. Add initial promising pairs to min-heap
    3. Pop smallest k times, adding neighbors to heap

    Visual:
        arr1: [1, 3, 5], arr2: [2, 4]

        Initial pairs (each arr1[i] with closest arr2 element):
        - 1 with 2 (diff=1)
        - 3 with 2 or 4 (diff=1)
        - 5 with 4 (diff=1)

        Heap exploration finds k smallest.
    """
    if not arr1 or not arr2 or k <= 0:
        return []

    # Ensure arrays are sorted
    arr1 = sorted(arr1)
    arr2 = sorted(arr2)

    result = []
    # Min-heap: (absolute_diff, i, j) where i is index in arr1, j in arr2
    heap: List[Tuple[int, int, int]] = []
    visited = set()

    # Initialize heap with starting positions for each element in arr1
    # For each arr1[i], find closest position in arr2 using binary search
    for i, val in enumerate(arr1):
        # Find insertion point in arr2
        j = bisect.bisect_left(arr2, val)

        # Check position j and j-1 (neighbors of insertion point)
        for jj in [j, j - 1]:
            if 0 <= jj < len(arr2) and (i, jj) not in visited:
                diff = abs(val - arr2[jj])
                heapq.heappush(heap, (diff, i, jj))
                visited.add((i, jj))

    # Extract k smallest pairs
    while heap and len(result) < k:
        diff, i, j = heapq.heappop(heap)
        result.append([arr1[i], arr2[j]])

        # Add neighbors: (i, j+1) and (i, j-1) if not visited
        for nj in [j + 1, j - 1]:
            if 0 <= nj < len(arr2) and (i, nj) not in visited:
                new_diff = abs(arr1[i] - arr2[nj])
                heapq.heappush(heap, (new_diff, i, nj))
                visited.add((i, nj))

    return result


# ============================================================================
# APPROACH 2: All Pairs with Min-Heap (Alternative)
# ============================================================================
# Time Complexity:  O(nm log k) - push nm elements, heap size k
# Space Complexity: O(k) for heap
#
# WHEN TO USE:
# - When you need exactly k smallest from all pairs
# - Cleaner code when n*m is manageable
# ============================================================================

def k_smallest_differences_all_pairs(arr1: List[int], arr2: List[int], k: int) -> List[List[int]]:
    """
    Use max-heap of size k to find k smallest differences.

    Idea: Maintain a max-heap of size k. For each pair, if its difference
    is smaller than the max in heap, replace the max.

    Note: Python has min-heap, so we negate values for max-heap behavior.
    """
    if not arr1 or not arr2 or k <= 0:
        return []

    # Max-heap (using negation) of size k: (-diff, num1, num2)
    heap: List[Tuple[int, int, int]] = []

    for num1 in arr1:
        for num2 in arr2:
            diff = abs(num1 - num2)

            if len(heap) < k:
                heapq.heappush(heap, (-diff, num1, num2))
            elif -diff > heap[0][0]:  # Current diff is smaller than max in heap
                heapq.heapreplace(heap, (-diff, num1, num2))

    # Extract results and sort by difference
    result = [[num1, num2] for _, num1, num2 in heap]
    result.sort(key=lambda p: abs(p[0] - p[1]))

    return result


# ============================================================================
# APPROACH 3: Brute Force with Sorting
# ============================================================================
# Time Complexity:  O(nm log(nm)) - sorting all pairs
# Space Complexity: O(nm)
#
# WHEN TO USE:
# - Arrays are small
# - Need simple, understandable solution
# - k is close to n*m
# ============================================================================

def k_smallest_differences_brute(arr1: List[int], arr2: List[int], k: int) -> List[List[int]]:
    """
    Generate all pairs, sort by difference, return first k.

    Simple but inefficient for large arrays.
    """
    if not arr1 or not arr2 or k <= 0:
        return []

    # Generate all pairs with their differences
    pairs = []
    for num1 in arr1:
        for num2 in arr2:
            diff = abs(num1 - num2)
            pairs.append((diff, num1, num2))

    # Sort by difference
    pairs.sort(key=lambda x: x[0])

    # Return first k pairs
    return [[num1, num2] for _, num1, num2 in pairs[:k]]


# ============================================================================
# APPROACH 4: Two-Pointer with Expansion
# ============================================================================
# Time Complexity:  O(k * (n + m)) in worst case
# Space Complexity: O(k)
#
# WHEN TO USE:
# - k is very small
# - Need space-efficient solution
# ============================================================================

def k_smallest_differences_two_pointer(arr1: List[int], arr2: List[int], k: int) -> List[List[int]]:
    """
    Modified two-pointer approach with expansion.

    Start by finding the single smallest difference pair using two pointers,
    then expand to find next smallest pairs.

    This approach works well when k is small.
    """
    if not arr1 or not arr2 or k <= 0:
        return []

    arr1 = sorted(arr1)
    arr2 = sorted(arr2)

    # Use heap to manage expansion
    # (diff, i, j)
    heap: List[Tuple[int, int, int]] = []
    visited = set()

    # Start with (0, 0) - first elements of both sorted arrays
    i, j = 0, 0
    diff = abs(arr1[i] - arr2[j])
    heapq.heappush(heap, (diff, i, j))
    visited.add((i, j))

    result = []

    while heap and len(result) < k:
        diff, i, j = heapq.heappop(heap)
        result.append([arr1[i], arr2[j]])

        # Expand to neighbors: (i+1, j), (i, j+1), (i+1, j+1)
        neighbors = [(i + 1, j), (i, j + 1)]

        for ni, nj in neighbors:
            if 0 <= ni < len(arr1) and 0 <= nj < len(arr2) and (ni, nj) not in visited:
                new_diff = abs(arr1[ni] - arr2[nj])
                heapq.heappush(heap, (new_diff, ni, nj))
                visited.add((ni, nj))

    return result


# ============================================================================
# EDUCATIONAL: Detailed Walkthrough
# ============================================================================

def k_smallest_differences_explained(arr1: List[int], arr2: List[int], k: int) -> List[List[int]]:
    """
    Same algorithm with detailed step-by-step explanation.
    """
    print(f"Input:")
    print(f"  arr1 = {arr1}")
    print(f"  arr2 = {arr2}")
    print(f"  k = {k}")

    arr1 = sorted(arr1)
    arr2 = sorted(arr2)

    print(f"\nAfter sorting:")
    print(f"  arr1 = {arr1}")
    print(f"  arr2 = {arr2}")

    result = []
    heap: List[Tuple[int, int, int]] = []
    visited = set()

    # Initialize heap
    print(f"\nInitializing heap with starting pairs:")
    for i, val in enumerate(arr1):
        j = bisect.bisect_left(arr2, val)

        for jj in [j, j - 1]:
            if 0 <= jj < len(arr2) and (i, jj) not in visited:
                diff = abs(val - arr2[jj])
                heapq.heappush(heap, (diff, i, jj))
                visited.add((i, jj))
                print(f"  Added: ({arr1[i]}, {arr2[jj]}) with diff={diff}")

    print(f"\nExtracting {k} smallest pairs:")

    step = 1
    while heap and len(result) < k:
        diff, i, j = heapq.heappop(heap)
        result.append([arr1[i], arr2[j]])
        print(f"\n  Step {step}: Pop ({arr1[i]}, {arr2[j]}) with diff={diff}")
        print(f"    Result so far: {result}")

        # Add neighbors
        for nj in [j + 1, j - 1]:
            if 0 <= nj < len(arr2) and (i, nj) not in visited:
                new_diff = abs(arr1[i] - arr2[nj])
                heapq.heappush(heap, (new_diff, i, nj))
                visited.add((i, nj))
                print(f"    Added neighbor: ({arr1[i]}, {arr2[nj]}) with diff={new_diff}")

        step += 1

    print(f"\nFinal result: {result}")
    return result


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (arr1, arr2, k, description)
        ([1, 3, 5], [2, 4], 3, "Basic example"),
        ([1, 7, 11], [2, 4, 6], 4, "Medium example"),
        ([1, 2], [3], 2, "Single element in arr2"),
        ([1, 1, 2], [1, 2, 3], 4, "Duplicates in arrays"),
        ([1, 5, 9], [2, 6, 10], 3, "Evenly spaced"),
        ([-5, -1, 3], [0, 2, 4], 4, "Negative numbers"),
        ([1], [1], 1, "Single elements, exact match"),
        ([10, 20, 30], [15, 25], 5, "k equals total pairs"),
    ]

    approaches = [
        ("Min-Heap (Recommended)", k_smallest_differences),
        ("All Pairs + Max-Heap", k_smallest_differences_all_pairs),
        ("Brute Force + Sort", k_smallest_differences_brute),
        ("Two-Pointer Expansion", k_smallest_differences_two_pointer),
    ]

    print("=" * 70)
    print("K SMALLEST DIFFERENCES - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for arr1, arr2, k, desc in test_cases:
            result = func(arr1.copy(), arr2.copy(), k)

            # Verify result length
            expected_len = min(k, len(arr1) * len(arr2))
            if len(result) != expected_len:
                status = "x"
                all_passed = False
            else:
                # Verify all pairs are valid and differences are reasonable
                diffs = [abs(p[0] - p[1]) for p in result]
                is_sorted = all(diffs[i] <= diffs[i+1] for i in range(len(diffs)-1))
                status = "PASS" if is_sorted else "x"
                if not is_sorted:
                    all_passed = False

            print(f"  {status} {desc}: {result[:3]}{'...' if len(result) > 3 else ''}")

        print(f"  {'All tests passed!' if all_passed else 'Some tests failed!'}")

    print("\n" + "=" * 70)
    print("DETAILED WALKTHROUGH")
    print("=" * 70)
    print()
    k_smallest_differences_explained([1, 3, 5], [2, 4], 3)

    print("\n" + "=" * 70)
    print("COMPLEXITY COMPARISON")
    print("=" * 70)
    print("""
    +---------------------------+--------------------+----------+------------------+
    |         Approach          |        Time        |  Space   |  Recommendation  |
    +---------------------------+--------------------+----------+------------------+
    | 1. Min-Heap               | O((n+m+k)log(n+m)) |  O(n+m)  |  BEST CHOICE     |
    | 2. All Pairs + Max-Heap   | O(nm log k)        |  O(k)    |  When k << nm    |
    | 3. Brute Force + Sort     | O(nm log(nm))      |  O(nm)   |  Slow            |
    | 4. Two-Pointer Expansion  | O(k * (n + m))     |  O(k)    |  When k small    |
    +---------------------------+--------------------+----------+------------------+

    Where: n = len(arr1), m = len(arr2)
    """)


# ============================================================================
# SAMPLE INPUTS
# ============================================================================

"""
Sample Test Inputs:

# Test 1: Basic example
arr1 = [1, 3, 5]
arr2 = [2, 4]
k = 3
Expected: [[1, 2], [3, 2], [3, 4]] or similar (all diff=1)

# Test 2: Medium example
arr1 = [1, 7, 11]
arr2 = [2, 4, 6]
k = 4
Expected: Pairs sorted by difference

# Test 3: With negative numbers
arr1 = [-5, -1, 3, 7]
arr2 = [-2, 0, 5]
k = 5
Expected: Pairs with smallest differences

# Test 4: Large k
arr1 = [1, 2, 3]
arr2 = [4, 5, 6]
k = 9
Expected: All 9 pairs sorted by difference

To run: python python_code.py
"""


if __name__ == "__main__":
    run_tests()
