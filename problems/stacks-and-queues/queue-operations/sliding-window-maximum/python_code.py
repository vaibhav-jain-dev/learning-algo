"""
Sliding Window Maximum

Given an array nums and window size k, return the maximum value in each
sliding window as it moves from left to right.
"""

from typing import List
from collections import deque


def max_sliding_window(nums: List[int], k: int) -> List[int]:
    """
    Find maximum in each sliding window using a monotonic decreasing deque.

    The deque stores indices in decreasing order of their values.
    The front of the deque is always the maximum in the current window.

    Time Complexity: O(n) - each element added and removed at most once
    Space Complexity: O(k) - deque contains at most k elements
    """
    if not nums or k == 0:
        return []

    n = len(nums)
    result = []
    dq = deque()  # Stores indices

    for i in range(n):
        # Remove indices that are out of the current window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Remove indices of elements smaller than current
        # (they can never be maximum while current element is in window)
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()

        dq.append(i)

        # Start recording results once we have a full window
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result


def max_sliding_window_brute_force(nums: List[int], k: int) -> List[int]:
    """
    Brute force approach - find max in each window by scanning.

    Time Complexity: O(n * k)
    Space Complexity: O(n - k + 1) for result

    Included for comparison and understanding.
    """
    if not nums or k == 0:
        return []

    n = len(nums)
    result = []

    for i in range(n - k + 1):
        window_max = max(nums[i:i + k])
        result.append(window_max)

    return result


def max_sliding_window_with_trace(nums: List[int], k: int) -> tuple:
    """
    Extended version that returns result with execution trace.
    """
    if not nums or k == 0:
        return [], []

    n = len(nums)
    result = []
    trace = []
    dq = deque()

    for i in range(n):
        trace.append(f"\nIndex {i}: nums[{i}] = {nums[i]}")
        trace.append(f"  Deque before: {list(dq)} (values: {[nums[j] for j in dq]})")

        # Remove outdated indices
        removed_old = []
        while dq and dq[0] < i - k + 1:
            removed_old.append(dq.popleft())
        if removed_old:
            trace.append(f"  Removed outdated: {removed_old}")

        # Remove smaller elements
        removed_smaller = []
        while dq and nums[dq[-1]] < nums[i]:
            removed_smaller.append(dq.pop())
        if removed_smaller:
            trace.append(f"  Removed smaller: {removed_smaller} (values: {[nums[j] for j in removed_smaller]})")

        dq.append(i)
        trace.append(f"  Added index {i}")
        trace.append(f"  Deque after: {list(dq)} (values: {[nums[j] for j in dq]})")

        if i >= k - 1:
            max_val = nums[dq[0]]
            result.append(max_val)
            window_start = i - k + 1
            trace.append(f"  Window [{window_start}:{i+1}] = {nums[window_start:i+1]}, Max = {max_val}")

    return result, trace


def max_sliding_window_heap(nums: List[int], k: int) -> List[int]:
    """
    Alternative approach using a max heap.

    Time Complexity: O(n log n) in worst case
    Space Complexity: O(n)
    """
    import heapq

    if not nums or k == 0:
        return []

    n = len(nums)
    result = []
    # Max heap stores (-value, index) - negative for max behavior
    heap = []

    for i in range(n):
        # Add current element
        heapq.heappush(heap, (-nums[i], i))

        # Remove elements outside window
        while heap[0][1] < i - k + 1:
            heapq.heappop(heap)

        # Record result once window is full
        if i >= k - 1:
            result.append(-heap[0][0])

    return result


def run_tests():
    """Run comprehensive tests for max_sliding_window."""
    test_cases = [
        # (nums, k, expected, description)
        ([1, 3, -1, -3, 5, 3, 6, 7], 3, [3, 3, 5, 5, 6, 7], "Example 1"),
        ([1], 1, [1], "Single element"),
        ([1, -1], 1, [1, -1], "Window size 1"),
        ([9, 11], 2, [11], "Two elements"),
        ([4, 3, 2, 1], 2, [4, 3, 2], "Decreasing array"),
        ([1, 2, 3, 4], 2, [2, 3, 4], "Increasing array"),
        ([1, 3, 1, 2, 0, 5], 3, [3, 3, 2, 5], "Mixed values"),
        ([7, 2, 4], 2, [7, 4], "Simple case"),
        ([1, 1, 1, 1, 1], 3, [1, 1, 1], "All same values"),
        ([5, 3, 4], 1, [5, 3, 4], "k = 1"),
        ([5, 3, 4], 3, [5], "k = n"),
        ([-7, -8, 7, 5, 7, 1, 6, 0], 4, [7, 7, 7, 7, 7], "With negatives"),
    ]

    print("Testing max_sliding_window function:")
    print("=" * 70)

    all_passed = True
    for i, (nums, k, expected, description) in enumerate(test_cases, 1):
        result = max_sliding_window(nums, k)
        status = "PASS" if result == expected else "FAIL"
        if result != expected:
            all_passed = False

        nums_str = str(nums) if len(str(nums)) <= 30 else str(nums)[:27] + "..."
        print(f"Test {i:2}: {description}")
        print(f"         Input: nums={nums_str}, k={k}")
        print(f"         Result: {result}")
        print(f"         Expected: {expected} [{status}]")
        print()

    print("=" * 70)
    print(f"All tests passed: {all_passed}")
    print()

    # Compare implementations
    print("Comparing all implementations:")
    print("=" * 70)

    all_match = True
    for nums, k, expected, description in test_cases:
        result1 = max_sliding_window(nums, k)
        result2 = max_sliding_window_brute_force(nums, k)
        result3 = max_sliding_window_heap(nums, k)

        if not (result1 == result2 == result3 == expected):
            all_match = False
            print(f"MISMATCH for {description}:")
            print(f"  Deque: {result1}, Brute: {result2}, Heap: {result3}")

    if all_match:
        print("All implementations produce identical correct results!")
    print()

    # Demonstrate trace
    print("Demonstrating algorithm trace:")
    print("=" * 70)

    demo_nums = [1, 3, -1, -3, 5, 3, 6, 7]
    demo_k = 3
    result, trace = max_sliding_window_with_trace(demo_nums, demo_k)

    print(f"Input: nums={demo_nums}, k={demo_k}")
    print("\nExecution trace:")
    for line in trace:
        print(line)

    print(f"\nFinal result: {result}")


if __name__ == "__main__":
    run_tests()
