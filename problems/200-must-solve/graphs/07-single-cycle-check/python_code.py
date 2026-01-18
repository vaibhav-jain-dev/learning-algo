"""
Single Cycle Check - Python Solution

Determine if jumps in an array form a single cycle visiting all elements.

Time Complexity: O(n) - visit each element once
Space Complexity: O(1) - constant extra space
"""

from typing import List


def has_single_cycle(array: List[int]) -> bool:
    """
    Check if the array forms a single cycle.

    Key Insight: Start at index 0, follow jumps.
    A valid single cycle visits exactly n elements and returns to index 0.

    Visual for [2, 3, 1, -4, -4, 2]:

        Index: 0  1  2  3  4  5
        Value: 2  3  1 -4 -4  2
        Jump:  0->2->3->5->1->4->0 (back to start)

        6 elements visited, returns to 0 -> true
    """
    n = len(array)
    if n == 0:
        return False

    num_visited = 0
    current_idx = 0

    while num_visited < n:
        # If we return to start before visiting all elements, not single cycle
        if num_visited > 0 and current_idx == 0:
            return False

        num_visited += 1

        # Calculate next index with wrapping
        current_idx = get_next_index(current_idx, array)

    # Must end at starting index
    return current_idx == 0


def get_next_index(current_idx: int, array: List[int]) -> int:
    """Calculate next index handling wraparound."""
    jump = array[current_idx]
    n = len(array)

    # Python handles negative modulo correctly
    return (current_idx + jump) % n


def has_single_cycle_with_visited(array: List[int]) -> bool:
    """
    Alternative approach using visited set.

    Space: O(n) but can detect partial cycles.
    """
    n = len(array)
    if n == 0:
        return False

    visited = set()
    current_idx = 0
    num_visited = 0

    while current_idx not in visited:
        visited.add(current_idx)
        num_visited += 1
        current_idx = get_next_index(current_idx, array)

    # Must visit all elements and return to start
    return num_visited == n and current_idx == 0


def trace_cycle(array: List[int]) -> List[int]:
    """Return the sequence of indices visited (for debugging)."""
    n = len(array)
    path = [0]
    current_idx = get_next_index(0, array)

    while current_idx != 0 and len(path) <= n:
        path.append(current_idx)
        current_idx = get_next_index(current_idx, array)

    if current_idx == 0:
        path.append(0)  # Add return to start
    return path


# Test cases
if __name__ == "__main__":
    test_cases = [
        ([2, 3, 1, -4, -4, 2], True, "Standard single cycle"),
        ([2, 2, -1], True, "Small cycle"),
        ([1, 1, 1, 1, 2], False, "Multiple cycles"),
        ([0, 1, 1, 1, 1], False, "Self-loop at start"),
        ([1, -1], True, "Two element cycle"),
        ([1], True, "Single element"),
        ([1, 2, 3, 4, -2, 3, 7, 8, -26], True, "Large cycle"),
        ([1, 2, 3, 4, -2, 3, 7, 8, 1], False, "Doesn't return to start"),
    ]

    print("=" * 70)
    print("SINGLE CYCLE CHECK - TEST RESULTS")
    print("=" * 70)

    print("\nApproach 1: O(1) Space")
    print("-" * 50)
    for array, expected, desc in test_cases:
        result = has_single_cycle(array)
        status = "PASS" if result == expected else "FAIL"
        print(f"  [{status}] {desc}: {result} (expected {expected})")

    print("\nApproach 2: Visited Set")
    print("-" * 50)
    for array, expected, desc in test_cases:
        result = has_single_cycle_with_visited(array)
        status = "PASS" if result == expected else "FAIL"
        print(f"  [{status}] {desc}: {result} (expected {expected})")

    print("\n" + "=" * 70)
    print("DETAILED EXAMPLE")
    print("=" * 70)

    array = [2, 3, 1, -4, -4, 2]
    print(f"\nArray: {array}")
    print("\nJump sequence:")
    path = trace_cycle(array)
    for i, idx in enumerate(path):
        if i < len(path) - 1:
            print(f"  Index {idx} (value {array[idx]}) -> jump to index {path[i+1]}")
        else:
            print(f"  Back to start!")

    print(f"\nResult: {has_single_cycle(array)}")

    print("\nAll tests completed!")
