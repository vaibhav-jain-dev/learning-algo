"""
Check If Array Can Become Monotonic - Python Solutions

Determine if array can become monotonic by changing at most one element.

This file contains MULTIPLE solution approaches with modern idiomatic Python.
"""

from typing import List


# ============================================================================
# APPROACH 1: Check Both Directions (Recommended)
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHY THIS IS BEST:
# - Single pass for each direction
# - Handles edge cases cleanly
# - Efficient
# ============================================================================

def can_become_monotonic(array: List[int]) -> bool:
    """
    Check if array can become monotonic with at most one change.

    Strategy:
    - Check if we can make it non-decreasing with one change
    - Check if we can make it non-increasing with one change
    - Return true if either is possible

    For each direction:
    1. Find violations (where monotonic property breaks)
    2. If 0 violations: already monotonic
    3. If 1 violation: check if fixable
    4. If > 1 violation: can't fix with one change
    """
    return can_become_non_decreasing(array) or can_become_non_increasing(array)


def can_become_non_decreasing(array: List[int]) -> bool:
    """Check if array can become non-decreasing with one change."""
    if len(array) <= 2:
        return True

    violations = 0
    violation_idx = -1

    for i in range(len(array) - 1):
        if array[i] > array[i + 1]:
            violations += 1
            violation_idx = i
            if violations > 1:
                return False

    if violations == 0:
        return True

    # One violation at index i: arr[i] > arr[i+1]
    # Option A: Change arr[i] to something <= arr[i+1]
    #           Works if i == 0 OR arr[i-1] <= arr[i+1]
    # Option B: Change arr[i+1] to something >= arr[i]
    #           Works if i+1 == n-1 OR arr[i] <= arr[i+2]

    i = violation_idx

    # Option A: change arr[i]
    option_a = (i == 0) or (array[i - 1] <= array[i + 1])

    # Option B: change arr[i+1]
    option_b = (i + 1 == len(array) - 1) or (array[i] <= array[i + 2])

    return option_a or option_b


def can_become_non_increasing(array: List[int]) -> bool:
    """Check if array can become non-increasing with one change."""
    if len(array) <= 2:
        return True

    violations = 0
    violation_idx = -1

    for i in range(len(array) - 1):
        if array[i] < array[i + 1]:
            violations += 1
            violation_idx = i
            if violations > 1:
                return False

    if violations == 0:
        return True

    # One violation at index i: arr[i] < arr[i+1]
    # Option A: Change arr[i] to something >= arr[i+1]
    #           Works if i == 0 OR arr[i-1] >= arr[i+1]
    # Option B: Change arr[i+1] to something <= arr[i]
    #           Works if i+1 == n-1 OR arr[i] >= arr[i+2]

    i = violation_idx

    option_a = (i == 0) or (array[i - 1] >= array[i + 1])
    option_b = (i + 1 == len(array) - 1) or (array[i] >= array[i + 2])

    return option_a or option_b


# ============================================================================
# APPROACH 2: Try All Single Changes (Brute Force)
# ============================================================================
# Time Complexity:  O(n^2)
# Space Complexity: O(n)
#
# WHEN TO USE:
# - For verification
# - When clarity is priority
# ============================================================================

def can_become_monotonic_brute(array: List[int]) -> bool:
    """
    Brute force: try changing each element and check if result is monotonic.
    """
    def is_monotonic(arr: List[int]) -> bool:
        if len(arr) <= 1:
            return True
        increasing = all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))
        decreasing = all(arr[i] >= arr[i + 1] for i in range(len(arr) - 1))
        return increasing or decreasing

    if is_monotonic(array):
        return True

    # Try removing each element (equivalent to changing it to fit)
    for i in range(len(array)):
        # Create array without element i
        test = array[:i] + array[i + 1:]
        if is_monotonic(test):
            return True

    return False


# ============================================================================
# APPROACH 3: Clean Single Function
# ============================================================================
# Time Complexity:  O(n)
# Space Complexity: O(1)
#
# WHEN TO USE:
# - More compact code
# - Single function preferred
# ============================================================================

def can_become_monotonic_compact(array: List[int]) -> bool:
    """
    Compact version checking both directions in one function.
    """
    def check_direction(arr: List[int], compare) -> bool:
        """Check if can become monotonic in given direction."""
        if len(arr) <= 2:
            return True

        violation_idx = -1
        for i in range(len(arr) - 1):
            if not compare(arr[i], arr[i + 1]):
                if violation_idx != -1:
                    return False  # Second violation
                violation_idx = i

        if violation_idx == -1:
            return True

        i = violation_idx
        # Option A: fix arr[i]
        if i == 0 or compare(arr[i - 1], arr[i + 1]):
            return True
        # Option B: fix arr[i+1]
        if i + 1 == len(arr) - 1 or compare(arr[i], arr[i + 2]):
            return True

        return False

    return (check_direction(array, lambda a, b: a <= b) or
            check_direction(array, lambda a, b: a >= b))


# ============================================================================
# TEST CASES
# ============================================================================

def run_tests():
    """Run comprehensive tests for all approaches."""

    test_cases = [
        # (array, expected, description)
        ([1, 5, 3, 4, 5], True, "Fix one element"),
        ([1, 2, 3, 4, 5], True, "Already increasing"),
        ([5, 4, 3, 2, 1], True, "Already decreasing"),
        ([4, 2, 3, 1], False, "Cannot fix"),
        ([3, 4, 2, 3], False, "Cannot fix"),
        ([1, 2, 3], True, "Short array increasing"),
        ([1], True, "Single element"),
        ([], True, "Empty array"),
        ([1, 1, 1], True, "All equal"),
        ([4, 2, 1], True, "Almost decreasing"),
        ([1, 4, 2], True, "Middle element issue"),
        ([10, 5, 7], True, "Can fix by changing 10 or 5"),
    ]

    approaches = [
        ("Check Both Directions", can_become_monotonic),
        ("Brute Force", can_become_monotonic_brute),
        ("Compact Version", can_become_monotonic_compact),
    ]

    print("=" * 70)
    print("CAN BECOME MONOTONIC - TEST RESULTS")
    print("=" * 70)

    for name, func in approaches:
        print(f"\n{name}:")
        print("-" * 50)
        all_passed = True

        for array, expected, desc in test_cases:
            result = func(array)
            status = "PASS" if result == expected else "FAIL"
            if result != expected:
                all_passed = False
            print(f"  {status}: {desc}: {result} (expected {expected})")

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
    array = [1, 5, 3, 4, 5]
    print(f"\nInput: array = {array}")
    result = can_become_monotonic(array)
    print(f"Output: {result}")
    print("Explanation: Change 5 at index 1 to 2: [1, 2, 3, 4, 5]")

    # Sample Input 2
    array = [1, 2, 3, 4, 5]
    print(f"\nInput: array = {array}")
    result = can_become_monotonic(array)
    print(f"Output: {result}")
    print("Explanation: Already monotonic")

    # Sample Input 3
    array = [4, 2, 3, 1]
    print(f"\nInput: array = {array}")
    result = can_become_monotonic(array)
    print(f"Output: {result}")
    print("Explanation: Need to change more than one element")
