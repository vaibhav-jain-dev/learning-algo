"""
Partition Array by Predicate - Python Solutions

Rearrange array so elements satisfying predicate come before those that don't.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List, Callable


# ============================================================================
# APPROACH 1: Two-Pointer Swap (Recommended)
# ============================================================================
# Time Complexity:  O(n) - single pass
# Space Complexity: O(1) - in-place
#
# WHY THIS IS BEST:
# - Single pass through array
# - In-place modification
# - Minimal number of swaps
# ============================================================================

def partition_by_predicate(array: List[int], predicate: Callable[[int], bool]) -> List[int]:
    """
    Partition array so elements satisfying predicate come first.

    Uses two-pointer technique (same as QuickSort partition):
    - Left pointer finds elements that DON'T satisfy
    - Right pointer finds elements that DO satisfy
    - Swap when both found

    Visual for [1, 4, 2, 5, 3, 6], predicate=isEven:

        L=0 (1, odd), R=5 (6, even) -> Swap
        [6, 4, 2, 5, 3, 1]
        L moves right (4, 2 are even)
        L=3 (5, odd), R=4 (3, odd) -> R moves left
        R=2 < L=3 -> Done

        Result: [6, 4, 2, 5, 3, 1]
    """
    left, right = 0, len(array) - 1

    while left < right:
        # Move left until we find element that doesn't satisfy
        while left < right and predicate(array[left]):
            left += 1

        # Move right until we find element that satisfies
        while left < right and not predicate(array[right]):
            right -= 1

        # Swap if pointers haven't crossed
        if left < right:
            array[left], array[right] = array[right], array[left]
            left += 1
            right -= 1

    return array


# ============================================================================
# APPROACH 2: Stable Partition (Preserves Order)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - extra array
#
# WHEN TO USE:
# - Need to preserve relative order within partitions
# - When order matters for subsequent operations
# ============================================================================

def partition_stable(array: List[int], predicate: Callable[[int], bool]) -> List[int]:
    """
    Stable partition - preserves relative order within each partition.

    Creates two lists and concatenates them.
    """
    satisfies = [x for x in array if predicate(x)]
    not_satisfies = [x for x in array if not predicate(x)]
    return satisfies + not_satisfies


# ============================================================================
# APPROACH 3: In-Place Stable (Write Pointer)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(n) - temporary storage
#
# WHEN TO USE:
# - Want stable partition
# - Need to modify original array
# ============================================================================

def partition_stable_inplace(array: List[int], predicate: Callable[[int], bool]) -> List[int]:
    """
    Stable partition that modifies the original array.

    Stores non-satisfying elements, writes satisfying to front,
    then appends non-satisfying.
    """
    not_satisfying = []
    write_idx = 0

    for val in array:
        if predicate(val):
            array[write_idx] = val
            write_idx += 1
        else:
            not_satisfying.append(val)

    for val in not_satisfying:
        array[write_idx] = val
        write_idx += 1

    return array


# ============================================================================
# APPROACH 4: Using sorted() with key (Pythonic but slower)
# ============================================================================
# Time Complexity:  O(n log n)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - Code readability is priority
# - Array is small
# ============================================================================

def partition_sorted(array: List[int], predicate: Callable[[int], bool]) -> List[int]:
    """
    Use sorted with key to partition.

    key=lambda x: not predicate(x) puts True (satisfying) values first
    because False < True in Python.
    """
    return sorted(array, key=lambda x: not predicate(x))


# ============================================================================
# COMMON PREDICATES
# ============================================================================

def is_even(x: int) -> bool:
    return x % 2 == 0


def is_odd(x: int) -> bool:
    return x % 2 == 1


def is_positive(x: int) -> bool:
    return x > 0


def is_negative(x: int) -> bool:
    return x < 0


def greater_than(threshold: int) -> Callable[[int], bool]:
    return lambda x: x > threshold


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    # Helper to check if partition is valid (all satisfying before non-satisfying)
    def is_valid_partition(arr: List[int], pred: Callable[[int], bool]) -> bool:
        found_non_satisfying = False
        for x in arr:
            if not pred(x):
                found_non_satisfying = True
            elif found_non_satisfying:
                return False  # Found satisfying after non-satisfying
        return True

    test_cases = [
        # (array, predicate, predicate_name, description)
        ([1, 4, 2, 5, 3, 6], is_even, "isEven", "Standard case"),
        ([3, 1, 4, 1, 5, 9, 2, 6], greater_than(3), "x > 3", "Greater than threshold"),
        ([1, 2, 3, 4, 5], is_odd, "isOdd", "Odds first"),
        ([-3, 1, -2, 4, -5], is_positive, "isPositive", "Positive first"),
        ([2, 4, 6, 8], is_even, "isEven", "All satisfy"),
        ([1, 3, 5, 7], is_even, "isEven", "None satisfy"),
        ([], is_even, "isEven", "Empty array"),
        ([1], is_even, "isEven", "Single element"),
    ]

    approaches = [
        ("Two-Pointer (Recommended)", partition_by_predicate),
        ("Stable Partition", partition_stable),
        ("Stable In-Place", partition_stable_inplace),
        ("Using sorted()", partition_sorted),
    ]

    print("=" * 70)
    print("PARTITION ARRAY BY PREDICATE - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, pred, pred_name, desc in test_cases:
            result = func(array.copy(), pred)
            valid = is_valid_partition(result, pred)
            status = "PASS" if valid else "FAIL"
            if not valid:
                all_passed = False
            print(f"  {status}: {desc} ({pred_name}) -> {result}")

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
    array = [1, 4, 2, 5, 3, 6]
    print(f"\nInput: array = {array}, predicate = isEven")
    result = partition_by_predicate(array.copy(), is_even)
    print(f"Output: {result}")

    # Sample Input 2
    array = [3, 1, 4, 1, 5, 9, 2, 6]
    print(f"\nInput: array = {array}, predicate = x > 3")
    result = partition_by_predicate(array.copy(), greater_than(3))
    print(f"Output: {result}")

    # Sample Input 3
    array = [1, 2, 3, 4, 5]
    print(f"\nInput: array = {array}, predicate = isOdd")
    result = partition_by_predicate(array.copy(), is_odd)
    print(f"Output: {result}")
