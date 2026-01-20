"""
Minimum Swaps to Sort Array - Python Solutions

Find minimum swaps needed to sort an array.
"""

from typing import List


def min_swaps_to_sort(array: List[int]) -> int:
    """
    Find minimum swaps to sort array.

    Uses cycle detection:
    - Map each element to its sorted position
    - Count cycles in the permutation
    - A cycle of length k needs (k-1) swaps

    Time: O(n log n), Space: O(n)
    """
    n = len(array)
    if n <= 1:
        return 0

    # Create pairs of (value, original_index)
    indexed = [(val, i) for i, val in enumerate(array)]
    indexed.sort()  # Sort by value

    visited = [False] * n
    swaps = 0

    for i in range(n):
        # Skip if already visited or already in correct position
        if visited[i] or indexed[i][1] == i:
            continue

        # Count cycle length
        cycle_length = 0
        j = i

        while not visited[j]:
            visited[j] = True
            j = indexed[j][1]  # Go to where this element came from
            cycle_length += 1

        # A cycle of length k needs k-1 swaps
        if cycle_length > 1:
            swaps += cycle_length - 1

    return swaps


def min_swaps_simulation(array: List[int]) -> int:
    """
    Simulation approach: keep swapping misplaced elements.
    Time: O(n^2), Space: O(n)
    """
    arr = array.copy()
    sorted_arr = sorted(arr)
    pos_map = {val: i for i, val in enumerate(sorted_arr)}

    swaps = 0
    for i in range(len(arr)):
        while arr[i] != sorted_arr[i]:
            # Swap arr[i] to its correct position
            correct_pos = pos_map[arr[i]]
            arr[i], arr[correct_pos] = arr[correct_pos], arr[i]
            swaps += 1

    return swaps


def run_tests():
    test_cases = [
        ([4, 3, 2, 1], 2, "Reverse order"),
        ([1, 5, 4, 3, 2], 2, "Partial disorder"),
        ([1, 2, 3, 4], 0, "Already sorted"),
        ([2, 1], 1, "Simple swap"),
    ]

    print("=" * 60)
    print("MINIMUM SWAPS TO SORT - TEST RESULTS")
    print("=" * 60)

    for array, expected, desc in test_cases:
        result = min_swaps_to_sort(array)
        status = "PASS" if result == expected else "FAIL"
        print(f"  {status}: {desc}: {result} (expected {expected})")


if __name__ == "__main__":
    run_tests()

    print("\n--- Sample Input ---")
    array = [4, 3, 2, 1]
    print(f"Array: {array}")
    print(f"Minimum swaps: {min_swaps_to_sort(array)}")
